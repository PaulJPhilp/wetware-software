import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import type { AIService } from "../api";
import { AIServiceTypeId } from "../api";
import { AICallError } from "../errors";

describe("AI service", () => {
  it("returns JSON string from generateResourceJson", async () => {
    const svc: AIService = {
      [AIServiceTypeId]: AIServiceTypeId,
      generateResourceJson: () => Effect.succeed('{"ok":true}'),
      generateSourceEntityJson: () => Effect.succeed('{"ok":true}'),
      generateSeriesJson: () => Effect.succeed('{"ok":true}'),
    };
    const result = await Effect.runPromise(
      svc.generateResourceJson({ prompt: "p", resourceBlock: "r" })
    );
    expect(result).toBe('{"ok":true}');
  });

  it("handles errors in generateResourceJson", async () => {
    const svc: AIService = {
      [AIServiceTypeId]: AIServiceTypeId,
      generateResourceJson: () => Effect.fail(new AICallError("API failed")),
      generateSourceEntityJson: () => Effect.succeed('{"ok":true}'),
      generateSeriesJson: () => Effect.succeed('{"ok":true}'),
    };

    const result = await Effect.runPromise(
      svc.generateResourceJson({ prompt: "p", resourceBlock: "r" }).pipe(Effect.flip)
    );

    expect(result).toBeInstanceOf(AICallError);
    expect(result._tag).toBe("AICallError");
  });

  it("returns JSON string from generateSourceEntityJson", async () => {
    const svc: AIService = {
      [AIServiceTypeId]: AIServiceTypeId,
      generateResourceJson: () => Effect.succeed('{"ok":true}'),
      generateSourceEntityJson: () => Effect.succeed('{"source":"test"}'),
      generateSeriesJson: () => Effect.succeed('{"ok":true}'),
    };
    const result = await Effect.runPromise(
      svc.generateSourceEntityJson({ prompt: "p", sourceBlock: "s" })
    );
    expect(result).toBe('{"source":"test"}');
  });

  it("returns JSON string from generateSeriesJson", async () => {
    const svc: AIService = {
      [AIServiceTypeId]: AIServiceTypeId,
      generateResourceJson: () => Effect.succeed('{"ok":true}'),
      generateSourceEntityJson: () => Effect.succeed('{"ok":true}'),
      generateSeriesJson: () => Effect.succeed('{"series":"test"}'),
    };
    const result = await Effect.runPromise(
      svc.generateSeriesJson({ prompt: "p", seriesBlock: "sr" })
    );
    expect(result).toBe('{"series":"test"}');
  });
});
