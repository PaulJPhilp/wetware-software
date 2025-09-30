import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

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

const EnvSchema = z
  .object({
    NOTION_API_KEY: z.string().trim().min(1).optional(),
    notion_api_key: z.string().trim().min(1).optional(),
    NOTION_DATABASE_ID_BLOG_POSTS: z.string().trim().min(1).optional(),
    notion_database_id_blog_posts: z.string().trim().min(1).optional(),
    NOTION_DATABASE_ID_SERIES: z.string().trim().min(1).optional(),
    notion_database_id_series: z.string().trim().min(1).optional(),
  })
  .superRefine((env, ctx) => {
    if (!env.NOTION_API_KEY && !env.notion_api_key) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide NOTION_API_KEY or notion_api_key with a non-empty value.",
        path: ["NOTION_API_KEY"],
      });
    }

    if (!env.NOTION_DATABASE_ID_BLOG_POSTS && !env.notion_database_id_blog_posts) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide NOTION_DATABASE_ID_BLOG_POSTS or notion_database_id_blog_posts.",
        path: ["NOTION_DATABASE_ID_BLOG_POSTS"],
      });
    }

    if (!env.NOTION_DATABASE_ID_SERIES && !env.notion_database_id_series) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide NOTION_DATABASE_ID_SERIES or notion_database_id_series.",
        path: ["NOTION_DATABASE_ID_SERIES"],
      });
    }
  });

const result = EnvSchema.safeParse(process.env);

if (!result.success) {
  for (const issue of result.error.issues) {
    console.error("ENV ERROR:", issue.message);
  }
  process.exit(1);
}

const vars = result.data;

console.log("All required environment variables are set!", {
  apiKeyVariant: vars.NOTION_API_KEY ? "upper" : "lower",
  postsIdVariant: vars.NOTION_DATABASE_ID_BLOG_POSTS ? "upper" : "lower",
  seriesIdVariant: vars.NOTION_DATABASE_ID_SERIES ? "upper" : "lower",
});
