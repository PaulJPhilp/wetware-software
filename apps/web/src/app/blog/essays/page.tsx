import { PostCard } from "@/components/PostCard";
import { getPostsByType } from "@/lib/notion-utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Essays - Wetware & Software",
  description:
    "Thoughtful essays exploring the intersection of human systems and artificial intelligence.",
};

export default async function EssaysPage() {
  try {
    const essays = await getPostsByType("Essay");

    return (
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 xl:max-w-7xl">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="font-bold font-sans text-charcoal text-xl leading-tight dark:text-white">
              Essays
            </h1>
            <p className="max-w-2xl text-charcoal/80 text-xs leading-snug dark:text-gray-300">
              Thoughtful explorations and reflections on the intersection of human systems and
              artificial intelligence, examining both the technical and philosophical implications
              of our evolving relationship with technology.
            </p>
          </div>

          {essays.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-charcoal/60 dark:text-gray-400">
                No essays available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {essays
                .sort(
                  (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
                )
                .map((post) => (
                  <Link className="group block" href={`/blog/posts/${post.slug}`} key={post.id}>
                    <PostCard post={post} />
                  </Link>
                ))}
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching essays:", error);

    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="font-bold text-4xl text-charcoal dark:text-white">Essays</h1>
            <p className="max-w-2xl text-charcoal/80 text-lg dark:text-gray-300">
              Thoughtful explorations on human-AI collaboration.
            </p>
          </div>
          <div className="py-12 text-center">
            <p className="text-charcoal/60 dark:text-gray-400">
              Unable to load essays. Please try again later.
            </p>
          </div>
        </div>
      </main>
    );
  }
}
