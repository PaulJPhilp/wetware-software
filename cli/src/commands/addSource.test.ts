/** biome-ignore-all lint/complexity/useLiteralKeys: <> */
import * as NodeContext from "@effect/platform-node/NodeContext";
import * as Effect from "effect/Effect";
import { describe, expect, it, vi } from "vitest";
import { OpenAI, type OpenAIService } from "../lib/ai";
import { Notion, type NotionService } from "../lib/notion";
import { runAddSource } from "./addSource";

describe("CLI add source", () => {
  it("enriches via AI and creates a Notion page (happy path)", async () => {
    let notionCalledWith: unknown | null = null;

    const fakeAI: OpenAIService = {
      generateResourceJson: () => Effect.succeed("{ }"), // Not used in this test
      generateSourceEntityJson: ({ prompt, sourceBlock }) =>
        Effect.sync(() => {
          const out = {
            name: "Test Source",
            type: "Individual",
            url: "https://example.com/test-source",
            description: "A test source for unit testing.",
            endorsement: "Highly recommended for testing purposes.",
            focus_area: ["Tech-Centric"],
          };
          // basic sanity that prompt/sourceBlock flowed
          expect(prompt.length).toBeGreaterThan(10);
          expect(sourceBlock).toContain("Source Name");
          return JSON.stringify(out);
        }),
    };

    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }), // Not used in this test
      addSourceEntity: (data) =>
        Effect.sync(() => {
          notionCalledWith = data;
          return { pageId: "source_123", url: "https://notion.test/source_123" };
        }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    };

    const effect = runAddSource("Test Source", "https://example.com/test-source", true).pipe(
      Effect.provideService(OpenAI, fakeAI),
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(notionCalledWith).toBeTruthy();
    const data = notionCalledWith as Record<string, unknown>;
    expect(data["name"]).toBe("Test Source");
    expect(data["type"]).toBe("Individual");
    expect(data["url"]).toBe("https://example.com/test-source");
  });

  it("handles AI returning invalid JSON (schema validation failure)", async () => {
    const fakeAI: OpenAIService = {
      generateResourceJson: () => Effect.succeed("{ }"),
      generateSourceEntityJson: () =>
        Effect.sync(() => {
          // Missing required 'name' field
          return JSON.stringify({
            type: "Company",
            url: "https://example.com/invalid-source",
            description: "Invalid test source.",
            endorsement: "Should fail validation.",
            focus_area: ["Business of AI"],
          });
        }),
    };

    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    };

    const effect = runAddSource("Invalid Source", "https://example.com/invalid-source", true).pipe(
      Effect.provideService(OpenAI, fakeAI),
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    const result = await Effect.runPromiseExit(effect);

    expect(result._tag).toBe("Failure");
    expect(result.cause._tag).toBe("Fail");
    expect(result.cause.error.message).toContain("Validation failed");
  });

  it("handles AI returning syntactically invalid JSON", async () => {
    const fakeAI: OpenAIService = {
      generateResourceJson: () => Effect.succeed("{ }"),
      generateSourceEntityJson: () =>
        Effect.sync(() => {
          // Syntactically invalid JSON
          return "{invalid";
        }),
    };

    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    };

    const effect = runAddSource("Invalid JSON Source", "https://example.com/invalid-json", true).pipe(
      Effect.provideService(OpenAI, fakeAI),
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    const result = await Effect.runPromiseExit(effect);

    expect(result._tag).toBe("Failure");
    expect(result.cause._tag).toBe("Fail");
    expect(result.cause.error.message).toContain("JSON Parse error");
  });

  it("handles Notion API errors during addSourceEntity", async () => {
    const fakeAI: OpenAIService = {
      generateResourceJson: () => Effect.succeed("{}"),
      generateSourceEntityJson: () =>
        Effect.sync(() => {
          return JSON.stringify({
            name: "Test Source",
            type: "Individual",
            url: "https://example.com/notion-error",
            description: "Test description.",
            endorsement: "Test endorsement.",
            focus_area: ["Tech-Centric"],
          });
        }),
    };

    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.fail(new Error("Notion API Error: Failed to create source entity page")),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    };

    const effect = runAddSource("Notion Error Source", "https://example.com/notion-error", true).pipe(
      Effect.provideService(OpenAI, fakeAI),
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    const result = await Effect.runPromiseExit(effect);

    expect(result._tag).toBe("Failure");
    expect(result.cause._tag).toBe("Fail");
    expect(result.cause.error.message).toContain("Notion API Error");
  });
});
