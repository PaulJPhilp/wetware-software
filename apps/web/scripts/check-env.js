console.log("Checking environment variables...");
console.log("NOTION_API_KEY:", process.env.NOTION_API_KEY ? "SET" : "NOT SET");
console.log("notion_api_key:", process.env.notion_api_key ? "SET" : "NOT SET");
console.log(
  "NOTION_DATABASE_ID_BLOG_POSTS:",
  process.env.NOTION_DATABASE_ID_BLOG_POSTS ? "SET" : "NOT SET"
);
console.log(
  "notion_database_id_blog_posts:",
  process.env.notion_database_id_blog_posts ? "SET" : "NOT SET"
);
console.log(
  "NOTION_DATABASE_ID_SERIES:",
  process.env.NOTION_DATABASE_ID_SERIES ? "SET" : "NOT SET"
);
console.log(
  "notion_database_id_series:",
  process.env.notion_database_id_series ? "SET" : "NOT SET"
);

// Check if we have at least one of each pair
const hasNotionApiKey =
  process.env.NOTION_API_KEY || process.env.notion_api_key;
const hasBlogPostsId =
  process.env.NOTION_DATABASE_ID_BLOG_POSTS ||
  process.env.notion_database_id_blog_posts;
const hasSeriesId =
  process.env.NOTION_DATABASE_ID_SERIES ||
  process.env.notion_database_id_series;

if (!hasNotionApiKey) {
  console.error("ERROR: No Notion API key found!");
  process.exit(1);
}

if (!hasBlogPostsId) {
  console.error("ERROR: No Blog Posts database ID found!");
  process.exit(1);
}

if (!hasSeriesId) {
  console.error("ERROR: No Series database ID found!");
  process.exit(1);
}

console.log("All required environment variables are set!");
