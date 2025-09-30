"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { ImageWithFallback } from "@/lib/image-utils";
import type { Series } from "@/lib/notion-utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import type React from "react";

interface SeriesCardProps {
  /** Series data */
  series: Series;
  /** Custom className for additional styling */
  className?: string;
  /** Show series description */
  showDescription?: boolean;
  /** Show article count */
  showArticleCount?: boolean;
  /** Priority loading for images */
  priority?: boolean;
}

/**
 * SeriesCard Component
 * A focused series card for grid layouts on the series page
 */
export const SeriesCard: React.FC<SeriesCardProps> = ({
  series,
  className = "",
  showDescription = true,
  showArticleCount = true,
  priority = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Get theme-aware cover image
  const coverImage =
    series.imageUrl ||
    (isDark ? series.coverDark || series.coverLight : series.coverLight || series.coverDark) ||
    "/images/series/FriendlyPanda.png";
  const seriesHref = `/series/${series.slug}`;
  const articleCount = series.postCount || 0;

  return (
    <Link href={seriesHref}>
      <Card
        className={`group h-full hover:shadow-lg transition-all duration-200 border-charcoal/20 overflow-hidden ${className}`}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal/5">
          <ImageWithFallback
            src={coverImage}
            alt={`${series.name} series cover`}
            width={300}
            height={200}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
            priority={priority}
          />
        </div>
        <CardHeader className="space-y-3">
          <h3 className="font-bold text-lg group-hover:text-orange transition-colors line-clamp-2">
            {series.name}
          </h3>
          {showDescription && series.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{series.description}</p>
          )}
        </CardHeader>
        {showArticleCount && (
          <CardFooter className="pt-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{articleCount} articles</span>
              {series.focusArea && (
                <>
                  <span>•</span>
                  <span>{series.focusArea}</span>
                </>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};

export default SeriesCard;
