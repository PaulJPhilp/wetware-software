"use client";

import type { BaseComponentProps } from "@/lib/component-types";
import type { Series } from "@/lib/notion-utils";
import type React from "react";

/**
 * SeriesContentLayout Props
 */
interface SeriesContentLayoutProps extends BaseComponentProps {
  /** Series data to display */
  series: Series[];
  /** Main content to display alongside series */
  children: React.ReactNode;
  /** Maximum width for the container */
  maxWidth?: "4xl" | "5xl" | "6xl" | "7xl" | "full";
  /** Gap between series and content */
  gap?: "sm" | "md" | "lg" | "xl";
  /** Whether to show article lists in series section */
  showArticleLists?: boolean;
}

/**
 * SeriesContentLayout Component
 *
 * A clean layout with series section taking ~1/4 of screen width
 * and main content taking the remaining space. Not a sidebar - just
 * a regular responsive layout.
 *
 * Layout:
 * - Mobile: Stacked (series on top, content below)
 * - Desktop: Side by side (series ~1/4 width, content ~3/4 width)
 */
export const SeriesContentLayout: React.FC<SeriesContentLayoutProps> = ({
  children,
  className = "",
  maxWidth = "7xl",
  gap = "lg",
  testId,
}) => {
  const maxWidthClass = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }[maxWidth];

  const gapClass = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
  }[gap];

  return (
    <div className={`${maxWidthClass} mx-auto px-4 ${className}`} data-testid={testId}>
      <div className={`flex flex-col lg:flex-row ${gapClass}`}>
        {/* <SeriesSection
          series={series}
          showArticleLists={showArticleLists}
          className="w-60 flex-shrink-0"
        /> */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
};

/**
 * Alternative layout with series section on the right
 */
export const SeriesContentLayoutRight: React.FC<SeriesContentLayoutProps> = ({
  children,
  className = "",
  maxWidth = "7xl",
  gap = "lg",
  testId,
}) => {
  const maxWidthClass = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }[maxWidth];

  const gapClass = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
  }[gap];

  return (
    <div className={`${maxWidthClass} mx-auto px-4 ${className}`} data-testid={testId}>
      <div className={`flex flex-col lg:flex-row ${gapClass}`}>
        <main className="flex-1">{children}</main>
        {/* <SeriesSection
          series={series}
          showArticleLists={showArticleLists}
          className="w-60 flex-none"
        /> */}
      </div>
    </div>
  );
};

export default SeriesContentLayout;
