import { headers } from 'next/headers';
import { getAllContentFromDir } from '@/services/s3';

export const config = {
  runtime: 'edge',
};

export async function GET(request: Request) {
  const headersList = await headers();
  if (headersList.get('authorization') !== `Bearer ${process.env.CRON_TOKEN}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const url = new URL(request.url);
  const Prefix = url.searchParams.get('prefix') || '';
  const root = Prefix.replace(new RegExp(`^s3://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), '');
  const data = await getAllContentFromDir(Prefix, root);
  const result = data.filter(Boolean);

  return Response.json(result, {
    headers: {
      'Cache-Control': 'public, max-age=2592000',
    },
  });
}
