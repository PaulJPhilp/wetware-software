"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { SidebarSeries, SidebarArticle } from "@/lib/types";

/**
 * SeriesSidebar Component
 * Displays a collapsible sidebar navigation for series and their articles
 * Uses a narrow vertical layout optimized for sidebar placement
 *
 * @param series - Array of series data to display in the sidebar
 * @param showTitle - Whether to display the "Series" title header (default: true)
 * @returns React component displaying collapsible series navigation
 */
interface SeriesSidebarProps {
  series: SidebarSeries[];
  showTitle?: boolean;
}

export const SeriesSidebar: React.FC<SeriesSidebarProps> = ({ series, showTitle = true }) => {
  const [openSeries, setOpenSeries] = useState<Record<string, boolean>>({});

  const toggleSeries = (name: string) => {
    setOpenSeries((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside className="w-28 md:w-20 lg:w-16 xl:w-14 2xl:w-14 max-w-[4.5rem]">
      {showTitle && (
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-lg font-semibold text-foreground dark:text-white">Series</h2>
          <span className="ml-auto text-[8px] text-muted-foreground dark:text-white/70">
            {series.length}
          </span>
        </div>
      )}

      <nav>
        {series.length === 0 ? (
          <div className="text-[9px] text-muted-foreground dark:text-white/70">
            No matching series.
          </div>
        ) : (
          series.map((series) => {
            const isOpen = !!openSeries[series.name];
            return (
              <div key={series.name} className="mb-1.5">
                <button
                  type="button"
                  className="group flex items-center w-full text-left text-[9px] font-medium text-foreground dark:text-white hover:text-orange transition-colors py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-orange/50"
                  onClick={() => toggleSeries(series.name)}
                  aria-expanded={isOpen}
                >
                  <ChevronRight
                    className={`mr-1 h-2.5 w-2.5 transition-transform ${isOpen ? "rotate-90 text-orange" : "text-muted-foreground dark:text-white/70"}`}
                  />
                  <span className="mr-2 text-[7px] px-1 py-0.5 rounded bg-charcoal/5 text-charcoal/60 dark:bg-white dark:text-black">
                    {series.articles.length}
                  </span>
                  <span className="flex-1 whitespace-nowrap truncate leading-tight" title={series.name}>
                    {series.name}
                  </span>
                </button>

                {isOpen && (
                  <ul className="ml-4 mt-1 pl-2 space-y-0.5">
                    {series.articles.map((article) => (
                      <li key={article.href}>
                        <Link
                          href={article.href}
                          className="block text-[9px] text-muted-foreground dark:text-white/80 hover:text-orange transition-colors px-2 py-0.5 rounded"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </nav>
    </aside>
  );
};
