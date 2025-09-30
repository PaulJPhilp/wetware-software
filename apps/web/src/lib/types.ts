/**
 * Represents a complete series of related posts sourced from Notion.
 * Consolidates shared metadata so UI components remain DRY.
 */
export interface Series {
  id: string;
  slug: string;
  title: string;
  name?: string; // Alternative name field for backward compatibility
  imageUrl: string;
  coverLight?: string;
  coverDark?: string;
  description?: string;
  status?: string;
  focusArea?: string;
  tags?: Array<{ name: string }>;
  postCount?: number;
  articles: SeriesArticle[];
}

/**
 * Describes an individual article within a series.
 */
export interface SeriesArticle {
  id: string;
  slug: string;
  title: string;
  description?: string;
  part: number;
  href?: string; // Alternative link format for sidebar components
  coverImage?: string; // For articles with individual covers
}

/**
 * Shape for sidebar navigation when rendering a collection of series.
 */
export interface SidebarSeries {
  name: string; // Required for sidebar navigation
  slug?: string;
  coverLight?: string;
  coverDark?: string;
  articles: SidebarArticle[];
}

/**
 * Represents a sidebar navigation entry pointing to a series article.
 */
export interface SidebarArticle {
  title: string;
  href: string; // Required for sidebar links
  partNumber?: number;
}

// Legacy type aliases for backward compatibility
/**
 * Backwards-compatible alias used by existing article components.
 */
export type ArticleInSeries = SeriesArticle;

// Type aliases for sidebar components to maintain clarity
