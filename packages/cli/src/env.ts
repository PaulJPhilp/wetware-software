import { Schema as S } from "effect";

/**
 * Raw environment schema for validation (all strings)
 */
export const rawEnvSchema = S.Struct({
  // Notion configuration
  NOTION_API_KEY: S.String,
  NOTION_RESOURCES_DATABASE_ID: S.String,
  NOTION_SOURCE_ENTITIES_DATABASE_ID: S.String,
  NOTION_RESOURCE_SERIES_DATABASE_ID: S.optional(S.String),

  // AI configuration
  GOOGLE_AI_API_KEY: S.String,

  // Optional configuration (raw strings)
  NODE_ENV: S.optional(S.Literal("development", "production", "test")),
  DEBUG: S.optional(S.Literal("true", "false")),
});

/**
 * Typed environment schema for usage
 */
export const envSchema = S.Struct({
  // Notion configuration
  NOTION_API_KEY: S.String,
  NOTION_RESOURCES_DATABASE_ID: S.String,
  NOTION_SOURCE_ENTITIES_DATABASE_ID: S.String,
  NOTION_RESOURCE_SERIES_DATABASE_ID: S.optional(S.String),

  // AI configuration
  GOOGLE_AI_API_KEY: S.String,

  // Optional configuration
  NODE_ENV: S.optional(S.Literal("development", "production", "test")),
  DEBUG: S.optional(S.BooleanFromString),
});

export type CliEnv = S.Schema.Type<typeof envSchema>;
export type RawCliEnv = S.Schema.Type<typeof rawEnvSchema>;

/**
 * Helper function to convert raw env to typed env with defaults
 */
export const convertRawToTyped = (raw: RawCliEnv): CliEnv => ({
  ...raw,
  DEBUG: raw.DEBUG === "true" ? true : raw.DEBUG === "false" ? false : undefined,
});

/**
 * Helper function to get environment variables with defaults
 */
export const getEnvWithDefaults = (env: CliEnv): Omit<CliEnv, "NODE_ENV" | "DEBUG"> & {
  NODE_ENV: "development" | "production" | "test";
  DEBUG: boolean;
} => ({
  ...env,
  NODE_ENV: env.NODE_ENV ?? "development",
  DEBUG: env.DEBUG ?? false,
});
