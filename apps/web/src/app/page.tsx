import { LatestPosts } from "@/components/LatestPosts";
import { getRecentPosts, getSeries } from "@/lib/notion-utils";

export const revalidate = 60; // Revalidate every minute to avoid stale cache

export default async function Home() {
  const [series, recentPosts] = await Promise.all([
    getSeries(),
    getRecentPosts(10),
  ]);

  const seriesIdToName: Record<string, string> = Object.fromEntries(
    series.map((s) => [s.id, s.name]),
  );
  const recentPostsWithSeriesName = recentPosts.map((p) =>
    p.seriesId ? { ...p, seriesName: seriesIdToName[p.seriesId] } : p,
  );

  return (
    <div className="px-0 sm:px-2 md:px-4 min-h-screen">
      <LatestPosts posts={recentPostsWithSeriesName} />
    </div>
  );
}
