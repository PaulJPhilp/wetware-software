import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { ContentType, FocusArea, Post, Series } from "@wetware/shared";
import { unstable_cache } from "next/cache";
import { blogPostsDatabaseId, notion, seriesDatabaseId } from "./notion";

// Re-export shared types for backward compatibility
export type { ContentType, FocusArea, Post, Series };

/**
 * Fetches all series from the Series database
 */
export const getSeries = unstable_cache(
  async (): Promise<Series[]> => {
    try {
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

      return parseSeriesFromResponse(response.results as PageObjectResponse[]);
    } catch (error) {
      console.error("Error accessing Series database:", error);
      throw error;
    }
  },
  ["published-series"],
  { revalidate: 600 }, // Cache for 10 minutes (series change less frequently)
);

/**
 * Fetches a single series with its posts
 */
export const getSeriesWithPosts = unstable_cache(
  async (seriesSlug: string): Promise<{ series: Series; posts: Post[] } | null> => {
    try {
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
        return null;
      }

      const series = parseSeriesFromResponse(seriesResponse.results as PageObjectResponse[])[0];

      // Then get posts for this series
      const postsResponse = await notion.databases.query({
        database_id: blogPostsDatabaseId,
        filter: {
          and: [
            {
              property: "Published",
              checkbox: {
                equals: true,
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

      return { series, posts };
    } catch (error) {
      console.error("Error fetching series with posts:", error);
      throw error;
    }
  },
  ["series-with-posts"],
  { revalidate: 600 }, // Cache for 10 minutes (series content changes less frequently)
);

/**
 * Fetches published posts from the Blog Posts database (excluding about pages)
 */
export const getPublishedPosts = unstable_cache(
  async (): Promise<Post[]> => {
    try {
      const response = await notion.databases.query({
        database_id: blogPostsDatabaseId,
        filter: {
          and: [
            {
              property: "Published",
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
      });

      return parsePostsFromResponse(response.results as PageObjectResponse[]);
    } catch (error) {
      console.error("Error accessing Notion:", error);
      throw error;
    }
  },
  ["published-posts-excluding-about"],
  { revalidate: 300 }, // Cache for 5 minutes
);

/**
 * Fetches posts by content type (excluding about pages)
 */
export const getPostsByType = unstable_cache(
  async (contentType: ContentType): Promise<Post[]> => {
    try {
      const response = await notion.databases.query({
        database_id: blogPostsDatabaseId,
        filter: {
          and: [
            {
              property: "Published",
              checkbox: {
                equals: true,
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

      return parsePostsFromResponse(response.results as PageObjectResponse[]);
    } catch (error) {
      console.error(`Error fetching ${contentType} posts:`, error);
      throw error;
    }
  },
  ["posts-by-type-excluding-about"],
  { revalidate: 300 }, // Cache for 5 minutes
);

/**
 * Fetches recent posts with a limit for performance
 */
export const getRecentPosts = unstable_cache(
  async (limit: number = 10): Promise<Post[]> => {
    try {
      const response = await notion.databases.query({
        database_id: blogPostsDatabaseId,
        filter: {
          and: [
            {
              property: "Published",
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

      return parsePostsFromResponse(response.results as PageObjectResponse[]);
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      throw error;
    }
  },
  ["recent-posts"],
  { revalidate: 300 }, // Cache for 5 minutes
);

/**
 * Fetches featured posts for the home page
 */
export const getFeaturedPosts = unstable_cache(
  async (limit: number = 3): Promise<Post[]> => {
    try {
      const response = await notion.databases.query({
        database_id: blogPostsDatabaseId,
        filter: {
          and: [
            {
              property: "Published",
              checkbox: {
                equals: true,
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

      return parsePostsFromResponse(response.results as PageObjectResponse[]);
    } catch (error) {
      console.error("Error fetching featured posts:", error);
      throw error;
    }
  },
  ["featured-posts"],
  { revalidate: 300 }, // Cache for 5 minutes
);

/**
 * Fetches a single post's content by its page ID
 */
export const getPostContent = unstable_cache(
  async (pageId: string) => {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    return blocks;
  },
  ["post-content"],
  { revalidate: 600 }, // Cache for 10 minutes (content changes less frequently)
);

/**
 * Fetches a single post by its slug
 */
export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    try {
      const response = await notion.databases.query({
        database_id: blogPostsDatabaseId,
        filter: {
          and: [
            {
              property: "Published",
              checkbox: {
                equals: true,
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
      return posts.length > 0 ? posts[0] : null;
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      throw error;
    }
  },
  ["post-by-slug"],
  { revalidate: 300 }, // Cache for 5 minutes
);

/**
 * Helper function to parse series from Notion API response
 */
function parseSeriesFromResponse(pages: PageObjectResponse[]): Series[] {
  return pages
    .map((page) => {
      if (!("properties" in page)) {
        throw new Error("Invalid page object: missing properties");
      }

      const props = page.properties;

      // Use fallback values if properties are missing
      const nameProp = props.Name;
      const slugProp = props.Slug;
      const descProp = props.Description;
      const goalProp = props["Series Goal"];
      const statusProp = props.Status;
      const coverImageProp = props["Cover Image"];
      const coverLightProp = props["CoverImage-LightMode"];
      const coverDarkProp = props["CoverImage-DarkMode"];
      const postsRollupProp = props["Posts in Series"];
      const focusAreaProp = props["Focus Area"];
      const tagsProp = props.Tags;

      // Only parse if required properties exist and are correct type, else log and skip
      if (
        nameProp &&
        nameProp.type === "title" &&
        slugProp &&
        slugProp.type === "rich_text" &&
        descProp &&
        descProp.type === "rich_text" &&
        goalProp &&
        goalProp.type === "rich_text" &&
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

        // Check for separate light/dark cover properties first
        if (coverLightProp && coverLightProp.type === "rich_text" && coverLightProp.rich_text.length > 0) {
          const filename = coverLightProp.rich_text[0].plain_text;
          if (filename) {
            coverLight = `/images/series/${filename}`;
          }
        }

        if (coverDarkProp && coverDarkProp.type === "rich_text" && coverDarkProp.rich_text.length > 0) {
          const filename = coverDarkProp.rich_text[0].plain_text;
          if (filename) {
            _coverDark = `/images/series/${filename}`;
          }
        }

        // Fallback to single cover image property
        if (!coverLight && coverImageProp && coverImageProp.type === "files" && coverImageProp.files.length > 0) {
          const file = coverImageProp.files[0];
          if (file.type === "file") {
            coverLight = file.file.url;
          } else if (file.type === "external") {
            coverLight = file.external.url;
          }
        }

        // Also check for page-level cover image as final fallback
        if (!coverLight && page.cover) {
          if (page.cover.type === "external") {
            coverLight = page.cover.external.url;
          } else if (page.cover.type === "file") {
            coverLight = page.cover.file.url;
          }
        }

        // Log final resolved cover values (after applying all fallbacks)
        console.log(
          `Series "${nameProp.title[0]?.plain_text}": resolved coverLight=${coverLight}, coverDark=${_coverDark}`,
        );

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
          if (name === "active" || name === "in progress") normalizedStatus = "Active";
          else if (name === "completed" || name === "done") normalizedStatus = "Completed";
          else if (name === "draft" || name === "not started") normalizedStatus = "Draft";
        } else if (statusProp.type === "status") {
          const name = statusProp.status?.name?.toLowerCase() || "";
          if (name === "active" || name === "in progress") normalizedStatus = "Active";
          else if (name === "completed" || name === "done") normalizedStatus = "Completed";
          else if (name === "draft" || name === "not started") normalizedStatus = "Draft";
        }

        return {
          id: page.id,
          name: nameProp.title[0]?.plain_text || "",
          slug: slugProp.rich_text[0]?.plain_text || "",
          description: descProp.rich_text.map((rt) => rt.plain_text).join("") || "",
          seriesGoal: goalProp.rich_text.map((rt) => rt.plain_text).join("") || "",
          status: normalizedStatus,
          focusArea,
          tags,
          coverLight,
          coverDark: _coverDark,
          postCount,
        };
      } else {
        console.warn(
          "WARNING: Skipping series page due to missing or invalid required properties.",
          {
            nameProp,
            slugProp,
            descProp,
            goalProp,
            statusProp,
          },
        );
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
      throw new Error("Invalid page object: missing properties");
    }

    const props = page.properties;

    // Check for required properties
    if (
      !("Title" in props) ||
      !("Slug" in props) ||
      !("Published Date" in props) ||
      !("Content Type" in props) ||
      !("Description" in props) ||
      !("Tags" in props) ||
      !("Read Time" in props) ||
      !("Featured" in props)
    ) {
      throw new Error(
        `Missing required properties in Notion page. Required: Title, Slug, Published Date, Content Type, Description, Tags, Read Time, Featured. Found: ${Object.keys(
          props,
        ).join(", ")}`,
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

    // Validate required property types
    if (
      nameProp.type !== "title" ||
      slugProp.type !== "rich_text" ||
      dateProp.type !== "date" ||
      typeProp.type !== "select" ||
      descProp.type !== "rich_text" ||
      tagsProp.type !== "multi_select" ||
      readTimeProp.type !== "number" ||
      featuredProp.type !== "checkbox"
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

    if (seriesProp && seriesProp.type === "relation" && seriesProp.relation.length > 0) {
      seriesId = seriesProp.relation[0].id;
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
      const file = customIconProp.files[0];
      if (file.type === "file") {
        customIcon = file.file.url;
      } else if (file.type === "external") {
        customIcon = file.external.url;
      }
    }

    // Parse cover image
    let coverImage: string | undefined;
    if (coverImageProp && coverImageProp.type === "files" && coverImageProp.files.length > 0) {
      const file = coverImageProp.files[0];
      if (file.type === "file") {
        coverImage = file.file.url;
      } else if (file.type === "external") {
        coverImage = file.external.url;
      }
    }

    // Also check for page-level cover image
    if (!coverImage && page.cover) {
      if (page.cover.type === "external") {
        coverImage = page.cover.external.url;
      } else if (page.cover.type === "file") {
        coverImage = page.cover.file.url;
      }
    }

    return {
      id: page.id,
      name: nameProp.title[0]?.plain_text || "",
      slug: slugProp.rich_text[0]?.plain_text || "",
      publishDate:
        dateProp.type === "date" && dateProp.date
          ? new Date(dateProp.date.start).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          : "",
      type: (typeProp.select?.name as ContentType) || "Article",
      focusArea: (focusAreaProp?.select?.name as FocusArea) || "Tech-Centric",
      description: descProp.rich_text.map((rt) => rt.plain_text).join("") || "",
      tags:
        tagsProp.multi_select?.map((tag) => ({
          name: tag.name,
          color: tag.color,
        })) || [],
      readTime: readTimeProp.number || 0,
      featured: featuredProp.checkbox || false,
      seriesId,
      seriesName, // This will be populated when we fetch series data
      partNumber,
      githubLink,
      demoLink,
      sourceLink,
      curatorsNote,
      customIcon,
      coverImage,
    };
  });
}
