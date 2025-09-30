import { Effect, Layer } from "effect";
import { Notion } from "../lib/ai";
import { runAddSeries } from "./addSeries";
import { vi, test, expect } from "vitest";

describe("addSeries", () => {
  test("should add a series", async () => {
    const mockNotion = {
      addSeries: vi.fn(() => Effect.succeed({ pageId: "123", url: "http://example.com" })),
    };
    const mockAI = {
      generateSeriesJson: vi.fn(() =>
        Effect.succeed('{ "name": "test", "description": "test", "goal": "test" }'),
      ),
    };

    const TestNotion = Layer.succeed(Notion, mockNotion as any);
    const TestAI = Layer.succeed(OpenAI, mockAI as any);

    const program = runAddSeries("Test Series", undefined, false).pipe(
      Effect.provide(TestNotion),
      Effect.provide(TestAI),
    );

    const result = await Effect.runPromise(program);

    expect(mockAI.generateSeriesJson).toHaveBeenCalled();
    expect(mockNotion.addSeries).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});
