import { S3Client } from '@aws-sdk/client-s3';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export default async function getS3Client() {
  const { env } = getCloudflareContext();
  return new S3Client({
    region: env.AWS_REGION || 'us-east-2',
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY || '',
    },
  });
}
