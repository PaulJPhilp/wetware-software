// lib/notion/__tests__/type-guards.test.ts
/**
 * Tests for Notion type guards and extractors
 */

import { describe, expect, test } from "vitest";
import {
  extractCheckbox,
  extractDate,
  extractMultiSelectNames,
  extractNumber,
  extractRichText,
  extractSelectName,
  extractTitle,
  isValidCheckboxProperty,
  isValidDateProperty,
  isValidMultiSelectProperty,
  isValidNumberProperty,
  isValidRichTextProperty,
  isValidSelectProperty,
  isValidTitleProperty,
  validateRequiredProperties,
} from "../type-guards";
import { mockNotionPage } from "./test-utils";

describe("Type Guards", () => {
  describe("isValidTitleProperty", () => {
    test("validates correct title property", () => {
      const titleProp = {
        type: "title",
        title: [{ plain_text: "Test Title" }],
      };

      expect(isValidTitleProperty(titleProp)).toBe(true);
    });

    test("rejects invalid title property", () => {
      expect(isValidTitleProperty(null)).toBe(false);
      expect(isValidTitleProperty({ type: "rich_text" })).toBe(false);
      expect(isValidTitleProperty({ type: "title" })).toBe(false);
      expect(isValidTitleProperty({ type: "title", title: "not-array" })).toBe(false);
    });
  });

  describe("isValidRichTextProperty", () => {
    test("validates correct rich text property", () => {
      const richTextProp = {
        type: "rich_text",
        rich_text: [{ plain_text: "Test text" }],
      };

      expect(isValidRichTextProperty(richTextProp)).toBe(true);
    });

    test("rejects invalid rich text property", () => {
      expect(isValidRichTextProperty(null)).toBe(false);
      expect(isValidRichTextProperty({ type: "title" })).toBe(false);
      expect(isValidRichTextProperty({ type: "rich_text" })).toBe(false);
      expect(isValidRichTextProperty({ type: "rich_text", rich_text: "not-array" })).toBe(false);
    });
  });

  describe("isValidMultiSelectProperty", () => {
    test("validates correct multi-select property", () => {
      const multiSelectProp = {
        type: "multi_select",
        multi_select: [{ name: "Tag1", color: "blue" }],
      };

      expect(isValidMultiSelectProperty(multiSelectProp)).toBe(true);
    });

    test("rejects invalid multi-select property", () => {
      expect(isValidMultiSelectProperty(null)).toBe(false);
      expect(isValidMultiSelectProperty({ type: "select" })).toBe(false);
      expect(isValidMultiSelectProperty({ type: "multi_select" })).toBe(false);
      expect(isValidMultiSelectProperty({ type: "multi_select", multi_select: "not-array" })).toBe(
        false,
      );
    });
  });

  describe("isValidSelectProperty", () => {
    test("validates correct select property", () => {
      const selectProp = {
        type: "select",
        select: { name: "Option1" },
      };

      expect(isValidSelectProperty(selectProp)).toBe(true);
    });

    test("accepts null select value", () => {
      const selectProp = {
        type: "select",
        select: null,
      };

      expect(isValidSelectProperty(selectProp)).toBe(true);
    });

    test("rejects invalid select property", () => {
      expect(isValidSelectProperty(null)).toBe(false);
      expect(isValidSelectProperty({ type: "multi_select" })).toBe(false);
      expect(isValidSelectProperty({ type: "select" })).toBe(false);
    });
  });

  describe("isValidCheckboxProperty", () => {
    test("validates correct checkbox property", () => {
      const checkboxProp = {
        type: "checkbox",
        checkbox: true,
      };

      expect(isValidCheckboxProperty(checkboxProp)).toBe(true);
    });

    test("accepts false checkbox value", () => {
      const checkboxProp = {
        type: "checkbox",
        checkbox: false,
      };

      expect(isValidCheckboxProperty(checkboxProp)).toBe(true);
    });

    test("rejects invalid checkbox property", () => {
      expect(isValidCheckboxProperty(null)).toBe(false);
      expect(isValidCheckboxProperty({ type: "select" })).toBe(false);
      expect(isValidCheckboxProperty({ type: "checkbox" })).toBe(false);
      expect(isValidCheckboxProperty({ type: "checkbox", checkbox: "not-boolean" })).toBe(false);
    });
  });

  describe("isValidDateProperty", () => {
    test("validates correct date property", () => {
      const dateProp = {
        type: "date",
        date: { start: "2024-01-01" },
      };

      expect(isValidDateProperty(dateProp)).toBe(true);
    });

    test("accepts null date value", () => {
      const dateProp = {
        type: "date",
        date: null,
      };

      expect(isValidDateProperty(dateProp)).toBe(true);
    });

    test("rejects invalid date property", () => {
      expect(isValidDateProperty(null)).toBe(false);
      expect(isValidDateProperty({ type: "rich_text" })).toBe(false);
      expect(isValidDateProperty({ type: "date" })).toBe(false);
    });
  });

  describe("isValidNumberProperty", () => {
    test("validates correct number property", () => {
      const numberProp = {
        type: "number",
        number: 42,
      };

      expect(isValidNumberProperty(numberProp)).toBe(true);
    });

    test("accepts null number value", () => {
      const numberProp = {
        type: "number",
        number: null,
      };

      expect(isValidNumberProperty(numberProp)).toBe(true);
    });

    test("rejects invalid number property", () => {
      expect(isValidNumberProperty(null)).toBe(false);
      expect(isValidNumberProperty({ type: "rich_text" })).toBe(false);
      expect(isValidNumberProperty({ type: "number" })).toBe(false);
    });
  });
});

describe("Property Extractors", () => {
  describe("extractTitle", () => {
    test("extracts title from valid property", () => {
      const titleProp = {
        type: "title",
        title: [{ plain_text: "Test Title" }],
      };

      expect(extractTitle(titleProp)).toBe("Test Title");
    });

    test("returns empty string for empty title array", () => {
      const titleProp = {
        type: "title",
        title: [],
      };

      expect(extractTitle(titleProp)).toBe("");
    });

    test("returns empty string for invalid property", () => {
      expect(extractTitle(null)).toBe("");
      expect(extractTitle({ type: "rich_text" })).toBe("");
    });
  });

  describe("extractRichText", () => {
    test("extracts rich text from valid property", () => {
      const richTextProp = {
        type: "rich_text",
        rich_text: [{ plain_text: "Hello " }, { plain_text: "World" }],
      };

      expect(extractRichText(richTextProp)).toBe("Hello World");
    });

    test("returns empty string for empty rich text array", () => {
      const richTextProp = {
        type: "rich_text",
        rich_text: [],
      };

      expect(extractRichText(richTextProp)).toBe("");
    });

    test("returns empty string for invalid property", () => {
      expect(extractRichText(null)).toBe("");
      expect(extractRichText({ type: "title" })).toBe("");
    });
  });

  describe("extractMultiSelectNames", () => {
    test("extracts multi-select options with names and colors", () => {
      const multiSelectProp = {
        type: "multi_select",
        multi_select: [
          { name: "React", color: "blue" },
          { name: "TypeScript", color: "orange" },
        ],
      };

      const result = extractMultiSelectNames(multiSelectProp);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ name: "React", color: "blue" });
      expect(result[1]).toEqual({ name: "TypeScript", color: "orange" });
    });

    test("returns empty array for empty multi-select", () => {
      const multiSelectProp = {
        type: "multi_select",
        multi_select: [],
      };

      expect(extractMultiSelectNames(multiSelectProp)).toEqual([]);
    });

    test("returns empty array for invalid property", () => {
      expect(extractMultiSelectNames(null)).toEqual([]);
      expect(extractMultiSelectNames({ type: "select" })).toEqual([]);
    });
  });

  describe("extractSelectName", () => {
    test("extracts select option name", () => {
      const selectProp = {
        type: "select",
        select: { name: "Active" },
      };

      expect(extractSelectName(selectProp)).toBe("Active");
    });

    test("returns undefined for null select value", () => {
      const selectProp = {
        type: "select",
        select: null,
      };

      expect(extractSelectName(selectProp)).toBeUndefined();
    });

    test("returns undefined for invalid property", () => {
      expect(extractSelectName(null)).toBeUndefined();
      expect(extractSelectName({ type: "multi_select" })).toBeUndefined();
    });
  });

  describe("extractCheckbox", () => {
    test("extracts checkbox value", () => {
      const checkboxProp = {
        type: "checkbox",
        checkbox: true,
      };

      expect(extractCheckbox(checkboxProp)).toBe(true);
    });

    test("extracts false checkbox value", () => {
      const checkboxProp = {
        type: "checkbox",
        checkbox: false,
      };

      expect(extractCheckbox(checkboxProp)).toBe(false);
    });

    test("returns false for invalid property", () => {
      expect(extractCheckbox(null)).toBe(false);
      expect(extractCheckbox({ type: "select" })).toBe(false);
    });
  });

  describe("extractDate", () => {
    test("extracts date start value", () => {
      const dateProp = {
        type: "date",
        date: { start: "2024-01-01" },
      };

      expect(extractDate(dateProp)).toBe("2024-01-01");
    });

    test("returns undefined for null date value", () => {
      const dateProp = {
        type: "date",
        date: null,
      };

      expect(extractDate(dateProp)).toBeUndefined();
    });

    test("returns undefined for invalid property", () => {
      expect(extractDate(null)).toBeUndefined();
      expect(extractDate({ type: "rich_text" })).toBeUndefined();
    });
  });

  describe("extractNumber", () => {
    test("extracts number value", () => {
      const numberProp = {
        type: "number",
        number: 42,
      };

      expect(extractNumber(numberProp)).toBe(42);
    });

    test("returns undefined for null number value", () => {
      const numberProp = {
        type: "number",
        number: null,
      };

      expect(extractNumber(numberProp)).toBeUndefined();
    });

    test("returns undefined for invalid property", () => {
      expect(extractNumber(null)).toBeUndefined();
      expect(extractNumber({ type: "rich_text" })).toBeUndefined();
    });
  });
});

describe("validateRequiredProperties", () => {
  test("validates all required properties exist", () => {
    const properties = mockNotionPage.properties;
    const requiredProps = [
      { name: "Name", type: "title" },
      { name: "Slug", type: "rich_text" },
      { name: "Published", type: "checkbox" },
    ];

    expect(() => validateRequiredProperties(properties, requiredProps)).not.toThrow();
  });

  test("throws error for missing required property", () => {
    const properties = mockNotionPage.properties;
    const requiredProps = [
      { name: "Name", type: "title" },
      { name: "MissingProperty", type: "rich_text" },
    ];

    expect(() => validateRequiredProperties(properties, requiredProps)).toThrow(
      "Missing required property: MissingProperty",
    );
  });

  test("throws error for wrong property type", () => {
    const properties = mockNotionPage.properties;
    const requiredProps = [
      { name: "Name", type: "rich_text" }, // Wrong type, should be 'title'
    ];

    expect(() => validateRequiredProperties(properties, requiredProps)).toThrow(
      "Invalid property type for Name. Expected: rich_text, Got: title",
    );
  });
});
