import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { getPublishedPosts } from "@/lib/notion-utils";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const posts = (await getPublishedPosts()).filter((post) => {
    const slug = post.slug?.toLowerCase?.() ?? "";
    const title = post.name?.toLowerCase?.() ?? "";
    return !slug.includes("about") && !title.includes("about");
  });
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);
  const latestPosts = posts.slice(0, 5);

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

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-[11px] font-sans font-bold text-charcoal leading-tight">
                Latest Posts
              </h2>
              <p className="text-[9px] text-charcoal/60 leading-tight">
                Recent explorations in technology and human systems
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 lg:space-x-2 sm:mt-1">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-orange text-orange hover:bg-orange hover:text-white text-[9px] px-1 py-0.5 h-6 min-w-0"
              >
                <Link href="/essays">Essays</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-orange text-orange hover:bg-orange hover:text-white text-[9px] px-1 py-0.5 h-6 min-w-0"
              >
                <Link href="/articles">Articles</Link>
              </Button>
              {/* Removed Series button per request */}
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}`} className="block group">
                <PostCard post={post} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
