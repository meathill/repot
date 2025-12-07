import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  
  // 移除 s3:// 前缀（保持向后兼容）
  const prefix = key
    .replace(new RegExp(`^s3://${env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), '')
    .replace(/^r2:\/\/[^/]+\//, '');

  try {
    const bucket = env.CONTRACTS_BUCKET;
    const listed = await bucket.list({
      prefix,
      delimiter: '/',
    });

    const files = (listed.objects || []).map(obj => ({
      Key: obj.key,
      Size: obj.size,
      LastModified: obj.uploaded,
    }));

    const folders = (listed.delimitedPrefixes || []).map(prefix => ({
      Prefix: prefix,
    }));

    return Response.json({
      code: 0,
      data: {
        files,
        folders,
      },
    });
  } catch (error) {
    console.error('Error listing R2 objects:', error);
    return Response.json({
      code: 500,
      data: { files: [], folders: [] },
      message: 'Failed to list directory',
    }, { status: 500 });
  }
}
