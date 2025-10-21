import * as Command from "@effect/cli/Command";
import * as Options from "@effect/cli/Options";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as Option from "effect/Option";
import { Notion } from "../lib/notion";

const limitOption = Options.integer("limit").pipe(
  Options.withAlias("n"),
  Options.optional,
  Options.withDescription("Max rows to list (default 25, max 100)"),
);

export const listResourcesCommand = pipe(
  Command.make("resources", { options: Options.all({ limit: limitOption }) }),
  Command.withDescription("List recent resources"),
  Command.withHandler(({ options }) => listResources(Option.getOrUndefined(options.limit))),
);

export const listSourcesCommand = pipe(
  Command.make("sources", { options: Options.all({ limit: limitOption }) }),
  Command.withDescription("List source entities"),
  Command.withHandler(({ options }) => listSources(Option.getOrUndefined(options.limit))),
);

export const listSeriesCommand = pipe(
  Command.make("series", { options: Options.all({ limit: limitOption }) }),
  Command.withDescription("List resource series"),
  Command.withHandler(({ options }) => listSeries(Option.getOrUndefined(options.limit))),
);

export const listCommand = pipe(
  Command.make("list"),
  Command.withDescription("List data from Notion tables"),
  Command.withSubcommands([listResourcesCommand, listSourcesCommand, listSeriesCommand]),
);

export const listResourcesTop = pipe(
  Command.make("list-resources", {
    options: Options.all({ limit: limitOption }),
  }),
  Command.withDescription("List recent resources"),
  Command.withHandler(({ options }) => listResources(Option.getOrUndefined(options.limit))),
);

export const listSourcesTop = pipe(
  Command.make("list-sources", {
    options: Options.all({ limit: limitOption }),
  }),
  Command.withDescription("List source entities"),
  Command.withHandler(({ options }) => listSources(Option.getOrUndefined(options.limit))),
);

export const listSeriesTop = pipe(
  Command.make("list-series", { options: Options.all({ limit: limitOption }) }),
  Command.withDescription("List resource series"),
  Command.withHandler(({ options }) => listSeries(Option.getOrUndefined(options.limit))),
);

export function listResources(limitOpt: number | undefined) {
  return Effect.gen(function* () {
    const notion = yield* Notion;
    const rows = yield* notion.listResources(limitOpt !== undefined ? { limit: limitOpt } : {});
    for (const r of rows) {
      yield* Effect.sync(() =>
        Console.log(
          `${r.id} | ${r.name}${r.type ? ` [${r.type}]` : ""}${r.url ? ` <${r.url}>` : ""}`,
        ),
      );
    }
  }).pipe(Effect.catchAll((e) => Effect.sync(() => Console.error(String(e)))));
}

export function listSources(limitOpt: number | undefined) {
  return Effect.gen(function* () {
    const notion = yield* Notion;
    const rows = yield* notion.listSourceEntities(
      limitOpt !== undefined ? { limit: limitOpt } : {},
    );
    for (const r of rows) {
      yield* Effect.sync(() =>
        Console.log(
          `${r.id} | ${r.name}${r.type ? ` [${r.type}]` : ""}${r.url ? ` <${r.url}>` : ""}`,
        ),
      );
    }
  }).pipe(Effect.catchAll((e) => Effect.sync(() => Console.error(String(e)))));
}

export function listSeries(limitOpt: number | undefined) {
  return Effect.gen(function* () {
    const notion = yield* Notion;
    const rows = yield* notion.listResourceSeries(
      limitOpt !== undefined ? { limit: limitOpt } : {},
    );
    for (const r of rows) {
      yield* Effect.sync(() => Console.log(`${r.id} | ${r.name}${r.url ? ` <${r.url}>` : ""}`));
    }
  }).pipe(Effect.catchAll((e) => Effect.sync(() => Console.error(String(e)))));
}
