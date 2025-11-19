import { Client } from "@notionhq/client";
/**
 * Creates a configured Notion client with database IDs
 */
export function createNotionClient(config) {
    // Use environment variables as defaults
    const apiKey = (config === null || config === void 0 ? void 0 : config.apiKey) || process.env.NOTION_API_KEY;
    const blogPostsDatabaseId = (config === null || config === void 0 ? void 0 : config.blogPostsDatabaseId) || process.env.NOTION_DATABASE_ID_BLOG_POSTS;
    const seriesDatabaseId = (config === null || config === void 0 ? void 0 : config.seriesDatabaseId) || process.env.NOTION_DATABASE_ID_SERIES;
    const resourcesDatabaseId = (config === null || config === void 0 ? void 0 : config.resourcesDatabaseId) || process.env.NOTION_DATABASE_ID_RESOURCES;
    if (!apiKey) {
        throw new Error("Missing NOTION_API_KEY environment variable");
    }
    if (!blogPostsDatabaseId) {
        throw new Error("Missing NOTION_DATABASE_ID_BLOG_POSTS environment variable");
    }
    if (!seriesDatabaseId) {
        throw new Error("Missing NOTION_DATABASE_ID_SERIES environment variable");
    }
    const client = new Client({
        auth: apiKey,
    });
    return {
        client,
        blogPostsDatabaseId,
        seriesDatabaseId,
        resourcesDatabaseId,
    };
}
/**
 * Environment validation helper
 */
export function validateNotionEnvironment() {
    const apiKey = process.env.NOTION_API_KEY;
    const blogPostsDatabaseId = process.env.NOTION_DATABASE_ID_BLOG_POSTS;
    const seriesDatabaseId = process.env.NOTION_DATABASE_ID_SERIES;
    const resourcesDatabaseId = process.env.NOTION_DATABASE_ID_RESOURCES;
    if (!apiKey) {
        throw new Error("Missing NOTION_API_KEY environment variable");
    }
    if (!blogPostsDatabaseId) {
        throw new Error("Missing NOTION_DATABASE_ID_BLOG_POSTS environment variable");
    }
    if (!seriesDatabaseId) {
        throw new Error("Missing NOTION_DATABASE_ID_SERIES environment variable");
    }
    const base = {
        apiKey,
        blogPostsDatabaseId,
        seriesDatabaseId,
    };
    // With exactOptionalPropertyTypes, do not assign `undefined` to optional props.
    return resourcesDatabaseId ? { ...base, resourcesDatabaseId } : base;
}
