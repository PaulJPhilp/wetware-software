"use client";
import type { Series } from "@/components/SeriesSidebar";
import { SeriesSidebar } from "@/components/SeriesSidebar";
import { ChevronsLeft, ChevronsRight, PanelLeft, X } from "lucide-react";
import { useEffect, useState } from "react";

interface SidebarRailProps {
  seriesList: Series[];
}

export function SidebarRail({ seriesList }: SidebarRailProps) {
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

  const widthClass = isCollapsed ? "w-5" : "w-32";
  const iconClass = "h-3 w-3";

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
        className={`relative hidden md:block pr-3 border-r border-silver transition-[width] duration-200 ${widthClass}`}
        aria-label="Site navigation sidebar"
        data-collapsed={isCollapsed ? "true" : "false"}
      >
        {/* Toggle handle */}
        <button
          type="button"
          aria-expanded={!isCollapsed}
          aria-controls="series-sidebar-content"
          onClick={() => setIsCollapsed((v) => !v)}
          className="absolute -right-3 top-4 z-10 h-5 w-5 rounded-full border border-silver bg-white shadow-sm flex items-center justify-center hover:text-orange transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronsRight className={iconClass} />
          ) : (
            <ChevronsLeft className={iconClass} />
          )}
        </button>

        {/* Content */}
        <div
          id="series-sidebar-content"
          className={`transition-opacity duration-150 ${isCollapsed ? "opacity-0 pointer-events-none select-none" : "opacity-100"}`}
          aria-hidden={isCollapsed}
        >
          <div className="sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
            <SeriesSidebar seriesList={seriesList} />
          </div>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <button
        type="button"
        className="md:hidden fixed bottom-4 left-4 z-40 h-9 px-3 rounded-full border border-silver bg-white shadow-sm flex items-center gap-2 text-[12px] hover:text-orange"
        onClick={() => setIsMobileOpen(true)}
        aria-controls="mobile-sidebar-drawer"
        aria-expanded={isMobileOpen}
        aria-label="Open sidebar"
      >
        <PanelLeft className="h-4 w-4" />
        Menu
      </button>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div
          id="mobile-sidebar-drawer"
          role="dialog"
          aria-modal="true"
          className="md:hidden fixed inset-0 z-50 flex"
        >
          <div className="absolute inset-0 bg-black/30" onClick={() => setIsMobileOpen(false)} />
          <div className="relative h-full w-64 max-w-[calc(100vw-3rem)] bg-white border-r border-silver shadow-xl">
            <button
              type="button"
              className="absolute right-2 top-2 h-8 w-8 rounded-full border border-silver bg-white shadow-sm flex items-center justify-center hover:text-orange"
              aria-label="Close sidebar"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-4 w-4" />
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
