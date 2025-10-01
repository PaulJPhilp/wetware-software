import { AuthorBioSidebar } from "@/components/AuthorBioSidebar";
import { LatestPosts } from "@/components/LatestPosts";
import { SeriesContentLayout } from "@/components/SeriesContentLayout";
import { getRecentPosts, getSeries } from "@/lib/notion-utils";

export const revalidate = 60; // Revalidate every minute to avoid stale cache

export default async function Home() {
  const [allSeries, recentPosts] = await Promise.all([getSeries(), getRecentPosts(10)]);

  // Take first 3 series
  const resolvedSeries = allSeries.slice(0, 3);

  // Get the recent posts with series names for display
  const recentPostsWithSeriesName = recentPosts;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <main className="flex-1 min-w-0 lg:order-2">
          <LatestPosts posts={recentPostsWithSeriesName} />
        </main>

        {/* Author Bio Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 lg:order-1">
          <AuthorBioSidebar />
        </aside>
      </div>
    </div>
  );
}
