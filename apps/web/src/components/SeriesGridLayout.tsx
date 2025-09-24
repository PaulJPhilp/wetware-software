"use client";
import type React from "react";
import type { Series } from "@/lib/types";
import { SeriesSection } from "./FeaturedSeries";

/**
 * SeriesGridLayoutProps Interface
 * Props for the SeriesGridLayout component
 */
export interface SeriesGridLayoutProps {
    /** Array of series data to display in the sidebar */
    series: Series[];
    /** Child content to display alongside the series sidebar */
    children: React.ReactNode;
    /** Position of the sidebar on desktop */
    sidebarPosition?: "left" | "right";
    /** Enable sticky behavior for the sidebar on desktop */
    sticky?: boolean;
    /** Sidebar width (Tailwind arbitrary value allowed) */
    sidebarWidthClass?: string; // e.g. 'w-64'
    /** Add a border separator on desktop */
    showDivider?: boolean;
    /** Optional aria-label for sidebar */
    sidebarAriaLabel?: string;
}

/**
 * SeriesGridLayout Component
 * A parent layout component that arranges a series sidebar and main content
 * using CSS Grid. Moves layout concerns out of SeriesSection.
 *
 * @param props - Component props conforming to SeriesGridLayoutProps
 * @returns React component with grid layout containing sidebar and content
 */
export const SeriesGridLayout: React.FC<SeriesGridLayoutProps> = ({
    series,
    children,
    sidebarPosition = "left",
    sticky = true,
    sidebarWidthClass = "w-64",
    showDivider = true,
    sidebarAriaLabel = "Featured series",
}) => {
    const sidebar = (
        <aside
            aria-label={sidebarAriaLabel}
            className={[
                "hidden md:block",
                sidebarWidthClass,
                showDivider && sidebarPosition === "left" ? "md:border-r" : "",
                showDivider && sidebarPosition === "right" ? "md:border-l" : "",
                "border-border",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div
                className={[
                    sticky ? "sticky top-0 max-h-screen overflow-y-auto" : "",
                    "bg-background",
                ].join(" ")}
            >
                <SeriesSection series={series} />
            </div>
        </aside>
    );

    return (
        <div
            className={[
                "grid gap-8",
                sidebarPosition === "left" ? "md:grid-cols-[16rem_1fr]" : "md:grid-cols-[1fr_16rem]",
            ].join(" ")}
        >
            {sidebarPosition === "left" && sidebar}
            <main className="min-w-0">{children}</main>
            {sidebarPosition === "right" && sidebar}
        </div>
    );
};

/**
 * StackedSeriesLayout Component
 * Convenience component that stacks the sidebar above main content on mobile.
 * On desktop, it uses SeriesGridLayout for side-by-side layout.
 *
 * @param props - Component props (same as SeriesGridLayoutProps except sidebarPosition)
 * @returns React component with responsive stacked/grid layout
 */
export const StackedSeriesLayout: React.FC<Omit<SeriesGridLayoutProps, "sidebarPosition">> = ({
    series,
    children,
    sticky,
    sidebarWidthClass,
    showDivider,
    sidebarAriaLabel,
}) => {
    const resolvedSticky = sticky ?? true;
    const resolvedSidebarWidth = sidebarWidthClass ?? "w-64";
    const resolvedShowDivider = showDivider ?? true;
    const resolvedSidebarAriaLabel = sidebarAriaLabel ?? "Featured series";

    return (
        <div className="space-y-8 md:space-y-0">
            {/* Mobile visible */}
            <div className="md:hidden">
                <SeriesSection series={series} />
            </div>
            <SeriesGridLayout
                series={series}
                sidebarPosition="left"
                sticky={resolvedSticky}
                sidebarWidthClass={resolvedSidebarWidth}
                showDivider={resolvedShowDivider}
                sidebarAriaLabel={resolvedSidebarAriaLabel}
            >
                {children}
            </SeriesGridLayout>
        </div>
    );
};
