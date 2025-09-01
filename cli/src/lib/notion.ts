/** biome-ignore-all lint/complexity/useLiteralKeys: <> */
import { Client } from "@notionhq/client";
import type { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as Layer from "effect/Layer";
import type { z } from "zod";
import { buildSchema } from "./schema";
import type { SourceEntityInput } from "./sourceEntitySchema";
import type { SeriesInput } from "./seriesSchema";

const schema = buildSchema();
export type ResourceInput = z.infer<typeof schema>;

export interface NotionService {
  addResource: (
    data: ResourceInput,
    opts?: { verbose?: boolean }
  ) => Effect.Effect<{ pageId: string; url?: string }, Error>;
  addSourceEntity: (
    data: SourceEntityInput,
    opts?: { verbose?: boolean }
  ) => Effect.Effect<{ pageId: string; url?: string }, Error>;
  listResources: (opts?: { limit?: number }) => Effect.Effect<
    ReadonlyArray<{
      id: string;
      url?: string;
      name: string;
      type?: string | null;
      sourceEntityName?: string | null;
    }>,
    Error
  >;
  listSourceEntities: (opts?: { limit?: number }) => Effect.Effect<
    ReadonlyArray<{
      id: string;
      url?: string;
      name: string;
      type?: string | null;
    }>,
    Error
  >;
  listResourceSeries: (opts?: { limit?: number }) => Effect.Effect<
    ReadonlyArray<{
      id: string;
      url?: string;
      name: string;
    }>,
    Error
  >;
  addSeries: (
    data: SeriesInput,
    opts?: { verbose?: boolean }
  ) => Effect.Effect<{ pageId: string; url?: string }, Error>;
  deletePage: (pageId: string) => Effect.Effect<void, Error>;
}

export class Notion extends Effect.Service<NotionService>()("Notion", {
  succeed: {},
}) {}

export const { addResource, deletePage } = Effect.serviceFunctions(Notion);

function mapResourceToProperties(
  input: ResourceInput
): CreatePageParameters["properties"] {
  return {
    Name: {
      title: [{ type: "text", text: { content: input.resource_name } }],
    },
    "Resource URL": { url: input.resource_url },
    Type: { select: { name: input.resource_type } },
    Icon: input.icon_name
      ? { rich_text: [{ type: "text", text: { content: input.icon_name } }] }
      : undefined,
    "Curator's Note": input.curator_note
      ? { rich_text: [{ type: "text", text: { content: input.curator_note } }] }
      : undefined,
    "Focus Area": {
      multi_select: input.focus_area.map((name) => ({ name })),
    },
    Tags: input.tags?.length
      ? { multi_select: input.tags.map((name) => ({ name })) }
      : { multi_select: [] },
    "Read Time (min)":
      typeof input.read_time_minutes === "number"
        ? { number: input.read_time_minutes }
        : undefined,
    Series: input.resource_series_name
      ? {
          rich_text: [
            { type: "text", text: { content: input.resource_series_name } },
          ],
        }
      : undefined,
    "Source Entity": input.source_entity_name
      ? {
          rich_text: [
            { type: "text", text: { content: input.source_entity_name } },
          ],
        }
      : undefined,
  } as CreatePageParameters["properties"];
}

function mapSourceEntityToProperties(
  input: SourceEntityInput
): CreatePageParameters["properties"] {
  return {
    Name: {
      title: [{ type: "text", text: { content: input.name } }],
    },
    Type: { select: { name: input.type } },
    URL: input.url ? { url: input.url } : undefined,
    Description: input.description
      ? { rich_text: [{ type: "text", text: { content: input.description } }] }
      : undefined,
    "Paul's Endorsement": input.endorsement
      ? { rich_text: [{ type: "text", text: { content: input.endorsement } }] }
      : undefined,
    "Focus Area": {
      multi_select: input.focus_area.map((name) => ({ name })),
    },
  } as CreatePageParameters["properties"];
}

function mapSeriesToProperties(
  input: SeriesInput
): CreatePageParameters["properties"] {
  return {
    Name: {
      title: [{ type: "text", text: { content: input.name } }],
    },
    Description: {
      rich_text: [{ type: "text", text: { content: input.description } }],
    },
    "Series Goal": {
        rich_text: [{ type: "text", text: { content: input.goal } }],
    }
  } as CreatePageParameters["properties"];
}

type NotionSelectOption = { name: string };
type NotionSelectProperty = {
  type: "select";
  select: { options: NotionSelectOption[] };
};
type NotionMultiSelectProperty = {
  type: "multi_select";
  multi_select: { options: NotionSelectOption[] };
};
type NotionDatabase = {
  properties: Record<
    string,
    NotionSelectProperty | NotionMultiSelectProperty | unknown
  >;
};

async function validateSelectOptions(
  notion: Client,
  databaseId: string,
  input: ResourceInput
) {
  const db = (await notion.databases.retrieve({
    database_id: databaseId,
  })) as unknown as NotionDatabase;
  const typeProp = db.properties["Type"] as NotionSelectProperty | undefined;
  const focusProp = db.properties["Focus Area"] as
    | NotionMultiSelectProperty
    | undefined;
  const tagsProp = db.properties["Tags"] as
    | NotionMultiSelectProperty
    | undefined;

  const ensureAllowed = (
    prop: NotionSelectProperty | NotionMultiSelectProperty | undefined,
    values: readonly string[],
    propName: string
  ) => {
    if (!prop || (prop.type !== "select" && prop.type !== "multi_select"))
      return;
    const options =
      prop.type === "select" ? prop.select.options : prop.multi_select.options;
    const allowed = new Set(options.map((o) => o.name));
    for (const v of values) {
      if (!allowed.has(v)) {
        throw new Error(
          `Value '${v}' is not an allowed option for ${propName}. Please add it manually in Notion.`
        );
      }
    }
  };

  ensureAllowed(typeProp, [input.resource_type], "Type");
  ensureAllowed(focusProp, input.focus_area, "Focus Area");
  ensureAllowed(tagsProp, input.tags ?? [], "Tags");
}

export const NotionClientLayer = Layer.effect(
  Notion,
  Effect.suspend(() => {
    const apiKey = process.env["NOTION_API_KEY"];
    const databaseId = process.env["NOTION_RESOURCES_DATABASE_ID"];
    const sourceEntitiesDatabaseId =
      process.env["NOTION_SOURCE_ENTITIES_DATABASE_ID"];
    const resourceSeriesDatabaseId =
      process.env["NOTION_RESOURCE_SERIES_DATABASE_ID"];
    if (!apiKey) return Effect.fail(new Error("Missing NOTION_API_KEY"));
    if (!databaseId)
      return Effect.fail(new Error("Missing NOTION_RESOURCES_DATABASE_ID"));
    if (!sourceEntitiesDatabaseId)
      return Effect.fail(
        new Error("Missing NOTION_SOURCE_ENTITIES_DATABASE_ID")
      );

    const notion = new Client({ auth: apiKey });

    return Effect.succeed<NotionService>({
      addResource: (input, opts) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              // Enforce option existence
              await validateSelectOptions(notion, databaseId, input);

              const properties = mapResourceToProperties(input);

              const page = await notion.pages.create({
                parent: { database_id: databaseId },
                properties,
              });
              return {
                pageId: page.id,
                url: (page as unknown as { url?: string }).url,
              };
            },
            catch: (e) => new Error(`Notion API error: ${String(e)}`),
          }),
          Effect.tap(() =>
            opts?.verbose ? Console.log("Notion page created") : Effect.void
          )
        ),
      addSourceEntity: (input, opts) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              // Validate select/multi-select allowed options on Source Entities db
              const db = (await notion.databases.retrieve({
                database_id: sourceEntitiesDatabaseId,
              })) as unknown as NotionDatabase;

              const typeProp = db.properties["Type"] as
                | NotionSelectProperty
                | undefined;
              const focusProp = db.properties["Focus Area"] as
                | NotionMultiSelectProperty
                | undefined;

              const ensureAllowed = (
                prop:
                  | NotionSelectProperty
                  | NotionMultiSelectProperty
                  | undefined,
                values: readonly string[],
                propName: string
              ) => {
                if (
                  !prop ||
                  (prop.type !== "select" && prop.type !== "multi_select")
                )
                  return;
                const options =
                  prop.type === "select"
                    ? prop.select.options
                    : prop.multi_select.options;
                const allowed = new Set(options.map((o) => o.name));
                for (const v of values) {
                  if (!allowed.has(v)) {
                    throw new Error(
                      `Value '${v}' is not an allowed option for ${propName}. Please add it manually in Notion.`
                    );
                  }
                }
              };

              if (typeProp) ensureAllowed(typeProp, [input.type], "Type");
              if (focusProp)
                ensureAllowed(focusProp, input.focus_area, "Focus Area");

              const properties = mapSourceEntityToProperties(input);
              const page = await notion.pages.create({
                parent: { database_id: sourceEntitiesDatabaseId },
                properties,
              });
              return {
                pageId: page.id,
                url: (page as unknown as { url?: string }).url,
              };
            },
            catch: (e) => new Error(`Notion API error: ${String(e)}`),
          }),
          Effect.tap(() =>
            opts?.verbose
              ? Console.log("Notion source entity page created")
              : Effect.void
          )
        ),
      listResources: (opts) =>
        Effect.tryPromise({
          try: async () => {
            const res = await notion.databases.query({
              database_id: databaseId,
              page_size: Math.min(Math.max(opts?.limit ?? 25, 1), 100),
            });
            return res.results.map((p) => {
              const props =
                (p as { properties?: Record<string, unknown> }).properties ??
                {};
              const name =
                (
                  (props as Record<string, unknown>)["Name"] as
                    | { title?: Array<{ plain_text?: string }> }
                    | undefined
                )?.title?.[0]?.plain_text?.trim?.() ?? "";
              const type =
                (
                  (props as Record<string, unknown>)["Type"] as
                    | { select?: { name?: string } }
                    | undefined
                )?.select?.name ?? null;
              const sourceEntityName =
                (
                  (props as Record<string, unknown>)["Source Entity"] as
                    | { rich_text?: Array<{ plain_text?: string }> }
                    | undefined
                )?.rich_text?.[0]?.plain_text ?? null;
              const url = (p as { url?: string }).url;
              return {
                id: (p as { id: string }).id,
                url,
                name,
                type,
                sourceEntityName,
              };
            });
          },
          catch: (e) => new Error(`Notion API error: ${String(e)}`),
        }),
      listSourceEntities: (opts) =>
        Effect.tryPromise({
          try: async () => {
            const res = await notion.databases.query({
              database_id: sourceEntitiesDatabaseId,
              page_size: Math.min(Math.max(opts?.limit ?? 25, 1), 100),
            });
            return res.results.map((p) => {
              const props =
                (p as { properties?: Record<string, unknown> }).properties ??
                {};
              const name =
                (
                  (props as Record<string, unknown>)["Name"] as
                    | { title?: Array<{ plain_text?: string }> }
                    | undefined
                )?.title?.[0]?.plain_text?.trim?.() ?? "";
              const type =
                (
                  (props as Record<string, unknown>)["Type"] as
                    | { select?: { name?: string } }
                    | undefined
                )?.select?.name ?? null;
              const url = (p as { url?: string }).url;
              return { id: (p as { id: string }).id, url, name, type };
            });
          },
          catch: (e) => new Error(`Notion API error: ${String(e)}`),
        }),
      listResourceSeries: (opts) =>
        Effect.tryPromise({
          try: async () => {
            if (!resourceSeriesDatabaseId)
              throw new Error("Missing NOTION_RESOURCE_SERIES_DATABASE_ID");
            const res = await notion.databases.query({
              database_id: resourceSeriesDatabaseId,
              page_size: Math.min(Math.max(opts?.limit ?? 25, 1), 100),
            });
            return res.results.map((p) => {
              const props =
                (p as { properties?: Record<string, unknown> }).properties ??
                {};
              const name =
                (
                  (props as Record<string, unknown>)["Name"] as
                    | { title?: Array<{ plain_text?: string }> }
                    | undefined
                )?.title?.[0]?.plain_text?.trim?.() ?? "";
              const url = (p as { url?: string }).url;
              return { id: (p as { id: string }).id, url, name };
            });
          },
          catch: (e) => new Error(`Notion API error: ${String(e)}`),
        }),
      addSeries: (input, opts) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              if (!resourceSeriesDatabaseId) {
                throw new Error("Missing NOTION_RESOURCE_SERIES_DATABASE_ID");
              }
              const properties = mapSeriesToProperties(input);
              const page = await notion.pages.create({
                parent: { database_id: resourceSeriesDatabaseId },
                properties,
              });
              return {
                pageId: page.id,
                url: (page as unknown as { url?: string }).url,
              };
            },
            catch: (e) => new Error(`Notion API error: ${String(e)}`),
          }),
          Effect.tap(() =>
            opts?.verbose ? Console.log("Notion series page created") : Effect.void
          )
        ),
      deletePage: (pageId: string) =>
        pipe(
          Effect.tryPromise({
            try: async () => {
              await notion.pages.update({ page_id: pageId, archived: true });
            },
            catch: (e) => new Error(`Notion API error: ${String(e)}`),
          }),
          Effect.tap(() => Console.log(`Page ${pageId} archived.`))
        ),
    });
  })
);
