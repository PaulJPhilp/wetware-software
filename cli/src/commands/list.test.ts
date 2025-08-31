import * as NodeContext from "@effect/platform-node/NodeContext";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import { describe, expect, it, vi } from "vitest";
import { Notion, type NotionService } from "../lib/notion";
import { listSources, listSeries, listResources } from "./list";

describe("CLI list sources", () => {
  it("lists source entities from Notion (happy path)", async () => {
    const mockSourceEntities = [
      { id: "s1", name: "Source One", type: "Individual", url: "https://sourceone.com" },
      { id: "s2", name: "Source Two", type: "Company", url: null },
    ];

    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed(mockSourceEntities),
      listResourceSeries: () => Effect.succeed([]),
    };

    const consoleSpy = vi.spyOn(Console, "log");

    const effect = listSources(undefined).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith("s1 | Source One [Individual] <https://sourceone.com>");
    expect(consoleSpy).toHaveBeenCalledWith("s2 | Source Two [Company]");

    consoleSpy.mockRestore();
  });

  it("handles Notion API errors for listing source entities", async () => {
    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.fail(new Error("Notion API Error: Failed to fetch source entities")),
      listResourceSeries: () => Effect.succeed([]),
    };

    const consoleErrorSpy = vi.spyOn(Console, "error");

    const effect = listSources(undefined).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: Notion API Error: Failed to fetch source entities");

    consoleErrorSpy.mockRestore();
  });

  it("lists a limited number of source entities from Notion", async () => {
    const mockSourceEntities = [
      { id: "s1", name: "Source One", type: "Individual", url: "https://sourceone.com" },
      { id: "s2", name: "Source Two", type: "Company", url: null },
      { id: "s3", name: "Source Three", type: "Publication", url: null },
    ];

    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: ({ limit }) => Effect.succeed(mockSourceEntities.slice(0, limit)),
      listResourceSeries: () => Effect.succeed([]),
    };

    const consoleSpy = vi.spyOn(Console, "log");

    const effect = listSources(2).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith("s1 | Source One [Individual] <https://sourceone.com>");
    expect(consoleSpy).toHaveBeenCalledWith("s2 | Source Two [Company]");

    consoleSpy.mockRestore();
  });

  it("lists resource series from Notion (happy path)", async () => {
    const mockResourceSeries = [
      { id: "srs1", name: "Series One", url: "https://seriesone.com" },
      { id: "srs2", name: "Series Two", url: null },
    ];

    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed(mockResourceSeries),
    };

    const consoleSpy = vi.spyOn(Console, "log");

    const effect = listSeries(undefined).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith("srs1 | Series One <https://seriesone.com>");
    expect(consoleSpy).toHaveBeenCalledWith("srs2 | Series Two");

    consoleSpy.mockRestore();
  });

  it("handles Notion API errors for listing resource series", async () => {
    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.fail(new Error("Notion API Error: Failed to fetch series")),
    };

    const consoleErrorSpy = vi.spyOn(Console, "error");

    const effect = listSeries(undefined).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: Notion API Error: Failed to fetch series");

    consoleErrorSpy.mockRestore();
  });

  it("lists a limited number of resource series from Notion", async () => {
    const mockResourceSeries = [
      { id: "srs1", name: "Series One", url: "https://seriesone.com" },
      { id: "srs2", name: "Series Two", url: null },
      { id: "srs3", name: "Series Three", url: null },
    ];

    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed([]),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: ({ limit }) => Effect.succeed(mockResourceSeries.slice(0, limit)),
    };

    const consoleSpy = vi.spyOn(Console, "log");

    const effect = listSeries(2).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith("srs1 | Series One <https://seriesone.com>");
    expect(consoleSpy).toHaveBeenCalledWith("srs2 | Series Two");

    consoleSpy.mockRestore();
  });

  it("lists resources from Notion (happy path)", async () => {
    const mockResources = [
      { id: "r1", name: "Resource One", type: "Article", url: "https://resourceone.com", sourceEntityName: "Author One" },
      { id: "r2", name: "Resource Two", type: "Video", url: null, sourceEntityName: null },
    ];

    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.succeed(mockResources),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    };

    const consoleSpy = vi.spyOn(Console, "log");

    const effect = listResources(undefined).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith("r1 | Resource One [Article] <https://resourceone.com>");
    expect(consoleSpy).toHaveBeenCalledWith("r2 | Resource Two [Video]");

    consoleSpy.mockRestore();
  });

  it("handles Notion API errors for listing resources", async () => {
    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: () => Effect.fail(new Error("Notion API Error: Failed to fetch resources")),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    };

    const consoleErrorSpy = vi.spyOn(Console, "error");

    const effect = listResources(undefined).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: Notion API Error: Failed to fetch resources");

    consoleErrorSpy.mockRestore();
  });

  it("lists a limited number of resources from Notion", async () => {
    const mockResources = [
      { id: "r1", name: "Resource One", type: "Article", url: "https://resourceone.com", sourceEntityName: "Author One" },
      { id: "r2", name: "Resource Two", type: "Video", url: null, sourceEntityName: null },
      { id: "r3", name: "Resource Three", type: "Book", url: null, sourceEntityName: null },
    ];

    const fakeNotion: NotionService = {
      addResource: () => Effect.succeed({ pageId: "", url: "" }),
      addSourceEntity: () => Effect.succeed({ pageId: "", url: "" }),
      listResources: ({ limit }) => Effect.succeed(mockResources.slice(0, limit)),
      listSourceEntities: () => Effect.succeed([]),
      listResourceSeries: () => Effect.succeed([]),
    };

    const consoleSpy = vi.spyOn(Console, "log");

    const effect = listResources(2).pipe(
      Effect.provideService(Notion, fakeNotion),
      Effect.provide(NodeContext.layer)
    );

    await Effect.runPromise(effect);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith("r1 | Resource One [Article] <https://resourceone.com>");
    expect(consoleSpy).toHaveBeenCalledWith("r2 | Resource Two [Video]");

    consoleSpy.mockRestore();
  });
});
