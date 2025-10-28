// lib/notion/type-guards.ts
/**
 * Type guards for Notion API property validation
 * Provides runtime type checking with proper TypeScript type narrowing
 */

// PropertyValueMap type from Notion API - define locally since it's not exported
export type PropertyValueMap = Record<string, unknown>;

// Notion property type interfaces
export interface NotionTitleProperty {
  type: "title";
  title: Array<{ plain_text: string }>;
}

export interface NotionRichTextProperty {
  type: "rich_text";
  rich_text: Array<{ plain_text: string }>;
}

export interface NotionSelectProperty {
  type: "select";
  select: { name: string } | null;
}

export interface NotionStatusProperty {
  type: "status";
  status: { name: string } | null;
}

export interface NotionMultiSelectProperty {
  type: "multi_select";
  multi_select: Array<{ name: string; color?: string }>;
}

export interface NotionDateProperty {
  type: "date";
  date: { start: string; end?: string | null } | null;
}

export interface NotionNumberProperty {
  type: "number";
  number: number | null;
}

export interface NotionCheckboxProperty {
  type: "checkbox";
  checkbox: boolean;
}

export interface NotionRelationProperty {
  type: "relation";
  relation: Array<{ id: string }>;
}

export interface NotionFilesProperty {
  type: "files";
  files: Array<{
    type: "file" | "external";
    file?: { url: string };
    external?: { url: string };
  }>;
}

export interface NotionUrlProperty {
  type: "url";
  url: string | null;
}

export interface NotionRollupProperty {
  type: "rollup";
  rollup:
    | {
        type: "array";
        array: Array<unknown>;
      }
    | { type: string };
}

// Type guard functions
export function isValidTitleProperty(prop: unknown): prop is NotionTitleProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "title" &&
    "title" in prop &&
    Array.isArray(prop.title)
  );
}

export function isValidRichTextProperty(prop: unknown): prop is NotionRichTextProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "rich_text" &&
    "rich_text" in prop &&
    Array.isArray(prop.rich_text)
  );
}

export function isValidSelectProperty(prop: unknown): prop is NotionSelectProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "select" &&
    "select" in prop &&
    (prop.select === null || (typeof prop.select === "object" && "name" in prop.select))
  );
}

export function isValidStatusProperty(prop: unknown): prop is NotionStatusProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "status" &&
    "status" in prop &&
    (prop.status === null || (typeof prop.status === "object" && "name" in prop.status))
  );
}

export function isValidMultiSelectProperty(prop: unknown): prop is NotionMultiSelectProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "multi_select" &&
    "multi_select" in prop &&
    Array.isArray(prop.multi_select)
  );
}

export function isValidDateProperty(prop: unknown): prop is NotionDateProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "date" &&
    "date" in prop &&
    (prop.date === null || (typeof prop.date === "object" && "start" in prop.date))
  );
}

export function isValidNumberProperty(prop: unknown): prop is NotionNumberProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "number" &&
    "number" in prop &&
    (typeof prop.number === "number" || prop.number === null)
  );
}

export function isValidCheckboxProperty(prop: unknown): prop is NotionCheckboxProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "checkbox" &&
    "checkbox" in prop &&
    typeof prop.checkbox === "boolean"
  );
}

export function isValidRelationProperty(prop: unknown): prop is NotionRelationProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "relation" &&
    "relation" in prop &&
    Array.isArray(prop.relation)
  );
}

export function isValidFilesProperty(prop: unknown): prop is NotionFilesProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "files" &&
    "files" in prop &&
    Array.isArray(prop.files)
  );
}

export function isValidUrlProperty(prop: unknown): prop is NotionUrlProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "url" &&
    "url" in prop &&
    (typeof prop.url === "string" || prop.url === null)
  );
}

export function isValidRollupProperty(prop: unknown): prop is NotionRollupProperty {
  return (
    typeof prop === "object" &&
    prop !== null &&
    "type" in prop &&
    prop.type === "rollup" &&
    "rollup" in prop &&
    typeof prop.rollup === "object" &&
    prop.rollup !== null &&
    "type" in prop.rollup
  );
}

// Helper functions for extracting property values safely
export function extractTitle(prop: unknown): string {
  if (!isValidTitleProperty(prop)) {
    return "";
  }
  return prop.title[0]?.plain_text || "";
}

export function extractRichText(prop: unknown): string {
  if (!isValidRichTextProperty(prop)) {
    return "";
  }
  return prop.rich_text.map((rt) => rt.plain_text).join("") || "";
}

export function extractSelectName(prop: unknown): string | undefined {
  if (!isValidSelectProperty(prop)) {
    return;
  }
  return prop.select?.name;
}

export function extractStatusName(prop: unknown): string | undefined {
  if (!isValidStatusProperty(prop)) {
    return;
  }
  return prop.status?.name;
}

export function extractMultiSelectNames(prop: unknown): Array<{ name: string; color: string }> {
  if (!isValidMultiSelectProperty(prop)) {
    return [];
  }
  return prop.multi_select.map((tag) => ({
    name: tag.name,
    color: tag.color || "default",
  }));
}

export function extractDate(prop: unknown): string | undefined {
  if (!isValidDateProperty(prop)) {
    return;
  }
  return prop.date?.start;
}

export function extractNumber(prop: unknown): number | undefined {
  if (!isValidNumberProperty(prop)) {
    return;
  }
  return prop.number ?? undefined;
}

export function extractCheckbox(prop: unknown): boolean {
  if (!isValidCheckboxProperty(prop)) {
    return false;
  }
  return prop.checkbox;
}

export function extractRelationIds(prop: unknown): string[] {
  if (!isValidRelationProperty(prop)) {
    return [];
  }
  return prop.relation.map((rel) => rel.id);
}

export function extractFileUrl(prop: unknown): string | undefined {
  if (!isValidFilesProperty(prop) || prop.files.length === 0) {
    return;
  }

  const file = prop.files[0];
  if (!file) {
    return;
  }
  if (file.type === "file" && file.file?.url) {
    return file.file.url;
  }
  if (file.type === "external" && file.external?.url) {
    return file.external.url;
  }

  return;
}

export function extractUrl(prop: unknown): string | undefined {
  if (!isValidUrlProperty(prop)) {
    return;
  }
  return prop.url ?? undefined;
}

export function extractRollupArrayLength(prop: unknown): number {
  if (!isValidRollupProperty(prop) || prop.rollup.type !== "array") {
    return 0;
  }
  const rollup = prop.rollup as { type: "array"; array: unknown[] };
  return rollup.array.length;
}

// Validation helpers
export function validateRequiredProperties(
  properties: PropertyValueMap,
  requiredProps: Array<{ name: string; type: string }>
): void {
  for (const { name, type } of requiredProps) {
    const prop = properties[name];
    if (!prop) {
      throw new Error(`Missing required property: ${name}`);
    }

    if (typeof prop === "object" && prop !== null && "type" in prop) {
      if (prop.type !== type) {
        throw new Error(`Invalid property type for ${name}. Expected: ${type}, Got: ${prop.type}`);
      }
    } else {
      throw new Error(`Invalid property structure for ${name}`);
    }
  }
}
