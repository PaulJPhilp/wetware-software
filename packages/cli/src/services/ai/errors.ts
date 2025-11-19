/**
 * AI Service Errors
 *
 * Custom error types for AI service operations.
 */

/**
 * Base error class for AI service operations
 */
export class AIServiceError extends Error {
  readonly _tag: string = "AIServiceError";
  readonly cause?: unknown;

  constructor(
    message: string,
    cause?: unknown
  ) {
    super(message);
    this.name = "AIServiceError";
    this.cause = cause;
  }
}

/**
 * Error thrown when AI API call fails
 */
export class AICallError extends AIServiceError {
  override readonly _tag = "AICallError";
  readonly originalError: unknown;

  constructor(message: string, originalError?: unknown) {
    super(`AI call failed: ${message}`);
    this.name = "AICallError";
    this.originalError = originalError;
  }
}

/**
 * Error thrown when AI configuration is missing or invalid
 */
export class AIConfigError extends AIServiceError {
  override readonly _tag = "AIConfigError";

  constructor(message: string) {
    super(`AI configuration error: ${message}`);
    this.name = "AIConfigError";
  }
}

/**
 * Error thrown when AI response is invalid or malformed
 */
export class AIResponseError extends AIServiceError {
  override readonly _tag = "AIResponseError";
  readonly response?: string;

  constructor(message: string, response?: string) {
    super(`AI response error: ${message}`);
    this.name = "AIResponseError";
    this.response = response;
  }
}
