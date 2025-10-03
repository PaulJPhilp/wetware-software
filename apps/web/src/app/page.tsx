import { AuthorBioSidebar } from "@/components/AuthorBioSidebar";
import { LatestPosts } from "@/components/LatestPosts";
import { getRecentPosts, getSeries } from "@/lib/notion-utils";

export const revalidate = 60; // Revalidate every minute to avoid stale cache

export default async function Home() {
  const [, recentPosts] = await Promise.all([getSeries(), getRecentPosts(10)]);

  return (
    <div className="py-8 max-w-7xl ml-0 mr-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <main className="flex-1 min-w-0 lg:order-2">
          <LatestPosts posts={recentPosts} />
        </main>

        {/* Author Bio Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 lg:order-1">
          <AuthorBioSidebar />
        </aside>
      </div>
    </div>
  );
}
