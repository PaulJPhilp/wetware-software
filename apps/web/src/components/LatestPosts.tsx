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
  import("@/components/PostListItem").then((mod) => ({ default: mod.PostListItem }))
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
  const latestPosts = posts.slice(0, maxPosts);

  useEffect(() => {
    setView(defaultView); // Set the actual default view after hydration
  }, [defaultView]);

  return (
    <div className={`mx-auto w-full max-w-full space-y-4 ${className || ""}`} data-testid={testId}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="font-bold font-sans text-foreground text-xl leading-tight">
            Latest Posts
          </h2>
          <p className="text-muted-foreground text-sm leading-tight">
            Recent explorations in technology and human systems
          </p>
        </div>
        {showViewToggle && (
          <div className="flex items-center gap-2 sm:mt-1">
            <div className="inline-flex overflow-hidden rounded-md border border-orange">
              <button
                aria-pressed={view === "card"}
                className={`flex h-8 items-center gap-2 px-2 py-1 text-sm ${view === "card" ? "bg-orange text-primary-foreground" : "text-orange"}`}
                onClick={() => setView("card")}
                type="button"
              >
                <LayoutGrid className="h-4 w-4" /> Cards
              </button>
              <button
                aria-pressed={view === "list"}
                className={`flex h-8 items-center gap-2 px-2 py-1 text-sm ${view === "list" ? "bg-orange text-primary-foreground" : "text-orange"}`}
                onClick={() => setView("list")}
                type="button"
              >
                <List className="h-4 w-4" /> List
              </button>
            </div>
          </div>
        )}
      </div>

      {view === "card" ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2">
          {latestPosts.map((post) => (
            <Link className="group block" href={`/posts/${post.slug}`} key={post.id}>
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col overflow-hidden overflow-x-auto rounded-md">
          <div
            className="grid min-w-[800px] gap-2 bg-muted/40 px-1 pt-2 pb-1 font-medium text-[11px] text-muted-foreground uppercase tracking-[0.08em]"
            style={{ gridTemplateColumns: "1fr 1fr 110px 90px 72px" }}
          >
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
          <div className="min-w-[800px]">
            {latestPosts.map((post) => (
              <Link className="group block" href={`/posts/${post.slug}`} key={post.id}>
                <PostListItem post={post} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
