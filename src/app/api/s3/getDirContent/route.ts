import { headers } from 'next/headers';
import { getAllContentFromDir } from '@/services/s3';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET(request: Request) {
  const { env } = getCloudflareContext();
  const headersList = await headers();
  if (headersList.get('authorization') !== `Bearer ${env.CRON_TOKEN}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const url = new URL(request.url);
  const Prefix = url.searchParams.get('prefix') || '';
  const root = Prefix.replace(new RegExp(`^s3://${env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), '');
  const data = await getAllContentFromDir(Prefix, root);
  const result = data.filter(Boolean);

  return Response.json(result, {
    headers: {
      'Cache-Control': 'public, max-age=2592000',
    },
  });
}
