"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import type { SeriesSidebarSeries, SeriesSidebarArticle } from "@/lib/types";
import { ImageWithFallback, useThemeAwareCover } from "@/lib/image-utils";

/**
 * SidebarSeriesItem Component
 * Displays a single series item with cover image and article count
 * Used within series navigation components
 *
 * @param series - Series data to display in the item
 * @returns React component displaying series item with image and metadata
 */
export function SidebarSeriesItem({ series }: { series: SeriesSidebarSeries }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const cover = useThemeAwareCover(series);
    return (
        <div className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/50">
            {cover ? (
                <ImageWithFallback
                    src={cover}
                    alt={series.name}
                    width={48}
                    height={32}
                    className="object-cover w-full h-full"
                    onLoad={() => console.log("SidebarSeriesItem cover loaded:", cover, series.name)}
                    onError={() => console.error("SidebarSeriesItem cover failed to load:", cover, series.name)}
                />
            ) : (
                <div className="h-8 w-12 rounded bg-charcoal/5 flex-shrink-0" aria-hidden="true" />
            )}

            <div className="min-w-0 flex-1">
                <Link
                    href={series.slug ? `/series/${series.slug}` : "#"}
                    className="block truncate text-[10px] font-medium text-foreground hover:text-orange"
                    title={series.name}
                >
                    {series.name}
                </Link>
                <div className="text-[9px] text-muted-foreground">{series.articles.length} parts</div>
            </div>
        </div>
    );
}

/**
 * SidebarSeriesSkeleton Component
 * Displays loading skeleton placeholders for series items
 * Used during loading states to provide visual feedback
 *
 * @returns React component displaying animated skeleton placeholders
 */
export function SidebarSeriesSkeleton() {
    return (
        <div className="space-y-2">
            {Array.from({ length: 3 }).map(() => (
                <div key={crypto.randomUUID()} className="flex items-center gap-2 px-2 py-1">
                    <div className="h-8 w-12 rounded bg-charcoal/10 animate-pulse" />
                    <div className="flex-1 space-y-1">
                        <div className="h-2 w-32 rounded bg-charcoal/10 animate-pulse" />
                        <div className="h-2 w-20 rounded bg-charcoal/10 animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    );
}
