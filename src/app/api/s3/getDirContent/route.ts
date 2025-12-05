import { headers } from 'next/headers';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET(request: Request) {
  const { env } = getCloudflareContext();
  const headersList = await headers();
  if (headersList.get('authorization') !== `Bearer ${env.CRON_TOKEN}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const url = new URL(request.url);
  const prefix = url.searchParams.get('prefix') || '';

  // 移除 s3:// 前缀（保持向后兼容）
  const root = prefix
    .replace(new RegExp(`^s3://${env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), '')
    .replace(/^r2:\/\/[^/]+\//, '');

  try {
    const data = await getAllContentFromR2(env.CONTRACTS_BUCKET, root, root);
    const result = data.filter(Boolean);

    return Response.json(result, {
      headers: {
        'Cache-Control': 'public, max-age=2592000',
      },
    });
  } catch (error) {
    console.error('Error getting directory content:', error);
    return Response.json([], { status: 500 });
  }
}

async function getAllContentFromR2(
  bucket: R2Bucket,
  prefix: string,
  root: string
): Promise<{ filename: string; content: string }[]> {
  const results: { filename: string; content: string }[] = [];

  const listed = await bucket.list({
    prefix,
    delimiter: '/',
  });

  // 处理文件
  for (const obj of listed.objects || []) {
    if (!obj.key) continue;
    if (!/\.(sol|txt|md)$/i.test(obj.key)) {
      console.log('Unsupported file type:', obj.key);
      continue;
    }

    const content = await bucket.get(obj.key);
    if (content) {
      results.push({
        filename: obj.key.replace(new RegExp(`^${root}`), ''),
        content: await content.text(),
      });
    }
  }

  // 递归处理子文件夹
  for (const folder of listed.delimitedPrefixes || []) {
    const subResults = await getAllContentFromR2(bucket, folder, root);
    results.push(...subResults);
  }

  return results;
}
