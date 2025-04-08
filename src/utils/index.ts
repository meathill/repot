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

export function getInitials(str: string): string {
  const uppercaseLetters = str.match(/[A-Z]/g);
  if (uppercaseLetters && uppercaseLetters.length >= 2) {
    return uppercaseLetters.slice(0, 2).join('');
  }
  return str.slice(0, 2);
}

export function string2color(str: string): string {
  let hash = 0;
  // 计算字符串的哈希值
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  // 将哈希值转换为十六进制颜色值
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
}
