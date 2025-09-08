"use client";
import type { Series } from "@/components/SeriesSidebar";
import { SeriesSidebar } from "@/components/SeriesSidebar";
import { PanelLeftIcon, XIcon } from "@/components/ui/icons";
import { useEffect, useId, useState } from "react";

interface SidebarRailProps {
  seriesList: Series[];
}

export function SidebarRail({ seriesList }: SidebarRailProps) {
  const seriesContentId = useId();
  const mobileDrawerId = useId();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Persist across navigations
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("sidebar-collapsed");
      if (stored != null) setIsCollapsed(stored === "1");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("sidebar-collapsed", isCollapsed ? "1" : "0");
    } catch {}
  }, [isCollapsed]);

  const widthClass = isCollapsed ? "w-4" : "w-40";

  // Keyboard shortcut: press "s" to toggle (ignore when typing)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || target?.isContentEditable) return;
      if (e.key === "s" || e.key === "S") setIsCollapsed((v) => !v);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* Desktop rail */}
      <aside
        className={`relative hidden md:block pr-0 transition-[width] duration-200 ${widthClass}`}
        aria-label="Site navigation sidebar"
        data-collapsed={isCollapsed ? "true" : "false"}
      >
        {/* Always-visible compact title row with toggle */}
        <div className="sticky top-4 z-0 mb-2 h-auto flex items-center gap-1 pl-0 pr-0">
          <button
            type="button"
            aria-expanded={!isCollapsed}
            aria-controls={seriesContentId}
            onClick={() => setIsCollapsed((v) => !v)}
            className="flex items-center gap-1 text-muted-foreground dark:text-white/70 hover:text-orange focus:outline-none"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <h2 className="m-0 p-0 text-xs leading-none font-semibold text-foreground dark:text-white/90">
              Series
            </h2>
            <span className="text-xs leading-none text-muted-foreground dark:text-white/70">
              ({seriesList.length})
            </span>
          </button>
        </div>

        {/* Content */}
        <div
          id={seriesContentId}
          className={`transition-opacity duration-150 ${isCollapsed ? "opacity-0 pointer-events-none select-none" : "opacity-100"}`}
          aria-hidden={isCollapsed}
        >
          <div className="sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
            <SeriesSidebar seriesList={seriesList} showTitle={false} />
          </div>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <button
        type="button"
        className="md:hidden fixed bottom-4 left-4 z-40 h-11 px-4 rounded-full border border-silver bg-white shadow-sm flex items-center gap-2 text-sm hover:text-orange"
        onClick={() => setIsMobileOpen(true)}
        aria-controls={mobileDrawerId}
        aria-expanded={isMobileOpen}
        aria-label="Open sidebar"
      >
        <PanelLeftIcon className="h-4 w-4" />
        Menu
      </button>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div
          id={mobileDrawerId}
          role="dialog"
          aria-modal="true"
          className="md:hidden fixed inset-0 z-50 flex"
        >
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsMobileOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setIsMobileOpen(false);
            }}
          />
          <div className="relative h-full w-auto max-w-[calc(100vw-3rem)] bg-white border-r border-silver shadow-xl">
            <button
              type="button"
              className="absolute right-2 top-2 h-8 w-8 rounded-full border border-silver bg-white shadow-sm flex items-center justify-center hover:text-orange"
              aria-label="Close sidebar"
              onClick={() => setIsMobileOpen(false)}
            >
              <XIcon className="h-4 w-4" />
            </button>
            <div className="pt-12 pb-4 px-2 h-full overflow-y-auto">
              <SeriesSidebar seriesList={seriesList} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
