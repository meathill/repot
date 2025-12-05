import { ApiResponse, S3FolderList } from '@/types';
import { getCachedFile, setCachedFile } from './file-cache';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function readDir(path: string): Promise<S3FolderList> {
  const { env } = getCloudflareContext();
  const url = new URL(`${env.NEXT_PUBLIC_SITE_URL}/api/s3/readDir`);
  url.searchParams.set('key', path);
  const response = await fetch(url);
  const result = (await response.json()) as ApiResponse<S3FolderList>;
  const { files = [], folders = [] } = result.data;
  return {
    files: files.filter(file => !file.Key.endsWith('/')),
    folders,
  }
}

export async function readFile(path: string): Promise<string> {
  const { env } = getCloudflareContext();
  // 检查缓存
  const cached = getCachedFile(path);
  if (cached) return cached;

  const url = new URL(`${env.NEXT_PUBLIC_SITE_URL}/api/s3/readFile`);
  url.searchParams.set('key', path);
  const response = await fetch(url);
  const result = (await response.json()) as ApiResponse<string>;

  // 设置缓存
  setCachedFile(path, result.data);
  return result.data;
}

export async function getAllContentFromDir(prefix: string, root: string) {
  const { env } = getCloudflareContext();
  const bucket = env.CONTRACTS_BUCKET;

  const results: { filename: string; content: string }[] = [];

  async function processPrefix(currentPrefix: string) {
    const listed = await bucket.list({
      prefix: currentPrefix,
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
      await processPrefix(folder);
    }
  }

  await processPrefix(prefix.replace(new RegExp(`^s3://${env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), ''));
  return results.filter(Boolean);
}
