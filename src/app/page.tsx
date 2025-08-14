import { LatestPosts } from "@/components/LatestPosts";
import { PostCard } from "@/components/PostCard";
import { getPublishedPosts, getSeries } from "@/lib/notion-utils";
import Link from "next/link";

export const revalidate = 60; // Revalidate every minute to avoid stale cache

export default async function Home() {
  const posts = (await getPublishedPosts()).filter((post) => {
    const slug = post.slug?.toLowerCase?.() ?? "";
    const title = post.name?.toLowerCase?.() ?? "";
    return !slug.includes("about") && !title.includes("about");
  });
  const series = await getSeries();
  const seriesIdToName: Record<string, string> = Object.fromEntries(
    series.map((s) => [s.id, s.name]),
  );
  const postsWithSeriesName = posts.map((p) =>
    p.seriesId ? { ...p, seriesName: seriesIdToName[p.seriesId] } : p,
  );
  const featuredPosts = postsWithSeriesName.filter((post) => post.featured).slice(0, 3);

  return (
    <div className="space-y-12 px-2 sm:px-4 md:px-8 min-h-screen">
      {/* Latest Insights */}
      <section className="space-y-8">
        {featuredPosts.length > 0 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-sans font-bold text-charcoal">Featured Insights</h2>
              <p className="text-sm text-charcoal/60">
                Highlighted content across human-AI collaboration
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/posts/${post.slug}`} className="block group">
                  <PostCard post={post} />
                </Link>
              ))}
            </div>
          </div>
        )}

        <LatestPosts posts={postsWithSeriesName} />
      </section>
    </div>
  );
}
