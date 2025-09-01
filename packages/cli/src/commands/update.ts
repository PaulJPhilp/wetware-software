import * as Args from "@effect/cli/Args";
import * as Command from "@effect/cli/Command";
import * as Options from "@effect/cli/Options";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as Option from "effect/Option";
import { Notion } from "../lib/notion";

const idArgument = Args.text().pipe(Args.withDescription("ID of the entity to update"));

const nameOption = Options.text("name").pipe(
  Options.optional,
  Options.withDescription("New name for the entity"),
);
const urlOption = Options.text("url").pipe(
  Options.optional,
  Options.withDescription("New URL for the entity"),
);
const typeOption = Options.text("type").pipe(
  Options.optional,
  Options.withDescription("New type for the entity"),
);
const descriptionOption = Options.text("description").pipe(
  Options.optional,
  Options.withDescription("New description for the entity"),
);
const endorsementOption = Options.text("endorsement").pipe(
  Options.optional,
  Options.withDescription("New endorsement for the source entity"),
);
const focusAreaOption = Options.text("focus-area").pipe(
  Options.optional,
  Options.withDescription("Comma-separated list of new focus areas"),
);
const iconOption = Options.text("icon").pipe(
  Options.optional,
  Options.withDescription("New icon name for the resource"),
);
const curatorNoteOption = Options.text("curator-note").pipe(
  Options.optional,
  Options.withDescription("New curator's note for the resource"),
);
const tagsOption = Options.text("tags").pipe(
  Options.optional,
  Options.withDescription("Comma-separated list of new tags for the resource"),
);
const readTimeMinutesOption = Options.integer("read-time-minutes").pipe(
  Options.optional,
  Options.withDescription("New read time in minutes for the resource"),
);
const seriesNameOption = Options.text("series-name").pipe(
  Options.optional,
  Options.withDescription("New series name for the resource"),
);
const sourceEntityNameOption = Options.text("source-entity-name").pipe(
  Options.optional,
  Options.withDescription("New source entity name for the resource"),
);
const goalOption = Options.text("goal").pipe(
  Options.optional,
  Options.withDescription("New goal for the series"),
);

export const updateResourceCommand = pipe(
  Command.make("resource", {
    args: idArgument,
    options: Options.all({
      name: nameOption,
      url: urlOption,
      type: typeOption,
      icon: iconOption,
      curatorNote: curatorNoteOption,
      focusArea: focusAreaOption,
      tags: tagsOption,
      readTimeMinutes: readTimeMinutesOption,
      seriesName: seriesNameOption,
      sourceEntityName: sourceEntityNameOption,
    }),
  }),
  Command.withDescription("Update a resource by ID"),
  Command.withHandler(({ args, options }) =>
    Effect.gen(function* () {
      const notion = yield* Notion;
      const updates: Record<string, any> = {};
      Option.map(options.name, (n) => (updates.name = n));
      Option.map(options.url, (u) => (updates.url = u));
      Option.map(options.type, (t) => (updates.type = t));
      Option.map(options.icon, (i) => (updates.icon = i));
      Option.map(options.curatorNote, (cn) => (updates.curatorNote = cn));
      Option.map(
        options.focusArea,
        (fa) => (updates.focusArea = fa.split(",").map((s) => s.trim())),
      );
      Option.map(options.tags, (t) => (updates.tags = t.split(",").map((s) => s.trim())));
      Option.map(options.readTimeMinutes, (rtm) => (updates.readTimeMinutes = rtm));
      Option.map(options.seriesName, (sn) => (updates.seriesName = sn));
      Option.map(options.sourceEntityName, (sen) => (updates.sourceEntityName = sen));

      if (Object.keys(updates).length === 0) {
        yield* Console.log("No update options provided.");
        return;
      }

      yield* notion.updateResource(args, updates);
      yield* Console.log(`Successfully updated resource with ID: ${args}`);
    }).pipe(Effect.catchAll((e) => Console.error(String(e)))),
  ),
);

export const updateSourceCommand = pipe(
  Command.make("source", {
    args: idArgument,
    options: Options.all({
      name: nameOption,
      url: urlOption,
      type: typeOption,
      description: descriptionOption,
      endorsement: endorsementOption,
      focusArea: focusAreaOption,
    }),
  }),
  Command.withDescription("Update a source entity by ID"),
  Command.withHandler(({ args, options }) =>
    Effect.gen(function* () {
      const notion = yield* Notion;
      const updates: Record<string, any> = {};
      Option.map(options.name, (n) => (updates.name = n));
      Option.map(options.url, (u) => (updates.url = u));
      Option.map(options.type, (t) => (updates.type = t));
      Option.map(options.description, (d) => (updates.description = d));
      Option.map(options.endorsement, (e) => (updates.endorsement = e));
      Option.map(
        options.focusArea,
        (fa) => (updates.focusArea = fa.split(",").map((s) => s.trim())),
      );

      if (Object.keys(updates).length === 0) {
        yield* Console.log("No update options provided.");
        return;
      }

      yield* notion.updateSourceEntity(args, updates);
      yield* Console.log(`Successfully updated source entity with ID: ${args}`);
    }).pipe(Effect.catchAll((e) => Console.error(String(e)))),
  ),
);

export const updateSeriesCommand = pipe(
  Command.make("series", {
    args: idArgument,
    options: Options.all({
      name: nameOption,
      description: descriptionOption,
      goal: goalOption,
    }),
  }),
  Command.withDescription("Update a series by ID"),
  Command.withHandler(({ args, options }) =>
    Effect.gen(function* () {
      const notion = yield* Notion;
      const updates: Record<string, any> = {};
      Option.map(options.name, (n) => (updates.name = n));
      Option.map(options.description, (d) => (updates.description = d));
      Option.map(options.goal, (g) => (updates.goal = g));

      if (Object.keys(updates).length === 0) {
        yield* Console.log("No update options provided.");
        return;
      }

      yield* notion.updateSeries(args, updates);
      yield* Console.log(`Successfully updated series with ID: ${args}`);
    }).pipe(Effect.catchAll((e) => Console.error(String(e)))),
  ),
);

export const updateCommand = pipe(
  Command.make("update"),
  Command.withDescription("Update data in Notion tables"),
  Command.withSubcommands([updateResourceCommand, updateSourceCommand, updateSeriesCommand]),
);
