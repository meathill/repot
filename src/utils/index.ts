import { URLSearchParamsObject } from '@/types';

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function removeS3Prefix(str: string): string {
  return str.replace(/^s3:\/\/repot\//, '');
}

export function trimPrefix(str: string, prefix: string): string {
  return str.startsWith(prefix) ? str.substring(prefix.length) : str;
}

export function getParams(chain: string, params: URLSearchParamsObject) {
  const newParams = new URLSearchParams();
  for (const key in params) {
    if (params[ key ]) {
      newParams.set(key, params[ key ] as string);
    }
  }
  newParams.set('chain', chain);
  return `?${newParams.toString()}`;
}
