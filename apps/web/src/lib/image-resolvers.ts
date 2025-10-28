/**
 * Utilities used by server modules to derive cover image URLs from Notion.
 */
import { isFullBlock } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { access } from "node:fs/promises";
import path from "node:path";
import { notion } from "./notion";

/**
 * Compute theme-aware cover URLs from Notion page properties.
 *
 * @param page - Notion page containing cover metadata.
 * @param lightPropName - Rich text property backing the light theme cover.
 * @param darkPropName - Rich text property backing the dark theme cover.
 * @param fallbackPropName - Files property for fallback cover assets.
 * @returns Object containing resolved light and dark cover URLs.
 */
export function resolveNotionCoverImages(
  page: PageObjectResponse,
  lightPropName = "CoverImage-LightMode",
  darkPropName = "CoverImage-DarkMode",
  fallbackPropName = "Cover Image"
): { coverLight?: string; coverDark?: string } {
  if (!("properties" in page)) {
    return {};
  }

  const props = page.properties;
  let coverLight: string | undefined;
  let coverDark: string | undefined;

  const lightProp = props[lightPropName];
  const darkProp = props[darkPropName];

  if (lightProp?.type === "rich_text" && lightProp.rich_text.length > 0) {
    const firstLight = lightProp.rich_text[0];
    if (firstLight?.plain_text) {
      coverLight = `/images/series/${firstLight.plain_text}`;
    }
  }

  if (darkProp?.type === "rich_text" && darkProp.rich_text.length > 0) {
    const firstDark = darkProp.rich_text[0];
    if (firstDark?.plain_text) {
      coverDark = `/images/series/${firstDark.plain_text}`;
    }
  }

  if (!coverLight) {
    const coverProp = props[fallbackPropName];
    if (coverProp?.type === "files" && coverProp.files.length > 0) {
      const media = coverProp.files[0];
      if (media?.type === "file" && "file" in media && media.file?.url) {
        coverLight = media.file.url;
      } else if (media?.type === "external" && "external" in media && media.external?.url) {
        coverLight = media.external.url;
      }
    }
  }

  if (!coverLight && page.cover) {
    if (page.cover.type === "external") {
      coverLight = page.cover.external.url;
    } else if (page.cover.type === "file") {
      coverLight = page.cover.file.url;
    }
  }

  return {
    ...(coverLight ? { coverLight } : {}),
    ...(coverDark ? { coverDark } : {}),
  };
}

export async function getImageUrl(imagePath: string): Promise<string> {
  // If it's already a full URL, return it as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If it's a Notion file, construct the Notion URL
  if (imagePath.startsWith("notion://")) {
    const blockId = imagePath.replace("notion://", "");
    try {
      const block = await notion.blocks.retrieve({ block_id: blockId });
      if (isFullBlock(block) && block.type === "image" && block.image) {
        if (block.image.type === "external") {
          return block.image.external.url;
        }
        if (block.image.type === "file") {
          return block.image.file.url;
        }
      }
    } catch (error) {
      console.error("Error fetching Notion image block:", error);
    }
    // Fail if Notion image cannot be resolved
    throw new Error(`Unable to resolve Notion image for block ${blockId}`);
  }

  // Assume it's a local image path, prepend with /images/ if not already
  const normalized = imagePath.startsWith("/images/") ? imagePath : `/images/${imagePath}`;

  // Verify local file exists under public/
  try {
    const diskPath = path.join(process.cwd(), "public", normalized.replace(/^\//, ""));
    await access(diskPath);
  } catch {
    throw new Error(`Missing local image file: ${normalized}`);
  }

  return normalized;
}

/**
 * Resolve a single cover URL from Notion page properties.
 *
 * @param page - Notion page containing cover metadata.
 * @param propName - Files property used to store the cover asset.
 * @returns Cover image URL or undefined when unavailable.
 */
export function resolveNotionCoverImage(
  page: PageObjectResponse,
  propName = "Cover Image"
): string | undefined {
  if (!("properties" in page)) {
    return;
  }

  const props = page.properties;
  const coverProp = props[propName];

  if (coverProp?.type === "files" && coverProp.files.length > 0) {
    const media = coverProp.files[0];
    if (!media) {
      return;
    }
    if (media.type === "file" && "file" in media && media.file?.url) {
      return media.file.url;
    }
    if (media.type === "external" && "external" in media && media.external?.url) {
      return media.external.url;
    }
  }

  if (page.cover) {
    if (page.cover.type === "external") {
      return page.cover.external.url;
    }
    if (page.cover.type === "file") {
      return page.cover.file.url;
    }
  }

  return;
}
