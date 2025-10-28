import * as NodeContext from "@effect/platform-node/NodeContext";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { describe, expect, it, vi } from "vitest";
import { AIService, type AIService as OpenAIService, AIServiceTypeId, AIServiceError } from "../services/ai";
import { OpenAI } from "../lib/ai";
import { Notion } from "../lib/notion";
import { createNotionMock, notImplementedEffect } from "../test/notionTestUtils";
import { runAddSeries } from "./addSeries";

describe("addSeries", () => {
  it("should add a series", async () => {
    const mockNotion = createNotionMock({
      addSeries: vi.fn(() => Effect.succeed({ pageId: "123", url: "http://example.com" })),
    });
    const mockAI: OpenAIService = {
      [AIServiceTypeId]: AIServiceTypeId,
      generateSeriesJson: vi.fn(() =>
        Effect.succeed('{ "name": "test", "description": "test", "goal": "test" }')
      ),
      generateResourceJson: vi.fn((_args) => 
        Effect.fail(new AIServiceError("Not implemented in test"))
      ),
      generateSourceEntityJson: vi.fn((_args) =>
        Effect.fail(new AIServiceError("Not implemented in test"))
      ),
    };

    const TestNotion = Layer.succeed(Notion, mockNotion);
    const TestAI = Layer.succeed(OpenAI, mockAI);
    const testLayer = Layer.merge(TestNotion, TestAI);

    const program = runAddSeries("Test Series", undefined, false, {
      promptOverride: "PROMPT",
    }).pipe(
      Effect.provide(Layer.merge(testLayer, NodeContext.layer))
    );

    const result = await Effect.runPromise(program);

    expect(mockAI.generateSeriesJson).toHaveBeenCalled();
    expect(mockNotion.addSeries).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});
