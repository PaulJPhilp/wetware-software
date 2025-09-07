import type { Post } from "@/lib/notion-utils";

interface PostListItemProps {
  post: Post;
}

export function PostListItem({ post }: PostListItemProps) {
  return (
    <div className="grid grid-cols-[1fr_110px_90px_1fr_60px] items-center gap-2 px-1 py-0 h-6 hover:bg-muted/40 transition-colors">
      <div className="min-w-0 flex items-center h-6">
        <h5 className="m-0 truncate text-xs leading-none font-sans group-hover:text-orange transition-colors">
          {post.name}
        </h5>
      </div>
      <time className="inline-flex items-center h-6 text-xs leading-none text-muted-foreground whitespace-nowrap">
        {post.publishDate}
      </time>

      <div className="inline-flex items-center h-6 text-xs leading-none text-muted-foreground dark:text-white/80 whitespace-nowrap">
        {post.type}
      </div>
      <div className="inline-flex items-center h-6 text-xs leading-none text-orange truncate">
        {post.seriesName
          ? post.partNumber
            ? `${post.seriesName} • Part ${post.partNumber}`
            : post.seriesName
          : ""}
      </div>
      <div className="inline-flex items-center justify-end h-6 text-xs leading-none text-muted-foreground text-right whitespace-nowrap">
        {post.readTime}m
      </div>
    </div>
  );
}
