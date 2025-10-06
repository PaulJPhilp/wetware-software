import { SeriesCard } from "@/components/SeriesCard";
import { getSeries } from "@/lib/notion-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Series - Wetware & Software",
  description:
    "Explore in-depth series covering human-AI collaboration, software architecture, and the intersection of technology and human systems.",
};

export const revalidate = 300; // Revalidate every 5 minutes

export default async function SeriesPage() {
  try {
    const series = await getSeries();

    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-xl font-sans font-bold text-charcoal leading-tight">Series</h1>
            <p className="text-xs text-charcoal/80 max-w-2xl leading-snug">
              Deep explorations into complex topics through structured, multi-part series. Each
              series builds understanding progressively, from foundational concepts to advanced
              applications.
            </p>
          </div>

          {series.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-charcoal/60">No series available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {series.map((s) => (
                <SeriesCard
                  key={s.slug}
                  series={s}
                  variant="grid"
                  size="md"
                  showDescription={true}
                  showArticleCount={true}
                  priority={false}
                  testId={`grid-series-${s.slug}`}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching series:", error);

    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-xl font-sans font-bold text-charcoal leading-tight">Series</h1>
            <p className="text-xs text-charcoal/80 max-w-2xl leading-snug">
              Deep explorations into complex topics through structured, multi-part series.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-charcoal/60">Unable to load series. Please try again later.</p>
          </div>
        </div>
      </main>
    );
  }
}
