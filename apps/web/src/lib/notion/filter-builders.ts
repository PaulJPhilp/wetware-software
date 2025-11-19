// lib/notion/filter-builders.ts
/**
 * Reusable filter builders for common Notion query patterns
 * Reduces code duplication and provides consistent filter logic
 */

import type { ContentType } from "@wetware/shared";

// Base filter types
export type NotionFilter = {
  property: string;
  [key: string]: unknown;
};

export type CompoundFilter = {
  and?: NotionFilter[];
  or?: NotionFilter[];
};

export type NotionQueryFilter = NotionFilter | CompoundFilter;

export type NotionSort = {
  property: string;
  direction: "ascending" | "descending";
};

/**
 * Common filter builders for reducing duplication
 */

/**
 * Filter for published posts (excluding about pages)
 */
export function publishedPostsFilter(): CompoundFilter {
  return {
    and: [
      {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      {
        property: "Slug",
        rich_text: {
          does_not_contain: "about",
        },
      },
      {
        property: "Title",
        title: {
          does_not_contain: "about",
        },
      },
    ],
  };
}

/**
 * Filter for posts by content type (excluding about pages)
 */
export function publishedPostsByTypeFilter(contentType: ContentType): CompoundFilter {
  const baseFilter = publishedPostsFilter();
  return {
    and: [
      ...(baseFilter.and || []),
      {
        property: "Content Type",
        select: {
          equals: contentType,
        },
      },
    ],
  };
}

/**
 * Filter for featured posts (excluding about pages)
 */
export function featuredPostsFilter(): CompoundFilter {
  const baseFilter = publishedPostsFilter();
  return {
    and: [
      ...(baseFilter.and || []),
      {
        property: "Featured",
        checkbox: {
          equals: true,
        },
      },
    ],
  };
}

/**
 * Filter for posts in a specific series
 */
export function seriesPostsFilter(seriesId: string): CompoundFilter {
  return {
    and: [
      {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      {
        property: "Blog Series",
        relation: {
          contains: seriesId,
        },
      },
    ],
  };
}

/**
 * Filter for posts with Published Date (source of truth for publishing)
 */
export function postsWithPublishedDateFilter(): NotionFilter {
  return {
    property: "Published Date",
    date: {
      is_not_empty: true,
    },
  };
}

/**
 * Filter for posts in series with Published Date
 */
export function seriesPostsWithPublishedDateFilter(seriesId: string): CompoundFilter {
  return {
    and: [
      postsWithPublishedDateFilter(),
      {
        property: "Blog Series",
        relation: {
          contains: seriesId,
        },
      },
    ],
  };
}

/**
 * Filter for series by slug
 */
export function seriesBySlugFilter(slug: string): NotionFilter {
  return {
    property: "Slug",
    rich_text: {
      equals: slug,
    },
  };
}

/**
 * Filter for post by slug
 */
export function postBySlugFilter(slug: string): CompoundFilter {
  return {
    and: [
      {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    ],
  };
}

/**
 * Filter for series excluding drafts
 */
export function publishedSeriesFilter(): NotionFilter {
  return {
    property: "Status",
    status: {
      does_not_equal: "Draft",
    },
  };
}

/**
 * Filter for about page
 */
export function aboutPageFilter(): CompoundFilter {
  return {
    and: [
      {
        property: "Published",
        checkbox: { equals: true },
      },
      {
        property: "Slug",
        rich_text: { equals: "about" },
      },
      {
        property: "Title",
        title: { equals: "About" },
      },
    ],
  };
}

/**
 * Common sort configurations
 */

/**
 * Sort by name ascending
 */
export function nameAscendingSort(): NotionSort {
  return {
    property: "Name",
    direction: "ascending",
  };
}

/**
 * Sort by published date descending (most recent first)
 */
export function publishedDateDescendingSort(): NotionSort {
  return {
    property: "Published Date",
    direction: "descending",
  };
}

/**
 * Sort by part number ascending (for series posts)
 */
export function partNumberAscendingSort(): NotionSort {
  return {
    property: "Part Number",
    direction: "ascending",
  };
}

/**
 * Query configuration builder for common patterns
 */

/**
 * Standard query for published posts
 */
export function publishedPostsQuery(limit?: number) {
  return {
    filter: publishedPostsFilter(),
    sorts: [publishedDateDescendingSort()],
    ...(limit && { page_size: limit }),
  };
}

/**
 * Query for posts by content type
 */
export function postsByTypeQuery(contentType: ContentType, limit?: number) {
  return {
    filter: publishedPostsByTypeFilter(contentType),
    sorts: [publishedDateDescendingSort()],
    ...(limit && { page_size: limit }),
  };
}

/**
 * Query for featured posts
 */
export function featuredPostsQuery(limit?: number) {
  return {
    filter: featuredPostsFilter(),
    sorts: [publishedDateDescendingSort()],
    ...(limit && { page_size: limit }),
  };
}

/**
 * Query for series posts
 */
export function seriesPostsQuery(seriesId: string) {
  return {
    filter: seriesPostsFilter(seriesId),
    sorts: [partNumberAscendingSort()],
  };
}

/**
 * Query for published series
 */
export function publishedSeriesQuery() {
  return {
    filter: publishedSeriesFilter(),
    sorts: [nameAscendingSort()],
  };
}
