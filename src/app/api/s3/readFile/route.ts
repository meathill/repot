import { GetObjectCommand } from '@aws-sdk/client-s3';
import { streamToString } from 'next/dist/server/stream-utils/node-web-streams-helper';
import s3Client from '@/lib/s3';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  const fileKey = key.replace(new RegExp(`^s3://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), '');

  const listCommand = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
    Key: fileKey,
  });
  const response = await s3Client.send(listCommand);
  const fileContent = await streamToString(response.Body as ReadableStream);

  return Response.json({
    code: 0,
    data: fileContent,
  });
}
