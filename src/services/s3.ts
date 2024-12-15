import { ApiResponse, S3FolderList } from '@/types';
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import s3Client from '@/lib/s3';
import { streamToString } from 'next/dist/server/stream-utils/node-web-streams-helper';

export async function readDir(path: string): Promise<S3FolderList> {
  const url = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/api/s3/readDir`);
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
  const url = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/api/s3/readFile`);
  url.searchParams.set('key', path);
  const response = await fetch(url);
  const result = (await response.json()) as ApiResponse<string>;
  return result.data;
}

export async function getAllContentFromDir(Prefix: string, root: string) {
  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
    Delimiter: '/',
    Prefix: Prefix.replace(new RegExp(`^s3://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), ''),
  });
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
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || '',
      Key: file.Key.replace(new RegExp(`^s3://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/`), ''),
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
