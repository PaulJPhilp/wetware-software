/**
 * AI Service Types
 *
 * Type definitions used throughout the AI service implementation.
 */

/**
 * Configuration for AI generation requests
 */
export type GenerationRequest = {
  prompt: string;
  content: string;
  verbose?: boolean;
};

/**
 * AI model configuration
 */
export type AIModelConfig = {
  apiKey: string;
  model: string;
};
