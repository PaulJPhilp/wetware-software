"use client";
import { useHeaderHeight } from "@/components/HeaderContext";
// import type { SeriesSidebarSeries as CardSeries } from "@/components/SeriesSidebarCards";
// import { SeriesSidebarCards } from "@/components/SeriesSidebarCards";
import { useId } from "react";

// Temporary placeholder type
interface CardSeries {
  name: string;
  slug?: string;
  coverLight?: string;
  coverDark?: string;
  articles: { title: string; href: string }[];
}

interface SidebarRailProps {
  seriesList: CardSeries[];
}

export function SidebarRail({ seriesList: _seriesList }: SidebarRailProps) {
  const seriesContentId = useId();
  const { headerHeight } = useHeaderHeight();
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
          <div
            className="sticky self-start overflow-y-auto"
            style={{
              top: `${headerHeight}px`,
              maxHeight: `calc(100vh - ${headerHeight}px)`
            }}
          >
            {/* <SeriesSidebarCards seriesList={seriesList} showTitle={false} /> */}
          </div>
        </div>
      </aside>
    </>
  );
}
