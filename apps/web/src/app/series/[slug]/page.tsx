import { PostCard } from "@/components/PostCard";
import { Badge } from "@/components/ui/badge";
import { focusAreaIcons } from "@/lib/icons";
import { getSeriesWithPosts, getAllSeriesSlugs } from "@/lib/notion-utils";
import { Brain } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllSeriesSlugs();
    return slugs.map((slug) => ({
      slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const seriesData = await getSeriesWithPosts(slug);

    if (!seriesData) {
      return {
        title: "Series Not Found - Wetware & Software",
      };
    }

    return {
      title: `${seriesData.series.name} - Wetware & Software`,
      description: seriesData.series.description,
    };
  } catch {
    return {
      title: "Series - Wetware & Software",
    };
  }
}

export default async function SeriesDetailPage({ params }: Props) {
  try {
    const { slug } = await params;
    const seriesData = await getSeriesWithPosts(slug);
    if (!seriesData) {
      notFound();
    }

    const { series, posts } = seriesData;
    const FocusIcon = focusAreaIcons[series.focusArea] || Brain;

    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Series Header */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <FocusIcon className="h-5 w-5 text-orange" />
              <Badge variant="secondary">{series.focusArea}</Badge>
              <Badge variant={series.status === "Active" ? "default" : "secondary"}>
                {series.status}
              </Badge>
            </div>

            <div className="space-y-4">
              <h1 className="font-bold text-4xl text-charcoal">{series.name}</h1>
              <p className="text-charcoal/80 text-lg leading-relaxed">{series.description}</p>
            </div>

            {series.seriesGoal && (
              <div className="rounded-lg border border-orange/20 bg-orange/5 p-4">
                <h3 className="mb-2 font-semibold text-charcoal">Series Goal</h3>
                <p className="text-charcoal/80">{series.seriesGoal}</p>
              </div>
            )}

            {series.tags && series.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {series.tags.map((tag) => (
                  <Badge className="text-xs" key={tag.name} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Series Posts */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl text-charcoal">Parts ({posts.length})</h2>
            </div>

            {posts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-charcoal/60">No posts in this series yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {posts
                  .sort((a, b) => (a.partNumber || 0) - (b.partNumber || 0))
                  .map((post) => (
                    <Link className="group block" href={`/posts/${post.slug}`} key={post.id}>
                      <PostCard post={post} />
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading series:", error);
    notFound();
  }
}
