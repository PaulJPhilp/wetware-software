// Map Notion color names to Tailwind color classes
const notionColorToTailwind: Record<string, string> = {
  // Light mode classes first, then dark mode variants for better contrast
  default: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
  gray: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
  brown: "bg-yellow-900 text-yellow-100 dark:bg-yellow-800 dark:text-yellow-50",
  orange: "bg-orange-200 text-orange-800 dark:bg-orange-700 dark:text-orange-100",
  yellow: "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100",
  green: "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100",
  blue: "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  purple: "bg-purple-200 text-purple-800 dark:bg-purple-700 dark:text-purple-100",
  pink: "bg-pink-200 text-pink-800 dark:bg-pink-700 dark:text-pink-100",
  red: "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100",
};

import { Badge } from "@/components/ui/badge";
import { focusAreaIcons } from "@/lib/icons";
import type { Post } from "@/lib/notion-utils";
import { Brain } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card-noslot";

export function PostCard({ post }: { post: Post }) {
  const FocusIcon = focusAreaIcons[post.focusArea] || Brain;

  return (
    <Card className="group relative flex flex-col px-1 py-1 gap-0 border-charcoal hover:border-orange transition-colors duration-200 hover:shadow-lg min-h-0 w-full">
      {/* Cover image */}
      {post.coverImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal/5 rounded-t-lg">
          <Image
            src={post.coverImage}
            alt={post.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority={false}
          />
        </div>
      )}
      <CardHeader className="space-y-0 pb-0 py-0 px-1">
        <div className="flex items-center space-x-0.5">
          <Badge
            variant="outline"
            className="font-sans text-xs px-1 py-0.5 !bg-silver text-charcoal dark:!bg-white dark:text-black"
          >
            {post.type}
          </Badge>
          <FocusIcon className="w-1.5 h-1.5 text-orange" />
          <time className="text-xs text-muted-foreground">{post.publishDate}</time>
        </div>
        {post.seriesName && post.partNumber && (
          <div className="text-xs text-orange font-medium">
            {post.seriesName} • Part {post.partNumber}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-[1px] py-0 px-1 [&_h2]:mt-0 [&_h2]:mb-0">
        <h2 className="text-sm font-sans font-bold group-hover:text-orange transition-colors line-clamp-2">
          {post.name}
        </h2>
        <p className="text-xs text-muted-foreground line-clamp-3 leading-snug">
          {post.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center space-x-0.5 text-xs text-muted-foreground py-0 pt-1 px-1">
        <div className="flex items-center space-x-0.5">
          <div className="space-x-0.5">
            {post.tags.map((tag) => {
              const colorClass = notionColorToTailwind[tag.color] || notionColorToTailwind.default;
              return (
                <Badge
                  key={tag.name}
                  variant="outline"
                  className={`font-sans text-xs px-0.5 py-0.5 ${colorClass}`}
                >
                  {tag.name}
                </Badge>
              );
            })}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
