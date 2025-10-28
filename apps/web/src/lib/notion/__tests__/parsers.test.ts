// lib/notion/__tests__/parsers.test.ts
/**
 * Tests for Notion parsing functions
 */

import { describe, expect, test } from "vitest";
import { NotionParsingError, NotionPropertyMissingError } from "../errors";
import {
  parsePostFromPage,
  parsePostPublished,
  parsePostSeries,
  parsePostsFromResponse,
  parsePostSlug,
  parsePostTags,
  parsePostTitle,
  parseSeriesFromPage,
  parseSeriesFromResponse,
  safeExtractProperty,
} from "../parsers";
import {
  createMockPage,
  invalidNotionPage,
  mockNotionPage,
  mockNotionSeriesPage,
} from "./test-utils";

describe("Individual Property Parsers", () => {
  describe("parsePostTitle", () => {
    test("extracts valid title", () => {
      const result = parsePostTitle(mockNotionPage);
      expect(result).toBe("Test Post Title");
    });

    test("throws error for missing title", () => {
      const pageWithoutTitle = createMockPage({
        properties: {
          ...mockNotionPage.properties,
          Name: { type: "title", title: [] },
        },
      });

      expect(() => parsePostTitle(pageWithoutTitle)).toThrow(NotionParsingError);
    });
  });

  describe("parsePostSlug", () => {
    test("extracts valid slug", () => {
      const result = parsePostSlug(mockNotionPage);
      expect(result).toBe("test-post-slug");
    });

    test("throws error for missing slug", () => {
      const pageWithoutSlug = createMockPage({
        properties: {
          ...mockNotionPage.properties,
          Slug: { type: "rich_text", rich_text: [] },
        },
      });

      expect(() => parsePostSlug(pageWithoutSlug)).toThrow(NotionParsingError);
    });
  });

  describe("parsePostTags", () => {
    test("extracts tags as string array", () => {
      const result = parsePostTags(mockNotionPage);
      expect(result).toEqual(["React", "TypeScript"]);
    });

    test("returns empty array for missing tags", () => {
      const pageWithoutTags = createMockPage({
        properties: {
          ...mockNotionPage.properties,
          Tags: { type: "multi_select", multi_select: [] },
        },
      });

      const result = parsePostTags(pageWithoutTags);
      expect(result).toEqual([]);
    });
  });

  describe("parsePostSeries", () => {
    test("extracts series name", () => {
      const result = parsePostSeries(mockNotionPage);
      expect(result).toBe("Test Series");
    });

    test("returns null for missing series", () => {
      const pageWithoutSeries = createMockPage();
      // Remove Series property by overriding
      const properties = { ...pageWithoutSeries.properties };
      delete (properties as Record<string, unknown>).Series;
      pageWithoutSeries.properties = properties as typeof pageWithoutSeries.properties;

      const result = parsePostSeries(pageWithoutSeries);
      expect(result).toBe(null);
    });
  });

  describe("parsePostPublished", () => {
    test("extracts published status", () => {
      const result = parsePostPublished(mockNotionPage);
      expect(result).toBe(true);
    });

    test("returns false for missing published property", () => {
      const pageWithoutPublished = createMockPage({
        properties: {
          ...mockNotionPage.properties,
          Published: { type: "checkbox", checkbox: false },
        },
      });

      const result = parsePostPublished(pageWithoutPublished);
      expect(result).toBe(false);
    });
  });
});

describe("safeExtractProperty", () => {
  test("extracts property successfully", () => {
    const extractor = (prop: unknown) => {
      if (prop && typeof prop === "object" && "type" in prop && prop.type === "title") {
        return "extracted";
      }
      return null;
    };

    const result = safeExtractProperty(mockNotionPage, "Name", extractor);
    expect(result).toBe("extracted");
  });

  test("returns null for missing optional property", () => {
    const extractor = () => "extracted";
    const result = safeExtractProperty(mockNotionPage, "NonExistent", extractor, false);
    expect(result).toBe(null);
  });

  test("throws error for missing required property", () => {
    const extractor = () => "extracted";

    expect(() => safeExtractProperty(mockNotionPage, "NonExistent", extractor, true)).toThrow(
      NotionPropertyMissingError
    );
  });

  test("handles extractor errors gracefully", () => {
    const failingExtractor = () => {
      throw new Error("Extractor failed");
    };

    const result = safeExtractProperty(mockNotionPage, "Name", failingExtractor, false);
    expect(result).toBe(null);
  });

  test("propagates errors for required properties", () => {
    const failingExtractor = () => {
      throw new Error("Extractor failed");
    };

    expect(() => safeExtractProperty(mockNotionPage, "Name", failingExtractor, true)).toThrow(
      "Extractor failed"
    );
  });
});

describe("Complete Object Parsers", () => {
  describe("parsePostFromPage", () => {
    test("parses complete post object", () => {
      const result = parsePostFromPage(mockNotionPage);

      expect(result).toEqual({
        id: "test-page-id-123",
        title: "Test Post Title",
        slug: "test-post-slug",
        summary: "This is a test post summary",
        tags: ["React", "TypeScript"],
        series: "Test Series",
        published: true,
        featured: false,
        date: "2024-01-01",
        order: 1,
        url: "https://notion.so/test-page",
        createdTime: "2024-01-01T00:00:00.000Z",
        lastEditedTime: "2024-01-02T00:00:00.000Z",
      });
    });

    test("handles missing optional properties", () => {
      const minimalPage = createMockPage({
        properties: {
          Name: { type: "title", title: [{ plain_text: "Minimal Post" }] },
          Slug: { type: "rich_text", rich_text: [{ plain_text: "minimal-post" }] },
          Summary: { type: "rich_text", rich_text: [] },
          Tags: { type: "multi_select", multi_select: [] },
          Series: { type: "select", select: { name: "" } },
          Published: { type: "checkbox", checkbox: false },
          Featured: { type: "checkbox", checkbox: false },
          Date: { type: "date", date: { start: "" } },
          Order: { type: "number", number: 0 },
        },
      });

      const result = parsePostFromPage(minimalPage);

      expect(result.title).toBe("Minimal Post");
      expect(result.slug).toBe("minimal-post");
      expect(result.summary).toBe("");
      expect(result.tags).toEqual([]);
      expect(result.published).toBe(false);
    });

    test("throws error for invalid page", () => {
      expect(() => parsePostFromPage(invalidNotionPage)).toThrow(NotionPropertyMissingError);
    });
  });

  describe("parseSeriesFromPage", () => {
    test("parses complete series object", () => {
      const result = parseSeriesFromPage(mockNotionSeriesPage);

      expect(result).toEqual({
        id: "test-series-id-456",
        title: "Test Series Title",
        slug: "test-series-slug",
        description: "This is a test series description",
        tags: ["Tutorial", "Advanced"],
        published: true,
        featured: true,
        order: 2,
        url: "https://notion.so/test-series",
        createdTime: "2024-01-01T00:00:00.000Z",
        lastEditedTime: "2024-01-02T00:00:00.000Z",
      });
    });
  });
});

describe("Batch Parsing Functions", () => {
  describe("parsePostsFromResponse", () => {
    test("parses array of posts", () => {
      const database = {
        results: [mockNotionPage],
      };

      const result = parsePostsFromResponse(database);

      expect(result).toHaveLength(1);
      const first = result[0];
      expect(first).toBeDefined();
      if (!first) {
        return;
      }
      expect(first.title).toBe("Test Post Title");
      expect(first.slug).toBe("test-post-slug");
    });

    test("handles mixed valid and invalid pages", () => {
      const database = {
        results: [mockNotionPage, invalidNotionPage],
      };

      const result = parsePostsFromResponse(database);

      // Should return only valid posts, skipping invalid ones
      expect(result).toHaveLength(1);
      const first = result[0];
      expect(first).toBeDefined();
      if (!first) {
        return;
      }
      expect(first.title).toBe("Test Post Title");
    });

    test("returns empty array for no results", () => {
      const database = { results: [] };
      const result = parsePostsFromResponse(database);
      expect(result).toEqual([]);
    });
  });

  describe("parseSeriesFromResponse", () => {
    test("parses array of series", () => {
      const database = {
        results: [mockNotionSeriesPage],
      };

      const result = parseSeriesFromResponse(database);

      expect(result).toHaveLength(1);
      const first = result[0];
      expect(first).toBeDefined();
      if (!first) {
        return;
      }
      expect(first.title).toBe("Test Series Title");
      expect(first.slug).toBe("test-series-slug");
    });

    test("handles parsing errors gracefully", () => {
      const database = {
        results: [mockNotionSeriesPage, invalidNotionPage],
      };

      const result = parseSeriesFromResponse(database);

      // Should return only valid series, skipping invalid ones
      expect(result).toHaveLength(1);
      const first = result[0];
      expect(first).toBeDefined();
      if (!first) {
        return;
      }
      expect(first.title).toBe("Test Series Title");
    });
  });
});
