"use client";

import { PostCard } from "@/components/PostCard";
import { PostListItem } from "@/components/PostListItem";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/notion-utils";
import { LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LatestPostsProps {
  posts: Post[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  const [view, setView] = useState<"card" | "list">("card");
  const latestPosts = posts.slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-[14px] font-sans font-bold text-foreground dark:text-white leading-tight">
            Latest Posts
          </h2>
          <p className="text-[11px] text-muted-foreground dark:text-white leading-tight">
            Recent explorations in technology and human systems
          </p>
        </div>
        <div className="flex items-center gap-2 sm:mt-1">
          <div className="inline-flex rounded-md border border-orange overflow-hidden">
            <button
              type="button"
              onClick={() => setView("card")}
              aria-pressed={view === "card"}
              className={`flex items-center gap-1 px-1 py-0.5 text-[9px] h-4 ${view === "card" ? "bg-orange text-white" : "text-orange"}`}
            >
              <LayoutGrid className="w-2 h-2" /> Cards
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              className={`flex items-center gap-1 px-1 py-0.5 text-[9px] h-4 ${view === "list" ? "bg-orange text-white" : "text-orange"}`}
            >
              <List className="w-2 h-2" /> List
            </button>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 lg:space-x-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-orange text-orange hover:bg-orange hover:text-white text-[9px] px-1 py-0.5 h-4 min-w-0"
            >
              <Link href="/essays">Essays</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-orange text-orange hover:bg-orange hover:text-white text-[9px] px-1 py-0.5 h-4 min-w-0"
            >
              <Link href="/articles">Articles</Link>
            </Button>
          </div>
        </div>
      </div>

      {view === "card" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="block group">
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col rounded-md border border-border overflow-hidden">
          <div className="grid grid-cols-[110px_1fr_90px_1fr_60px] items-center gap-2 px-1 py-0.5 h-6 bg-muted/40 text-[11px] leading-none text-muted-foreground">
            <div>Date</div>
            <div>Title</div>
            <div>Type</div>
            <div>Series</div>
            <div className="text-right">Read</div>
          </div>
          <div className="divide-y divide-border">
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
