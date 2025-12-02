import { ApiResponse, S3FolderList } from '@/types';
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import getS3Client from '@/lib/s3';
import { streamToString } from 'next/dist/server/stream-utils/node-web-streams-helper';
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

  // 设置缓存结
  setCachedFile(path, result.data);
  return result.data;
}

export async function getAllContentFromDir(Prefix: string, root: string) {
  const { env } = getCloudflareContext();
  const listCommand = new ListObjectsV2Command({
    Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
    Delimiter: '/',
    Prefix: Prefix.replace(new RegExp(`^s3://${env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), ''),
  });
  const s3Client = await getS3Client();
  const response = await s3Client.send(listCommand);
  const {
    Contents: files,
    CommonPrefixes: folders,
  } = response;
  const results = await Promise.all((files || []).map(async (file) => {
    if (!file.Key) return null;
    if (!/\.(sol|txt|md)$/i.test(file.Key)) {
      console.log('Unsupported file type:', file.Key);
      return null;
    }

    const response = await s3Client.send(new GetObjectCommand({
      Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
      Key: file.Key.replace(new RegExp(`^s3://${env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), ''),
    }));
    const content = await streamToString(response.Body as ReadableStream);
    return {
      filename: file.Key.replace(new RegExp(`^${root}`), ''),
      content,
    };
  }));
  for (const folder of folders || []) {
    if (!folder.Prefix) continue;

    const content = await getAllContentFromDir(folder.Prefix, root);
    results.push(...content);
  }
  return results.filter(Boolean);
}
