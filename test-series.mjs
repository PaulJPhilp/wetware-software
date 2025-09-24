import { getFeaturedSeries } from "./apps/web/src/lib/notion-utils";

async function testFeaturedSeries() {
  console.log("Testing getFeaturedSeries...");
  try {
    const result = await getFeaturedSeries();
    console.log(
      "Result:",
      result.map((s) => ({ title: s.title, articlesCount: s.articles.length }))
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

testFeaturedSeries();
