/** biome-ignore-all lint/complexity/useLiteralKeys: <> */
import * as NodeContext from "@effect/platform-node/NodeContext";
import * as Effect from "effect/Effect";
import * as http from "node:http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { OpenAI, type OpenAIService } from "../lib/ai";
import { Notion, type NotionService } from "../lib/notion";
import { runAddResource } from "./addResource";

let server: http.Server;
let baseUrl = "";

beforeAll(async () => {
  server = http.createServer((_req, res) => {
    const html = `<!doctype html><html><head>
      <title>Test Title</title>
      <meta name="description" content="A short description">
      <meta property="og:description" content="OG description">
    </head><body>ok</body></html>`;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address();
  if (address && typeof address === "object") {
    baseUrl = `http://127.0.0.1:${address.port}`;
  } else {
    throw new Error("Failed to start test server");
  }
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

describe("CLI add resource", () => {
  it("enriches via AI and creates a Notion page (happy path)", async () => {
    let notionCalledWith: unknown | null = null;

    const fakeAI: OpenAIService = {
      generateResourceJson: ({ prompt, resourceBlock }) =>
        Effect.sync(() => {
          // minimal, valid JSON aligned with schema and prompt
          const out = {
            resource_name: "Test Title",
            resource_url: `${baseUrl}/page`,
            resource_type: "Article",
            curator_note: "Clear, concise engineering value.",
            focus_area: ["Tech-Centric"],
            tags: ["Concepts"],
            source_entity_name: "Unit Test",
            read_time_minutes: 3,
            icon_name: "file-text",
            resource_series_name: null,
            resource_series_part_number: null,
          };
          // basic sanity that prompt/resourceBlock flowed
          expect(prompt.length).toBeGreaterThan(10);
          expect(resourceBlock).toContain("Resource URL");
          return JSON.stringify(out);
        }),
      generateSourceEntityJson: () => Effect.succeed("{}"),
    };

    const fakeNotion: NotionService = {
      addResource: (data) =>
        Effect.sync(() => {
          notionCalledWith = data;
          return { pageId: "page_123", url: "https://notion.test/page_123" };
        }),
      addSourceEntity: () =>
        Effect.sync(() => ({ pageId: "s1", url: "https://notion.test/s1" })),
    };

    const effect = runAddResource(`${baseUrl}/page`, true).pipe(
      Effect.provideService(OpenAI, fakeAI),
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(notionCalledWith).toBeTruthy();
    const data = notionCalledWith as Record<string, unknown>;
    expect(data["resource_name"]).toBe("Test Title");
    expect(data["resource_url"]).toBe(`${baseUrl}/page`);
  });
});
