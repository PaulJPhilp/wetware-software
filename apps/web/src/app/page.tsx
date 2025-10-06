import { AuthorBioSidebar } from "@/components/AuthorBioSidebar";
import { LatestPosts } from "@/components/LatestPosts";
import { SeriesCarousel } from "@/components/SeriesCarousel";
import { getRecentPosts, getSeries } from "@/lib/notion-utils";

export const revalidate = 60; // Revalidate every minute to avoid stale cache

export default async function Home() {
  const [series, recentPosts] = await Promise.all([getSeries(), getRecentPosts(10)]);

  return (
    <div className="py-8 max-w-7xl ml-0 mr-auto px-4">
      {/* Series Carousel Section */}
      <section className="mb-6">
        <SeriesCarousel
          series={series}
          title="Featured Series"
          description="Explore our latest series on technology and human systems"
          slidesToShow={{
            base: 2,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
          }}
          showDescription={true}
          showArticleCount={true}
          testId="home-series-carousel"
        />
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <main className="flex-1 min-w-0 lg:order-2">
          <LatestPosts posts={recentPosts} />
        </main>

        {/* Author Bio Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 lg:order-1">
          <AuthorBioSidebar />
        </aside>
      </div>
    </div>
  );
}
