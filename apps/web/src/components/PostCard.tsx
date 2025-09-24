// Uniform tag color for all badges to maintain consistent branding
const uniformTagColor = "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

import { Badge } from "@/components/ui/badge";
import { focusAreaIcons } from "@/lib/icons";
import type { Post } from "@/lib/notion-utils";
import { Brain } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card-noslot";

export function PostCard({ post }: { post: Post }) {
  const FocusIcon = focusAreaIcons[post.focusArea] || Brain;

  // Match apps/web/next.config.ts images.remotePatterns
  const isNextImageAllowed = (url: string): boolean => {
    try {
      const u = new URL(url);
      if (u.protocol !== "https:") return false;
      const host = u.hostname.toLowerCase();
      return (
        host === "prod-files-secure.s3.us-west-2.amazonaws.com" ||
        host === "s3.us-west-2.amazonaws.com" ||
        host === "notion.so" ||
        host === "www.notion.so"
      );
    } catch {
      // Likely a relative path (public asset) which is fine
      return true;
    }
  };

  return (
    <Card className="group relative flex flex-col justify-between px-1 py-1 gap-0 border-gray-300 dark:border-gray-400 hover:border-orange transition-colors duration-200 hover:shadow-lg min-h-[200px] w-full max-w-64 md:max-w-80 lg:max-w-96">
      {/* Cover image */}
      {post.coverImage && (
        <div
          className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal/5 rounded-t-lg"
          // Fallback: ensure the parent has a non-zero height even if Tailwind's aspect utility
          // isn't picked up by the runtime for some reason (prevents Image fill height=0 warning)
          style={{ minHeight: 1 }}
        >
          {isNextImageAllowed(post.coverImage) ? (
            <Image
              src={post.coverImage}
              alt={post.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              priority={false}
            />
          ) : (
            <img
              src={post.coverImage}
              alt={post.name}
              className="block w-full h-full object-cover"
            />
          )}
        </div>
      )}
      <CardHeader className="space-y-0 pb-0 py-0 px-1">
        <div className="h-12 flex items-center gap-2">
          <span title={post.focusArea} className="flex-shrink-0">
            <FocusIcon className="w-5 h-5 text-orange" />
          </span>
          <h2 className="text-base font-sans font-bold group-hover:text-orange transition-colors line-clamp-2 flex-1">
            {post.name}
          </h2>
        </div>
      </CardHeader>
      <CardContent className="py-0 px-1">
        <div className="h-[2rem] mb-0">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-snug m-0">
            {post.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground py-0 px-1 -mt-3">
        <div className="flex items-center space-x-0.5">
          <div className="space-x-0.5">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag.name}
                variant="outline"
                className={`font-sans text-xs px-0.5 py-0.5 ${uniformTagColor}`}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
        <time className="text-[10px] text-muted-foreground italic">{post.publishDate}</time>
      </CardFooter>
    </Card>
  );
}
