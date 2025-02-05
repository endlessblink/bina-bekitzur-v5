// Memory cache
interface CacheEntry<T> {
  data: T
  timestamp: number
}

const memoryCache = new Map<string, CacheEntry<any>>()

export function getCachedData<T>(key: string, maxAge: number): T | null {
  const entry = memoryCache.get(key)
  if (!entry) return null

  const now = Date.now()
  if (now - entry.timestamp > maxAge * 1000) {
    memoryCache.delete(key)
    return null
  }

  return entry.data
}

export function setCachedData<T>(key: string, data: T): void {
  memoryCache.set(key, {
    data,
    timestamp: Date.now(),
  })
}

function cleanupMemoryCache(): void {
  const now = Date.now()
  for (const [key, entry] of memoryCache.entries()) {
    if (now - entry.timestamp > 3600 * 1000) {
      memoryCache.delete(key)
    }
  }
}

// Run cleanup every hour
setInterval(cleanupMemoryCache, 3600000)
