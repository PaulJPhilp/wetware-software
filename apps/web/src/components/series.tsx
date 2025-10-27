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
    <ul className="space-y-2 mb-6 text-sm">
      {resolvedArticles.length === 0 ? (
        <li className="text-muted-foreground">No posts available yet.</li>
      ) : (
        resolvedArticles.map((article) => (
          <li key={article.id}>
            <Link
              href={article.href ?? `/posts/${article.slug}`}
              className="text-muted-foreground hover:text-orange transition-colors hover:underline"
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
        <h2 className="text-lg font-bold text-foreground mb-4 sm:mb-6">Series</h2>
        {displaySeries.length === 0 ? (
          <div className="text-sm text-muted-foreground">No series available at the moment.</div>
        ) : (
          <div className="space-y-4">
            {displaySeries.map((seriesItem) => (
              <div key={seriesItem.id} className="space-y-3">
                <SeriesCard
                  series={seriesItem}
                  variant={variant}
                  size={size}
                  showDescription={false}
                  showArticleCount={true}
                  testId={`series-card-${seriesItem.slug}`}
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
