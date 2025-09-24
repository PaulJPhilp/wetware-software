import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { ContentType, FocusArea, Post, Series } from "@wetware/shared";
import { unstable_cache } from "next/cache";
import { blogPostsDatabaseId, notion, seriesDatabaseId } from "./notion";
import { NotionError, NotionPropertyMissingError, NotionQueryError } from "./notion/errors";
import { createTimer, logger } from "./notion/logger";
import type { FeaturedSeries, FeaturedArticle } from "@/lib/types";
import {
  resolveNotionCoverImages,
  resolveNotionCoverImage,
} from "./image-resolvers";

// Re-export shared types for backward compatibility
export type { ContentType, FocusArea, Post, Series, FeaturedSeries, FeaturedArticle };

/**
 * Helper function to format dates consistently to avoid hydration mismatches
 * Uses UTC to ensure server and client produce the same output
 */
function formatDate(date: Date): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

/**
 * Fetches all series from the Series database
 */
export const getSeries = unstable_cache(
  async (): Promise<Series[]> => {
    const timer = createTimer();
    try {
      logger.info("Fetching all published series", { databaseId: seriesDatabaseId });

      const response = await notion.databases.query({
        database_id: seriesDatabaseId,
        filter: {
          property: "Status",
          status: {
            does_not_equal: "Draft",
          },
        },
        sorts: [
          {
            property: "Name",
            direction: "ascending",
          },
        ],
      });

      const series = parseSeriesFromResponse(response.results as PageObjectResponse[]);

      logger.info("Successfully fetched series", {
        count: series.length,
        elapsed: timer.elapsed()
      });

      return series;
    } catch (error) {
      logger.error("Error accessing Series database", error, {
        databaseId: seriesDatabaseId,
        elapsed: timer.elapsed()
      });

      if (error instanceof Error) {
        throw new NotionQueryError("Failed to fetch series", {
          databaseId: seriesDatabaseId,
          cause: error
        });
      }
      throw error;
    }
  },
  ["published-series"],
  { revalidate: 600 }, // Cache for 10 minutes (series change less frequently)
);

/**
 * Internal function to fetch a single series with its posts
 */
async function _getSeriesWithPosts(seriesSlug: string): Promise<{ series: Series; posts: Post[] } | null> {
  const timer = createTimer();
  try {
    logger.info("Fetching series with posts", { seriesSlug, databaseId: seriesDatabaseId });

    // First get the series
    const seriesResponse = await notion.databases.query({
      database_id: seriesDatabaseId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: seriesSlug,
        },
      },
    });

    if (seriesResponse.results.length === 0) {
      logger.info("Series not found", { seriesSlug, elapsed: timer.elapsed() });
      return null;
    }

    const series = parseSeriesFromResponse(seriesResponse.results as PageObjectResponse[])[0];

    if (!series) {
      throw new NotionError("Failed to parse series from response", { seriesSlug });
    }

    // Then get posts for this series
    const postsResponse = await notion.databases.query({
      database_id: blogPostsDatabaseId,
      filter: {
        and: [
          {
            property: "Published Date",
            date: {
              is_not_empty: true,
            },
          },
          {
            property: "Blog Series",
            relation: {
              contains: series.id,
            },
          },
        ],
      },
      sorts: [
        {
          property: "Part Number",
          direction: "ascending",
        },
      ],
    });

    const posts = parsePostsFromResponse(postsResponse.results as PageObjectResponse[]);

    logger.info("Successfully fetched series with posts", {
      seriesSlug,
      seriesId: series.id,
      postCount: posts.length,
      elapsed: timer.elapsed()
    });

    return { series, posts };
  } catch (error) {
    logger.error("Error fetching series with posts", error, {
      seriesSlug: seriesSlug,
      elapsed: timer.elapsed()
    });

    if (error instanceof NotionError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new NotionQueryError("Failed to fetch series with posts", {
        seriesSlug,
        cause: error
      });
    }
    throw error;
  }
}

/**
 * Fetches a single series with its posts
 */
export function getSeriesWithPosts(seriesSlug: string) {
  logger.info("getSeriesWithPosts called", { seriesSlug });
  return unstable_cache(
    () => _getSeriesWithPosts(seriesSlug),
    [`series-with-posts-${seriesSlug}`],
    { revalidate: 600 }
  )();
}

/**
 * Fetches published posts from the Blog Posts database (excluding about pages)
 */
export const getPublishedPosts = unstable_cache(
  async (): Promise<Post[]> => {
    const timer = createTimer();
    try {
      //logger.debug("Fetching published posts", { databaseId: blogPostsDatabaseId });

      const response = await notion.databases.query({
        database_id: blogPostsDatabaseId,
        filter: {
          and: [
            {
              property: "Published Date",
              date: {
                is_not_empty: true,
              },
            },
            {
              property: "Slug",
              rich_text: {
                does_not_contain: "about",
              },
            },
            {
              property: "Title",
              title: {
                does_not_contain: "about",
              },
            },
          ],
        },
        sorts: [
          {
            property: "Published Date",
            direction: "descending",
          },
        ],
      });

      const posts = parsePostsFromResponse(response.results as PageObjectResponse[]);

      /***
       * logger.info("Successfully fetched published posts", {
        count: posts.length,
        elapsed: timer.elapsed()
      });
      ***/

      return posts;
    } catch (error) {
      logger.error("Error accessing Notion", error, {
        databaseId: blogPostsDatabaseId,
        elapsed: timer.elapsed()
      });

      if (error instanceof Error) {
        throw new NotionQueryError("Failed to fetch published posts", {
          databaseId: blogPostsDatabaseId,
          cause: error
        });
      }
      throw error;
    }
  },
  ["published-posts-excluding-about"],
  { revalidate: 300 }, // Cache for 5 minutes
);

/**
 * Internal function to fetch posts by content type (excluding about pages)
 */
async function _getPostsByType(contentType: ContentType): Promise<Post[]> {
  const timer = createTimer();
  try {
    // logger.debug("Fetching posts by type", { contentType, databaseId: blogPostsDatabaseId });

    const response = await notion.databases.query({
      database_id: blogPostsDatabaseId,
      filter: {
        and: [
          {
            property: "Published Date",
            date: {
              is_not_empty: true,
            },
          },
          {
            property: "Content Type",
            select: {
              equals: contentType,
            },
          },
          {
            property: "Slug",
            rich_text: {
              does_not_contain: "about",
            },
          },
          {
            property: "Title",
            title: {
              does_not_contain: "about",
            },
          },
        ],
      },
      sorts: [
        {
          property: "Published Date",
          direction: "descending",
        },
      ],
    });

    const posts = parsePostsFromResponse(response.results as PageObjectResponse[]);

    /***
    logger.info("Successfully fetched posts by type", {
      contentType,
      count: posts.length,
      elapsed: timer.elapsed()
    });
    ***/

    return posts;
  } catch (error) {
    logger.error(`Error fetching ${contentType} posts`, error, {
      contentType,
      databaseId: blogPostsDatabaseId,
      elapsed: timer.elapsed()
    });

    if (error instanceof Error) {
      throw new NotionQueryError(`Failed to fetch ${contentType} posts`, {
        contentType,
        databaseId: blogPostsDatabaseId,
        cause: error
      });
    }
    throw error;
  }
}

/**
 * Fetches posts by content type (excluding about pages)
 */
export function getPostsByType(contentType: ContentType) {
  return unstable_cache(
    () => _getPostsByType(contentType),
    [`posts-by-type-${contentType}`],
    { revalidate: 300 }
  )();
}

/**
 * Internal function to fetch recent posts with a limit for performance
 */
async function _getRecentPosts(limit: number = 10): Promise<Post[]> {
  const timer = createTimer();
  try {
    logger.info("Fetching recent posts", { limit, databaseId: blogPostsDatabaseId });

    const response = await notion.databases.query({
      database_id: blogPostsDatabaseId,
      filter: {
        and: [
          {
            property: "Published Date",
            date: {
              is_not_empty: true,
            },
          },
          {
            property: "Slug",
            rich_text: {
              does_not_contain: "about",
            },
          },
          {
            property: "Title",
            title: {
              does_not_contain: "about",
            },
          },
        ],
      },
      sorts: [
        {
          property: "Published Date",
          direction: "descending",
        },
      ],
      page_size: limit,
    });

    const posts = parsePostsFromResponse(response.results as PageObjectResponse[]);

    /***
    logger.info("Successfully fetched recent posts", {
      limit,
      count: posts.length,
      elapsed: timer.elapsed()
    });
    ***/

    return posts;
  } catch (error) {
    logger.error("Error fetching recent posts", error, {
      limit,
      databaseId: blogPostsDatabaseId,
      elapsed: timer.elapsed()
    });

    if (error instanceof Error) {
      throw new NotionQueryError("Failed to fetch recent posts", {
        limit,
        databaseId: blogPostsDatabaseId,
        cause: error
      });
    }
    throw error;
  }
}

/**
 * Fetches recent posts with a limit for performance
 */
export function getRecentPosts(limit: number = 10) {
  return unstable_cache(
    () => _getRecentPosts(limit),
    [`recent-posts-${limit}`],
    { revalidate: 300 }
  )();
}

/**
 * Internal function to fetch featured posts for the home page
 */
async function _getFeaturedPosts(limit: number = 3): Promise<Post[]> {
  const timer = createTimer();
  try {
    logger.info("Fetching featured posts", { limit, databaseId: blogPostsDatabaseId });

    const response = await notion.databases.query({
      database_id: blogPostsDatabaseId,
      filter: {
        and: [
          {
            property: "Published Date",
            date: {
              is_not_empty: true,
            },
          },
          {
            property: "Featured",
            checkbox: {
              equals: true,
            },
          },
          {
            property: "Slug",
            rich_text: {
              does_not_contain: "about",
            },
          },
          {
            property: "Title",
            title: {
              does_not_contain: "about",
            },
          },
        ],
      },
      sorts: [
        {
          property: "Published Date",
          direction: "descending",
        },
      ],
      page_size: limit,
    });

    const posts = parsePostsFromResponse(response.results as PageObjectResponse[]);

    /***
    logger.info("Successfully fetched featured posts", {
      limit,
      count: posts.length,
      elapsed: timer.elapsed()
    });
    ***/

    return posts;
  } catch (error) {
    logger.error("Error fetching featured posts", error, {
      limit,
      databaseId: blogPostsDatabaseId,
      elapsed: timer.elapsed()
    });

    if (error instanceof Error) {
      throw new NotionQueryError("Failed to fetch featured posts", {
        limit,
        databaseId: blogPostsDatabaseId,
        cause: error
      });
    }
    throw error;
  }
}

/**
 * Fetches a single post's content by its page ID.
 * Notion returns blocks in pages (default 100). We paginate until complete.
 */
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function getPostContent(pageId: string) {
  const results: BlockObjectResponse[] = [];
  let startCursor: string | undefined;

  // Paginate through all child blocks
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const request = {
      block_id: pageId,
      page_size: 100,
      ...(startCursor ? { start_cursor: startCursor } : {}),
    } satisfies Parameters<typeof notion.blocks.children.list>[0];

    const page = await notion.blocks.children.list(request);

    results.push(
      ...page.results.filter(
        (block): block is BlockObjectResponse =>
          (block as BlockObjectResponse).object === "block"
      )
    );

    if (page.has_more && page.next_cursor) {
      startCursor = page.next_cursor;
    } else {
      break;
    }
  }

  // Preserve the previous shape expected by callers: { results: BlockObjectResponse[] }
  return { results };
}

/**
 * Internal function to fetch a single post by its slug
 */
async function _getPostBySlug(slug: string): Promise<Post | null> {
  const timer = createTimer();
  try {
    logger.debug("Fetching post by slug", { slug, databaseId: blogPostsDatabaseId });

    const response = await notion.databases.query({
      database_id: blogPostsDatabaseId,
      filter: {
        and: [
          {
            property: "Published Date",
            date: {
              is_not_empty: true,
            },
          },
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
        ],
      },
    });

    const posts = parsePostsFromResponse(response.results as PageObjectResponse[]);
    const post = posts[0];
    if (!post) {
      return null;
    }

    /***
    logger.info("Successfully fetched post by slug", {
      slug,
      found: !!post,
      postId: post?.id,
      elapsed: timer.elapsed()
    });
    ***/

    return post;
  } catch (error) {
    logger.error("Error fetching post by slug", error, {
      slug,
      databaseId: blogPostsDatabaseId,
      elapsed: timer.elapsed()
    });
    if (error instanceof Error) {
      throw new NotionQueryError("Failed to fetch post by slug", {
        slug,
        databaseId: blogPostsDatabaseId,
        cause: error
      });
    }


    if (error instanceof Error) {
      throw new NotionQueryError("Failed to fetch post by slug", {
        slug,
        databaseId: blogPostsDatabaseId,
        cause: error
      });
    }
    throw error;
  }
}

/**
 * Fetches a single post by its slug
 */
export function getPostBySlug(slug: string) {
  return unstable_cache(
    () => _getPostBySlug(slug),
    [`post-by-slug-${slug}`],
    { revalidate: 300 }
  )();
}

/**
 * Helper function to parse series from Notion API response
 */
function parseSeriesFromResponse(pages: PageObjectResponse[]): Series[] {
  return pages
    .map((page) => {
      if (!("properties" in page)) {
        throw new NotionError("Invalid page object: missing properties", { page });
      }

      const props = page.properties;

      // Use fallback values if properties are missing
      const nameProp = props.Name;
      const slugProp = props.Slug;
      const descProp = props.Description;
      const blogTopicsProp = props["Series Goal"];
      const statusProp = props.Status;
      const coverImageProp = props["Cover Image"];
      const coverLightProp = props["CoverImage-LightMode"];
      const coverDarkProp = props["CoverImage-DarkMode"];
      const postsRollupProp = props["Posts in Series"];
      const focusAreaProp = props["Focus Area"];
      const tagsProp = props.Tags;
      const publishedDateProp = props["Published Date"];

      // Only parse if required properties exist and are correct type, else log and skip
      if (
        nameProp &&
        nameProp.type === "title" &&
        slugProp &&
        slugProp.type === "rich_text" &&
        descProp &&
        descProp.type === "rich_text" &&
        blogTopicsProp &&
        blogTopicsProp.type === "rich_text" &&
        statusProp &&
        (statusProp.type === "select" || statusProp.type === "status")
      ) {
        // Get post count from rollup if available
        let postCount = 0;
        if (
          postsRollupProp &&
          postsRollupProp.type === "rollup" &&
          postsRollupProp.rollup.type === "array"
        ) {
          postCount = postsRollupProp.rollup.array.length;
        }

        // Get cover image URLs if available
        let coverLight: string | undefined;
        let _coverDark: string | undefined;

        // Use the new utility function
        const resolvedCovers = resolveNotionCoverImages(page);
        coverLight = resolvedCovers.coverLight;
        _coverDark = resolvedCovers.coverDark;

        // Final resolved cover values are available in coverLight / _coverDark

        // Parse Focus Area
        let focusArea: FocusArea = "Human-Centric"; // Default fallback
        if (focusAreaProp && focusAreaProp.type === "select" && focusAreaProp.select?.name) {
          focusArea = focusAreaProp.select.name as FocusArea;
        }

        // Parse Tags
        let tags: { name: string; color: string }[] = [];
        if (tagsProp && tagsProp.type === "multi_select") {
          tags = tagsProp.multi_select.map((tag) => ({
            name: tag.name,
            color: tag.color || "default",
          }));
        }

        // Normalize Notion status -> app status
        let normalizedStatus: Series["status"] = "Draft";
        if (statusProp.type === "select") {
          const name = statusProp.select?.name?.toLowerCase() || "";
          if (name === "active" || name === "in progress" || name === "not started") normalizedStatus = "Active";
          else if (name === "completed" || name === "done") normalizedStatus = "Completed";
          else if (name === "draft") normalizedStatus = "Draft";
        } else if (statusProp.type === "status") {
          const name = statusProp.status?.name?.toLowerCase() || "";
          if (name === "active" || name === "in progress" || name === "not started") normalizedStatus = "Active";
          else if (name === "completed" || name === "done") normalizedStatus = "Completed";
          else if (name === "draft") normalizedStatus = "Draft";
        }

        // Parse Published Date
        let publishedDate: string | undefined;
        if (publishedDateProp && publishedDateProp.type === "date" && publishedDateProp.date?.start) {
          publishedDate = publishedDateProp.date.start;
        }

        return {
          id: page.id,
          name: nameProp.title[0]?.plain_text || "",
          slug: slugProp.rich_text[0]?.plain_text || "",
          description: descProp.rich_text.map((rt) => rt.plain_text).join("") || "",
          seriesGoal: blogTopicsProp.rich_text.map((rt) => rt.plain_text).join("") || "",
          status: normalizedStatus,
          focusArea,
          tags,
          coverLight,
          coverDark: _coverDark,
          postCount,
          publishedDate,
        };
      } else {
        logger.warn("Skipping series page due to missing or invalid required properties", {
          pageId: page.id,
          hasName: !!nameProp && nameProp.type === "title",
          hasSlug: !!slugProp && slugProp.type === "rich_text",
          hasDescription: !!descProp && descProp.type === "rich_text",
          hasSeriesGoal: !!blogTopicsProp && blogTopicsProp.type === "rich_text",
          hasStatus: !!statusProp && (statusProp.type === "select" || statusProp.type === "status"),
        });
        return null;
      }
    })
    .filter(Boolean) as Series[];
}

/**
 * Helper function to parse posts from Notion API response
 */
function parsePostsFromResponse(pages: PageObjectResponse[]): Post[] {
  return pages.map((page) => {
    if (!("properties" in page)) {
      throw new NotionError("Invalid page object: missing properties", { page });
    }

    const props = page.properties;

    // Check for required properties
    const requiredProps = ["Title", "Slug", "Published Date", "Content Type", "Description", "Tags", "Read Time", "Featured"];
    const missingProps = requiredProps.filter(prop => !(prop in props));

    if (missingProps.length > 0) {
      throw new NotionPropertyMissingError(
        missingProps.join(", "), // All missing properties
        page.id
      );
    }

    const nameProp = props.Title;
    const slugProp = props.Slug;
    const dateProp = props["Published Date"];
    const typeProp = props["Content Type"];
    const focusAreaProp = props["Focus Area"]; // Optional
    const descProp = props.Description;
    const tagsProp = props.Tags;
    const readTimeProp = props["Read Time"];
    const featuredProp = props.Featured;

    // Optional properties
    const seriesProp = props["Blog Series"];
    const partNumberProp = props["Part Number"];
    const githubLinkProp = props["GitHub Link"];
    const demoLinkProp = props["Demo Link"];
    const sourceLinkProp = props["Source Link"];
    const curatorsNoteProp = props["Curator's Note"];
    const customIconProp = props.Icon;
    const coverImageProp = props["Cover Image"];
    const skillsProp = (props as Record<string, unknown>).Skills;
    const currentFocusProp = (props as Record<string, unknown>)["Current Focus"];
    const blogTopicsProp = (props as Record<string, unknown>)["Blog Topics"];

    // Validate required property types
    if (
      nameProp?.type !== "title" ||
      slugProp?.type !== "rich_text" ||
      dateProp?.type !== "date" ||
      typeProp?.type !== "select" ||
      descProp?.type !== "rich_text" ||
      tagsProp?.type !== "multi_select" ||
      readTimeProp?.type !== "number" ||
      featuredProp?.type !== "checkbox"
    ) {
      throw new Error("Invalid property types in Notion page");
    }

    // Validate optional Focus Area property if it exists
    if (focusAreaProp && focusAreaProp.type !== "select") {
      throw new Error("Invalid Focus Area property type in Notion page");
    }

    // Parse series information
    let seriesId: string | undefined;
    let seriesName: string | undefined;
    let partNumber: number | undefined;

    if (seriesProp?.type === "relation") {
      const relationEntry = seriesProp.relation?.[0];
      if (relationEntry) {
        seriesId = relationEntry.id;
      }
    }

    if (partNumberProp && partNumberProp.type === "number" && partNumberProp.number !== null) {
      partNumber = partNumberProp.number;
    }

    // Parse external links
    let githubLink: string | undefined;
    let demoLink: string | undefined;
    let sourceLink: string | undefined;

    if (githubLinkProp && githubLinkProp.type === "url" && githubLinkProp.url) {
      githubLink = githubLinkProp.url;
    }

    if (demoLinkProp && demoLinkProp.type === "url" && demoLinkProp.url) {
      demoLink = demoLinkProp.url;
    }

    if (sourceLinkProp && sourceLinkProp.type === "url" && sourceLinkProp.url) {
      sourceLink = sourceLinkProp.url;
    }

    // Parse resource-specific fields
    let curatorsNote: string | undefined;
    let customIcon: string | undefined;

    if (curatorsNoteProp && curatorsNoteProp.type === "rich_text") {
      curatorsNote = curatorsNoteProp.rich_text.map((rt) => rt.plain_text).join("") || undefined;
    }

    if (customIconProp && customIconProp.type === "files" && customIconProp.files.length > 0) {
      const iconFile = customIconProp.files[0];
      if (!iconFile) {
        // Should not happen because we checked length, but appease TypeScript
      } else if (iconFile.type === "file") {
        customIcon = iconFile.file.url;
      } else if (iconFile.type === "external") {
        customIcon = iconFile.external.url;
      }
    }

    // Parse cover image with fallback to page cover
    const coverImage = resolveNotionCoverImage(page);

    // Parse optional arrays
    let skills: string[] | undefined;
    if (
      skillsProp &&
      typeof skillsProp === "object" &&
      "type" in skillsProp &&
      skillsProp.type === "multi_select" &&
      "multi_select" in skillsProp &&
      Array.isArray((skillsProp as { multi_select: { name: string }[] }).multi_select)
    ) {
      skills = (skillsProp as { multi_select: { name: string }[] }).multi_select.map((t) => t.name);
    }

    let currentFocus: string[] | undefined;
    if (
      currentFocusProp &&
      typeof currentFocusProp === "object" &&
      "type" in currentFocusProp &&
      currentFocusProp.type === "multi_select"
    ) {
      currentFocus = ((currentFocusProp as unknown) as { multi_select: { name: string }[] }).multi_select.map((t) => t.name);
    }

    let blogTopics: string[] | undefined;
    if (
      blogTopicsProp &&
      typeof blogTopicsProp === "object" &&
      "type" in blogTopicsProp &&
      typeof (blogTopicsProp as { type: string }).type === "string"
    ) {
      if ((blogTopicsProp as { type: string }).type === "multi_select") {
        blogTopics = ((blogTopicsProp as unknown) as { multi_select: { name: string }[] }).multi_select.map((t: { name: string }) => t.name);
      } else if ((blogTopicsProp as { type: string }).type === "rich_text") {
        const text = ((blogTopicsProp as unknown) as { rich_text: { plain_text: string }[] }).rich_text
          .map((rt: { plain_text: string }) => rt.plain_text)
          .join("")
          .trim();
        blogTopics = text ? [text] : undefined;
      }
    }

    // Build and return the Post object
    const publishDate = dateProp.date?.start ? formatDate(new Date(dateProp.date.start)) : "";
    const tags =
      tagsProp.multi_select?.map((tag) => ({
        name: tag.name,
        color: tag.color || "default",
      })) ?? [];
    const description = descProp.rich_text.map((rt) => rt.plain_text).join("");

    const post: Post = {
      id: page.id,
      name: nameProp.title[0]?.plain_text ?? "",
      slug: slugProp.rich_text[0]?.plain_text ?? "",
      publishDate,
      type: (typeProp.select?.name as ContentType) ?? "Article",
      focusArea: (focusAreaProp?.select?.name as FocusArea) ?? "Tech-Centric",
      description,
      tags,
      readTime: readTimeProp.number ?? 0,
      featured: featuredProp.checkbox ?? false,
      ...(seriesId !== undefined ? { seriesId } : {}),
      ...(seriesName !== undefined ? { seriesName } : {}),
      ...(partNumber !== undefined ? { partNumber } : {}),
      ...(githubLink !== undefined ? { githubLink } : {}),
      ...(demoLink !== undefined ? { demoLink } : {}),
      ...(sourceLink !== undefined ? { sourceLink } : {}),
      ...(curatorsNote !== undefined ? { curatorsNote } : {}),
      ...(customIcon !== undefined ? { customIcon } : {}),
      ...(coverImage !== undefined ? { coverImage } : {}),
      ...(skills !== undefined ? { skills } : {}),
      ...(currentFocus !== undefined ? { currentFocus } : {}),
      ...(blogTopics !== undefined ? { blogTopics } : {}),
    };

    return post;
  });
}

/**
 * Fetches the About page and its content blocks from Notion
 */
export const getAboutPage = unstable_cache(
  async (): Promise<{ post: Post; blocks: { results: BlockObjectResponse[] } } | null> => {
    try {
      const response = await notion.databases.query({
        database_id: blogPostsDatabaseId,
        filter: {
          and: [
            {
              property: "Published Date",
              date: {
                is_not_empty: true,
              },
            },
            {
              property: "Slug",
              rich_text: { equals: "about" },
            },
            {
              property: "Title",
              title: { equals: "About" },
            },
          ],
        },
        sorts: [
          {
            property: "Published Date",
            direction: "descending",
          },
        ],
        page_size: 1,
      });

      const posts = parsePostsFromResponse(response.results as PageObjectResponse[]);

      const [post] = posts;
      if (!post) {
        return null;
      }

      const blocks = await getPostContent(post.id);
      return { post, blocks };
    } catch (error) {
      console.error("Error fetching About page:", error);
      throw error;
    }
  },
  ["about-page"],
  { revalidate: 600 }, // Cache for 10 minutes
);

/**
 * Featured Series types for the blog homepage
 * These match the FeaturedSeries component interfaces
 */


/**
 * Internal function to fetch featured series with their articles for the homepage
 * Returns series marked as "Active" or "Completed" with published posts
 */
async function _getFeaturedSeries(limit: number = 3) {
  const timer = createTimer();
  try {
    logger.debug("Fetching featured series", { limit });
    // Get all series first (fetch more than limit to allow for filtering)
    const seriesResponse = await notion.databases.query({
      database_id: seriesDatabaseId,
      filter: {
        property: "Published Date",
        date: {
          is_not_empty: true,
        },
      },
      sorts: [
        {
          property: "Name",
          direction: "ascending",
        },
      ],
      page_size: limit * 2, // Fetch more to allow for filtering
    });

    const allSeries = parseSeriesFromResponse(seriesResponse.results as PageObjectResponse[]);

    // For each series, check if it has published posts and collect results
    const seriesWithPostsPromises = allSeries.map(async (s) => {
      try {
        // Query posts for this series by presence of a Published Date
        const postsResponse = await notion.databases.query({
          database_id: blogPostsDatabaseId,
          filter: {
            and: [
              {
                property: "Published Date",
                date: {
                  is_not_empty: true,
                },
              },
              {
                property: "Blog Series",
                relation: {
                  contains: s.id,
                },
              },
            ],
          },
          sorts: [
            {
              property: "Part Number",
              direction: "ascending",
            },
          ],
        });

        const posts = parsePostsFromResponse(postsResponse.results as PageObjectResponse[]);

        // Only return series that have published posts
        if (posts.length > 0) {
          const transformedPosts = transformToFeaturedSeries(s, posts);
          logger.debug("Series has published posts", {
            seriesId: s.id,
            seriesName: s.name,
            postCount: posts.length,
            transformedPostCount: transformedPosts.articles.length
          });
          transformedPosts.articles.map((p) => logger.debug("  Article:", { id: p.id, title: p.title, part: p.part }));
          return transformedPosts;
        }
        return null;
      } catch (error: unknown) {
        logger.error(`Error fetching posts for series "${s.name}"`, error, { seriesId: s.id });
        return null;
      }
    });

    const featuredSeriesResults = await Promise.all(seriesWithPostsPromises);

    // Filter out null results and limit to requested number
    const featuredSeries = featuredSeriesResults
      .filter((result): result is FeaturedSeries => result !== null)
      .slice(0, limit);

    logger.info("Successfully fetched featured series", {
      limit,
      count: featuredSeries.length,
      elapsed: timer.elapsed()
    });

    return featuredSeries;
  } catch (error: unknown) {
    logger.error("Error fetching featured series", error, {
      limit,
      elapsed: timer.elapsed()
    });
    // Return empty array as fallback instead of throwing
    return [];
  }
}

/**
 * Fetches featured series with their articles for the homepage
 * Returns series marked as "Active" or "Completed" with published posts
 */
export function getFeaturedSeries(limit: number = 3) {
  return unstable_cache(
    () => _getFeaturedSeries(limit),
    [`featured-series-${limit}`],
    { revalidate: 600 }
  )();
}

/**
 * Transforms Notion Series and Posts data into FeaturedSeries format
 */
function transformToFeaturedSeries(series: Series, posts: Post[]): FeaturedSeries {
  const imageUrl =
    series.coverLight ??
    series.coverDark ??
    `https://picsum.photos/seed/${series.id}/300/150`;

  logger.debug("Transforming series to featured series", {
    seriesId: series.id,
    seriesName: series.name,
    coverLight: series.coverLight,
    coverDark: series.coverDark,
    imageUrl,
    postCount: posts.length
  });

  // Transform posts to featured articles
  const articles: FeaturedArticle[] = posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.name,
    description: post.description,
    part: post.partNumber || 1,
  }));

  return {
    id: series.id,
    slug: series.slug,
    title: series.name,
    imageUrl,
    ...(series.coverLight ? { coverLight: series.coverLight } : {}),
    ...(series.coverDark ? { coverDark: series.coverDark } : {}),
    articles,
  };
}

/**
 * Fetches featured posts for the home page
 */
export function getFeaturedPosts(limit: number = 3) {
  return unstable_cache(
    () => _getFeaturedPosts(limit),
    [`featured-posts-${limit}`],
    { revalidate: 300 }
  )();
}
