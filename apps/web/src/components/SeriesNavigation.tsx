import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/notion-utils";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import Link from "next/link";

interface SeriesNavigationProps {
  currentPost: Post;
  seriesPosts: Post[];
}

export function SeriesNavigation({ currentPost, seriesPosts }: SeriesNavigationProps) {
  if (!currentPost.seriesId || !currentPost.seriesName || seriesPosts.length <= 1) {
    return null;
  }

  // Sort posts by part number
  const sortedPosts = seriesPosts.sort((a, b) => (a.partNumber || 0) - (b.partNumber || 0));

  const currentIndex = sortedPosts.findIndex((post) => post.id === currentPost.id);
  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  return (
    <div className="border border-charcoal/20 rounded-lg p-6 bg-charcoal/5">
      <div className="space-y-4">
        {/* Series Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <List className="w-5 h-5 text-orange" />
            <div>
              <Link
                href={`/series/${currentPost.seriesName?.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-lg font-semibold hover:text-orange transition-colors"
              >
                {currentPost.seriesName}
              </Link>
              <p className="text-sm text-charcoal/60">
                Part {currentPost.partNumber} of {seriesPosts.length}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            Series
          </Badge>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          {previousPost ? (
            <Link
              href={`/posts/${previousPost.slug}`}
              className="flex items-center gap-2 p-3 rounded-lg border border-charcoal/20 hover:bg-charcoal/5 transition-colors max-w-[45%]"
            >
              <ChevronLeft className="w-4 h-4 text-orange" />
              <div className="text-left">
                <p className="text-xs text-charcoal/60">Previous</p>
                <p className="text-sm font-medium truncate">{previousPost.name}</p>
              </div>
            </Link>
          ) : (
            <div className="w-[45%]" />
          )}

          {nextPost ? (
            <Link
              href={`/posts/${nextPost.slug}`}
              className="flex items-center gap-2 p-3 rounded-lg border border-charcoal/20 hover:bg-charcoal/5 transition-colors max-w-[45%]"
            >
              <div className="text-right">
                <p className="text-xs text-charcoal/60">Next</p>
                <p className="text-sm font-medium truncate">{nextPost.name}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-orange" />
            </Link>
          ) : (
            <div className="w-[45%]" />
          )}
        </div>

        {/* All Parts List */}
        <div className="pt-4 border-t border-charcoal/20">
          <p className="text-sm font-medium text-charcoal mb-3">All Parts in Series</p>
          <div className="grid gap-2">
            {sortedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className={`flex items-center gap-3 p-2 rounded text-sm transition-colors ${
                  post.id === currentPost.id
                    ? "bg-orange/10 text-orange font-medium"
                    : "hover:bg-charcoal/5 text-charcoal/80"
                }`}
              >
                <span className="flex-shrink-0 w-6 h-6 bg-charcoal/10 rounded-full flex items-center justify-center text-xs">
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
