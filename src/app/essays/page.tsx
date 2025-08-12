import { PostCard } from "@/components/PostCard";
import { getPostsByType } from "@/lib/notion-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essays - Wetware & Software",
  description:
    "Thoughtful essays exploring the intersection of human systems and artificial intelligence.",
};

export default async function EssaysPage() {
  try {
    const essays = (await getPostsByType("Essay")).filter((post) => {
      const slug = post.slug?.toLowerCase?.() ?? "";
      const title = post.name?.toLowerCase?.() ?? "";
      return !slug.includes("about") && !title.includes("about");
    });

    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-xl font-sans font-bold text-charcoal leading-tight">Essays</h1>
            <p className="text-xs text-charcoal/80 max-w-2xl leading-snug">
              Thoughtful explorations and reflections on the intersection of human systems and
              artificial intelligence, examining both the technical and philosophical implications
              of our evolving relationship with technology.
            </p>
          </div>

          {essays.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-charcoal/60">No essays available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {essays
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
    console.error("Error fetching essays:", error);

    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-charcoal">Essays</h1>
            <p className="text-lg text-charcoal/80 max-w-2xl">
              Thoughtful explorations on human-AI collaboration.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-charcoal/60">Unable to load essays. Please try again later.</p>
          </div>
        </div>
      </main>
    );
  }
}
