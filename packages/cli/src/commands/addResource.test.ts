/** biome-ignore-all lint/complexity/useLiteralKeys: <> */
import * as NodeContext from "@effect/platform-node/NodeContext";
import * as Effect from "effect/Effect";
import * as http from "node:http";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { OpenAI, type OpenAIService } from "../lib/ai";
import { Notion } from "../lib/notion";
import { createNotionMock } from "../test/notionTestUtils";
import { runAddResource } from "./addResource";

let server: http.Server;
let baseUrl = "";

beforeAll(async () => {
  server = http.createServer((_req, res) => {
    const html = `<!doctype html><html><head>
      <title>Test Title</title>
      <meta name="description" content="A short description">
      <meta property="og:description" content="OG description">
    </head><body>ok</body></html>`;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address();
  if (address && typeof address === "object") {
    baseUrl = `http://127.0.0.1:${address.port}`;
  } else {
    throw new Error("Failed to start test server");
  }
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

describe("CLI add resource", () => {
  it("enriches via AI and creates a Notion page (happy path)", async () => {
    let notionCalledWith: unknown | null = null;

    const fakeAI: OpenAIService = {
      generateResourceJson: ({ prompt, resourceBlock }) =>
        Effect.sync(() => {
          // minimal, valid JSON aligned with schema and prompt
          const out = {
            resource_name: "Test Title",
            resource_url: `${baseUrl}/page`,
            resource_type: "Article",
            curator_note: "Clear, concise engineering value.",
            focus_area: ["Tech-Centric"],
            tags: ["Concepts"],
            source_entity_name: "Unit Test",
            read_time_minutes: 3,
            icon_name: "file-text",
            resource_series_name: null,
            resource_series_part_number: null,
          };
          // basic sanity that prompt/resourceBlock flowed
          expect(prompt.length).toBeGreaterThan(10);
          expect(resourceBlock).toContain("Resource URL");
          return JSON.stringify(out);
        }),
      generateSourceEntityJson: () => Effect.succeed("{}"),
      generateSeriesJson: () => Effect.succeed("{}"),
    };

    const fakeNotion = createNotionMock({
      addResource: (data) =>
        Effect.sync(() => {
          notionCalledWith = data;
          return { pageId: "page_123", url: "https://notion.test/page_123" };
        }),
      addSourceEntity: () => Effect.sync(() => ({ pageId: "s1", url: "https://notion.test/s1" })),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    });

    const _fakeFs = {
      readFileString: vi.fn(() => Effect.succeed("PROMPT")),
    };

    const effect = runAddResource(`${baseUrl}/page`, true, {
      promptOverride: "PROMPT Override For Tests",
    }).pipe(
      Effect.provideService(OpenAI, fakeAI),
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(notionCalledWith).toBeTruthy();
    const data = notionCalledWith as Record<string, unknown>;
    expect(data["resource_name"]).toBe("Test Title");
    expect(data["resource_url"]).toBe(`${baseUrl}/page`);
  });

  it("enriches via AI and creates a Notion page for a video resource", async () => {
    let notionCalledWith: unknown | null = null;

    const fakeAI: OpenAIService = {
      generateResourceJson: ({ prompt, resourceBlock }) =>
        Effect.sync(() => {
          const out = {
            resource_name: "Awesome Video Tutorial",
            resource_url: `${baseUrl}/video`,
            resource_type: "Video",
            curator_note: "Excellent explanation of complex topic.",
            focus_area: ["Tech-Centric", "Coding"],
            tags: ["LLMs", "TypeScript"],
            source_entity_name: "Some Creator",
            read_time_minutes: 15,
            icon_name: "play-circle",
            resource_series_name: "Advanced AI Series",
            resource_series_part_number: 2,
          };
          expect(prompt.length).toBeGreaterThan(10);
          expect(resourceBlock).toContain("Resource URL");
          return JSON.stringify(out);
        }),
      generateSourceEntityJson: () => Effect.succeed("{ }"),
      generateSeriesJson: () => Effect.succeed("{}"),
    };

    const fakeNotion = createNotionMock({
      addResource: (data) =>
        Effect.sync(() => {
          notionCalledWith = data;
          return { pageId: "page_456", url: "https://notion.test/page_456" };
        }),
      addSourceEntity: () => Effect.sync(() => ({ pageId: "s1", url: "https://notion.test/s1" })),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    });

    const _fakeFs = {
      readFileString: vi.fn(() => Effect.succeed("PROMPT")),
    };

    const effect = runAddResource(`${baseUrl}/video`, true, {
      promptOverride: "PROMPT Override For Tests",
    }).pipe(
      Effect.provideService(OpenAI, fakeAI),
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(notionCalledWith).toBeTruthy();
    const data = notionCalledWith as Record<string, unknown>;
    expect(data["resource_name"]).toBe("Awesome Video Tutorial");
    expect(data["resource_url"]).toBe(`${baseUrl}/video`);
    expect(data["resource_type"]).toBe("Video");
    expect(data["read_time_minutes"]).toBe(15);
    expect(data["resource_series_name"]).toBe("Advanced AI Series");
    expect(data["resource_series_part_number"]).toBe(2);
  });

  it("enriches via AI and creates a Notion page for a book resource", async () => {
    let notionCalledWith: unknown | null = null;

    const fakeAI: OpenAIService = {
      generateResourceJson: ({ prompt, resourceBlock }) =>
        Effect.sync(() => {
          const out = {
            resource_name: "The Pragmatic Programmer",
            resource_url: `${baseUrl}/book`,
            resource_type: "Book",
            curator_note: "Timeless advice for software craftsmanship.",
            focus_area: ["Coding", "Business of AI"],
            tags: ["Concepts", "System Design"],
            source_entity_name: "Andrew Hunt & David Thomas",
            read_time_minutes: 300,
            icon_name: "book",
            resource_series_name: null,
            resource_series_part_number: null,
          };
          expect(prompt.length).toBeGreaterThan(10);
          expect(resourceBlock).toContain("Resource URL");
          return JSON.stringify(out);
        }),
      generateSourceEntityJson: () => Effect.succeed("{ }"),
      generateSeriesJson: () => Effect.succeed("{}"),
    };

    const fakeNotion = createNotionMock({
      addResource: (data) =>
        Effect.sync(() => {
          notionCalledWith = data;
          return { pageId: "page_789", url: "https://notion.test/page_789" };
        }),
      addSourceEntity: () => Effect.sync(() => ({ pageId: "s1", url: "https://notion.test/s1" })),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    });

    const _fakeFs = {
      readFileString: vi.fn(() => Effect.succeed("PROMPT")),
    };

    const effect = runAddResource(`${baseUrl}/book`, true, {
      promptOverride: "PROMPT Override For Tests",
    }).pipe(
      Effect.provideService(OpenAI, fakeAI),
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(notionCalledWith).toBeTruthy();
    const data = notionCalledWith as Record<string, unknown>;
    expect(data["resource_name"]).toBe("The Pragmatic Programmer");
    expect(data["resource_url"]).toBe(`${baseUrl}/book`);
    expect(data["resource_type"]).toBe("Book");
    expect(data["read_time_minutes"]).toBe(300);
    expect(data["icon_name"]).toBe("book");
  });

  it("handles AI returning invalid JSON (schema validation failure)", async () => {
    const fakeAI: OpenAIService = {
      generateResourceJson: () =>
        Effect.sync(() => {
          // Missing required 'resource_name' field
          return JSON.stringify({
            resource_url: `${baseUrl}/invalid`,
            resource_type: "Article",
            curator_note: "Invalid test.",
            focus_area: ["Tech-Centric"],
          });
        }),
      generateSourceEntityJson: () => Effect.succeed("{ }"),
      generateSeriesJson: () => Effect.succeed("{}"),
    };

    const fakeNotion = createNotionMock({
      addResource: () => Effect.sync(() => ({ pageId: "", url: "" })),
      addSourceEntity: () => Effect.sync(() => ({ pageId: "", url: "" })),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    });

    const _fakeFs = {
      readFileString: vi.fn(() => Effect.succeed("PROMPT")),
    };

    const effect = runAddResource(`${baseUrl}/invalid`, true, {
      promptOverride: "PROMPT",
    }).pipe(
      Effect.provideService(OpenAI, fakeAI),
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    const result = await Effect.runPromiseExit(effect);

    if (result._tag === "Failure") {
      const failure = result.cause;
      if (failure._tag === "Fail") {
        expect(failure.error.message).toContain("Validation failed");
      } else {
        throw new Error("Expected Fail cause");
      }
    } else {
      throw new Error("Expected failure exit");
    }
  });

  it("handles Notion API errors during addResource", async () => {
    const fakeAI: OpenAIService = {
      generateResourceJson: () =>
        Effect.sync(() =>
          JSON.stringify({
            resource_name: "Test Resource",
            resource_url: `${baseUrl}/notion-error`,
            resource_type: "Article",
            curator_note: "Test note.",
            focus_area: ["Tech-Centric"],
          })
        ),
      generateSourceEntityJson: () => Effect.succeed("{}"),
      generateSeriesJson: () => Effect.succeed("{}"),
    };

    const fakeNotion = createNotionMock({
      addResource: () => Effect.fail(new Error("Notion API Error: Failed to create page")),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    });

    const _fakeFs = {
      readFileString: vi.fn(() => Effect.succeed("PROMPT")),
    };

    const effect = runAddResource(`${baseUrl}/notion-error`, true, {
      promptOverride: "PROMPT",
    }).pipe(
      Effect.provideService(OpenAI, fakeAI),
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    const result = await Effect.runPromiseExit(effect);

    if (result._tag === "Failure") {
      const failure = result.cause;
      if (failure._tag === "Fail") {
        expect(failure.error.message).toContain("Notion API Error");
      } else {
        throw new Error("Expected Fail cause");
      }
    } else {
      throw new Error("Expected failure exit");
    }
  });

  it("handles web fetch errors during addResource", async () => {
    const fakeAI: OpenAIService = {
      generateResourceJson: () => Effect.succeed("{}"),
      generateSourceEntityJson: () => Effect.succeed("{}"),
      generateSeriesJson: () => Effect.succeed("{}"),
    };

    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    });

    // Mock fetch to throw an error
    const originalFetch = global.fetch;
    global.fetch = vi.fn(() => Promise.reject(new Error("Network error during fetch")));

    const _fakeFs = {
      readFileString: vi.fn(() => Effect.succeed("PROMPT")),
    };

    const effect = runAddResource(`${baseUrl}/fetch-error`, true, {
      promptOverride: "PROMPT",
    }).pipe(
      Effect.provideService(OpenAI, fakeAI),
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    const result = await Effect.runPromiseExit(effect);

    if (result._tag === "Failure") {
      const failure = result.cause;
      if (failure._tag === "Fail") {
        expect(failure.error.message).toContain("Failed to fetch metadata");
      } else {
        throw new Error("Expected Fail cause");
      }
    } else {
      throw new Error("Expected failure exit");
    }

    global.fetch = originalFetch; // Restore original fetch
  });
});
