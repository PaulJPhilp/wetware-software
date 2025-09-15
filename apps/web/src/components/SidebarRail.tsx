"use client";
import type { SeriesSidebarSeries as CardSeries } from "@/components/SeriesSidebarCards";
import { SeriesSidebarCards } from "@/components/SeriesSidebarCards";
import { useId } from "react";

interface SidebarRailProps {
  seriesList: CardSeries[];
}

export function SidebarRail({ seriesList }: SidebarRailProps) {
  const seriesContentId = useId();
  // Desktop rail is always expanded now; mobile also always visible

  // Persist across navigations
  const widthClass = "w-48";

  // Removed keyboard toggle; sidebar is always visible on desktop

  return (
    <>
      {/* Always-visible rail */}
      <aside
        className={`relative block pr-0 ${widthClass}`}
        aria-label="Site navigation sidebar"
      >
        <div id={seriesContentId}>
          <div className="sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
            <SeriesSidebarCards seriesList={seriesList} showTitle={false} />
          </div>
        </div>
      </aside>
    </>
  );
}
