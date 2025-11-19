import type { BaseComponentProps } from "@/lib/component-types";
import type { Series } from "@/lib/notion-utils";
import Link from "next/link";
import type React from "react";
import { SeriesCard } from "./SeriesCard";

/**
 * Display the series section.
 *
 * @param props - Component props holding the `series` collection.
 * @returns JSX wrapping the series cards and article lists.
 */
interface SeriesSectionProps extends BaseComponentProps {
  /** Series data to display */
  series?: Series[];
  /** Maximum number of series to show */
  maxSeries?: number;
  /** Whether to show article lists */
  showArticleLists?: boolean;
  /** Card variant for different layouts */
  variant?: "grid" | "carousel" | "list";
  /** Card size */
  size?: "sm" | "md" | "lg";
}

/**
 * Simple Article List - placeholder since Series from getSeries() doesn't include articles
 */
const SimpleArticleList: React.FC<{ articles: Series["articles"] }> = ({ articles }) => {
  const resolvedArticles = articles ?? [];

  return (
    <ul className="mb-6 space-y-2 text-sm">
      {resolvedArticles.length === 0 ? (
        <li className="text-muted-foreground">No posts available yet.</li>
      ) : (
        resolvedArticles.map((article) => (
          <li key={article.id}>
            <Link
              className="text-muted-foreground transition-colors hover:text-orange hover:underline"
              href={article.href ?? `/blog/posts/${article.slug}`}
            >
              {article.title}
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};

/**
 * Simplified Series Section - Responsive sidebar with unified SeriesCard
 */
export const SeriesSection: React.FC<SeriesSectionProps> = ({
  series = [],
  maxSeries = 10,
  showArticleLists = false,
  variant = "list",
  size = "sm",
  className = "",
  testId,
}) => {
  const displaySeries = series.slice(0, maxSeries);

  return (
    <section
      className={`rounded-lg border border-border bg-background p-4 sm:p-6 ${className}`}
      data-testid={testId}
    >
      <div className="sticky top-4">
        <h2 className="mb-4 font-bold text-foreground text-lg sm:mb-6">Series</h2>
        {displaySeries.length === 0 ? (
          <div className="text-muted-foreground text-sm">No series available at the moment.</div>
        ) : (
          <div className="space-y-4">
            {displaySeries.map((seriesItem) => (
              <div className="space-y-3" key={seriesItem.id}>
                <SeriesCard
                  series={seriesItem}
                  showArticleCount={true}
                  showDescription={false}
                  size={size}
                  testId={`series-card-${seriesItem.slug}`}
                  variant={variant}
                />
                {showArticleLists && <SimpleArticleList articles={seriesItem.articles} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/**
 * Example series data useful for visual testing or storybook fixtures.
 */
export const exampleSeriesData: Series[] = [
  {
    id: "1",
    name: "Mastering Effect",
    slug: "mastering-effect",
    description: "Learn Effect library for TypeScript",
    seriesGoal: "Master Effect patterns",
    status: "Active",
    focusArea: "Tech-Centric",
    tags: [{ name: "TypeScript", color: "blue" }],
    coverLight: "https://picsum.photos/seed/mastering-effect/300/150",
    coverDark: "https://picsum.photos/seed/mastering-effect-dark/300/150",
    imageUrl: "https://picsum.photos/seed/mastering-effect/300/150",
    postCount: 3,
    articles: [],
  },
  {
    id: "2",
    name: "The Coder's Guide to AI",
    slug: "coders-guide-to-ai",
    description: "AI fundamentals for developers",
    seriesGoal: "Understand AI development",
    status: "Active",
    focusArea: "Human-AI Collaboration",
    tags: [{ name: "AI", color: "green" }],
    coverLight: "https://picsum.photos/seed/coders-guide-to-ai/300/150",
    coverDark: "https://picsum.photos/seed/coders-guide-to-ai-dark/300/150",
    imageUrl: "https://picsum.photos/seed/coders-guide-to-ai/300/150",
    postCount: 3,
    articles: [],
  },
];
