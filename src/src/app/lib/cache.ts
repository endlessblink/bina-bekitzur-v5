type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

class Cache {
  private static instance: Cache;
  private cache: Map<string, CacheEntry<unknown>>;

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
    if (!entry) return null;
    return entry.data as T;
  }

  public set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  public delete(key: string): void {
    this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }
}

const cacheInstance = Cache.getInstance();

export function getCachedData<T>(key: string): T | null {
  return cacheInstance.get<T>(key);
}

export function setCachedData<T>(key: string, data: T): void {
  cacheInstance.set<T>(key, data);
}