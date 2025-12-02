import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import getS3Client from '@/lib/s3';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET(request: Request) {
  const { env } = getCloudflareContext();
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  const Prefix = key.replace(new RegExp(`^s3://${env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), '');

  const listCommand = new ListObjectsV2Command({
    Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
    Delimiter: '/',
    Prefix,
  });
  const s3Client = await getS3Client();
  const response = await s3Client.send(listCommand);

  return Response.json({
    code: 0,
    data: {
      files: response.Contents,
      folders: response.CommonPrefixes,
    },
  });
}
