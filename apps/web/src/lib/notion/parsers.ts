// lib/notion/parsers.ts
/**
 * Parsing utilities for Notion API responses
 * Breaks down complex parsing logic into focused, testable functions
 */

import { NotionParsingError, NotionPropertyMissingError } from "./errors";
import { createTimer, logger } from "./logger";
import {
  extractCheckbox,
  extractDate,
  extractMultiSelectNames,
  extractNumber,
  extractRichText,
  extractSelectName,
  extractTitle,
} from "./type-guards";

// Local types (these would normally come from @wetware/shared)
interface PostMeta {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  tags: string[];
  series: string | null;
  published: boolean;
  featured: boolean;
  date: string | null;
  order: number | null;
  url: string;
  createdTime: string;
  lastEditedTime: string;
}

interface SeriesMeta {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  tags: string[];
  published: boolean;
  featured: boolean;
  order: number | null;
  url: string;
  createdTime: string;
  lastEditedTime: string;
}

// Types for Notion API responses (to avoid importing full @notionhq/client types)
interface NotionPage {
  id: string;
  properties: Record<string, unknown>;
  url?: string;
  created_time?: string;
  last_edited_time?: string;
}

interface NotionDatabase {
  results: NotionPage[];
}

/**
 * Core parsing utilities
 */

export function safeExtractProperty<T>(
  page: NotionPage,
  propertyName: string,
  extractor: (property: unknown) => T | null,
  required = false,
): T | null {
  try {
    const property = page.properties[propertyName];
    if (!property) {
      if (required) {
        throw new NotionPropertyMissingError(propertyName, page.id);
      }
      return null;
    }

    const result = extractor(property);
    if (result === null && required) {
      throw new NotionPropertyMissingError(propertyName, page.id);
    }

    return result;
  } catch (error) {
    logger.parsing.error(`Failed to extract property '${propertyName}'`, page.id, error, {
      propertyName,
      required,
    });

    if (required) {
      throw error;
    }
    return null;
  }
}

/**
 * Post-specific parsing functions
 */

export function parsePostTitle(page: NotionPage): string {
  const title = safeExtractProperty(page, "Name", extractTitle, true);
  if (!title) {
    throw new NotionParsingError("Post title is required", { pageId: page.id });
  }
  return title;
}

export function parsePostSlug(page: NotionPage): string {
  const slug = safeExtractProperty(page, "Slug", extractRichText, true);
  if (!slug) {
    throw new NotionParsingError("Post slug is required", { pageId: page.id });
  }
  return slug;
}

export function parsePostSummary(page: NotionPage): string | null {
  return safeExtractProperty(page, "Summary", extractRichText);
}

export function parsePostTags(page: NotionPage): string[] {
  const tags = safeExtractProperty(page, "Tags", extractMultiSelectNames);
  return tags ? tags.map((tag) => tag.name) : [];
}

export function parsePostSeries(page: NotionPage): string | null {
  return safeExtractProperty(page, "Series", extractSelectName) ?? null;
}

export function parsePostPublished(page: NotionPage): boolean {
  const published = safeExtractProperty(page, "Published", extractCheckbox);
  return published ?? false;
}

export function parsePostFeatured(page: NotionPage): boolean {
  const featured = safeExtractProperty(page, "Featured", extractCheckbox);
  return featured ?? false;
}

export function parsePostDate(page: NotionPage): string | null {
  return safeExtractProperty(page, "Date", extractDate) ?? null;
}

export function parsePostOrder(page: NotionPage): number | null {
  return safeExtractProperty(page, "Order", extractNumber) ?? null;
}

/**
 * Series-specific parsing functions
 */

export function parseSeriesTitle(page: NotionPage): string {
  const title = safeExtractProperty(page, "Name", extractTitle, true);
  if (!title) {
    throw new NotionParsingError("Series title is required", { pageId: page.id });
  }
  return title;
}

export function parseSeriesSlug(page: NotionPage): string {
  const slug = safeExtractProperty(page, "Slug", extractRichText, true);
  if (!slug) {
    throw new NotionParsingError("Series slug is required", { pageId: page.id });
  }
  return slug;
}

export function parseSeriesDescription(page: NotionPage): string | null {
  return safeExtractProperty(page, "Description", extractRichText);
}

export function parseSeriesTags(page: NotionPage): string[] {
  const tags = safeExtractProperty(page, "Tags", extractMultiSelectNames);
  return tags ? tags.map((tag) => tag.name) : [];
}

export function parseSeriesPublished(page: NotionPage): boolean {
  const published = safeExtractProperty(page, "Published", extractCheckbox);
  return published ?? false;
}

export function parseSeriesFeatured(page: NotionPage): boolean {
  const featured = safeExtractProperty(page, "Featured", extractCheckbox);
  return featured ?? false;
}

export function parseSeriesOrder(page: NotionPage): number | null {
  return safeExtractProperty(page, "Order", extractNumber) ?? null;
}

/**
 * Complete object parsers
 */

export function parsePostFromPage(page: NotionPage): PostMeta {
  try {
    logger.debug(`Parsing post ${page.id}`);

    const post: PostMeta = {
      id: page.id,
      title: parsePostTitle(page),
      slug: parsePostSlug(page),
      summary: parsePostSummary(page),
      tags: parsePostTags(page),
      series: parsePostSeries(page),
      published: parsePostPublished(page),
      featured: parsePostFeatured(page),
      date: parsePostDate(page),
      order: parsePostOrder(page),
      url: page.url || "",
      createdTime: page.created_time || "",
      lastEditedTime: page.last_edited_time || "",
    };

    logger.debug(`Successfully parsed post: ${post.title}`, { pageId: page.id });
    return post;
  } catch (error) {
    logger.parsing.error(`Failed to parse post`, page.id, error);
    throw error;
  }
}

export function parseSeriesFromPage(page: NotionPage): SeriesMeta {
  try {
    logger.debug(`Parsing series ${page.id}`);

    const series: SeriesMeta = {
      id: page.id,
      title: parseSeriesTitle(page),
      slug: parseSeriesSlug(page),
      description: parseSeriesDescription(page),
      tags: parseSeriesTags(page),
      published: parseSeriesPublished(page),
      featured: parseSeriesFeatured(page),
      order: parseSeriesOrder(page),
      url: page.url || "",
      createdTime: page.created_time || "",
      lastEditedTime: page.last_edited_time || "",
    };

    logger.debug(`Successfully parsed series: ${series.title}`, { pageId: page.id });
    return series;
  } catch (error) {
    logger.parsing.error(`Failed to parse series`, page.id, error);
    throw error;
  }
}

/**
 * Batch parsing utilities
 */

export function parsePostsFromResponse(response: NotionDatabase): PostMeta[] {
  const timer = createTimer();
  logger.query.start("parsePostsFromResponse", {
    totalPages: response.results.length,
  });

  const posts: PostMeta[] = [];
  const errors: Array<{ pageId: string; error: Error }> = [];

  for (const page of response.results) {
    try {
      const post = parsePostFromPage(page);
      posts.push(post);
    } catch (error) {
      const parseError = error instanceof Error ? error : new Error(String(error));
      errors.push({ pageId: page.id, error: parseError });
      logger.parsing.skip("Failed to parse post", page.id, { error: parseError.message });
    }
  }

  const elapsed = timer.end("parsePostsFromResponse");

  if (errors.length > 0) {
    logger.warn(`Parsed ${posts.length} posts with ${errors.length} errors`, {
      successCount: posts.length,
      errorCount: errors.length,
      elapsed,
    });
  } else {
    logger.query.success("parsePostsFromResponse", posts.length, { elapsed });
  }

  return posts;
}

export function parseSeriesFromResponse(response: NotionDatabase): SeriesMeta[] {
  const timer = createTimer();
  logger.query.start("parseSeriesFromResponse", {
    totalPages: response.results.length,
  });

  const series: SeriesMeta[] = [];
  const errors: Array<{ pageId: string; error: Error }> = [];

  for (const page of response.results) {
    try {
      const seriesItem = parseSeriesFromPage(page);
      series.push(seriesItem);
    } catch (error) {
      const parseError = error instanceof Error ? error : new Error(String(error));
      errors.push({ pageId: page.id, error: parseError });
      logger.parsing.skip("Failed to parse series", page.id, { error: parseError.message });
    }
  }

  const elapsed = timer.end("parseSeriesFromResponse");

  if (errors.length > 0) {
    logger.warn(`Parsed ${series.length} series with ${errors.length} errors`, {
      successCount: series.length,
      errorCount: errors.length,
      elapsed,
    });
  } else {
    logger.query.success("parseSeriesFromResponse", series.length, { elapsed });
  }

  return series;
}
