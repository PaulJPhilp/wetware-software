import { PostCard } from "@/components/PostCard";
import { getPostsByType } from "@/lib/notion-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles - Wetware & Software",
  description:
    "Technical articles on software engineering, AI development, and human-AI collaboration patterns.",
};

export const revalidate = 300; // Revalidate every 5 minutes

export default async function ArticlesPage() {
  try {
    const articles = (await getPostsByType("Article")).filter((post) => {
      const slug = post.slug?.toLowerCase?.() ?? "";
      const title = post.name?.toLowerCase?.() ?? "";
      return !slug.includes("about") && !title.includes("about");
    });

    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-xl font-sans font-bold text-charcoal dark:text-white leading-tight">
              Articles
            </h1>
            <p className="text-xs text-charcoal/80 dark:text-gray-300 max-w-2xl leading-snug">
              Technical articles covering software engineering, AI development, and practical
              implementation patterns for human-AI collaboration systems.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-charcoal/60 dark:text-gray-400">
                No articles available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles
                .sort(
                  (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
                )
                .map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);

    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-charcoal dark:text-white">Articles</h1>
            <p className="text-lg text-charcoal/80 dark:text-gray-300 max-w-2xl">
              Technical articles on software engineering and AI development.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-charcoal/60 dark:text-gray-400">
              Unable to load articles. Please try again later.
            </p>
          </div>
        </div>
      </main>
    );
  }
}
