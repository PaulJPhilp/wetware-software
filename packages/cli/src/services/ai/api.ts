import type * as Effect from "effect/Effect";
import type { AIServiceError } from "./errors";

/**
 * Type identifier for the AI Service
 */
export const AIServiceTypeId = Symbol.for("@wetware/AIService");

/**
 * AI Service interface with type tag
 */
export type AIService = {
  readonly [AIServiceTypeId]: typeof AIServiceTypeId;
  generateResourceJson: (args: {
    prompt: string;
    resourceBlock: string;
    verbose?: boolean;
  }) => Effect.Effect<string, AIServiceError, never>;

  generateSourceEntityJson: (args: {
    prompt: string;
    sourceBlock: string;
    verbose?: boolean;
  }) => Effect.Effect<string, AIServiceError, never>;

  generateSeriesJson: (args: {
    prompt: string;
    seriesBlock: string;
    verbose?: boolean;
  }) => Effect.Effect<string, AIServiceError, never>;
};
