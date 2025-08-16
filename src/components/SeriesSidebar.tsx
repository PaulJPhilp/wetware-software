"use client";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export interface SeriesArticle {
  title: string;
  href: string;
}

export interface Series {
  name: string;
  articles: SeriesArticle[];
}

interface SeriesSidebarProps {
  seriesList: Series[];
  showTitle?: boolean;
}

export const SeriesSidebar: React.FC<SeriesSidebarProps> = ({ seriesList, showTitle = true }) => {
  const [openSeries, setOpenSeries] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");

  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return seriesList;
    return seriesList.filter((s) => s.name.toLowerCase().includes(q));
  }, [query, seriesList]);

  const toggleSeries = (name: string) => {
    setOpenSeries((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside className="w-32">
      {showTitle && (
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-[10px] font-semibold text-foreground dark:text-white">Series</h2>
          <span className="ml-auto text-[8px] text-muted-foreground dark:text-white/70">{seriesList.length}</span>
        </div>
      )}

      <label className="relative block mb-3">
        <span className="absolute inset-y-0 left-2 flex items-center text-muted-foreground dark:text-white/60">
          <Search className="h-2.5 w-2.5" />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search series"
          className="w-full pl-5 pr-2 py-1 text-[9px] rounded-md focus:outline-none focus:ring-2 focus:ring-orange/50 bg-white dark:bg-secondary text-foreground placeholder:text-muted-foreground dark:placeholder:text-white/70"
        />
      </label>

      <nav>
        {filteredList.length === 0 ? (
          <div className="text-[9px] text-muted-foreground dark:text-white/70">No matching series.</div>
        ) : (
          filteredList.map((series) => {
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
                  <span className="flex-1 whitespace-normal break-words leading-tight">
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
