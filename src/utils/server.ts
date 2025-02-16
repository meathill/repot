import { S3FolderList } from '@/types';
import { readDir } from '@/services/s3';

export async function findFirstFileFrom(sources: S3FolderList) {
  const { folders, files } = sources;
  if (files.length > 0) {
    return files[ 0 ];
  }
  const [ folder ] = folders;
  const content = await readDir(folder.Prefix);
  return await findFirstFileFrom(content);
}
