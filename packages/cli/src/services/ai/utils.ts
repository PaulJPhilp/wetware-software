import { Console, Effect } from "effect";
import { pipe } from "effect/Function";

/**
 * AI Service Utilities
 *
 * Helper functions used throughout the AI service.
 */

/**
 * Standard prompt instructions for JSON generation
 */
export const JSON_GENERATION_INSTRUCTIONS = [
  "Return ONLY a strict JSON object. No prose. No code fences.",
  "Validate allowed values per instructions.",
  "Respond in English.",
].join("\n");

/**
 * Format a complete prompt with system instructions
 */
export const formatPrompt = (systemPrompt: string, content: string, _verbose?: boolean): string => {
  const prompt = [systemPrompt, "", JSON_GENERATION_INSTRUCTIONS, "", content].join("\n");

  return prompt;
};

/**
 * Log verbose output if enabled
 */
export const logVerbose = (message: string, verbose?: boolean) =>
  pipe(verbose ? Console.log(message) : Console.log(""), Effect.asVoid);

/**
 * Safely trim and clean AI response
 */
export const cleanResponse = (response: string): string => response.trim();

/**
 * Validate that response looks like JSON
 */
export const validateJsonResponse = (response: string): Effect.Effect<string, Error> => {
  const trimmed = response.trim();

  if (!(trimmed.startsWith("{") && trimmed.endsWith("}"))) {
    return Effect.fail(
      new Error(`Response does not appear to be JSON: ${trimmed.substring(0, 100)}...`)
    );
  }

  return Effect.succeed(trimmed);
};
