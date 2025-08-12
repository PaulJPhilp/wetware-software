import type { Series } from "@/components/SeriesSidebar";
import { getPublishedPosts, getSeries } from "@/lib/notion-utils";

// Helper to group posts by series
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
    seriesMap[seriesName].articles.push({
      title: post.name,
      href: `/posts/${post.slug}`,
      partNumber: post.partNumber ?? undefined,
    });
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
      return {
        name: bucket.name,
        articles: bucket.articles.map(({ title, href }) => ({ title, href })),
      };
    })
    .filter((s) => s.articles.length > 0);
  return ordered as Series[];
}
