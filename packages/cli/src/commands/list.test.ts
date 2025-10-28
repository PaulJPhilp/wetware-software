import * as NodeContext from "@effect/platform-node/NodeContext";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import type { MockInstance } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Notion } from "../lib/notion";
import { createNotionMock } from "../test/notionTestUtils";
import { listResources, listSeries, listSources } from "./list";

describe("CLI list sources", () => {
  let consoleSpy: MockInstance<Parameters<typeof Console.log>, ReturnType<typeof Console.log>>;
  let consoleErrorSpy: MockInstance<
    Parameters<typeof Console.error>,
    ReturnType<typeof Console.error>
  >;

  beforeEach(() => {
    consoleSpy = vi.spyOn(Console, "log").mockReturnValue(Effect.void);
    consoleErrorSpy = vi.spyOn(Console, "error").mockReturnValue(Effect.void);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("lists source entities from Notion (happy path)", async () => {
    const mockSourceEntities = [
      {
        id: "s1",
        name: "Source One",
        type: "Individual",
        url: "https://sourceone.com",
      },
      { id: "s2", name: "Source Two", type: "Company" },
    ];

    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed(mockSourceEntities),
      listResourceSeries: () => Effect.succeed([]),
      addSeries: () => Effect.succeed({ pageId: "", url: "" }),
    });

    const effect = listSources(undefined).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith("s1 | Source One [Individual] <https://sourceone.com>");
    expect(consoleSpy).toHaveBeenCalledWith("s2 | Source Two [Company]");
  });

  it("handles Notion API errors for listing source entities", async () => {
    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () =>
        Effect.fail(new Error("Notion API Error: Failed to fetch source entities")),
      listResourceSeries: () => Effect.succeed([]),
      addSeries: () => Effect.succeed({ pageId: "", url: "" }),
    });

    const effect = listSources(undefined).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error: Notion API Error: Failed to fetch source entities"
    );
  });

  it("lists a limited number of source entities from Notion", async () => {
    const mockSourceEntities = [
      {
        id: "s1",
        name: "Source One",
        type: "Individual",
        url: "https://sourceone.com",
      },
      { id: "s2", name: "Source Two", type: "Company" },
      { id: "s3", name: "Source Three", type: "Publication" },
    ];

    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: (args) => {
        const limit = typeof args?.limit === "number" ? args.limit : undefined;
        return Effect.succeed(
          typeof limit === "number" ? mockSourceEntities.slice(0, limit) : mockSourceEntities
        );
      },
      listResourceSeries: () => Effect.succeed([]),
      addSeries: () => Effect.succeed({ pageId: "", url: "" }),
    });

    const effect = listSources(2).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith("s1 | Source One [Individual] <https://sourceone.com>");
    expect(consoleSpy).toHaveBeenCalledWith("s2 | Source Two [Company]");
  });

  it("lists resource series from Notion (happy path)", async () => {
    const mockResourceSeries = [
      { id: "srs1", name: "Series One", url: "https://seriesone.com" },
      { id: "srs2", name: "Series Two" },
    ];

    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed(mockResourceSeries),
      addSeries: () => Effect.succeed({ pageId: "", url: "" }),
    });

    const effect = listSeries(undefined).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith("srs1 | Series One <https://seriesone.com>");
    expect(consoleSpy).toHaveBeenCalledWith("srs2 | Series Two");
  });

  it("handles Notion API errors for listing resource series", async () => {
    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.fail(new Error("Notion API Error: Failed to fetch series")),
      addSeries: () => Effect.succeed({ pageId: "", url: "" }),
    });

    const effect = listSeries(undefined).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: Notion API Error: Failed to fetch series");
  });

  it("lists a limited number of resource series from Notion", async () => {
    const mockResourceSeries = [
      { id: "srs1", name: "Series One", url: "https://seriesone.com" },
      { id: "srs2", name: "Series Two" },
      { id: "srs3", name: "Series Three" },
    ];

    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: (args?: { limit?: number }) =>
        Effect.succeed(mockResourceSeries.slice(0, args?.limit ?? mockResourceSeries.length)),
      addSeries: () => Effect.succeed({ pageId: "", url: "" }),
    });

    const effect = listSeries(2).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith("srs1 | Series One <https://seriesone.com>");
    expect(consoleSpy).toHaveBeenCalledWith("srs2 | Series Two");
  });

  it("lists resources from Notion (happy path)", async () => {
    const mockResources = [
      {
        id: "r1",
        name: "Resource One",
        type: "Article",
        url: "https://resourceone.com",
        sourceEntityName: "Author One",
      },
      {
        id: "r2",
        name: "Resource Two",
        type: "Video",
        sourceEntityName: null,
      },
    ];

    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed(mockResources),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
      addSeries: () => Effect.succeed({ pageId: "", url: "" }),
    });

    const effect = listResources(undefined).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith(
      "r1 | Resource One [Article] <https://resourceone.com>"
    );
    expect(consoleSpy).toHaveBeenCalledWith("r2 | Resource Two [Video]");
  });

  it("handles Notion API errors for listing resources", async () => {
    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.fail(new Error("Notion API Error: Failed to fetch resources")),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
      addSeries: () => Effect.succeed({ pageId: "", url: "" }),
    });

    const effect = listResources(undefined).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error: Notion API Error: Failed to fetch resources"
    );
  });

  it("lists a limited number of resources from Notion", async () => {
    const mockResources = [
      {
        id: "r1",
        name: "Resource One",
        type: "Article",
        url: "https://resourceone.com",
        sourceEntityName: "Author One",
      },
      {
        id: "r2",
        name: "Resource Two",
        type: "Video",
        sourceEntityName: null,
      },
      {
        id: "r3",
        name: "Resource Three",
        type: "Book",
        sourceEntityName: null,
      },
    ];

    const fakeNotion = createNotionMock({
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: (args) =>
        Effect.succeed(mockResources.slice(0, args?.limit ?? mockResources.length)),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
      addSeries: () => Effect.succeed({ pageId: "", url: "" }),
    });

    const effect = listResources(2).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith(
      "r1 | Resource One [Article] <https://resourceone.com>"
    );
    expect(consoleSpy).toHaveBeenCalledWith("r2 | Resource Two [Video]");
  });
});
