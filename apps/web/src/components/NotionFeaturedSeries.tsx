import { getFeaturedSeries } from '../lib/notion-utils';
import { SeriesSection } from './FeaturedSeries';

/**
 * NotionFeaturedSeries Component
 * 
 * Server component that fetches featured series data from Notion
 * and renders it using the SeriesSection component
 */
interface NotionFeaturedSeriesProps {
  limit?: number;
}

export async function NotionFeaturedSeries({
  limit = 3
}: NotionFeaturedSeriesProps) {
  try {
    const seriesData = await getFeaturedSeries(limit);

    if (seriesData.length === 0) {
      return (
        <div className="w-full md:w-56 md:fixed md:top-0 md:h-screen md:overflow-y-auto md:border-r md:border-b-0 border-b sticky top-0">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">
                Featured Series
              </h2>
              <p className="text-sm text-muted-foreground">
                Deep dives into specific topics.
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              No featured series available at the moment.
            </div>
          </div>
        </div>
      );
    }

    return <SeriesSection series={seriesData} />;
  } catch (error) {
    console.error('Error loading featured series:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }

    return (
      <div className="w-full md:w-52 md:fixed md:top-0 md:h-screen md:overflow-y-auto sticky top-0">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">
              Featured Series
            </h2>
            <p className="text-sm text-muted-foreground">
              Deep dives into specific topics.
            </p>
          </div>
          <div className="text-sm text-red-500">
            Error loading series. Please try again later.
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2 text-xs text-red-400">
              {error instanceof Error ? error.message : 'Unknown error'}
            </div>
          )}
        </div>
      </div>
    );
  }
}

/**
 * Usage example for the NotionFeaturedSeries component
 * 
 * This is a server component that should be used in your page components
 * to automatically fetch and display series data from Notion.
 */
export default NotionFeaturedSeries;
