import { GetObjectCommand } from '@aws-sdk/client-s3';
import { streamToString } from 'next/dist/server/stream-utils/node-web-streams-helper';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import getS3Client from '@/lib/s3';

export async function GET(request: Request) {
  const { env } = getCloudflareContext();
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  const fileKey = key.replace(new RegExp(`^s3://${env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), '');

  const listCommand = new GetObjectCommand({
    Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
    Key: fileKey,
  });
  const s3Client = await getS3Client();
  const response = await s3Client.send(listCommand);
  const fileContent = await streamToString(response.Body as ReadableStream);

  return Response.json({
    code: 0,
    data: fileContent,
  });
}
