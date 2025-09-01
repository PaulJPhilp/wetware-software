import * as Args from "@effect/cli/Args";
import * as Command from "@effect/cli/Command";
import * as Options from "@effect/cli/Options";
import { FileSystem } from "@effect/platform/FileSystem";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import { OpenAI } from "../lib/ai";
import { Notion } from "../lib/notion";
import { buildSchema } from "../lib/schema";
import { fetchPageMetadata } from "../lib/web";

const verboseOption = Options.boolean("verbose").pipe(
  Options.withAlias("v"),
  Options.withDescription("Enable verbose output"),
);

export const resourceCommand = pipe(
  Command.make("resource", {
    args: pipe(Args.text(), Args.withDescription("URL of the resource to add")),
    options: Options.all({ verbose: verboseOption }),
  }),
  Command.withDescription("Add a single resource by URL"),
  Command.withHandler(({ args, options }) => handler(args, Boolean(options.verbose))),
);

export const addResourceCommand = pipe(
  Command.make("add"),
  Command.withDescription("Add resources to Notion"),
  Command.withSubcommands([resourceCommand]),
);

function handler(resourceUrl: string, isVerbose: boolean) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem;
    const ai = yield* OpenAI;
    const notion = yield* Notion;

    if (isVerbose) {
      yield* Console.log("Reading prompt from prompts/addResources.txt");
    }

    const prompt = yield* fs.readFileString("prompts/addResources.txt");
    const meta = yield* fetchPageMetadata(resourceUrl);
    const resourceBlock = [
      `Resource Title: "${meta.title ?? ""}"`,
      `Resource URL: "${resourceUrl}"`,
      `Automatically fetched short description: "${meta.description ?? ""}"`,
    ].join("\n");

    const aiJson = yield* ai.generateResourceJson({
      prompt,
      resourceBlock,
      verbose: isVerbose,
    });
    const schema = buildSchema();
    const validated = yield* Effect.try({
      try: () => schema.parse(JSON.parse(aiJson)),
      catch: (e) => new Error(`Validation failed: ${e}`),
    });

    const res = yield* notion.addResource(validated, { verbose: isVerbose });
    yield* Console.log(
      `Success: Created Notion page ${res.pageId}${res.url ? ` at ${res.url}` : ""}`,
    );
  });
}

export const runAddResource = handler;
