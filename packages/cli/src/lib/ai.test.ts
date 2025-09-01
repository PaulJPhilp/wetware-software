import * as Effect from "effect/Effect";
import { describe, expect, it } from "vitest";
import type { OpenAIService } from "./ai";

describe("AI service", () => {
  it("returns JSON string from generateResourceJson", async () => {
    const svc: OpenAIService = {
      generateResourceJson: () => Effect.succeed('{"ok":true}'),
      generateSourceEntityJson: () => Effect.succeed('{"ok":true}'),
    };
    const result = await Effect.runPromise(
      svc.generateResourceJson({ prompt: "p", resourceBlock: "r" }),
    );
    expect(result).toBe('{"ok":true}');
  });
});
