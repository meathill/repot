import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';

  // 移除 s3:// 前缀（如果有的话，保持向后兼容）
  const fileKey = key
    .replace(new RegExp(`^s3://${env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), '')
    .replace(/^r2:\/\/[^/]+\//, '');

  try {
    const bucket = env.CONTRACTS_BUCKET;
    const object = await bucket.get(fileKey);

    if (!object) {
      return Response.json({
        code: 404,
        data: null,
        message: 'File not found',
      }, { status: 404 });
    }

    const fileContent = await object.text();

    return Response.json({
      code: 0,
      data: fileContent,
    });
  } catch (error) {
    console.error('Error reading file from R2:', error);
    return Response.json({
      code: 500,
      data: null,
      message: 'Failed to read file',
    }, { status: 500 });
  }
}
