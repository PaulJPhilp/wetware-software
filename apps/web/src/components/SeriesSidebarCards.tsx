"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import type { SeriesSidebarSeries, SeriesSidebarArticle } from "@/lib/types";
import { ImageWithFallback, useThemeAwareCover } from "@/lib/image-utils";

/**
 * SeriesSidebarCards Component
 * Displays series as compact cards with cover images and article counts
 * Optimized for sidebar placement with responsive sizing
 *
 * @param series - Array of series data to display as cards
 * @param showTitle - Whether to display the "Series" title header (default: true)
 * @returns React component displaying series cards with cover images
 */
export function SeriesSidebarCards({
    series,
    showTitle = true,
}: {
    series: SeriesSidebarSeries[];
    showTitle?: boolean;
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <div className="w-full max-w-[10rem] md:max-w-[8.5rem] lg:max-w-[8rem] xl:max-w-[7rem]">
            {showTitle && (
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xs font-semibold text-foreground">Series</h2>
                    <span className="text-[8px] text-muted-foreground">{series.length}</span>
                </div>
            )}

            {series.length === 0 ? (
                <div className="py-2 space-y-2">
                    {Array.from({ length: 3 }).map(() => (
                        <div key={crypto.randomUUID()} className="rounded-md overflow-hidden bg-white">
                            <div className="w-full aspect-[16/9] bg-charcoal/10 animate-pulse" />
                            <div className="px-2 py-2">
                                <div className="h-3 w-32 bg-charcoal/10 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-2">
                    {series.map((series) => {
                        const seriesHref = series.slug ? `/series/${series.slug}` : "#";
                        const cover = useThemeAwareCover(series);
                        return (
                            <div key={series.slug || series.name}>
                                <div className="group rounded-md overflow-hidden bg-white hover:shadow-sm transition">
                                    {/* Top row: image left, title right */}
                                    <div className="flex items-center gap-2 p-2">
                                        <ImageWithFallback
                                            src={cover}
                                            alt={series.name}
                                            width={80}
                                            height={60}
                                            onLoad={() => console.log("SeriesSidebarCards cover loaded:", cover, series.name)}
                                            onError={() => console.error("SeriesSidebarCards cover failed to load:", cover, series.name)}
                                        />
                                        <div className="min-w-0 flex-1">
                                            <Link
                                                href={seriesHref}
                                                className="block truncate text-[11px] font-semibold text-foreground hover:text-orange"
                                                title={series.name}
                                            >
                                                {series.name}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Articles list outside the card */}
                                {series.articles?.length ? (
                                    <ul className="px-2 pb-2 mt-1 space-y-1">
                                        {series.articles.map((a) => (
                                            <li key={`${series.name}-${a.href}`} className="leading-tight">
                                                <Link
                                                    href={a.href || "#"}
                                                    className="block truncate text-[10px] text-muted-foreground hover:text-orange"
                                                    title={a.title}
                                                >
                                                    {a.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
