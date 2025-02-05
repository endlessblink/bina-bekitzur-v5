// Memory cache
interface CacheEntry {
  value: string
  expiresAt: Date
}

const memoryCache = new Map<string, CacheEntry>()

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const memoryCached = memoryCache.get(key)
    if (memoryCached && memoryCached.expiresAt > new Date()) {
      return JSON.parse(memoryCached.value)
    }
    return null
  } catch (error) {
    console.error('[Cache] Get error:', error)
    return null
  }
}

export async function setCachedData<T>(key: string, value: T, expiresIn = 3600): Promise<void> {
  try {
    if (value === null || value === undefined) {
      return
    }

    const expiresAt = new Date(Date.now() + expiresIn * 1000)
    memoryCache.set(key, {
      value: JSON.stringify(value),
      expiresAt,
    })
  } catch (error) {
    console.error('[Cache] Set error:', error)
  }
}

function cleanupMemoryCache(): void {
  const now = new Date()
  for (const [key, entry] of memoryCache.entries()) {
    if (entry.expiresAt <= now) {
      memoryCache.delete(key)
    }
  }
}

// Run cleanup every hour
setInterval(cleanupMemoryCache, 3600000)
