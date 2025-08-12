import { Client } from "@notionhq/client";

if (!process.env.NOTION_API_KEY) {
	throw new Error("Missing NOTION_API_KEY environment variable");
}

if (!process.env.NOTION_DATABASE_ID_BLOG_POSTS) {
	throw new Error("Missing NOTION_DATABASE_ID_BLOG_POSTS environment variable");
}

if (!process.env.NOTION_DATABASE_ID_SERIES) {
	throw new Error("Missing NOTION_DATABASE_ID_SERIES environment variable");
}

export const notion = new Client({
	auth: process.env.NOTION_API_KEY,
});

export const blogPostsDatabaseId = process.env.NOTION_DATABASE_ID_BLOG_POSTS;
export const seriesDatabaseId = process.env.NOTION_DATABASE_ID_SERIES;
