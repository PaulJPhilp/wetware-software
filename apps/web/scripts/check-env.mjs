import fs from "node:fs";
import path from "node:path";

// Load .env files locally so prebuild can validate env vars before Next.js loads them
function loadEnvFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return 0;
    const content = fs.readFileSync(filePath, "utf8");
    let count = 0;
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const idx = line.indexOf("=");
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) {
        process.env[key] = value;
        count++;
      }
    }
    return count;
  } catch {
    return 0;
  }
}

const cwd = process.cwd();
const isCI =
  process.env.CI === "true" ||
  process.env.VERCEL === "1" ||
  process.env.GITHUB_ACTIONS === "true" ||
  process.env.NETLIFY === "true";

// Always try .env; only load .env.local when not running in CI
loadEnvFile(path.join(cwd, ".env"));
if (!isCI) {
  loadEnvFile(path.join(cwd, ".env.local"));
}

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
