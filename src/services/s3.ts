import { ApiResponse, S3FolderList } from '@/types';

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
