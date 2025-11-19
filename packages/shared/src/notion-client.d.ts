import { Client } from "@notionhq/client";
import type { NotionConfig } from "./types";
/**
 * Creates a configured Notion client with database IDs
 */
export declare function createNotionClient(config?: Partial<NotionConfig>): {
    client: Client;
    blogPostsDatabaseId: string;
    seriesDatabaseId: string;
    resourcesDatabaseId: string | undefined;
};
/**
 * Environment validation helper
 */
export declare function validateNotionEnvironment(): NotionConfig;
