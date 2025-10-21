import * as Args from "@effect/cli/Args";
import * as Command from "@effect/cli/Command";
import * as Options from "@effect/cli/Options";
import { FileSystem } from "@effect/platform/FileSystem";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as Option from "effect/Option";
import * as NodePath from "node:path";

import { OpenAI } from "../lib/ai";
import { Notion } from "../lib/notion";
import { buildSeriesSchema } from "../lib/seriesSchema";

const verboseOption = Options.boolean("verbose").pipe(
  Options.withAlias("v"),
  Options.withDescription("Enable verbose output"),
);

const descriptionOption = Options.text("description").pipe(
  Options.withAlias("d"),
  Options.optional,
  Options.withDescription("Optional description for the series"),
);

export const seriesCommand = pipe(
  Command.make("series", {
    args: Args.text().pipe(Args.withDescription("Series name")),
    options: Options.all({
      verbose: verboseOption,
      description: descriptionOption,
    }),
  }),
  Command.withDescription("Add a new resource series to Notion"),
  Command.withHandler(({ args, options }) =>
    runAddSeries(args, Option.getOrUndefined(options.description), Boolean(options.verbose)),
  ),
);

export interface RunAddSeriesOptions {
  promptOverride?: string;
}

export function runAddSeries(
  seriesName: string,
  description: string | undefined,
  isVerbose: boolean,
  options?: RunAddSeriesOptions,
) {
  return Effect.gen(function* () {
    const ai = yield* OpenAI;
    const notion = yield* Notion;

    const promptPath = NodePath.join(process.cwd(), "packages", "cli", "prompts", "addSeries.txt");

    let prompt: string;
    if (options?.promptOverride) {
      prompt = options.promptOverride;
    } else {
      if (isVerbose) {
        yield* Console.log(`Reading prompt from ${promptPath}`);
      }
      const fs = yield* FileSystem;
      prompt = yield* fs.readFileString(promptPath);
    }

    const lines = [`Series Name: "${seriesName}"`];
    if (description) {
      lines.push(`Series Description: "${description}"`);
    }
    const seriesBlock = lines.join("\n");

    const aiJson = yield* ai.generateSeriesJson({
      prompt,
      seriesBlock: seriesBlock,
      verbose: isVerbose,
    });

    const schema = buildSeriesSchema();
    const validated = yield* Effect.try({
      try: () => schema.parse(JSON.parse(aiJson)),
      catch: (e) => new Error(`Validation failed: ${e}`),
    });

    const res = yield* notion.addSeries(validated, {
      verbose: isVerbose,
    });
    yield* Console.log(
      `Success: Created Series page ${res.pageId}${res.url ? ` at ${res.url}` : ""}`,
    );
  });
}
