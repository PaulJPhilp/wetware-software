import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModel } from "ai";
import { generateText } from "ai";
import { Effect, Layer } from "effect";
import { pipe } from "effect/Function";

import { EnvService } from "../../lib/env";
import { type AIService, AIServiceTypeId } from "./api";
import { AICallError } from "./errors";
import { cleanResponse, formatPrompt, logVerbose } from "./utils";

/**
 * AI Service Implementation
 *
 * Provides AI-powered text generation using Google's Gemini model.
 */
export const AIServiceImpl = Effect.Service<AIService>()("AIService", {
  succeed: Effect.gen(function* () {
    // Get environment configuration
    const env = yield* EnvService;
    const config = yield* env.getAIConfig();
    const apiKey = config.apiKey;

    // Initialize AI client
    const google = createGoogleGenerativeAI({ apiKey });
    const model = google("models/gemini-2.5-flash");

    return {
      [AIServiceTypeId]: AIServiceTypeId,

      generateResourceJson: ({ prompt, resourceBlock, verbose }) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              const { text } = await generateText({
                model: model as LanguageModel,
                system: prompt,
                prompt: formatPrompt(prompt, resourceBlock),
              });
              return cleanResponse(text);
            },
            catch: (e) => new AICallError(`Resource generation failed: ${String(e)}`, e),
          }),
          Effect.tap(() => logVerbose("AI resource response received", verbose))
        ),

      generateSourceEntityJson: ({ prompt, sourceBlock, verbose }) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              const { text } = await generateText({
                model: model as LanguageModel,
                system: prompt,
                prompt: formatPrompt(prompt, sourceBlock),
              });
              return cleanResponse(text);
            },
            catch: (e) => new AICallError(`Source generation failed: ${String(e)}`, e),
          }),
          Effect.tap(() => logVerbose("AI source response received", verbose))
        ),

      generateSeriesJson: ({ prompt, seriesBlock, verbose }) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              const { text } = await generateText({
                model: model as LanguageModel,
                system: prompt,
                prompt: formatPrompt(prompt, seriesBlock),
              });
              return cleanResponse(text);
            },
            catch: (e) => new AICallError(`Series generation failed: ${String(e)}`, e),
          }),
          Effect.tap(() => logVerbose("AI series response received", verbose))
        ),
    };
  }),
});

export const AIServiceLive = Layer.effect(AIServiceImpl, AIServiceImpl);
