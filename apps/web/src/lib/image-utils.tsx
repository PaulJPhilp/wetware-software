"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useMemo } from "react";

/**
 * Describes assets that support both light and dark theme covers.
 */
export interface ThemeAwareCover {
  coverLight?: string;
  coverDark?: string;
}

/**
 * Select the correct cover image for the active theme.
 *
 * @param cover - Object exposing light and dark cover URLs.
 * @returns A theme-aware cover URL when available.
 */
export function useThemeAwareCover(cover: ThemeAwareCover): string | undefined {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return useMemo(() => {
    return isDark ? cover.coverDark || cover.coverLight : cover.coverLight || cover.coverDark;
  }, [cover.coverLight, cover.coverDark, isDark]);
}

/**
 * Select the correct cover image outside of React hook contexts.
 *
 * @param cover - Object exposing light and dark cover URLs.
 * @param isDark - Indicates whether the dark theme is active.
 * @returns A theme-aware cover URL when available.
 */
export function getThemeAwareCover(cover: ThemeAwareCover, isDark: boolean): string | undefined {
  return isDark ? cover.coverDark || cover.coverLight : cover.coverLight || cover.coverDark;
}

/**
 * Props consumed by `ImageWithFallback`.
 */
export interface ImageWithFallbackProps {
  src: string | undefined;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholderClassName?: string;
  showPlaceholder?: boolean;
}

// Normalize image srcs coming from Notion text or simple filenames to local public paths
export function normalizeImageSrc(src: string | undefined): string | undefined {
  if (!src) return src;
  try {
    // Rewrite Notion-hosted placeholder paths to local public images
    if (
      src.startsWith("https://www.notion.so/images/") ||
      src.startsWith("https://notion.so/images/")
    ) {
      const last = src.split("/").pop() || src;
      return `/images/${last}`;
    }
    // Already absolute http(s) URL: leave as-is
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    // If it already starts with /images, keep
    if (src.startsWith("/images/")) return src;
    // If it's a root path like "/file.svg", rewrite to "/images/file.svg"
    if (src.startsWith("/") && !src.slice(1).includes("/")) {
      return `/images${src}`;
    }
    // Bare filename – assume resides under /images
    return `/images/${src}`;
  } catch {
    return src;
  }
}

/**
 * Render an image that gracefully falls back when sources are missing.
 *
 * @param props - Component configuration including dimensions and hooks.
 * @returns JSX rendering an image or placeholder coverage.
 */
export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className = "object-cover w-full h-full",
  priority = false,
  fallbackSrc,
  onLoad,
  onError,
  placeholderClassName = "bg-charcoal/10",
  showPlaceholder = true,
}: ImageWithFallbackProps) {
  const finalSrc = normalizeImageSrc(src) || normalizeImageSrc(fallbackSrc) || fallbackSrc;

  if (!finalSrc && showPlaceholder) {
    return <div className={placeholderClassName} style={{ width, height }} aria-hidden="true" />;
  }

  return (
    <div className="relative" style={{ width, height }}>
      {showPlaceholder && (
        <div
          className={`absolute inset-0 ${placeholderClassName}`}
          aria-hidden="true"
          style={{ zIndex: 0 }}
        />
      )}
      <Image
        src={
          finalSrc ||
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZGRkIi8+Cjx0ZXh0IHg9IjQwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPk5vIENvdmVyPC90ZXh0Pgo8L3N2Zz4K"
        }
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        style={{ zIndex: 1 }}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  );
}
