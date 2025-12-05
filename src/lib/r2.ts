import { getCloudflareContext } from '@opennextjs/cloudflare';

export interface R2FileInfo {
  key: string;
  size: number;
  lastModified: Date;
}

export interface R2FolderList {
  files: R2FileInfo[];
  folders: string[];
}

/**
 * 获取 R2 bucket 实例
 */
export async function getR2Bucket(): Promise<R2Bucket> {
  const { env } = getCloudflareContext();
  return env.CONTRACTS_BUCKET;
}

/**
 * 读取 R2 中的文件内容
 */
export async function readR2File(key: string): Promise<string | null> {
  const bucket = await getR2Bucket();
  const object = await bucket.get(key);
  if (!object) return null;
  return object.text();
}

/**
 * 写入文件到 R2
 */
export async function writeR2File(key: string, content: string | ArrayBuffer): Promise<void> {
  const bucket = await getR2Bucket();
  await bucket.put(key, content);
}

/**
 * 列出 R2 中指定前缀的文件和文件夹
 */
export async function listR2Objects(prefix: string): Promise<R2FolderList> {
  const bucket = await getR2Bucket();
  const listed = await bucket.list({
    prefix,
    delimiter: '/',
  });

  const files: R2FileInfo[] = (listed.objects || []).map(obj => ({
    key: obj.key,
    size: obj.size,
    lastModified: obj.uploaded,
  }));

  const folders = (listed.delimitedPrefixes || []);

  return { files, folders };
}

/**
 * 递归获取目录下所有文件内容
 */
export async function getAllR2FilesContent(
  prefix: string,
  root: string
): Promise<{ filename: string; content: string }[]> {
  const bucket = await getR2Bucket();
  const results: { filename: string; content: string }[] = [];

  async function processPrefix(currentPrefix: string) {
    const listed = await bucket.list({
      prefix: currentPrefix,
      delimiter: '/',
    });

    // 处理文件
    for (const obj of listed.objects || []) {
      if (!obj.key) continue;
      if (!/\.(sol|txt|md)$/i.test(obj.key)) continue;

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

  await processPrefix(prefix);
  return results;
}

/**
 * 检查文件是否存在
 */
export async function r2FileExists(key: string): Promise<boolean> {
  const bucket = await getR2Bucket();
  const object = await bucket.head(key);
  return object !== null;
}

/**
 * 删除 R2 中的文件
 */
export async function deleteR2File(key: string): Promise<void> {
  const bucket = await getR2Bucket();
  await bucket.delete(key);
}
