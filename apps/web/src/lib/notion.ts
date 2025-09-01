import { createNotionClient } from "@wetware/shared";

const {
  client: notion,
  blogPostsDatabaseId,
  seriesDatabaseId,
} = createNotionClient();

export { blogPostsDatabaseId, notion, seriesDatabaseId };
