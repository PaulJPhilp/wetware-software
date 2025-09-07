import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { focusAreaIcons } from "@/lib/icons";
import { getSeries } from "@/lib/notion-utils";
import { Brain } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {series.map((s) => {
                const FocusIcon = focusAreaIcons[s.focusArea] || Brain;

                return (
                  <Link key={s.slug} href={`/series/${s.slug}`}>
                    <Card className="group h-full hover:shadow-lg transition-all duration-200 border-charcoal/20 overflow-hidden">
                      {/* Cover image */}
                      {s.coverImage && (
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal/5">
                          <Image
                            src={s.coverImage}
                            alt={s.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            priority={false}
                          />
                        </div>
                      )}
                      <CardHeader className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <FocusIcon className="w-4 h-4 text-orange" />
                              <Badge variant="secondary" className="text-xs">
                                {s.focusArea}
                              </Badge>
                              <span className="text-xs text-charcoal/60">
                                {s.postCount} {s.postCount === 1 ? "part" : "parts"}
                              </span>
                            </div>
                            <h2 className="text-lg font-semibold group-hover:text-orange transition-colors">
                              {s.name}
                            </h2>
                          </div>
                          {s.status && (
                            <Badge
                              variant={s.status === "Active" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {s.status}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-charcoal/80 mb-4 leading-relaxed line-clamp-3">
                          {s.description}
                        </p>
                        {s.tags && s.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {s.tags.map((tag) => (
                              <Badge key={tag.name} variant="outline" className="text-xs">
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="mt-4">
                          <span className="inline-flex items-center text-xs font-medium text-orange group-hover:underline">
                            Read series
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
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
