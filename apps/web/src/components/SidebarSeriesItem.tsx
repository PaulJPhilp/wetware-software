"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

// Keep a local interface; structural typing will accept SeriesSidebarCards' prop shape
export interface SeriesSidebarArticle {
    title: string;
    href: string;
    coverImage?: string;
}

export interface SeriesSidebarSeries {
    name: string;
    slug?: string;
    coverLight?: string;
    coverDark?: string;
    articles: SeriesSidebarArticle[];
}

export function SidebarSeriesItem({ series }: { series: SeriesSidebarSeries }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const cover = isDark ? (series.coverDark || series.coverLight) : (series.coverLight || series.coverDark);
    return (
        <div className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/50">
            {cover ? (
                <div className="relative h-8 w-12 overflow-hidden rounded bg-charcoal/5">
                    <Image
                        src={cover}
                        alt={series.name}
                        width={48}
                        height={32}
                        className="object-cover w-full h-full"
                        priority={false}
                    />
                </div>
            ) : (
                <div className="h-8 w-12 rounded bg-charcoal/5" aria-hidden="true" />
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
