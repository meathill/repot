import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import s3Client from '@/lib/s3';

export const config = {
  runtime: 'edge',
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  const Prefix = key.replace(new RegExp(`^s3://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), '');

  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
    Delimiter: '/',
    Prefix,
  });
  const response = await s3Client.send(listCommand);

  return Response.json({
    code: 0,
    data: {
      files: response.Contents,
      folders: response.CommonPrefixes,
    },
  });
}
