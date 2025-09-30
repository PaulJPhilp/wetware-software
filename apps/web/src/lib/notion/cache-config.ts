// lib/notion/cache-config.ts
/**
 * Cache configuration and key builders for Notion data
 * Provides consistent caching strategy with parameter-based keys
 */

import type { ContentType } from "@wetware/shared";

/**
 * Cache key builder for parameter-based cache invalidation
 */
export function buildCacheKey(baseName: string, params?: Record<string, unknown>): string {
  if (!params || Object.keys(params).length === 0) {
    return baseName;
  }

  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}:${String(params[key])}`)
    .join(",");

  return `${baseName}(${sortedParams})`;
}

/**
 * Cache key functions for different query types
 */
export const CacheKeys = {
  // Series queries
  publishedSeries: () => "published-series",
  seriesWithPosts: (slug: string) => buildCacheKey("series-with-posts", { slug }),

  // Post queries
  publishedPosts: () => "published-posts-excluding-about",
  postsByType: (contentType: ContentType) => buildCacheKey("posts-by-type", { contentType }),
  recentPosts: (limit: number) => buildCacheKey("recent-posts", { limit }),
  featuredPosts: (limit: number) => buildCacheKey("featured-posts", { limit }),
  postBySlug: (slug: string) => buildCacheKey("post-by-slug", { slug }),

  // Special pages
  aboutPage: () => "about-page",

  // Featured series
  featuredSeries: (limit: number) => buildCacheKey("featured-series", { limit }),
} as const;

/**
 * Cache configuration with consistent revalidation times
 */
export const CacheConfig = {
  // Series change less frequently - 10 minutes
  SERIES: { revalidate: 600 },

  // Posts change more frequently - 5 minutes
  POSTS: { revalidate: 300 },

  // Special pages - 10 minutes
  PAGES: { revalidate: 600 },

  // Featured content - 10 minutes
  FEATURED: { revalidate: 600 },
} as const;

/**
 * Get appropriate cache config for different content types
 */
export function getCacheConfig(type: "series" | "posts" | "pages" | "featured") {
  switch (type) {
    case "series":
      return CacheConfig.SERIES;
    case "posts":
      return CacheConfig.POSTS;
    case "pages":
      return CacheConfig.PAGES;
    case "featured":
      return CacheConfig.FEATURED;
    default:
      return CacheConfig.POSTS; // Default fallback
  }
}

/**
 * Helper for creating cache key arrays (Next.js unstable_cache format)
 */
export function createCacheKeyArray(key: string): [string] {
  return [key];
}
