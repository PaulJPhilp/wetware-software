"use client";

import { Card } from "@/components/ui/card";
import type { Series } from "@/lib/notion-utils";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { memo } from "react";

interface SeriesCardProps {
  /** Series data */
  series: Series;
  /** Card variant for different layouts */
  variant?: "grid" | "carousel" | "list";
  /** Card size */
  size?: "sm" | "md" | "lg";
  /** Custom className for additional styling */
  className?: string;
  /** Show series description */
  showDescription?: boolean;
  /** Show article count */
  showArticleCount?: boolean;
  /** Priority loading for images */
  priority?: boolean;
  /** Test ID for testing */
  testId?: string;
}

/**
 * SeriesCard Component
 * Unified series card component with responsive design and multiple variants
 */
export const SeriesCard: React.FC<SeriesCardProps> = memo(
  ({
    series,
    variant = "grid",
    size = "md",
    className = "",
    showDescription = true,
    showArticleCount = true,
    priority = false,
    testId,
  }) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    // Get theme-aware cover image
    const coverImage =
      series.imageUrl ||
      (isDark ? series.coverDark || series.coverLight : series.coverLight || series.coverDark) ||
      "/images/series/FriendlyPanda.png";
    const seriesHref = `/series/${series.slug}`;
    const articleCount = series.postCount || 0;

    // Responsive sizing classes
    const getVariantClasses = () => {
      switch (variant) {
        case "carousel":
          return {
            container: "w-full h-40",
            image: "w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24",
            content: "flex-1 min-w-0 px-2 sm:px-3",
            title: "text-xs sm:text-sm font-semibold line-clamp-2",
            description: "text-[10px] line-clamp-2",
            meta: "text-xs",
          };
        case "list":
          return {
            container: "w-full h-auto",
            image: "w-12 h-16 sm:w-16 sm:h-20",
            content: "flex-1 min-w-0 px-3 sm:px-4",
            title: "text-sm sm:text-base font-semibold line-clamp-1",
            description: "text-sm line-clamp-2",
            meta: "text-sm",
          };
        default:
          return {
            container: "w-full h-full",
            image: "w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28",
            content: "flex-1 min-w-0 px-3 sm:px-4",
            title: "text-sm sm:text-base font-semibold line-clamp-2",
            description: "text-sm line-clamp-2",
            meta: "text-sm",
          };
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return {
            container: "h-24 sm:h-28",
            image: "w-12 h-16 sm:w-16 sm:h-20",
            title: "text-xs sm:text-sm",
            description: "text-xs",
            meta: "text-xs",
          };
        case "lg":
          return {
            container: "h-40 sm:h-48",
            image: "w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32",
            title: "text-base sm:text-lg",
            description: "text-sm sm:text-base",
            meta: "text-sm",
          };
        default:
          return {
            container: "h-32 sm:h-36",
            image: "w-16 h-20 sm:w-20 sm:h-24",
            title: "text-sm sm:text-base",
            description: "text-sm",
            meta: "text-sm",
          };
      }
    };

    const variantClasses = getVariantClasses();
    const sizeClasses = getSizeClasses();

    return (
      <Link
        aria-label={`View ${series.name} series`}
        className="block rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
        data-testid={testId}
        href={seriesHref}
      >
        <Card
          className={cn(
            "group h-full gap-0 overflow-hidden border-border p-0 transition-all duration-200 hover:shadow-lg",
            variantClasses.container,
            sizeClasses.container,
            className
          )}
        >
          <div className="flex h-full">
            <div
              className={cn(
                "relative flex-shrink-0 overflow-hidden bg-charcoal/5",
                variantClasses.image,
                sizeClasses.image
              )}
            >
              <Image
                alt={`${series.name} series cover`}
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                fill
                priority={priority}
                sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                src={coverImage}
              />
            </div>
            <div className={cn("flex min-w-0 flex-col justify-center", variantClasses.content)}>
              <h3
                className={cn(
                  "break-words transition-colors group-hover:text-orange",
                  variantClasses.title,
                  sizeClasses.title
                )}
              >
                {series.name}
              </h3>
              {showDescription && series.description && (
                <p
                  className={cn(
                    "mt-1 text-muted-foreground",
                    variantClasses.description,
                    sizeClasses.description
                  )}
                >
                  {series.description}
                </p>
              )}
              {showArticleCount && (
                <div
                  className={cn(
                    "mt-1 flex items-center gap-1 text-muted-foreground",
                    variantClasses.meta,
                    sizeClasses.meta
                  )}
                >
                  <span>{articleCount} articles</span>
                  {series.focusArea && (
                    <>
                      <span>•</span>
                      <span>{series.focusArea}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </Link>
    );
  }
);

SeriesCard.displayName = "SeriesCard";

export default SeriesCard;
