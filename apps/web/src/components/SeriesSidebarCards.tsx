"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export interface SeriesSidebarArticle {
    title: string;
    href: string;
}

export interface SeriesSidebarSeries {
    name: string;
    slug?: string;
    coverLight?: string;
    coverDark?: string;
    articles: SeriesSidebarArticle[];
}

export function SeriesSidebarCards({
    seriesList,
    showTitle = true,
}: {
    seriesList: SeriesSidebarSeries[];
    showTitle?: boolean;
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <div className="w-full">
            {showTitle && (
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xs font-semibold text-foreground">Series</h2>
                    <span className="text-[8px] text-muted-foreground">{seriesList.length}</span>
                </div>
            )}

            {seriesList.length === 0 ? (
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
                    {seriesList.map((series) => {
                        const seriesHref = series.slug ? `/series/${series.slug}` : "#";
                        const cover = isDark ? (series.coverDark || series.coverLight) : (series.coverLight || series.coverDark);
                        return (
                            <div key={series.slug || series.name}>
                                <div className="group rounded-md overflow-hidden bg-white hover:shadow-sm transition">
                                    {/* Top row: image left, title right */}
                                    <div className="flex items-center gap-2 p-2">
                                        <div className="relative h-[60px] w-[80px] overflow-hidden rounded bg-charcoal/10 flex-shrink-0">
                                            {/* Always-visible base placeholder */}
                                            <div className="absolute inset-0 bg-charcoal/10" aria-hidden="true" style={{ zIndex: 0 }} />
                                            {/* Cover image (overlays placeholder if present) */}
                                            <Image
                                                src={cover || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZGRkIi8+Cjx0ZXh0IHg9IjQwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPk5vIENvdmVyPC90ZXh0Pgo8L3N2Zz4K"}
                                                alt={series.name}
                                                width={80}
                                                height={60}
                                                className="object-cover w-full h-full"
                                                priority={false}
                                                style={{ zIndex: 1 }}
                                            />
                                        </div>
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
