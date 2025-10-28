/**
 * AI Service Types
 * 
 * Type definitions used throughout the AI service implementation.
 */

/**
 * Configuration for AI generation requests
 */
export interface GenerationRequest {
  prompt: string;
  content: string;
  verbose?: boolean;
}

/**
 * AI model configuration
 */
export interface AIModelConfig {
  apiKey: string;
  model: string;
}
