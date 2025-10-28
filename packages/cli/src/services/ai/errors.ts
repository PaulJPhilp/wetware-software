import * as Effect from "effect/Effect";

/**
 * AI Service Errors
 * 
 * Custom error types for AI service operations.
 */

/**
 * Base error class for AI service operations
 */
export class AIServiceError extends Error {
  readonly _tag = "AIServiceError";
  
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "AIServiceError";
  }
}

/**
 * Error thrown when AI API call fails
 */
export class AICallError extends AIServiceError {
  readonly _tag = "AICallError";
  
  constructor(message: string, public readonly originalError: unknown) {
    super(`AI call failed: ${message}`);
    this.name = "AICallError";
  }
}

/**
 * Error thrown when AI configuration is missing or invalid
 */
export class AIConfigError extends AIServiceError {
  readonly _tag = "AIConfigError";
  
  constructor(message: string) {
    super(`AI configuration error: ${message}`);
    this.name = "AIConfigError";
  }
}

/**
 * Error thrown when AI response is invalid or malformed
 */
export class AIResponseError extends AIServiceError {
  readonly _tag = "AIResponseError";
  
  constructor(message: string, public readonly response?: string) {
    super(`AI response error: ${message}`);
    this.name = "AIResponseError";
  }
}
