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
import { Card } from "./ui/card";

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
    if (maxWidth.base) {
      classes.push(`max-w-[${maxWidth.base}]`);
    }
    if (maxWidth.md) {
      classes.push(`md:max-w-[${maxWidth.md}]`);
    }
    if (maxWidth.lg) {
      classes.push(`lg:max-w-[${maxWidth.lg}]`);
    }
    return classes.join(" ");
  };

  // Generate accessible card label
  const getCardAriaLabel = () => {
    if (ariaLabel) {
      return ariaLabel;
    }

    const parts = [`Post: ${post.name}`];
    if (post.focusArea) {
      parts.push(`Focus area: ${post.focusArea}`);
    }
    if (showDescription && post.description) {
      parts.push(
        `Description: ${post.description.slice(0, 100)}${post.description.length > 100 ? "..." : ""}`
      );
    }
    if (post.publishDate) {
      parts.push(`Published: ${post.publishDate}`);
    }

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
    className
  );

  // Generate dynamic classes for line clamping
  const getTitleClampClass = () => {
    if (titleLineClamp === 0) {
      return "";
    }
    return `line-clamp-${titleLineClamp}`;
  };

  const getDescriptionClampClass = () => {
    if (descriptionLineClamp === 0) {
      return "";
    }
    switch (descriptionLineClamp) {
      case 1:
        return "line-clamp-1";
      case 2:
        return "line-clamp-2";
      case 3:
        return "line-clamp-3";
      case 4:
        return "line-clamp-4";
      case 5:
        return "line-clamp-5";
      case 6:
        return "line-clamp-6";
      default:
        return `line-clamp-${descriptionLineClamp}`;
    }
  };

  // Dynamic styles for configurable properties
  const cardStyles = {
    minHeight,
  };

  return (
    <Card
      aria-label={getCardAriaLabel()}
      className={cardClasses}
      data-testid={testId}
      role={interactive ? "button" : "article"}
      style={cardStyles}
      tabIndex={interactive ? 0 : undefined}
    >
      {/* Cover image */}
      {post.coverImage && (
        <div
          aria-label={`Cover image for ${post.name}`}
          // Fallback: ensure the parent has a non-zero height even if Tailwind's aspect utility
          // isn't picked up by the runtime for some reason (prevents Image fill height=0 warning)
          className="-mx-3 -mt-3 relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-charcoal/5"
          role="img"
          style={{ minHeight: 1 }}
        >
          {isNextImageAllowed(post.coverImage) ? (
            <Image
              alt={post.name}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              fill
              onError={() => setImageError(true)}
              onLoad={() => setImageLoading(false)}
              priority={imagePriority}
              sizes={getResponsiveImageSizes()}
              src={post.coverImage}
            />
          ) : (
            <>
              {imageLoading && (
                <div
                  aria-live="polite"
                  className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-200 dark:bg-gray-700"
                >
                  <span aria-hidden="true" className="text-gray-500 text-xs">
                    Loading...
                  </span>
                </div>
              )}
              {imageError ? (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
                  role="alert"
                >
                  <span aria-hidden="true" className="text-gray-500 text-xs">
                    Failed to load image
                  </span>
                </div>
              ) : (
                <Image
                  alt={post.name}
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  fill
                  onError={handleImageError(() => setImageError(true))}
                  onLoad={() => setImageLoading(false)}
                  priority={imagePriority}
                  sizes={getResponsiveImageSizes()}
                  src={post.coverImage}
                  unoptimized
                />
              )}
            </>
          )}
        </div>
      )}

      {/* Content container with proper spacing */}
      <div className="flex flex-1 flex-col justify-center space-y-1">
        {/* Header section */}
        <div className="flex items-center gap-1.5">
          <span
            aria-label={`Focus area: ${post.focusArea}`}
            className="flex-shrink-0"
            role="img"
            title={post.focusArea}
          >
            <FocusIcon aria-hidden="true" className="h-5 w-5 text-orange" />
          </span>
          <h2
            className={cn(
              "flex-1 font-bold font-sans text-base transition-colors group-hover:text-orange",
              getTitleClampClass()
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
              aria-describedby={`post-title-${post.id}`}
              className={cn(
                "text-muted-foreground text-sm leading-snug",
                getDescriptionClampClass()
              )}
              id={`post-description-${post.id}`}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: descriptionLineClamp,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.description}
            </p>
          </div>
        )}
      </div>

      {/* Footer section with controlled spacing */}
      <div
        className={cn(
          "flex items-center justify-between text-muted-foreground text-xs",
          spacing.descriptionToFooter
        )}
      >
        {showTags && post.tags && post.tags.length > 0 && (
          <fieldset className="flex items-center space-x-0.5">
            <legend className="sr-only">Tags for {post.name}</legend>
            <div className="space-x-0.5">
              {post.tags.slice(0, maxTags).map((tag, _index) => (
                <CustomTag
                  aria-label={`Tag: ${tag.name}`}
                  className="px-0.5 py-0.5 font-sans text-xs"
                  key={tag.name}
                  role="listitem"
                >
                  {tag.name}
                </CustomTag>
              ))}
              {post.tags.length > maxTags && (
                <span
                  className="ml-1 text-muted-foreground text-xs"
                  title={`${post.tags.length - maxTags} additional tags not shown`}
                >
                  +{post.tags.length - maxTags} more
                </span>
              )}
            </div>
          </fieldset>
        )}
        <time className="text-muted-foreground text-xs italic" dateTime={post.publishDate}>
          {post.publishDate}
        </time>
      </div>
    </Card>
  );
}
