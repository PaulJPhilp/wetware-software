import { SeriesCard } from "@/components/SeriesCard";
import { getSeries } from "@/lib/notion-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Series - Wetware & Software",
  description:
    "Explore in-depth series covering human-AI collaboration, software architecture, and the intersection of technology and human systems.",
};

export default async function SeriesPage() {
  try {
    const series = await getSeries();

    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="font-bold font-sans text-charcoal text-xl leading-tight">Series</h1>
            <p className="max-w-2xl text-charcoal/80 text-xs leading-snug">
              Deep explorations into complex topics through structured, multi-part series. Each
              series builds understanding progressively, from foundational concepts to advanced
              applications.
            </p>
          </div>

          {series.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-charcoal/60">No series available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {series.map((s) => (
                <SeriesCard
                  key={s.slug}
                  priority={false}
                  series={s}
                  showArticleCount={true}
                  showDescription={true}
                  size="md"
                  testId={`grid-series-${s.slug}`}
                  variant="grid"
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
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="font-bold font-sans text-charcoal text-xl leading-tight">Series</h1>
            <p className="max-w-2xl text-charcoal/80 text-xs leading-snug">
              Deep explorations into complex topics through structured, multi-part series.
            </p>
          </div>
          <div className="py-12 text-center">
            <p className="text-charcoal/60">Unable to load series. Please try again later.</p>
          </div>
        </div>
      </main>
    );
  }
}
