/**
 * AI Service Module
 * 
 * Provides AI-powered text generation capabilities for processing
 * resources, sources, and series content using Google's Gemini model.
 * 
 * @example
 * ```typescript
 * import { AIService, AIServiceLive } from "./services/ai";
 * import { Effect } from "effect";
 * 
 * const program = Effect.gen(function* () {
 *   const ai = yield* AIService;
 *   const result = yield* ai.generateResourceJson({
 *     prompt: "Extract JSON from this content",
 *     resourceBlock: "Content here...",
 *     verbose: true
 *   });
 *   return result;
 * });
 * 
 * // Run with live layer
 * Effect.runPromise(
 *   program.pipe(Effect.provide(AIServiceLive))
 * );
 * ```
 */

// API and Types
export type { AIService } from "./api";
export { AIServiceTypeId } from "./api";
export type { 
  GenerationRequest, 
  AIModelConfig 
} from "./types";

// Errors
export {
  AIServiceError,
  AICallError,
  AIConfigError,
  AIResponseError,
} from "./errors";

// Schemas
export {
  GenerationRequestSchema,
  AIModelConfigSchema,
  GenerationResponseSchema,
  type GenerationRequest as SchemaGenerationRequest,
  type AIModelConfig as SchemaAIModelConfig,
  type GenerationResponse as SchemaGenerationResponse,
} from "./schema";

// Utils
export {
  JSON_GENERATION_INSTRUCTIONS,
  formatPrompt,
  logVerbose,
  cleanResponse,
  validateJsonResponse,
} from "./utils";

// Service
export { AIService, AIServiceLive } from "./service";

// For backward compatibility during migration (commented out to avoid circular import)
// export type { OpenAIService } from "../lib/ai";
// export { OpenAI, OpenAIProviderLayer } from "../lib/ai";
