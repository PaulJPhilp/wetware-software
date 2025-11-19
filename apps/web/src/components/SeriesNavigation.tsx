import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/notion-utils";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import Link from "next/link";

type SeriesNavigationProps = {
  currentPost: Post;
  seriesPosts: Post[];
};

export function SeriesNavigation({ currentPost, seriesPosts }: SeriesNavigationProps) {
  if (!(currentPost.seriesId && currentPost.seriesName) || seriesPosts.length <= 1) {
    return null;
  }

  // Sort posts by part number
  const sortedPosts = seriesPosts.sort((a, b) => (a.partNumber || 0) - (b.partNumber || 0));

  const currentIndex = sortedPosts.findIndex((post) => post.id === currentPost.id);
  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  return (
    <div className="rounded-lg border border-charcoal/20 bg-charcoal/5 p-6">
      <div className="space-y-4">
        {/* Series Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <List className="h-5 w-5 text-orange" />
            <div>
              <Link
                className="font-semibold text-lg transition-colors hover:text-orange"
                href={`/blog/series/${currentPost.seriesName?.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {currentPost.seriesName}
              </Link>
              <p className="text-charcoal/60 text-sm">
                Part {currentPost.partNumber} of {seriesPosts.length}
              </p>
            </div>
          </div>
          <Badge className="text-xs" variant="secondary">
            Series
          </Badge>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          {previousPost ? (
            <Link
              className="flex max-w-[45%] items-center gap-2 rounded-lg border border-charcoal/20 p-3 transition-colors hover:bg-charcoal/5"
              href={`/blog/posts/${previousPost.slug}`}
            >
              <ChevronLeft className="h-4 w-4 text-orange" />
              <div className="text-left">
                <p className="text-charcoal/60 text-xs">Previous</p>
                <p className="truncate font-medium text-sm">{previousPost.name}</p>
              </div>
            </Link>
          ) : (
            <div className="w-[45%]" />
          )}

          {nextPost ? (
            <Link
              className="flex max-w-[45%] items-center gap-2 rounded-lg border border-charcoal/20 p-3 transition-colors hover:bg-charcoal/5"
              href={`/blog/posts/${nextPost.slug}`}
            >
              <div className="text-right">
                <p className="text-charcoal/60 text-xs">Next</p>
                <p className="truncate font-medium text-sm">{nextPost.name}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-orange" />
            </Link>
          ) : (
            <div className="w-[45%]" />
          )}
        </div>

        {/* All Parts List */}
        <div className="border-charcoal/20 border-t pt-4">
          <p className="mb-3 font-medium text-charcoal text-sm">All Parts in Series</p>
          <div className="grid gap-2">
            {sortedPosts.map((post) => (
              <Link
                className={`flex items-center gap-3 rounded p-2 text-sm transition-colors ${
                  post.id === currentPost.id
                    ? "bg-orange/10 font-medium text-orange"
                    : "text-charcoal/80 hover:bg-charcoal/5"
                }`}
                href={`/blog/posts/${post.slug}`}
                key={post.id}
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-charcoal/10 text-xs">
                  {post.partNumber}
                </span>
                <span className="truncate">{post.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
