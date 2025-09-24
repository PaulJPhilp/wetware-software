import { getPublishedPosts, getSeries } from "@/lib/notion-utils";
import type { SeriesSidebarSeries } from "@/lib/types";

/**
 * getSeriesList Function
 * Fetches and groups published posts by their series, returning formatted data
 * for sidebar navigation components. Includes cover images and article counts.
 *
 * @returns Promise resolving to array of series with sidebar-compatible structure
 * @throws Will not throw but returns empty array if data fetching fails
 */
export async function getSeriesList() {
  const [posts, notionSeries] = await Promise.all([
    getPublishedPosts(),
    getSeries(),
  ]);

  // Build a mapping from seriesId to seriesName
  const seriesIdToName: Record<string, string> = {};
  // Initialize map with all series so the sidebar shows series even if empty
  interface SidebarArticleWithMeta {
    title: string;
    href: string;
    partNumber?: number;
  }
  const seriesMap: Record<
    string,
    { name: string; articles: SidebarArticleWithMeta[] }
  > = {};

  notionSeries.forEach((series) => {
    seriesIdToName[series.id] = series.name;
    if (!seriesMap[series.name]) {
      seriesMap[series.name] = { name: series.name, articles: [] };
    }
  });

  // Group posts by seriesId
  posts.forEach((post) => {
    if (!post.seriesId) return;
    const seriesName = seriesIdToName[post.seriesId];
    if (!seriesName) return;
    const bucket = seriesMap[seriesName];
    if (!bucket) {
      return;
    }

    const article: SidebarArticleWithMeta = {
      title: post.name,
      href: `/posts/${post.slug}`,
      ...(typeof post.partNumber === "number"
        ? { partNumber: post.partNumber }
        : {}),
    };

    bucket.articles.push(article);
  });

  // Sort articles: by part number ascending when available; fallback to title
  Object.values(seriesMap).forEach((s) => {
    s.articles.sort((a, b) => {
      const aNum = typeof a.partNumber === "number" ? a.partNumber : undefined;
      const bNum = typeof b.partNumber === "number" ? b.partNumber : undefined;
      if (aNum != null && bNum != null) return aNum - bNum;
      if (aNum == null && bNum == null) return a.title.localeCompare(b.title);
      if (aNum != null && bNum == null) return -1; // numbered first
      return 1; // b numbered first
    });
  });

  // Return series in the same order as Notion returned them, trimming meta
  const ordered = notionSeries
    .map((s) => {
      const bucket = seriesMap[s.name];
      if (!bucket) {
        return null;
      }
      // Use series cover images, with fallbacks
      let coverLight = s.coverLight;
      let coverDark = s.coverDark;

      // Fallback to first post's cover if series has none
      if (!coverLight) {
        const firstPost = posts.find(
          (p) => p.seriesId === s.id && p.coverImage
        );
        if (firstPost?.coverImage) coverLight = firstPost.coverImage;
      }
      if (!coverDark) {
        coverDark = coverLight; // Use same image for both if only one available
      }

      // If still no cover, use a default placeholder based on series name
      if (!coverLight) {
        // Map series names to available images in public/images/
        const defaultCovers: Record<string, string> = {
          "Mastering Effect": "/images/perez-cycles.svg",
          "The Coder's Guide to AI": "/images/perez-cycles_with_mappin.svg",
          "Growing an LLM": "/images/perez-historical-model.svg",
        };

        coverLight =
          defaultCovers[s.name] ||
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZGRkIi8+Cjx0ZXh0IHg9IjQwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPk5vIENvdmVyPC90ZXh0Pgo8L3N2Zz4K";
      }
      if (!coverDark) {
        coverDark = coverLight; // Use same image for both themes if dark not available
      }
      return {
        name: bucket.name,
        slug: s.slug,
        coverLight,
        coverDark,
        articles: bucket.articles.map(({ title, href }) => ({ title, href })),
      };
    })
    .filter((s): s is NonNullable<typeof s> => !!s && s.articles.length > 0);
  return ordered as SeriesSidebarSeries[];
}
