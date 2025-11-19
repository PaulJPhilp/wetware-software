import { describe, expect, it } from "vitest";
import { AIServiceError, AICallError, AIConfigError, AIResponseError } from "../errors";

describe("AI service errors", () => {
  describe("AIServiceError", () => {
    it("creates base error with message", () => {
      const error = new AIServiceError("Test error");
      expect(error.message).toBe("Test error");
      expect(error.name).toBe("AIServiceError");
      expect(error._tag).toBe("AIServiceError");
      expect(error.cause).toBeUndefined();
    });

    it("includes cause when provided", () => {
      const cause = new Error("Original error");
      const error = new AIServiceError("Test error", cause);
      expect(error.cause).toBe(cause);
    });
  });

  describe("AICallError", () => {
    it("creates API call error", () => {
      const originalError = new Error("API failed");
      const error = new AICallError("API call failed", originalError);

      expect(error.name).toBe("AICallError");
      expect(error._tag).toBe("AICallError");
      expect(error.message).toBe("AI call failed: API call failed");
      expect(error.originalError).toBe(originalError);
    });
  });

  describe("AIConfigError", () => {
    it("creates configuration error", () => {
      const error = new AIConfigError("Missing API key");

      expect(error.name).toBe("AIConfigError");
      expect(error._tag).toBe("AIConfigError");
      expect(error.message).toBe("AI configuration error: Missing API key");
    });
  });

  describe("AIResponseError", () => {
    it("creates response error without response", () => {
      const error = new AIResponseError("Invalid JSON");

      expect(error.name).toBe("AIResponseError");
      expect(error._tag).toBe("AIResponseError");
      expect(error.message).toBe("AI response error: Invalid JSON");
      expect(error.response).toBeUndefined();
    });

    it("includes response when provided", () => {
      const response = '{"invalid": json}';
      const error = new AIResponseError("Invalid JSON", response);

      expect(error.response).toBe(response);
    });
  });
});
