import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModel } from "ai";
import { generateText } from "ai";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as Layer from "effect/Layer";
import { EnvService } from "./env";

export interface OpenAIService {
  generateResourceJson: (args: {
    prompt: string;
    resourceBlock: string;
    verbose?: boolean;
  }) => Effect.Effect<string, Error, never>;
  generateSourceEntityJson: (args: {
    prompt: string;
    sourceBlock: string;
    verbose?: boolean;
  }) => Effect.Effect<string, Error, never>;
  generateSeriesJson: (args: {
    prompt: string;
    seriesBlock: string;
    verbose?: boolean;
  }) => Effect.Effect<string, Error, never>;
}

export class OpenAI extends Effect.Service<OpenAIService>()("OpenAI", {
  succeed: {},
}) {}

export const OpenAIProviderLayer = Layer.effect(
  OpenAI,
  Effect.gen(function* () {
    const env = yield* EnvService;
    const config = yield* env.getAIConfig();

    const google = createGoogleGenerativeAI({ apiKey: config.apiKey });
    const model = google("models/gemini-2.5-flash");

    return Effect.succeed<OpenAIService>({
      generateResourceJson: ({ prompt, resourceBlock, verbose }) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              const { text } = await generateText({
                model: model as LanguageModel,
                system: prompt,
                prompt: [
                  "Return ONLY a strict JSON object. No prose. No code fences.",
                  "Validate allowed values per instructions.",
                  "Respond in English.",
                  "",
                  resourceBlock,
                ].join("\n"),
              });
              return text.trim();
            },
            catch: (e) => new Error(`AI call failed: ${String(e)}`),
          }),
          Effect.tap(() => (verbose ? Console.log("AI response received") : Effect.void))
        ),
      generateSourceEntityJson: ({ prompt, sourceBlock, verbose }) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              const { text } = await generateText({
                model: model as LanguageModel,
                system: prompt,
                prompt: [
                  "Return ONLY a strict JSON object. No prose. No code fences.",
                  "Validate allowed values per instructions.",
                  "Respond in English.",
                  "",
                  sourceBlock,
                ].join("\n"),
              });
              return text.trim();
            },
            catch: (e) => new Error(`AI call failed: ${String(e)}`),
          }),
          Effect.tap(() => (verbose ? Console.log("AI response received") : Effect.void))
        ),
      generateSeriesJson: ({ prompt, seriesBlock, verbose }) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              const { text } = await generateText({
                model: model as LanguageModel,
                system: prompt,
                prompt: [
                  "Return ONLY a strict JSON object. No prose. No code fences.",
                  "Validate allowed values per instructions.",
                  "Respond in English.",
                  "",
                  seriesBlock,
                ].join("\n"),
              });
              return text.trim();
            },
            catch: (e) => new Error(`AI call failed: ${String(e)}`),
          }),
          Effect.tap(() => (verbose ? Console.log("AI response received") : Effect.void))
        ),
    });
  })
);
