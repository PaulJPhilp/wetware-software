import { EnvTag, fromDotenv, fromProcess } from "effect-env";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import {
  convertRawToTyped,
  getEnvWithDefaults,
  rawEnvSchema,
  type CliEnv,
  type RawCliEnv,
} from "../env";

/**
 * Environment service interface
 */
export type EnvService = {
  readonly get: <K extends keyof CliEnv>(key: K) => Effect.Effect<CliEnv[K], Error>;
  readonly require: <K extends keyof CliEnv>(key: K) => Effect.Effect<CliEnv[K], Error>;
  readonly getNotionConfig: () => Effect.Effect<
    {
      apiKey: string;
      resourcesDatabaseId: string;
      sourceEntitiesDatabaseId: string;
      resourceSeriesDatabaseId?: string;
    },
    Error
  >;
  readonly getAIConfig: () => Effect.Effect<{ apiKey: string }, Error>;
  readonly isDevelopment: Effect.Effect<boolean, never>;
  readonly isProduction: Effect.Effect<boolean, never>;
  readonly isTest: Effect.Effect<boolean, never>;
};

/**
 * Environment service implementation
 */
export const EnvService = Effect.Service<EnvService>()("EnvService", {
  succeed: Effect.gen(function* () {
    const rawEnv = yield* EnvTag;
    const rawValues = yield* rawEnv.all();
    const typedEnv = convertRawToTyped(rawValues as RawCliEnv);
    const envWithDefaults = getEnvWithDefaults(typedEnv);

    return {
      get: <K extends keyof CliEnv>(key: K) => Effect.succeed(typedEnv[key]),
      require: <K extends keyof CliEnv>(key: K) => {
        const value = typedEnv[key];
        if (value === undefined) {
          return Effect.fail(new Error(`Missing required environment variable: ${String(key)}`));
        }
        return Effect.succeed(value);
      },

      getNotionConfig: () =>
        Effect.gen(function* () {
          const apiKey = typedEnv.NOTION_API_KEY;
          const resourcesDatabaseId = typedEnv.NOTION_RESOURCES_DATABASE_ID;
          const sourceEntitiesDatabaseId = typedEnv.NOTION_SOURCE_ENTITIES_DATABASE_ID;
          const resourceSeriesDatabaseId = typedEnv.NOTION_RESOURCE_SERIES_DATABASE_ID;

          if (!apiKey) {
            return Effect.fail(new Error("Missing NOTION_API_KEY"));
          }
          if (!resourcesDatabaseId) {
            return Effect.fail(new Error("Missing NOTION_RESOURCES_DATABASE_ID"));
          }
          if (!sourceEntitiesDatabaseId) {
            return Effect.fail(new Error("Missing NOTION_SOURCE_ENTITIES_DATABASE_ID"));
          }

          return {
            apiKey,
            resourcesDatabaseId,
            sourceEntitiesDatabaseId,
            resourceSeriesDatabaseId,
          };
        }),

      getAIConfig: () =>
        Effect.gen(function* () {
          const apiKey = typedEnv.GOOGLE_AI_API_KEY;
          if (!apiKey) {
            return Effect.fail(new Error("Missing GOOGLE_AI_API_KEY"));
          }
          return { apiKey };
        }),

      isDevelopment: Effect.succeed(envWithDefaults.NODE_ENV === "development"),
      isProduction: Effect.succeed(envWithDefaults.NODE_ENV === "production"),
      isTest: Effect.succeed(envWithDefaults.NODE_ENV === "test"),
    };
  }),
});

/**
 * Environment layer that loads from .env.local in development
 */
export const EnvLayer = fromDotenv(
  rawEnvSchema as any,
  { path: ".env.local" }
).pipe(Layer.provide(EnvService.Default));

/**
 * Production environment layer (loads from process.env)
 */
export const ProdEnvLayer = fromProcess(
  rawEnvSchema as any
).pipe(Layer.provide(EnvService.Default));
