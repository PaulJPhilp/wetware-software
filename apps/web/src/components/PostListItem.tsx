import type { Post } from "@/lib/notion-utils";

interface PostListItemProps {
  post: Post;
}

export function PostListItem({ post }: PostListItemProps) {
  return (
    <div className="grid grid-cols-[110px_1fr_90px_1fr_60px] items-center gap-2 px-1 py-0 h-6 hover:bg-muted/40 transition-colors">
      <time className="inline-flex items-center h-6 text-[11px] leading-none text-muted-foreground whitespace-nowrap">
        {post.publishDate}
      </time>
      <div className="min-w-0 flex items-center h-6">
        <h3 className="m-0 truncate text-[14px] leading-none font-sans font-bold group-hover:text-orange transition-colors">
          {post.name}
        </h3>
      </div>
      <div className="inline-flex items-center h-6 text-[11px] leading-none text-muted-foreground dark:text-white/80 whitespace-nowrap">
        {post.type}
      </div>
      <div className="inline-flex items-center h-6 text-[11px] leading-none text-orange truncate">
        {post.seriesName
          ? post.partNumber
            ? `${post.seriesName} • Part ${post.partNumber}`
            : post.seriesName
          : ""}
      </div>
      <div className="inline-flex items-center justify-end h-6 text-[11px] leading-none text-muted-foreground text-right whitespace-nowrap">
        {post.readTime}m
      </div>
    </div>
  );
}
