"use client";

import { PostCard } from "@/components/PostCard";
import type { Post } from "@/lib/notion-utils";
import { LayoutGrid, List } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

// Lazy load PostListItem since it's only used in list view
const PostListItem = dynamic(() =>
  import("@/components/PostListItem").then((mod) => ({ default: mod.PostListItem })),
);

type LatestPost = Post & {
  seriesName?: string;
};

interface LatestPostsProps {
  posts: LatestPost[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  const [view, setView] = useState<"card" | "list">("card");
  const latestPosts = posts.slice(0, 10);

  return (
    <div className="space-y-4 w-full max-w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-sans font-bold text-foreground dark:text-white leading-tight">
            Latest Posts
          </h2>
          <p className="text-sm text-muted-foreground dark:text-white leading-tight">
            Recent explorations in technology and human systems
          </p>
        </div>
        <div className="flex items-center gap-2 sm:mt-1">
          <div className="inline-flex rounded-md border border-orange overflow-hidden">
            <button
              type="button"
              onClick={() => setView("card")}
              aria-pressed={view === "card"}
              className={`flex items-center gap-2 px-2 py-1 text-sm h-8 ${view === "card" ? "bg-orange text-white" : "text-orange"}`}
            >
              <LayoutGrid className="w-4 h-4" /> Cards
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              className={`flex items-center gap-2 px-2 py-1 text-sm h-8 ${view === "list" ? "bg-orange text-white" : "text-orange"}`}
            >
              <List className="w-4 h-4" /> List
            </button>
          </div>
        </div>
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
          <div className="grid grid-cols-[1fr_1fr_110px_90px_60px] items-center gap-2 px-1 py-0.5 h-6 bg-muted/40 text-[10px] leading-none text-muted-foreground">
            <div>Title</div>
            <div>Series</div>
            <div>Date</div>
            <div>Type</div>
            <div className="text-right">Read</div>
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
