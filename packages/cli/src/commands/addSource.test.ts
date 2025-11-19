/** biome-ignore-all lint/complexity/useLiteralKeys: <> */
import * as NodeContext from "@effect/platform-node/NodeContext";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { describe, expect, it } from "vitest";
import { type AIService as OpenAIService, AIServiceTypeId } from "../services/ai";
import { OpenAI } from "../lib/ai";
import { Notion } from "../lib/notion";
import { createNotionMock } from "../test/notionTestUtils";
import { runAddSource } from "./addSource";

describe("CLI add source", () => {
  it("enriches via AI and creates a Notion page (happy path)", async () => {
    let notionCalledWith: unknown | null = null;

    const fakeAI: OpenAIService = {
      [AIServiceTypeId]: AIServiceTypeId,
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
      generateSeriesJson: () => Effect.succeed("{}"),
    };

    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: (data) =>
        Effect.sync(() => {
          notionCalledWith = data;
          return {
            pageId: "source_123",
            url: "https://notion.test/source_123",
          };
        }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    });

    const testLayer = Layer.merge(Layer.succeed(OpenAI, fakeAI), Layer.succeed(Notion, fakeNotion));

    const effect = runAddSource("Test Source", "https://example.com/test-source", true, {
      promptOverride: "PROMPT Override For Tests",
    }).pipe(Effect.provide(Layer.merge(testLayer, NodeContext.layer)));

    await Effect.runPromise(effect);

    expect(notionCalledWith).toBeTruthy();
    const data = notionCalledWith as Record<string, unknown>;
    expect(data["name"]).toBe("Test Source");
    expect(data["type"]).toBe("Individual");
    expect(data["url"]).toBe("https://example.com/test-source");
  });

  it("handles AI returning invalid JSON (schema validation failure)", async () => {
    const fakeAI: OpenAIService = {
      [AIServiceTypeId]: AIServiceTypeId,
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
      generateSeriesJson: () => Effect.succeed("{}"),
    };

    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    });

    const testLayer = Layer.merge(Layer.succeed(OpenAI, fakeAI), Layer.succeed(Notion, fakeNotion));

    const effect = runAddSource("Invalid Source", "https://example.com/invalid-source", true, {
      promptOverride: "PROMPT Override For Tests",
    }).pipe(Effect.provide(Layer.merge(testLayer, NodeContext.layer)));

    const result = await Effect.runPromiseExit(effect);

    if (result._tag === "Failure") {
      const failure = result.cause;
      if (failure._tag === "Fail") {
        if (failure.error instanceof Error) {
          expect(failure.error.message).toContain("Validation failed");
        } else {
          throw new Error(`Expected Error object but got: ${typeof failure.error}`);
        }
      } else {
        throw new Error("Expected Fail cause");
      }
    } else {
      throw new Error("Expected failure exit");
    }
  });

  it("handles AI returning syntactically invalid JSON", async () => {
    const fakeAI: OpenAIService = {
      [AIServiceTypeId]: AIServiceTypeId,
      generateResourceJson: () => Effect.succeed("{ }"),
      generateSourceEntityJson: () =>
        Effect.sync(() => {
          // Syntactically invalid JSON
          return "{invalid";
        }),
      generateSeriesJson: () => Effect.succeed("{}"),
    };

    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    });

    const testLayer = Layer.merge(Layer.succeed(OpenAI, fakeAI), Layer.succeed(Notion, fakeNotion));

    const effect = runAddSource("Invalid JSON Source", "https://example.com/invalid-json", true, {
      promptOverride: "PROMPT Override For Tests",
    }).pipe(Effect.provide(Layer.merge(testLayer, NodeContext.layer)));

    const result = await Effect.runPromiseExit(effect);

    if (result._tag === "Failure") {
      const failure = result.cause;
      if (failure._tag === "Fail") {
        if (failure.error instanceof Error) {
          expect(failure.error.message).toContain("Validation failed");
        } else {
          throw new Error(`Expected Error object but got: ${typeof failure.error}`);
        }
      } else {
        throw new Error("Expected Fail cause");
      }
    } else {
      throw new Error("Expected failure exit");
    }
  });

  it("handles Notion API errors during addSourceEntity", async () => {
    const fakeAI: OpenAIService = {
      [AIServiceTypeId]: AIServiceTypeId,
      generateResourceJson: () => Effect.succeed("{}"),
      generateSourceEntityJson: () =>
        Effect.sync(() =>
          JSON.stringify({
            name: "Test Source",
            type: "Individual",
            url: "https://example.com/notion-error",
            description: "Test description.",
            endorsement: "Test endorsement.",
            focus_area: ["Tech-Centric"],
          })
        ),
      generateSeriesJson: () => Effect.succeed("{}"),
    };

    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () =>
        Effect.fail(new Error("Notion API Error: Failed to create source entity page")),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    });

    const testLayer = Layer.merge(Layer.succeed(OpenAI, fakeAI), Layer.succeed(Notion, fakeNotion));

    const effect = runAddSource("Notion Error Source", "https://example.com/notion-error", true, {
      promptOverride: "PROMPT Override For Tests",
    }).pipe(Effect.provide(Layer.merge(testLayer, NodeContext.layer)));

    const result = await Effect.runPromiseExit(effect);

    if (result._tag === "Failure") {
      const failure = result.cause;
      if (failure._tag === "Fail") {
        if (failure.error instanceof Error) {
          expect(failure.error.message).toContain("Notion API Error");
        } else {
          throw new Error(`Expected Error object but got: ${typeof failure.error}`);
        }
      } else {
        throw new Error("Expected Fail cause");
      }
    } else {
      throw new Error("Expected failure exit");
    }
  });
});
