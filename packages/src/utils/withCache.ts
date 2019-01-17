/**
 * Run a func, whilst caching the result
 */
const withCache = (
  func: (...params: any) => any,
  cacheKeyIndex?: string,
  cacheKeyFunc?: (...params: any) => string | null
) => {
  const cache = {};

  return (...args: any) => {
    let cacheKey;

    if (cacheKeyFunc) {
      cacheKey = cacheKeyFunc(...args);
    } else if (typeof cacheKeyIndex === 'number') {
      cacheKey = args[cacheKeyIndex];
    }

    if (cacheKey) {
      if (Object.keys(cache).includes(cacheKey)) {
        return cache[cacheKey];
      }
    }

    const val = func(...args);

    if (cacheKey) {
      cache[cacheKey] = val;
    }

    return val;
  };
};

export default withCache;
