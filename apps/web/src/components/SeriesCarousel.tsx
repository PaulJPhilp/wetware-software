"use client";

import SeriesCard from "@/components/SeriesCard";
import type { BaseComponentProps } from "@/lib/component-types";
import type { Series } from "@/lib/notion-utils";
import { cn } from "@/lib/utils";
import type React from "react";

interface SeriesCarouselProps extends BaseComponentProps {
  /** Array of series to display */
  series: Series[];
  /** Optional title for the carousel section */
  title?: string;
  /** Optional description for the carousel section */
  description?: string;
  /** Number of slides to show at once (responsive) */
  slidesToShow?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Whether to enable auto-play */
  autoPlay?: boolean;
  /** Auto-play interval in milliseconds */
  autoPlayInterval?: number;
  /** Custom className for individual series cards */
  cardClassName?: string;
  /** Whether to show series description in cards */
  showDescription?: boolean;
  /** Whether to show article count in cards */
  showArticleCount?: boolean;
  /** Priority loading for images */
  imagePriority?: boolean;
}

/**
 * SeriesCarousel Component
 * A horizontal carousel for displaying series with navigation controls
 */
export const SeriesCarousel: React.FC<SeriesCarouselProps> = ({
  series,
  title,
  description,
  slidesToShow = {
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  autoPlay = false,
  autoPlayInterval = 5000,
  cardClassName,
  showDescription = true,
  showArticleCount = true,
  imagePriority = false,
  className,
  testId,
}) => {
  // Generate responsive classes for slides per view
  const _getResponsiveClasses = () => {
    return cn(
      "min-w-0", // Ensure items can shrink
      slidesToShow.base === 1 && "w-full",
      slidesToShow.base === 2 && "w-1/2",
      slidesToShow.sm === 2 && "sm:w-1/2",
      slidesToShow.sm === 3 && "sm:w-1/3",
      slidesToShow.md === 2 && "md:w-1/2",
      slidesToShow.md === 3 && "md:w-1/3",
      slidesToShow.md === 4 && "md:w-1/4",
      slidesToShow.lg === 2 && "lg:w-1/2",
      slidesToShow.lg === 3 && "lg:w-1/3",
      slidesToShow.lg === 4 && "lg:w-1/4",
      slidesToShow.lg === 5 && "lg:w-1/5",
      slidesToShow.xl === 5 && "xl:w-1/5"
    );
  };

  // Carousel options
  const _carouselOptions = {
    align: "start" as const,
    loop: false,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 0px)": { slidesToScroll: slidesToShow.base || 1 },
      "(min-width: 640px)": { slidesToScroll: slidesToShow.sm || slidesToShow.base || 1 },
      "(min-width: 768px)": {
        slidesToScroll: slidesToShow.md || slidesToShow.sm || slidesToShow.base || 1,
      },
      "(min-width: 1024px)": {
        slidesToScroll:
          slidesToShow.lg || slidesToShow.md || slidesToShow.sm || slidesToShow.base || 1,
      },
      "(min-width: 1280px)": {
        slidesToScroll:
          slidesToShow.xl ||
          slidesToShow.lg ||
          slidesToShow.md ||
          slidesToShow.sm ||
          slidesToShow.base ||
          1,
      },
    },
    ...(autoPlay && {
      autoplay: true,
      autoplayDelay: autoPlayInterval,
    }),
  };

  if (series.length === 0) {
    return (
      <div className={cn("space-y-4", className)} data-testid={testId}>
        {title && (
          <div className="space-y-2">
            <h2 className="font-bold font-sans text-foreground text-xl leading-tight">{title}</h2>
            {description && (
              <p className="text-muted-foreground text-sm leading-tight">{description}</p>
            )}
          </div>
        )}
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No series available yet. Check back soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-2", className)} data-testid={testId}>
      {/* Header Section */}
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h2 className="font-bold font-sans text-foreground text-xl leading-tight">{title}</h2>
          )}
          {description && (
            <p className="text-muted-foreground text-sm leading-tight">{description}</p>
          )}
        </div>
      )}

      {/* Responsive Grid Container */}
      <div className="relative">
        <div
          className={cn(
            "grid gap-4",
            `grid-cols-${slidesToShow.base || 1}`,
            slidesToShow.sm && `sm:grid-cols-${slidesToShow.sm}`,
            slidesToShow.md && `md:grid-cols-${slidesToShow.md}`,
            slidesToShow.lg && `lg:grid-cols-${slidesToShow.lg}`,
            slidesToShow.xl && `xl:grid-cols-${slidesToShow.xl}`
          )}
        >
          {series.map((seriesItem, index) => (
            <SeriesCard
              className={cardClassName || ""}
              key={seriesItem.id}
              priority={imagePriority && index < 3}
              series={seriesItem}
              showArticleCount={showArticleCount}
              showDescription={showDescription}
              size="sm"
              testId={`carousel-series-${seriesItem.slug}`} // Prioritize first 3 images
              variant="carousel"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesCarousel;
