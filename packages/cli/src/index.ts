import * as Command from "@effect/cli/Command";
import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import "dotenv/config";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { resourceCommand } from "./commands/addResource";
import { sourceCommand } from "./commands/addSource";
import { seriesCommand } from "./commands/addSeries";
import { deleteCommand } from "./commands/delete";
import { getCommand } from "./commands/get";
import { updateCommand } from "./commands/update";
import { listCommand, listResourcesTop, listSeriesTop, listSourcesTop } from "./commands/list";
import { OpenAIProviderLayer } from "./lib/ai";
import { NotionClientLayer } from "./lib/notion";

const add = Command.make("add").pipe(
  Command.withSubcommands([resourceCommand, sourceCommand, seriesCommand]),
);

const root = Command.withSubcommands(Command.make("wetware-cli"), [
  add,
  listCommand,
  listResourcesTop,
  listSourcesTop,
  listSeriesTop,
  deleteCommand,
  getCommand,
  updateCommand,
]);

const layer = Layer.mergeAll(NodeContext.layer, OpenAIProviderLayer, NotionClientLayer);

const run = Command.run(root, { name: "wetware-cli", version: "0.1.0" });

NodeRuntime.runMain(Effect.provide(run(process.argv.slice(2)), layer));
