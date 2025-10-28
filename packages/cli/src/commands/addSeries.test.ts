import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { describe, expect, it, vi } from "vitest";
import { OpenAI, type OpenAIService } from "../lib/ai";
import { Notion } from "../lib/notion";
import { createNotionMock, notImplementedEffect } from "../test/notionTestUtils";
import { runAddSeries } from "./addSeries";

describe("addSeries", () => {
  it("should add a series", async () => {
    const mockNotion = createNotionMock({
      addSeries: vi.fn(() => Effect.succeed({ pageId: "123", url: "http://example.com" })),
    });
    const mockAI: OpenAIService = {
      generateSeriesJson: vi.fn(() =>
        Effect.succeed('{ "name": "test", "description": "test", "goal": "test" }')
      ),
      generateResourceJson: vi.fn((_args) => notImplementedEffect<string>("generateResourceJson")),
      generateSourceEntityJson: vi.fn((_args) =>
        notImplementedEffect<string>("generateSourceEntityJson")
      ),
    };

    const TestNotion = Layer.succeed(Notion, mockNotion);
    const TestAI = Layer.succeed(OpenAI, mockAI);

    const program = runAddSeries("Test Series", undefined, false, {
      promptOverride: "PROMPT",
    }).pipe(
      Effect.provide(TestNotion),
      Effect.provide(TestAI),
      Effect.provide(NodeFileSystem.layer)
    );

    const result = await Effect.runPromise(program);

    expect(mockAI.generateSeriesJson).toHaveBeenCalled();
    expect(mockNotion.addSeries).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});
