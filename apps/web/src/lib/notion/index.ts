// lib/notion/index.ts
/**
 * Notion utilities - refactored modular exports
 *
 * This module serves as the main entry point for all Notion-related functionality,
 * providing a clean interface for the refactored and improved utilities.
 */

// Core functionality exports
export {
  aboutPageFilter,
  featuredPostsFilter,
  featuredPostsQuery,
  // Sorting utilities
  nameAscendingSort,
  partNumberAscendingSort,
  postBySlugFilter,
  postsByTypeQuery,
  publishedDateDescendingSort,
  publishedPostsFilter,
  // Query builders
  publishedPostsQuery,
  publishedSeriesFilter,
  seriesBySlugFilter,
  // Other useful filters
  seriesPostsFilter,
  seriesPostsQuery,
  type CompoundFilter,
  // Types
  type NotionFilter,
  type NotionQueryFilter,
  type NotionSort,
} from "./filter-builders";

export {
  parsePostDate,
  parsePostFeatured,
  parsePostFromPage,
  parsePostOrder,
  parsePostPublished,
  parsePostSeries,
  parsePostsFromResponse,
  parsePostSlug,
  parsePostSummary,
  parsePostTags,
  // Individual property parsers for granular usage
  parsePostTitle,
  parseSeriesDescription,
  parseSeriesFeatured,
  parseSeriesFromPage,
  parseSeriesFromResponse,
  parseSeriesOrder,
  parseSeriesPublished,
  parseSeriesSlug,
  parseSeriesTags,
  parseSeriesTitle,
  safeExtractProperty,
} from "./parsers";

export {
  buildCacheKey,
  CacheConfig,
  CacheKeys,
} from "./cache-config";

export {
  extractCheckbox,
  extractDate,
  extractMultiSelectNames,
  extractNumber,
  extractRichText,
  extractSelectName,
  extractTitle,
  isValidCheckboxProperty,
  isValidDateProperty,
  isValidMultiSelectProperty,
  isValidNumberProperty,
  isValidRichTextProperty,
  isValidSelectProperty,
  isValidTitleProperty,
  validateRequiredProperties,
} from "./type-guards";

export {
  NotionError,
  NotionParsingError,
  NotionPropertyMissingError,
  NotionPropertyTypeError,
  NotionQueryError,
  NotionValidationError,
} from "./errors";

export {
  createTimer,
  logger,
  withLogging,
  type LogContext,
  type LogLevel,
} from "./logger";

// Re-export types that might be useful for consumers
export type {
  NotionCheckboxProperty,
  NotionDateProperty,
  NotionMultiSelectProperty,
  NotionNumberProperty,
  NotionRichTextProperty,
  NotionSelectProperty,
  NotionTitleProperty,
} from "./type-guards";
