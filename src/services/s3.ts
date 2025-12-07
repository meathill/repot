import { ApiResponse, S3FolderList } from '@/types';
import { getCachedFile, setCachedFile } from './file-cache';

// 检测是否在客户端环境
const isClient = typeof window !== 'undefined';

export async function readDir(path: string): Promise<S3FolderList> {
  // 客户端使用相对路径
  const baseUrl = isClient ? '' : (process.env.NEXT_PUBLIC_SITE_URL || '');
  const url = new URL(`${baseUrl}/api/s3/readDir`, isClient ? window.location.origin : undefined);
  url.searchParams.set('key', path);
  const response = await fetch(url);
  const result = (await response.json()) as ApiResponse<S3FolderList>;
  const { files = [], folders = [] } = result.data || { files: [], folders: [] };
  return {
    files: files.filter(file => !file.Key.endsWith('/')),
    folders,
  }
}

export async function readFile(path: string): Promise<string> {
  // 检查缓存
  const cached = getCachedFile(path);
  if (cached) return cached;

  // 客户端使用相对路径
  const baseUrl = isClient ? '' : (process.env.NEXT_PUBLIC_SITE_URL || '');
  const url = new URL(`${baseUrl}/api/s3/readFile`, isClient ? window.location.origin : undefined);
  url.searchParams.set('key', path);
  const response = await fetch(url);
  const result = (await response.json()) as ApiResponse<string>;

  // 设置缓存
  if (result.data) {
    setCachedFile(path, result.data);
  }
  return result.data || '';
}

export async function getAllContentFromDir(prefix: string, root: string) {
  // 这个函数只在服务端使用，需要动态导入 getCloudflareContext
  const { getCloudflareContext } = await import('@opennextjs/cloudflare');
  const { env } = await getCloudflareContext({ async: true });
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
