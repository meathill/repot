export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function removeS3Prefix(str: string): string {
  return str.replace(/^s3:\/\/repot\//, '');
}

export function trimPrefix(str: string, prefix: string): string {
  return str.startsWith(prefix) ? str.substring(prefix.length) : str;
}
