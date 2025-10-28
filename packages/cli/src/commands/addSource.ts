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
import { buildSourceEntitySchema } from "../lib/sourceEntitySchema";

const verboseOption = Options.boolean("verbose").pipe(
  Options.withAlias("v"),
  Options.withDescription("Enable verbose output")
);
const urlOption = Options.text("url").pipe(
  Options.withAlias("u"),
  Options.optional,
  Options.withDescription("Optional URL for the source entity")
);

export const sourceCommand = pipe(
  Command.make("source", {
    args: Args.text().pipe(
      Args.withDescription("Source name (e.g., YouTube channel, author, company)")
    ),
    options: Options.all({ verbose: verboseOption, url: urlOption }),
  }),
  Command.withDescription("Add a source entity to Notion"),
  Command.withHandler(({ args, options }) =>
    handler(
      args,
      Option.match(options.url, { onNone: () => null, onSome: (v) => v }),
      Boolean(options.verbose)
    )
  )
);

export interface RunAddSourceOptions {
  promptOverride?: string;
}

export function handler(
  sourceName: string,
  sourceUrl: string | null,
  isVerbose: boolean,
  options?: RunAddSourceOptions
) {
  return Effect.gen(function* () {
    const ai = yield* OpenAI;
    const notion = yield* Notion;

    const promptPath = NodePath.join(
      process.cwd(),
      "packages",
      "cli",
      "prompts",
      "addSourceEntity.txt"
    );

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

    const sourceBlock = [`Source Name: "${sourceName}"`, `Source URL: "${sourceUrl ?? ""}"`].join(
      "\n"
    );

    const aiJson = yield* ai.generateSourceEntityJson({
      prompt,
      sourceBlock,
      verbose: isVerbose,
    });

    const schema = buildSourceEntitySchema();
    const validated = yield* Effect.try({
      try: () => schema.parse(JSON.parse(aiJson)),
      catch: (e) => new Error(`Validation failed: ${e}`),
    });

    const res = yield* notion.addSourceEntity(validated, {
      verbose: isVerbose,
    });
    yield* Console.log(
      `Success: Created Source Entity page ${res.pageId}${res.url ? ` at ${res.url}` : ""}`
    );
  });
}

export const runAddSource = handler;
