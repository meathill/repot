// 文件缓存服务
type CachedFile = {
  content: string;
  timestamp: number;
};

const FILE_CACHE = new Map<string, CachedFile>();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

export const getCachedFile = (key: string): string | null => {
  const entry = FILE_CACHE.get(key);
  if (entry && (Date.now() - entry.timestamp < CACHE_DURATION)) {
    return entry.content;
  }
  return null;
};

export const setCachedFile = (key: string, content: string): void => {
  FILE_CACHE.set(key, {
    content,
    timestamp: Date.now()
  });
};
