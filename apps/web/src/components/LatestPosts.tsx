"use client";

import { PostCard } from "@/components/PostCard";
import type { BaseComponentProps } from "@/lib/component-types";
import type { Post } from "@/lib/notion-utils";
import { LayoutGrid, List } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect } from "react";

// Lazy load PostListItem since it's only used in list view
const PostListItem = dynamic(() =>
  import("@/components/PostListItem").then((mod) => ({ default: mod.PostListItem })),
);

type LatestPost = Post & {
  seriesName?: string;
};

interface LatestPostsProps extends BaseComponentProps {
  /** Posts to display */
  posts: LatestPost[];
  /** Maximum number of posts to show */
  maxPosts?: number;
  /** Default view mode */
  defaultView?: "card" | "list";
  /** Whether to show view toggle */
  showViewToggle?: boolean;
}

export function LatestPosts({
  posts,
  maxPosts = 10,
  defaultView = "card",
  showViewToggle = true,
  className,
  testId,
}: LatestPostsProps) {
  const [view, setView] = useState<"card" | "list">("card"); // Always start with card view
  const [isHydrated, setIsHydrated] = useState(false);
  const latestPosts = posts.slice(0, maxPosts);

  useEffect(() => {
    setIsHydrated(true);
    setView(defaultView); // Set the actual default view after hydration
  }, [defaultView]);

  return (
    <div className={`space-y-4 w-full max-w-full mx-auto ${className || ""}`} data-testid={testId}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-sans font-bold text-foreground leading-tight">
            Latest Posts
          </h2>
          <p className="text-sm text-muted-foreground leading-tight">
            Recent explorations in technology and human systems
          </p>
        </div>
        {showViewToggle && (
          <div className="flex items-center gap-2 sm:mt-1">
            <div className="inline-flex rounded-md border border-orange overflow-hidden">
              <button
                type="button"
                onClick={() => setView("card")}
                aria-pressed={view === "card"}
                className={`flex items-center gap-2 px-2 py-1 text-sm h-8 ${view === "card" ? "bg-orange text-primary-foreground" : "text-orange"}`}
              >
                <LayoutGrid className="w-4 h-4" /> Cards
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                className={`flex items-center gap-2 px-2 py-1 text-sm h-8 ${view === "list" ? "bg-orange text-primary-foreground" : "text-orange"}`}
              >
                <List className="w-4 h-4" /> List
              </button>
            </div>
          </div>
        )}
      </div>

      {view === "card" ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="block group">
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col rounded-md overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_110px_90px_72px] gap-2 px-1 pt-2 pb-1 bg-muted/40 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            <div className="flex flex-col">
              <span className="leading-none">Title</span>
              <span className="mt-1 h-px bg-muted" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none">Series</span>
              <span className="mt-1 h-px bg-muted" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none">Date</span>
              <span className="mt-1 h-px bg-muted" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none">Type</span>
              <span className="mt-1 h-px bg-muted" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none">Read</span>
              <span className="mt-1 h-px bg-muted" />
            </div>
          </div>
          <div>
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}`} className="block group">
                <PostListItem post={post} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
