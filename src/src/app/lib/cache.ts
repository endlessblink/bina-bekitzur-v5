type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

class Cache {
  private static instance: Cache;
  private cache: Map<string, CacheEntry<any>>;

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if cache has expired (default: 1 hour)
    const now = Date.now();
    if (now - entry.timestamp > 3600000) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  public set<T>(key: string, data: T, duration: number = 3600): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });

    // Clean up expired entries periodically
    if (Math.random() < 0.1) { // 10% chance to run cleanup
      this.cleanup(duration);
    }
  }

  private cleanup(duration: number): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > duration * 1000) {
        this.cache.delete(key);
      }
    }
  }
}

const cacheInstance = Cache.getInstance();

export async function getCachedData<T>(key: string): Promise<T | null> {
  return cacheInstance.get<T>(key);
}

export async function setCachedData<T>(key: string, data: T, duration: number = 3600): Promise<void> {
  cacheInstance.set<T>(key, data, duration);
} 
} 