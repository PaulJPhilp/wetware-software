import { AuthorBioSidebar } from "@/components/AuthorBioSidebar";
import { ClientOnly } from "@/components/ClientOnly";
import { NotionContent } from "@/components/NotionContent";
import { PostCard } from "@/components/PostCard";
import { Badge } from "@/components/ui/badge";
import { focusAreaIcons } from "@/lib/icons";
import { getPostBySlug, getPostContent, getPublishedPosts } from "@/lib/notion-utils";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Brain } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";

// Lazy load SeriesNavigation since it's only needed for posts in series
const SeriesNavigation = dynamic(() =>
  import("@/components/SeriesNavigation").then((mod) => ({ default: mod.SeriesNavigation }))
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.name,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blocks = await getPostContent(post.id);
  const FocusIcon = focusAreaIcons[post.focusArea] || Brain; // Fallback to Brain if focus area not found

  // Get series posts if this post is part of a series
  const seriesPosts = post.seriesId
    ? await getPublishedPosts().then((posts) => posts.filter((p) => p.seriesId === post.seriesId))
    : [];

  // Get related posts (same focus area, excluding current post)
  const relatedPosts = await getPublishedPosts().then((posts) =>
    posts.filter((p) => p.focusArea === post.focusArea && p.id !== post.id).slice(0, 3)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Content */}
        <div className="min-w-0 flex-1 space-y-8 lg:order-2">
          {/* Series Navigation */}
          {post.seriesId && seriesPosts.length > 1 && (
            <SeriesNavigation currentPost={post} seriesPosts={seriesPosts} />
          )}

          <article className="space-y-8 rounded-xl bg-card p-6 shadow-lg">
            {/* Header */}
            <header className="space-y-4 border-card border-b pb-4 text-center">
              <div className="mb-2 flex items-center justify-center gap-4">
                <Badge className="px-3 py-1 font-sans text-base" variant="secondary">
                  {post.type}
                </Badge>
                <FocusIcon className="h-6 w-6 text-orange" />
              </div>
              <h1 className="fluid-h1 mb-2 font-bold">{post.name}</h1>
              <div className="mb-2 flex flex-wrap items-center justify-center gap-4 text-muted text-sm">
                <time>{post.publishDate}</time>
                <span>•</span>
                <span>{post.readTime} min read</span>
                <span>•</span>
                <span>Last updated: {post.publishDate}</span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2 text-charcoal/60 text-sm">
                  {post.tags.map((tag) => (
                    <span
                      className="rounded bg-silver px-2 py-1 transition-colors hover:text-orange"
                      key={tag.name}
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Content */}
            <section className="prose">
              <div className="space-y-6">
                <NotionContent blocks={blocks.results as BlockObjectResponse[]} />
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t pt-8">
              <div className="mb-8 flex justify-center">
                <Link
                  className="rounded-lg bg-silver px-4 py-2 font-sans text-charcoal/60 text-sm shadow transition-colors hover:text-orange"
                  href="/"
                >
                  ← Back to all posts
                </Link>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-8">
                  <h3 className="fluid-h3 mb-6 text-center font-bold text-charcoal">
                    More on {post.focusArea}
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        className="group block"
                        href={`/posts/${relatedPost.slug}`}
                        key={relatedPost.id}
                      >
                        <ClientOnly>
                          <PostCard interactive post={relatedPost} />
                        </ClientOnly>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </footer>
          </article>
        </div>

        {/* Author Bio Sidebar */}
        <aside className="w-full lg:order-1 lg:w-80 lg:flex-shrink-0">
          <AuthorBioSidebar />
        </aside>
      </div>
    </div>
  );
}
