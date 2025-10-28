import * as Effect from "effect/Effect";
import { describe, expect, it } from "vitest";
import {
  JSON_GENERATION_INSTRUCTIONS,
  formatPrompt,
  cleanResponse,
  validateJsonResponse,
} from "../utils";

describe("AI utils", () => {
  describe("JSON_GENERATION_INSTRUCTIONS", () => {
    it("contains expected instructions", () => {
      expect(JSON_GENERATION_INSTRUCTIONS).toContain("JSON object");
      expect(JSON_GENERATION_INSTRUCTIONS).toContain("No prose");
      expect(JSON_GENERATION_INSTRUCTIONS).toContain("No code fences");
    });
  });

  describe("formatPrompt", () => {
    it("formats prompt with instructions", () => {
      const result = formatPrompt("System prompt", "Content block");
      expect(result).toContain("System prompt");
      expect(result).toContain("Content block");
      expect(result).toContain("Return ONLY a strict JSON object");
    });

    it("handles verbose flag without changing output", () => {
      const result1 = formatPrompt("prompt", "content");
      const result2 = formatPrompt("prompt", "content", true);
      expect(result1).toBe(result2);
    });
  });

  describe("cleanResponse", () => {
    it("trims whitespace from response", () => {
      const result = cleanResponse("  \n{\"test\": true}\n  ");
      expect(result).toBe('{"test": true}');
    });

    it("handles already clean response", () => {
      const result = cleanResponse('{"clean": true}');
      expect(result).toBe('{"clean": true}');
    });
  });

  describe("validateJsonResponse", () => {
    it("validates proper JSON response", async () => {
      const result = await Effect.runPromise(
        validateJsonResponse('{"valid": true}')
      );
      expect(result).toBe('{"valid": true}');
    });

    it("fails for non-JSON response", async () => {
      const result = await Effect.runPromise(
        validateJsonResponse("This is not JSON")
          .pipe(Effect.flip)
      );
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain("does not appear to be JSON");
    });

    it("fails for malformed JSON", async () => {
      const result = await Effect.runPromise(
        validateJsonResponse("{incomplete json")
          .pipe(Effect.flip)
      );
      expect(result).toBeInstanceOf(Error);
    });
  });
});
