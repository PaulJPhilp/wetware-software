import { LatestPosts } from "@/components/LatestPosts";
import { NotionFeaturedSeries } from "@/components/NotionFeaturedSeries";
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
  const recentPostsWithSeriesName = recentPosts.map((post) => {
    if (!post.seriesId) {
      return post;
    }

    const seriesName = seriesIdToName[post.seriesId];
    if (!seriesName) {
      return post;
    }

    return { ...post, seriesName };
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Featured Series Sidebar */}
      {/* <NotionFeaturedSeries limit={3} /> */}
      
      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 px-0 sm:px-2 md:px-4">
        <LatestPosts posts={recentPostsWithSeriesName} />
      </div>
    </div>
  );
}
