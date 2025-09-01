import * as Args from "@effect/cli/Args";
import * as Command from "@effect/cli/Command";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import { Notion } from "../lib/notion";

const idArgument = Args.text().pipe(
  Args.withDescription("ID of the entity to delete")
);

export const deleteResourceCommand = pipe(
  Command.make("resource", {
    args: idArgument,
  }),
  Command.withDescription("Delete a resource by ID"),
  Command.withHandler(({ args }) => deleteEntity(args))
);

export const deleteSourceCommand = pipe(
  Command.make("source", {
    args: idArgument,
  }),
  Command.withDescription("Delete a source entity by ID"),
  Command.withHandler(({ args }) => deleteEntity(args))
);

export const deleteSeriesCommand = pipe(
  Command.make("series", {
    args: idArgument,
  }),
  Command.withDescription("Delete a series by ID"),
  Command.withHandler(({ args }) => deleteEntity(args))
);

export const deleteCommand = pipe(
  Command.make("delete"),
  Command.withDescription("Delete data from Notion tables"),
  Command.withSubcommands([
    deleteResourceCommand,
    deleteSourceCommand,
    deleteSeriesCommand,
  ])
);

function deleteEntity(id: string) {
  return Effect.gen(function* () {
    const notion = yield* Notion;
    yield* notion.deletePage(id);
    yield* Console.log(`Successfully deleted entity with ID: ${id}`);
  }).pipe(Effect.catchAll((e) => Console.error(String(e))));
}
