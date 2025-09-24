"use client";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import type { Series, ArticleInSeries } from "@/lib/types";

/**
 * Render the list of article links associated with a series.
 *
 * @param props - Component props containing article metadata.
 * @returns JSX listing the per-article navigation.
 */
interface SeriesArticleListProps {
  articles: ArticleInSeries[];
}

/**
 * Render the list of article links associated with a series.
 *
 * @param props - Component props containing article metadata.
 * @returns JSX listing the per-article navigation.
 */
export const SeriesArticleList: React.FC<SeriesArticleListProps> = ({ articles }) => {
  return (
    <ul className="list-inside space-y-0.5 mt-3 series-article-list">
      {articles.map((article) => (
        <li key={article.id}>
          <Link
            href={`/posts/${article.slug}`}
            className="group block font-medium text-sm text-foreground dark:text-white hover:text-orange transition-colors"
          >
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

/**
 * Present the hero card for a series including title and preview image.
 *
 * @param props - Component props providing the `series` to display.
 * @returns JSX rendering the linked series hero card.
 */
interface SeriesCardProps {
  series: Series;
}

/**
 * Present the hero card for a series including title and preview image.
 *
 * @param props - Component props providing the `series` to display.
 * @returns JSX rendering the linked series hero card.
 */
export const SeriesCard: React.FC<SeriesCardProps> = ({ series }) => {
  return (
    <Link
      href={`/series/${series.slug}`}
      className="group relative block rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      <div className="p-3">
        <h3 className="text-base font-bold text-slate-800 group-hover:text-orange transition-colors text-center">
          {series.title}
        </h3>
      </div>
      <div className="relative w-full rounded-lg">
        <Image
          src={series.imageUrl}
          alt={series.title}
          width={256}
          height={128}
          sizes="(max-width: 768px) 100vw, 256px"
          priority={false}
          className="object-contain rounded-lg w-full h-auto"
        />
      </div>
    </Link>
  );
};

/**
 * Group a series hero card with its article list.
 *
 * @param props - Component props providing the `series` data.
 * @returns JSX combining hero card with article list.
 */
interface SeriesContainerProps {
  series: Series;
}

/**
 * Group a series hero card with its article list.
 *
 * @param props - Component props providing the `series` data.
 * @returns JSX combining hero card with article list.
 */
export const SeriesContainer: React.FC<SeriesContainerProps> = ({ series }) => {
  return (
    <div className="bg-card text-card-foreground rounded-xl p-4">
      <SeriesCard series={series} />
      <SeriesArticleList articles={series.articles} />
    </div>
  );
};

/**
 * Display the full featured series section.
 *
 * @param props - Component props holding the `series` collection.
 * @returns JSX wrapping the series cards and article lists.
 */
interface SeriesSectionProps {
  series?: Series[];
}

/**
 * Display the full featured series section.
 */
export const SeriesSection: React.FC<SeriesSectionProps> = ({ series }) => {
  const safeSeries: Series[] = Array.isArray(series) ? series : [];

  return (
    <div className="p-6 w-1/4">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">
          Featured Series
        </h2>
        <p className="text-sm text-muted-foreground">Deep dives into specific topics.</p>
      </div>
      {/* Series List */}
      <div className="space-y-6">
        {safeSeries.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No featured series available at the moment.
          </div>
        ) : (
          safeSeries.map((seriesItem) => (
            <SeriesContainer key={seriesItem.id} series={seriesItem} />
          ))
        )}
      </div>
    </div>
  );
};
/**
 * Example series data useful for visual testing or storybook fixtures.
 */
export const exampleSeriesData: Series[] = [
  {
    id: "1",
    slug: "mastering-effect",
    title: "Mastering Effect",
    imageUrl: "https://picsum.photos/seed/mastering-effect/300/150",
    articles: [
      {
        id: "1-1",
        slug: "effect-introduction",
        title: "Introduction to Effect-TS",
        description: "Learn the fundamentals of Effect-TS and functional programming",
        part: 1,
      },
      {
        id: "1-2",
        slug: "effect-error-handling",
        title: "Advanced Error Handling",
        description: "Master error handling patterns in Effect-TS",
        part: 2,
      },
      {
        id: "1-3",
        slug: "effect-concurrency",
        title: "Concurrency and Parallelism",
        description: "Explore concurrent programming with Effect-TS",
        part: 3,
      },
    ],
  },
  {
    id: "2",
    slug: "coders-guide-to-ai",
    title: "The Coder's Guide to AI",
    imageUrl: "https://picsum.photos/seed/coders-guide-to-ai/300/150",
    articles: [
      {
        id: "2-1",
        slug: "ai-fundamentals-for-developers",
        title: "AI Fundamentals for Developers",
        description: "Essential AI concepts every developer should know",
        part: 1,
      },
      {
        id: "2-2",
        slug: "building-ai-powered-apps",
        title: "Building AI-Powered Applications",
        description: "Practical guide to integrating AI into your apps",
        part: 2,
      },
      {
        id: "2-3",
        slug: "ai-ethics-and-best-practices",
        title: "AI Ethics and Best Practices",
        description: "Responsible AI development and deployment",
        part: 3,
      },
      {
        id: "2-4",
        slug: "future-of-ai-development",
        title: "The Future of AI Development",
        description: "Emerging trends and technologies in AI",
        part: 4,
      },
    ],
  },
];
