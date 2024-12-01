import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import s3Client from '@/lib/s3';
import { streamToString } from 'next/dist/server/stream-utils/node-web-streams-helper';

export const config = {
  runtime: 'edge',
};

async function readDir(Prefix: string, suiVersion: string) {
  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
    Delimiter: '/',
    Prefix: Prefix.replace(new RegExp(`^s3://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), ''),
  });
  const response = await s3Client.send(listCommand);
  const {
    Contents: files,
    CommonPrefixes: folders,
  } = response;
  const results = await Promise.all((files || []).map(async (file) => {
    if (!file.Key) return null;

    const response = await s3Client.send(new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
      Key: file.Key.replace(new RegExp(`^s3://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), ''),
    }));
    const content = await streamToString(response.Body as ReadableStream);
    return {
      filename: file.Key,
      content: suiVersion
        ? content.replaceAll(
          'rev = "framework/testnet"',
          `rev = "${suiVersion}"`
        )
        : content,
    };
  }));
  for (const folder of folders || []) {
    if (!folder.Prefix) continue;

    const content = await readDir(folder.Prefix, suiVersion);
    results.push(...content);
  }
  return results.filter(Boolean);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const Prefix = url.searchParams.get('prefix') || '';
  const response = await fetch('https://prod-api.chainide.com/api/image/sui/version');
  const { data: suiVersion } = (await response.json()) as { data: string };
  const data = await readDir(Prefix, suiVersion);

  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=2592000',
    },
  });
}
