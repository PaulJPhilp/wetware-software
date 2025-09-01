import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModelV1 } from "ai";
import { generateText } from "ai";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as Layer from "effect/Layer";

export interface OpenAIService {
  generateResourceJson: (args: {
    prompt: string;
    resourceBlock: string;
    verbose?: boolean;
  }) => Effect.Effect<string, Error>;
  generateSourceEntityJson: (args: {
    prompt: string;
    sourceBlock: string;
    verbose?: boolean;
  }) => Effect.Effect<string, Error>;
  generateSeriesJson: (args: {
    prompt: string;
    seriesBlock: string;
    verbose?: boolean;
  }) => Effect.Effect<string, Error>;
}

export class OpenAI extends Effect.Service<OpenAIService>()("OpenAI", {
  succeed: {},
}) {}

export const OpenAIProviderLayer = Layer.effect(
  OpenAI,
  Effect.suspend(() => {
    // biome-ignore lint/complexity/useLiteralKeys: <>
    const apiKey = process.env["GOOGLE_AI_API_KEY"];
    if (!apiKey) {
      return Effect.fail(new Error("Missing GOOGLE_AI_API_KEY environment variable"));
    }

    const google = createGoogleGenerativeAI({ apiKey });
    const model = google("models/gemini-2.5-flash");

    return Effect.succeed<OpenAIService>({
      generateResourceJson: ({ prompt, resourceBlock, verbose }) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              const { text } = await generateText({
                model: model as LanguageModelV1,
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
          Effect.tap(() => (verbose ? Console.log(`AI response received`) : Effect.void)),
        ),
      generateSourceEntityJson: ({ prompt, sourceBlock, verbose }) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              const { text } = await generateText({
                model: model as LanguageModelV1,
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
          Effect.tap(() => (verbose ? Console.log(`AI response received`) : Effect.void)),
        ),
      generateSeriesJson: ({ prompt, seriesBlock, verbose }) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              const { text } = await generateText({
                model: model as LanguageModelV1,
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
          Effect.tap(() => (verbose ? Console.log(`AI response received`) : Effect.void)),
        ),
    });
  }),
);
