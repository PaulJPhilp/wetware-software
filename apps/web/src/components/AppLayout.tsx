"use client";
// import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SidebarProvider, useSidebar } from "@/components/SidebarContext";
import { Footer } from "./Footer";
// Ensure the file exists at the specified path, or update the path if necessary
// Update the import path if the file is located elsewhere, for example:
import type { SeriesSidebarSeries as Series } from "./SeriesSidebarCards";
import { SeriesSidebarCards } from "./SeriesSidebarCards";

function AppLayoutContent({
  children,
  seriesList,
}: {
  children: React.ReactNode;
  seriesList: Series[];
}) {
  const { isDesktopSidebarExpanded, setIsDesktopSidebarExpanded, isHydrated } = useSidebar();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        {/* Desktop Left Sidebar */}
        <aside
          className={`hidden md:flex flex-col bg-background transition-all duration-300 z-20 ${isHydrated && isDesktopSidebarExpanded ? "w-40" : "w-24"
            }`}
        >
          {/* Sidebar Header */}
          <div className="sticky top-0 z-10 bg-background">
            <button
              type="button"
              onClick={() => setIsDesktopSidebarExpanded(!isDesktopSidebarExpanded)}
              className="w-full flex items-center gap-2 p-2 hover:bg-muted transition-colors text-left"
              aria-label={
                isHydrated && isDesktopSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"
              }
            >
              {isHydrated && isDesktopSidebarExpanded ? (
                <>
                  <h2 className="text-xs font-semibold text-foreground">Series</h2>
                  <span className="text-[7px] text-muted-foreground">{seriesList.length}</span>
                </>
              ) : (
                <>
                  <h2 className="text-xs font-semibold text-foreground">Series</h2>
                  <span className="text-[7px] text-muted-foreground">{seriesList.length}</span>
                </>
              )}
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {isHydrated && isDesktopSidebarExpanded ? (
              <div className="px-2 pt-1 pb-4">
                <SeriesSidebarCards seriesList={seriesList} showTitle={false} />
              </div>
            ) : null}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-background z-0">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-2">
            <div className="w-full min-w-0">{children}</div>
          </div>
        </main>
      </div>
      <Footer />

      {/* Mobile Sidebar Drawer - Temporarily removed to isolate hydration issue */}
      {/* {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          role="presentation"
          aria-hidden="true"
        >
          <div
            className="fixed left-0 top-0 bottom-0 w-40 bg-background shadow-lg z-50 transform transition-transform ease-in-out duration-300 translate-x-0"
            role="presentation"
          >
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Series</h2>
                <span className="text-[10px] text-muted-foreground">{seriesList.length}</span>
              </div>
              <button
                type="button"
                className="p-2 hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <SeriesSidebarCards seriesList={seriesList} showTitle={false} />
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export function AppLayout({
  children,
  seriesList,
}: {
  children: React.ReactNode;
  seriesList: Series[];
}) {
  return (
    <SidebarProvider>
      <AppLayoutContent seriesList={seriesList}>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}
