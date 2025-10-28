// lib/notion/__tests__/test-utils.ts
/**
 * Test utilities for Notion module tests
 * Provides mock data and helper functions for consistent testing
 */

// Mock Notion API responses for testing
export const mockNotionPage = {
  id: "test-page-id-123",
  url: "https://notion.so/test-page",
  created_time: "2024-01-01T00:00:00.000Z",
  last_edited_time: "2024-01-02T00:00:00.000Z",
  properties: {
    Name: {
      type: "title",
      title: [{ plain_text: "Test Post Title" }],
    },
    Slug: {
      type: "rich_text",
      rich_text: [{ plain_text: "test-post-slug" }],
    },
    Summary: {
      type: "rich_text",
      rich_text: [{ plain_text: "This is a test post summary" }],
    },
    Tags: {
      type: "multi_select",
      multi_select: [
        { name: "React", color: "blue" },
        { name: "TypeScript", color: "orange" },
      ],
    },
    Series: {
      type: "select",
      select: { name: "Test Series" },
    },
    Published: {
      type: "checkbox",
      checkbox: true,
    },
    Featured: {
      type: "checkbox",
      checkbox: false,
    },
    Date: {
      type: "date",
      date: { start: "2024-01-01" },
    },
    Order: {
      type: "number",
      number: 1,
    },
  },
};

export const mockNotionSeriesPage = {
  id: "test-series-id-456",
  url: "https://notion.so/test-series",
  created_time: "2024-01-01T00:00:00.000Z",
  last_edited_time: "2024-01-02T00:00:00.000Z",
  properties: {
    Name: {
      type: "title",
      title: [{ plain_text: "Test Series Title" }],
    },
    Slug: {
      type: "rich_text",
      rich_text: [{ plain_text: "test-series-slug" }],
    },
    Description: {
      type: "rich_text",
      rich_text: [{ plain_text: "This is a test series description" }],
    },
    Tags: {
      type: "multi_select",
      multi_select: [
        { name: "Tutorial", color: "green" },
        { name: "Advanced", color: "red" },
      ],
    },
    Published: {
      type: "checkbox",
      checkbox: true,
    },
    Featured: {
      type: "checkbox",
      checkbox: true,
    },
    Order: {
      type: "number",
      number: 2,
    },
  },
};

export const mockNotionDatabase = {
  results: [mockNotionPage, mockNotionSeriesPage],
};

// Helper functions for creating test data variations
export function createMockPage(overrides: Partial<typeof mockNotionPage> = {}) {
  return {
    ...mockNotionPage,
    ...overrides,
    properties: {
      ...mockNotionPage.properties,
      ...(overrides.properties || {}),
    },
  } as typeof mockNotionPage;
}
export function createMockProperty(type: string, value: unknown) {
  return { type, [type]: value };
}

// Invalid/malformed data for error testing
export const invalidNotionPage = {
  id: "invalid-page-id",
  properties: {
    Name: null, // Invalid title
    Slug: { type: "rich_text", rich_text: null }, // Invalid rich text
    Tags: { type: "multi_select" }, // Missing multi_select property
    Published: { type: "checkbox" }, // Missing checkbox property
  },
};

// Mock console methods for testing logging
export function mockConsole() {
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
  };

  const mockMethods = {
    log: (() => {}) as typeof console.log,
    warn: (() => {}) as typeof console.warn,
    error: (() => {}) as typeof console.error,
    debug: (() => {}) as typeof console.debug,
  };

  // Replace console methods
  Object.assign(console, mockMethods);

  return {
    restore: () => Object.assign(console, originalConsole),
    mocks: mockMethods,
  };
}

// Simple spy function for testing
export function createSpy<T extends (...args: unknown[]) => unknown>(
  implementation?: T
): T & { calls: Parameters<T>[] } {
  const calls: Parameters<T>[] = [];
  const spy = ((...args: Parameters<T>) => {
    calls.push(args);
    return implementation?.(...args);
  }) as T & { calls: Parameters<T>[] };

  spy.calls = calls;
  return spy;
}

// Environment setup for tests
export function setupTestEnvironment() {
  const originalEnv = process.env.NODE_ENV;

  // Set test environment (cast to any to bypass readonly check)
  (process.env as Record<string, string>).NODE_ENV = "test";

  return {
    cleanup: () => {
      (process.env as Record<string, string>).NODE_ENV = originalEnv || "development";
    },
  };
}
