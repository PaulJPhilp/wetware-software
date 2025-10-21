import { getSeries } from "../lib/notion-utils";
import { SeriesSection } from "./series";

/**
 * NotionSeries Component
 *
 * Server component that fetches series data from Notion
 * and renders it using the SeriesSection component
 */
interface NotionSeriesProps {
  limit?: number;
}

export async function NotionSeries({ limit = 3 }: NotionSeriesProps) {
  try {
    const allSeries = await getSeries();
    const seriesData = allSeries.slice(0, limit);

    if (seriesData.length === 0) {
      return <SeriesSection series={[]} className="mx-auto max-w-md" />;
    }

    return <SeriesSection series={seriesData} className="mx-auto max-w-md" />;
  } catch (error) {
    console.error("Error fetching series from Notion:", error);

    return <SeriesSection series={[]} className="mx-auto max-w-md" />;
  }
}
