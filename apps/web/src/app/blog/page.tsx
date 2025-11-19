import { Button } from "@wetware/design-system";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Wetware & Software",
  description:
    "Explore articles, essays, and resources on AI systems, " +
    "software engineering, and human-AI collaboration.",
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="font-bold font-sans text-4xl text-foreground">
            Blog
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Deep dives on sound AI systems, software engineering, and
            the practices that keep production systems upright.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Articles */}
          <article className="flex flex-col rounded-lg border border-subtle bg-elevated p-6 shadow-xs">
            <div className="mb-4 space-y-2">
              <h2 className="font-bold font-sans text-xl text-foreground">
                Articles
              </h2>
              <p className="text-sm text-muted-foreground">
                Technical deep dives on software engineering, AI
                development, and implementation patterns.
              </p>
            </div>
            <Button asChild className="mt-auto" variant="outline">
              <Link href="/blog/articles">
                Browse Articles
              </Link>
            </Button>
          </article>

          {/* Essays */}
          <article className="flex flex-col rounded-lg border border-subtle bg-elevated p-6 shadow-xs">
            <div className="mb-4 space-y-2">
              <h2 className="font-bold font-sans text-xl text-foreground">
                Essays
              </h2>
              <p className="text-sm text-muted-foreground">
                Thoughtful explorations on the intersection of human
                systems and artificial intelligence.
              </p>
            </div>
            <Button asChild className="mt-auto" variant="outline">
              <Link href="/blog/essays">
                Browse Essays
              </Link>
            </Button>
          </article>

          {/* Series */}
          <article className="flex flex-col rounded-lg border border-subtle bg-elevated p-6 shadow-xs">
            <div className="mb-4 space-y-2">
              <h2 className="font-bold font-sans text-xl text-foreground">
                Series
              </h2>
              <p className="text-sm text-muted-foreground">
                Multi-part explorations and comprehensive guides on
                complex topics.
              </p>
            </div>
            <Button asChild className="mt-auto" variant="outline">
              <Link href="/blog/series">
                Browse Series
              </Link>
            </Button>
          </article>
        </div>
      </div>
    </main>
  );
}
