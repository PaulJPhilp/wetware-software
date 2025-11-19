import { Console, Effect, Option } from "effect";
import { pipe } from "effect/Function";
import type { ResourceDetails, SeriesDetails, SourceEntityDetails } from "../lib/notion";
import { Notion } from "../lib/notion";

const idArgument = Args.text().pipe(Args.withDescription("ID of the entity to update"));

const nameOption = Options.text("name").pipe(
  Options.optional,
  Options.withDescription("New name for the entity")
);
const urlOption = Options.text("url").pipe(
  Options.optional,
  Options.withDescription("New URL for the entity")
);
const typeOption = Options.text("type").pipe(
  Options.optional,
  Options.withDescription("New type for the entity")
);
const descriptionOption = Options.text("description").pipe(
  Options.optional,
  Options.withDescription("New description for the entity")
);
const endorsementOption = Options.text("endorsement").pipe(
  Options.optional,
  Options.withDescription("New endorsement for the source entity")
);
const focusAreaOption = Options.text("focus-area").pipe(
  Options.optional,
  Options.withDescription("Comma-separated list of new focus areas")
);
const iconOption = Options.text("icon").pipe(
  Options.optional,
  Options.withDescription("New icon name for the resource")
);
const curatorNoteOption = Options.text("curator-note").pipe(
  Options.optional,
  Options.withDescription("New curator's note for the resource")
);
const tagsOption = Options.text("tags").pipe(
  Options.optional,
  Options.withDescription("Comma-separated list of new tags for the resource")
);
const readTimeMinutesOption = Options.integer("read-time-minutes").pipe(
  Options.optional,
  Options.withDescription("New read time in minutes for the resource")
);
const seriesNameOption = Options.text("series-name").pipe(
  Options.optional,
  Options.withDescription("New series name for the resource")
);
const sourceEntityNameOption = Options.text("source-entity-name").pipe(
  Options.optional,
  Options.withDescription("New source entity name for the resource")
);
const goalOption = Options.text("goal").pipe(
  Options.optional,
  Options.withDescription("New goal for the series")
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
      const updates: Partial<ResourceDetails> = {};
      Option.match(options.name, {
        onNone: () => {},
        onSome: (n: string) => {
          updates.name = n;
        },
      });
      Option.match(options.url, {
        onNone: () => {},
        onSome: (u: string) => {
          updates.url = u;
        },
      });
      Option.match(options.type, {
        onNone: () => {},
        onSome: (t: string) => {
          updates.type = t;
        },
      });
      Option.match(options.icon, {
        onNone: () => {},
        onSome: (i: string) => {
          updates.icon = i;
        },
      });
      Option.match(options.curatorNote, {
        onNone: () => {},
        onSome: (cn: string) => {
          updates.curatorNote = cn;
        },
      });
      Option.match(options.focusArea, {
        onNone: () => {},
        onSome: (fa: string) => {
          updates.focusArea = fa.split(",").map((s) => s.trim());
        },
      });
      Option.match(options.tags, {
        onNone: () => {},
        onSome: (t: string) => {
          updates.tags = t.split(",").map((s) => s.trim());
        },
      });
      Option.match(options.readTimeMinutes, {
        onNone: () => {},
        onSome: (rtm: number) => {
          updates.readTimeMinutes = rtm;
        },
      });
      Option.match(options.seriesName, {
        onNone: () => {},
        onSome: (sn: string) => {
          updates.seriesName = sn;
        },
      });
      Option.match(options.sourceEntityName, {
        onNone: () => {},
        onSome: (sen: string) => {
          updates.sourceEntityName = sen;
        },
      });

      if (Object.keys(updates).length === 0) {
        yield* Console.log("No update options provided.");
        return;
      }

      yield* notion.updateResource(args, updates);
      yield* Console.log(`Successfully updated resource with ID: ${args}`);
    }).pipe(Effect.catchAll((e) => Console.error(String(e))))
  )
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
      const updates: Partial<SourceEntityDetails> = {};
      Option.match(options.name, {
        onNone: () => {},
        onSome: (n: string) => {
          updates.name = n;
        },
      });
      Option.match(options.url, {
        onNone: () => {},
        onSome: (u: string) => {
          updates.url = u;
        },
      });
      Option.match(options.type, {
        onNone: () => {},
        onSome: (t: string) => {
          updates.type = t;
        },
      });
      Option.match(options.description, {
        onNone: () => {},
        onSome: (d: string) => {
          updates.description = d;
        },
      });
      Option.match(options.endorsement, {
        onNone: () => {},
        onSome: (e: string) => {
          updates.endorsement = e;
        },
      });
      Option.match(options.focusArea, {
        onNone: () => {},
        onSome: (fa: string) => {
          updates.focusArea = fa.split(",").map((s) => s.trim());
        },
      });

      if (Object.keys(updates).length === 0) {
        yield* Console.log("No update options provided.");
        return;
      }

      yield* notion.updateSourceEntity(args, updates);
      yield* Console.log(`Successfully updated source entity with ID: ${args}`);
    }).pipe(Effect.catchAll((e) => Console.error(String(e))))
  )
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
      const updates: Partial<SeriesDetails> = {};
      Option.match(options.name, {
        onNone: () => {},
        onSome: (n: string) => {
          updates.name = n;
        },
      });
      Option.match(options.description, {
        onNone: () => {},
        onSome: (d: string) => {
          updates.description = d;
        },
      });
      Option.match(options.goal, {
        onNone: () => {},
        onSome: (g: string) => {
          updates.goal = g;
        },
      });

      if (Object.keys(updates).length === 0) {
        yield* Console.log("No update options provided.");
        return;
      }

      yield* notion.updateSeries(args, updates);
      yield* Console.log(`Successfully updated series with ID: ${args}`);
    }).pipe(Effect.catchAll((e) => Console.error(String(e))))
  )
);

export const updateCommand = pipe(
  Command.make("update"),
  Command.withDescription("Update data in Notion tables"),
  Command.withSubcommands([updateResourceCommand, updateSourceCommand, updateSeriesCommand])
);
