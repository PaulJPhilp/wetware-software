import { Console, Effect } from "effect";
import { pipe } from "effect/Function";
import { Notion } from "../lib/notion";

const idArgument = Args.text().pipe(Args.withDescription("ID of the entity to retrieve"));

export const getResourceCommand = pipe(
  Command.make("resource", {
    args: idArgument,
  }),
  Command.withDescription("Get a resource by ID"),
  Command.withHandler(({ args }) =>
    Effect.gen(function* () {
      const notion = yield* Notion;
      const resource = yield* notion.getResourceById(args);
      yield* Console.log(`\nResource Details (ID: ${resource.id}):`);
      yield* Console.log(`  Name: ${resource.name}`);
      yield* Console.log(`  URL: ${resource.url ?? "N/A"}`);
      yield* Console.log(`  Type: ${resource.type ?? "N/A"}`);
      yield* Console.log(`  Source Entity: ${resource.sourceEntityName ?? "N/A"}`);
      yield* Console.log(`  Series: ${resource.seriesName ?? "N/A"}`);
      yield* Console.log(`  Icon: ${resource.icon ?? "N/A"}`);
      yield* Console.log(`  Curator's Note: ${resource.curatorNote ?? "N/A"}`);
      yield* Console.log(`  Focus Area: ${resource.focusArea?.join(", ") ?? "N/A"}`);
      yield* Console.log(`  Tags: ${resource.tags?.join(", ") ?? "N/A"}`);
      yield* Console.log(`  Read Time (min): ${resource.readTimeMinutes ?? "N/A"}`);
    }).pipe(Effect.catchAll((e) => Console.error(String(e))))
  )
);

export const getSourceCommand = pipe(
  Command.make("source", {
    args: idArgument,
  }),
  Command.withDescription("Get a source entity by ID"),
  Command.withHandler(({ args }) =>
    Effect.gen(function* () {
      const notion = yield* Notion;
      const source = yield* notion.getSourceEntityById(args);
      yield* Console.log(`\nSource Entity Details (ID: ${source.id}):`);
      yield* Console.log(`  Name: ${source.name}`);
      yield* Console.log(`  URL: ${source.url ?? "N/A"}`);
      yield* Console.log(`  Type: ${source.type ?? "N/A"}`);
      yield* Console.log(`  Description: ${source.description ?? "N/A"}`);
      yield* Console.log(`  Paul's Endorsement: ${source.endorsement ?? "N/A"}`);
      yield* Console.log(`  Focus Area: ${source.focusArea?.join(", ") ?? "N/A"}`);
    }).pipe(Effect.catchAll((e) => Console.error(String(e))))
  )
);

export const getSeriesCommand = pipe(
  Command.make("series", {
    args: idArgument,
  }),
  Command.withDescription("Get a series by ID"),
  Command.withHandler(({ args }) =>
    Effect.gen(function* () {
      const notion = yield* Notion;
      const series = yield* notion.getSeriesById(args);
      yield* Console.log(`\nSeries Details (ID: ${series.id}):`);
      yield* Console.log(`  Name: ${series.name}`);
      yield* Console.log(`  URL: ${series.url ?? "N/A"}`);
      yield* Console.log(`  Description: ${series.description ?? "N/A"}`);
      yield* Console.log(`  Goal: ${series.goal ?? "N/A"}`);
    }).pipe(Effect.catchAll((e) => Console.error(String(e))))
  )
);

export const getCommand = pipe(
  Command.make("get"),
  Command.withDescription("Retrieve detailed information from Notion tables"),
  Command.withSubcommands([getResourceCommand, getSourceCommand, getSeriesCommand])
);
