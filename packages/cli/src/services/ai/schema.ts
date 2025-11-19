import { Schema } from "effect";

/**
 * AI Service Schemas
 *
 * Effect Schema definitions for AI service data validation.
 */

/**
 * Schema for generation request parameters
 */
export const GenerationRequestSchema = Schema.Struct({
  prompt: Schema.String,
  content: Schema.String,
  verbose: Schema.optional(Schema.Boolean),
});

/**
 * Schema for AI model configuration
 */
export const AIModelConfigSchema = Schema.Struct({
  apiKey: Schema.String.pipe(Schema.minLength(1)),
  model: Schema.String.pipe(Schema.minLength(1)),
});

/**
 * Schema for AI generation response
 */
export const GenerationResponseSchema = Schema.String.pipe(
  Schema.minLength(1),
  Schema.pattern(/^\s*\{.*\}\s*$/s) // Must be valid JSON
);

/**
 * Type inference from schemas
 */
export type GenerationRequest = Schema.Schema.Type<typeof GenerationRequestSchema>;
export type AIModelConfig = Schema.Schema.Type<typeof AIModelConfigSchema>;
export type GenerationResponse = Schema.Schema.Type<typeof GenerationResponseSchema>;
