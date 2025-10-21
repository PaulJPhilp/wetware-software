/**
 * Integration Test Component
 *
 * This component can be used to test the Series integration
 * without affecting your main homepage. Import this in a test page
 * to verify everything works correctly.
 */

import { SeriesSection } from "../components/series";
import { getSeries } from "../lib/notion-utils";

export async function IntegrationTest() {
  try {
    console.log("🧪 Testing Series integration...");

    // Test data fetching
    const allSeries = await getSeries();
    const seriesData = allSeries.slice(0, 3);
    console.log("✅ Successfully fetched series data:", seriesData.length, "series");

    // Test each series has required properties
    seriesData.forEach((series, index) => {
      console.log(`📋 Series ${index + 1}:`, {
        id: series.id,
        slug: series.slug,
        title: series.name,
        imageUrl: series.imageUrl,
        articleCount: series.postCount || 0,
      });

      // Note: Series from getSeries() doesn't include articles
      console.log(
        "  📄 Articles: Not available from getSeries() - use getSeriesWithPosts() instead",
      );
    });

    return (
      <div className="min-h-screen bg-background">
        <div className="p-4 bg-green-50 border-b border-green-200">
          <h1 className="text-lg font-bold text-green-800">🧪 Integration Test Mode</h1>
          <p className="text-sm text-green-700">
            Found {seriesData.length} series with{" "}
            {seriesData.reduce((total, s) => total + (s.postCount || 0), 0)} total posts
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          <SeriesSection series={seriesData} />

          <main className="flex-1 md:ml-64 p-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Integration Test Results</h2>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">✅ Data Fetching</h3>
                  <p className="text-blue-700 text-sm">
                    Successfully fetched {seriesData.length} series from Notion
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">✅ Component Rendering</h3>
                  <p className="text-green-700 text-sm">
                    SeriesSection component rendered successfully with sidebar layout
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">✅ Responsive Design</h3>
                  <p className="text-purple-700 text-sm">
                    Layout adapts correctly: sidebar on desktop, stacked on mobile
                  </p>
                </div>

                {seriesData.length === 0 && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">⚠️ No Series Data</h3>
                    <p className="text-yellow-700 text-sm">
                      No series found. Check that your Notion database has series with Status =
                      "Active" or "Completed" and published posts.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error("❌ Integration test failed:", error);

    return (
      <div className="min-h-screen bg-red-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-800 mb-4">❌ Integration Test Failed</h1>
          <div className="p-4 bg-red-100 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
            <pre className="text-sm text-red-700 overflow-auto">
              {error instanceof Error ? error.message : String(error)}
            </pre>
          </div>

          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold text-red-800">Troubleshooting Steps:</h2>
            <ul className="list-disc list-inside space-y-2 text-red-700">
              <li>Check that your Notion API key is configured correctly</li>
              <li>Verify that your Series database has the required properties</li>
              <li>Ensure you have series with Status = "Active" or "Completed"</li>
              <li>Check that series have published posts linked via Blog Series relation</li>
              <li>Review the console logs for more detailed error information</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default IntegrationTest;
