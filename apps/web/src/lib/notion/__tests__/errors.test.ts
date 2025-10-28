// lib/notion/__tests__/errors.test.ts
/**
 * Tests for Notion error classes
 */

import { describe, expect, test } from "vitest";
import {
  NotionError,
  NotionParsingError,
  NotionPropertyMissingError,
  NotionPropertyTypeError,
  NotionQueryError,
  NotionValidationError,
} from "../errors";

describe("NotionError", () => {
  test("creates basic error with message", () => {
    const error = new NotionError("Test error message");

    expect(error.message).toBe("Test error message");
    expect(error.name).toBe("NotionError");
    expect(error.context).toEqual({});
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(NotionError);
  });

  test("creates error with context", () => {
    const context = { pageId: "123", property: "title" };
    const error = new NotionError("Test error", context);

    expect(error.message).toBe("Test error");
    expect(error.context).toEqual(context);
  });

  test("has proper stack trace", () => {
    const error = new NotionError("Test error");

    expect(error.stack).toBeDefined();
    expect(error.stack).toContain("NotionError");
  });
});

describe("NotionParsingError", () => {
  test("creates parsing error with context", () => {
    const context = { pageId: "123", field: "title" };
    const error = new NotionParsingError("Failed to parse title", context);

    expect(error.message).toBe("Failed to parse title");
    expect(error.name).toBe("NotionParsingError");
    expect(error.context).toEqual(context);
    expect(error).toBeInstanceOf(NotionError);
    expect(error).toBeInstanceOf(NotionParsingError);
  });
});

describe("NotionQueryError", () => {
  test("creates query error with context", () => {
    const context = { database: "posts", filter: "published" };
    const error = new NotionQueryError("Query failed", context);

    expect(error.message).toBe("Query failed");
    expect(error.name).toBe("NotionQueryError");
    expect(error.context).toEqual(context);
    expect(error).toBeInstanceOf(NotionError);
  });
});

describe("NotionValidationError", () => {
  test("creates validation error with property", () => {
    const error = new NotionValidationError("Invalid slug", "slug");

    expect(error.message).toBe("Invalid slug");
    expect(error.name).toBe("NotionValidationError");
    expect(error.context).toEqual({ property: "slug" });
    expect(error.property).toBe("slug");
  });
});
describe("NotionPropertyMissingError", () => {
  test("creates property missing error", () => {
    const error = new NotionPropertyMissingError("Title", "page-123");

    expect(error.message).toBe("Missing required property: Title");
    expect(error.name).toBe("NotionPropertyMissingError");
    expect(error.context).toEqual({
      property: "Title",
      pageId: "page-123",
    });
  });

  test("creates property missing error without page ID", () => {
    const error = new NotionPropertyMissingError("Title");

    expect(error.message).toBe("Missing required property: Title");
    expect(error.context).toEqual({
      property: "Title",
      pageId: undefined,
    });
  });
});

describe("NotionPropertyTypeError", () => {
  test("creates property type error", () => {
    const error = new NotionPropertyTypeError("Title", "title", "rich_text");

    expect(error.message).toBe("Invalid property type for Title. Expected: title, Got: rich_text");
    expect(error.name).toBe("NotionPropertyTypeError");
    expect(error.context).toEqual({
      property: "Title",
      expectedType: "title",
      actualType: "rich_text",
    });
  });

  test("creates property type error with different types", () => {
    const error = new NotionPropertyTypeError("Published", "checkbox", "rich_text");

    expect(error.message).toBe(
      "Invalid property type for Published. Expected: checkbox, Got: rich_text"
    );
    expect(error.context).toEqual({
      property: "Published",
      expectedType: "checkbox",
      actualType: "rich_text",
    });
  });
});

describe("Error serialization", () => {
  test("errors can be serialized and contain expected properties", () => {
    const error = new NotionParsingError("Parse failed", { pageId: "123" });

    // Test direct property access
    expect(error.message).toBe("Parse failed");
    expect(error.name).toBe("NotionParsingError");
    expect(error.context).toEqual({ pageId: "123" });

    // Test that properties exist for serialization
    expect(error).toHaveProperty("message");
    expect(error).toHaveProperty("name");
    expect(error).toHaveProperty("context");
  });

  test("errors maintain instanceof relationship after recreation", () => {
    const originalError = new NotionQueryError("Query failed", { database: "posts" });

    // Test that we can recreate the error with same properties
    const recreated = new NotionQueryError(originalError.message, originalError.context);

    expect(recreated).toBeInstanceOf(NotionError);
    expect(recreated).toBeInstanceOf(NotionQueryError);
    expect(recreated.message).toBe(originalError.message);
    expect(recreated.context).toEqual(originalError.context);
  });
});
