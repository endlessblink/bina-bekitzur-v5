// Memory cache
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

export function getCachedData<T>(key: string, maxAge: number): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  const now = Date.now();
  if (now - entry.timestamp > maxAge * 1000) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

export function setCachedData<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

function cleanupMemoryCache(): void {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (now - entry.timestamp > 3600 * 1000) {
      cache.delete(key);
    }
  }
}

// Run cleanup every hour
setInterval(cleanupMemoryCache, 3600 * 1000);
