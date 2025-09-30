"use client";

import { CustomTag } from "@/components/CustomTag";
import type { CardComponentProps } from "@/lib/component-types";
import { focusAreaIcons } from "@/lib/icons";
import { getResponsiveImageSizes, handleImageError, isNextImageAllowed } from "@/lib/image-utils";
import type { Post } from "@/lib/notion-utils";
import { cn } from "@/lib/utils";
import { Brain } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

interface PostCardProps extends CardComponentProps {
  /** Post data to display */
  post: Post;
  /** Whether to show the description */
  showDescription?: boolean;
  /** Whether to show tags */
  showTags?: boolean;
  /** Maximum number of tags to display */
  maxTags?: number;
  /** Minimum height for the card */
  minHeight?: string;
  /** Maximum width constraints for responsive design */
  maxWidth?: {
    base?: string;
    md?: string;
    lg?: string;
  };
  /** Number of lines to clamp for title (0 = no clamp) */
  titleLineClamp?: number;
  /** Number of lines to clamp for description (0 = no clamp) */
  descriptionLineClamp?: number;
  /** Image loading priority */
  imagePriority?: boolean;
  /** Whether the card is interactive/clickable */
  interactive?: boolean;
  /** ARIA label for the card */
  ariaLabel?: string;
  /** Spacing configuration for card sections */
  spacing?: {
    /** Gap between header and description */
    headerToDescription?: string;
    /** Gap between description and footer */
    descriptionToFooter?: string;
    /** Internal padding for card sections */
    sectionPadding?: string;
  };
}

export function PostCard({
  post,
  className,
  testId,
  hoverable = true,
  showDescription = true,
  showTags = true,
  maxTags = 3,
  minHeight = "200px",
  maxWidth = {
    base: "16rem", // max-w-64
    md: "20rem", // max-w-80
    lg: "24rem", // max-w-96
  },
  titleLineClamp = 2,
  descriptionLineClamp = 3,
  imagePriority = false,
  interactive = false,
  ariaLabel,
  spacing = {
    headerToDescription: "gap-1",
    descriptionToFooter: "gap-1",
    sectionPadding: "p-3",
  },
}: PostCardProps) {
  const FocusIcon = focusAreaIcons[post.focusArea] || Brain;
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Convert maxWidth values to Tailwind classes or custom styles
  const getMaxWidthClasses = () => {
    const classes = [];
    if (maxWidth.base) classes.push(`max-w-[${maxWidth.base}]`);
    if (maxWidth.md) classes.push(`md:max-w-[${maxWidth.md}]`);
    if (maxWidth.lg) classes.push(`lg:max-w-[${maxWidth.lg}]`);
    return classes.join(" ");
  };

  // Generate accessible card label
  const getCardAriaLabel = () => {
    if (ariaLabel) return ariaLabel;

    const parts = [`Post: ${post.name}`];
    if (post.focusArea) parts.push(`Focus area: ${post.focusArea}`);
    if (showDescription && post.description) {
      parts.push(
        `Description: ${post.description.slice(0, 100)}${post.description.length > 100 ? "..." : ""}`,
      );
    }
    if (post.publishDate) parts.push(`Published: ${post.publishDate}`);

    return parts.join(". ");
  };

  // Compute card classes for better readability
  const cardClasses = cn(
    // Base layout and structure
    "group relative flex flex-col",
    spacing.sectionPadding,
    // Borders and colors
    "border-gray-300 dark:border-gray-400",
    // Transitions and sizing
    "transition-colors duration-200",
    "w-full",
    getMaxWidthClasses(),
    // Hover effects
    hoverable && "hover:border-orange hover:shadow-lg",
    // Focus indicators for interactive cards
    interactive && [
      "focus-within:ring-2 focus-within:ring-orange focus-within:ring-offset-2",
      "focus-within:border-orange",
      "cursor-pointer",
    ],
    // Custom classes
    className,
  );

  // Generate dynamic classes for line clamping
  const getTitleClampClass = () => {
    if (titleLineClamp === 0) return "";
    return `line-clamp-${titleLineClamp}`;
  };

  const getDescriptionClampClass = () => {
    if (descriptionLineClamp === 0) return "";
    switch (descriptionLineClamp) {
      case 1: return "line-clamp-1";
      case 2: return "line-clamp-2";
      case 3: return "line-clamp-3";
      case 4: return "line-clamp-4";
      case 5: return "line-clamp-5";
      case 6: return "line-clamp-6";
      default: return `line-clamp-${descriptionLineClamp}`;
    }
  };

  // Dynamic styles for configurable properties
  const cardStyles = {
    minHeight,
  };

  return (
    <Card
      className={cardClasses}
      style={cardStyles}
      data-testid={testId}
      role={interactive ? "button" : "article"}
      aria-label={getCardAriaLabel()}
      tabIndex={interactive ? 0 : undefined}
    >
      {/* Cover image */}
      {post.coverImage && (
        <div
          className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal/5 rounded-t-lg -mx-3 -mt-3 mb-3"
          // Fallback: ensure the parent has a non-zero height even if Tailwind's aspect utility
          // isn't picked up by the runtime for some reason (prevents Image fill height=0 warning)
          style={{ minHeight: 1 }}
          role="img"
          aria-label={`Cover image for ${post.name}`}
        >
          {isNextImageAllowed(post.coverImage) ? (
            <Image
              src={post.coverImage}
              alt={post.name}
              fill
              sizes={getResponsiveImageSizes()}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              priority={imagePriority}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageError(true)}
            />
          ) : (
            <>
              {imageLoading && (
                <div
                  className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center"
                  aria-live="polite"
                  aria-label="Loading image"
                >
                  <span className="text-xs text-gray-500" aria-hidden="true">
                    Loading...
                  </span>
                </div>
              )}
              {imageError ? (
                <div
                  className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                  role="alert"
                  aria-label="Failed to load image"
                >
                  <span className="text-xs text-gray-500" aria-hidden="true">
                    Failed to load image
                  </span>
                </div>
              ) : (
                <img
                  src={post.coverImage}
                  alt={post.name}
                  className="block w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  onLoad={() => setImageLoading(false)}
                  onError={handleImageError(() => setImageError(true))}
                />
              )}
            </>
          )}
        </div>
      )}
      
      {/* Content container with proper spacing */}
      <div className="flex flex-col flex-1 justify-center space-y-1">
        {/* Header section */}
        <div className="flex items-center gap-1.5">
          <span
            className="flex-shrink-0"
            role="img"
            aria-label={`Focus area: ${post.focusArea}`}
            title={post.focusArea}
          >
            <FocusIcon className="w-5 h-5 text-orange" aria-hidden="true" />
          </span>
          <h2
            className={cn(
              "text-base font-sans font-bold group-hover:text-orange transition-colors flex-1",
              getTitleClampClass(),
            )}
            id={`post-title-${post.id}`}
          >
            {post.name}
          </h2>
        </div>
        
        {/* Description section */}
        {showDescription && (
          <div>
            <p
              className={cn(
                "text-sm text-muted-foreground leading-snug",
                getDescriptionClampClass(),
              )}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: descriptionLineClamp,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
              id={`post-description-${post.id}`}
              aria-describedby={`post-title-${post.id}`}
            >
              {post.description}
            </p>
          </div>
        )}
      </div>
      
      {/* Footer section with controlled spacing */}
      <div className={cn("flex items-center justify-between text-xs text-muted-foreground", spacing.descriptionToFooter)}>
        {showTags && post.tags && post.tags.length > 0 && (
          <div
            className="flex items-center space-x-0.5"
            role="group"
            aria-label={`Tags for ${post.name}`}
          >
            <div className="space-x-0.5">
              {post.tags.slice(0, maxTags).map((tag, _index) => (
                <CustomTag
                  key={tag.name}
                  className="font-sans text-xs px-0.5 py-0.5"
                  role="listitem"
                  aria-label={`Tag: ${tag.name}`}
                >
                  {tag.name}
                </CustomTag>
              ))}
              {post.tags.length > maxTags && (
                <span
                  className="text-xs text-muted-foreground ml-1"
                  aria-label={`${post.tags.length - maxTags} additional tags not shown`}
                >
                  +{post.tags.length - maxTags} more
                </span>
              )}
            </div>
          </div>
        )}
        <time
          className="text-xs text-muted-foreground italic"
          dateTime={post.publishDate}
          aria-label={`Published on ${post.publishDate}`}
        >
          {post.publishDate}
        </time>
      </div>
    </Card>
  );
}
