import { PostCard } from "@/components/PostCard";
import { getPostsByType } from "@/lib/notion-utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Articles - Wetware & Software",
  description:
    "Technical articles on software engineering, AI development, and human-AI collaboration patterns.",
};

export default async function ArticlesPage() {
  try {
    const articles = (await getPostsByType("Article")).filter((post) => {
      const slug = post.slug?.toLowerCase?.() ?? "";
      const title = post.name?.toLowerCase?.() ?? "";
      return !(slug.includes("about") || title.includes("about"));
    });

    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="font-bold font-sans text-charcoal text-xl leading-tight dark:text-white">
              Articles
            </h1>
            <p className="max-w-2xl text-charcoal/80 text-xs leading-snug dark:text-gray-300">
              Technical articles covering software engineering, AI development, and practical
              implementation patterns for human-AI collaboration systems.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-charcoal/60 dark:text-gray-400">
                No articles available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles
                .sort(
                  (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
                )
                .map((post) => (
                  <Link className="group block" href={`/posts/${post.slug}`} key={post.id}>
                    <PostCard post={post} />
                  </Link>
                ))}
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);

    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="font-bold text-4xl text-charcoal dark:text-white">Articles</h1>
            <p className="max-w-2xl text-charcoal/80 text-lg dark:text-gray-300">
              Technical articles on software engineering and AI development.
            </p>
          </div>
          <div className="py-12 text-center">
            <p className="text-charcoal/60 dark:text-gray-400">
              Unable to load articles. Please try again later.
            </p>
          </div>
        </div>
      </main>
    );
  }
}
