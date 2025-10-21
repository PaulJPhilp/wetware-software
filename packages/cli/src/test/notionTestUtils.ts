import * as Effect from "effect/Effect";
import type { NotionService } from "../lib/notion";

export function notImplementedEffect<A>(methodName: string): Effect.Effect<A, Error> {
  return Effect.fail(new Error(`${methodName} not implemented`));
}

export function createNotionMock(overrides: Partial<NotionService>): NotionService {
  const base: NotionService = {
    addResource: (_data, _opts) => notImplementedEffect("addResource"),
    addSourceEntity: (_data, _opts) => notImplementedEffect("addSourceEntity"),
    addSeries: (_data, _opts) => notImplementedEffect("addSeries"),
    listResources: (_opts) => notImplementedEffect("listResources"),
    listSourceEntities: (_opts) => notImplementedEffect("listSourceEntities"),
    listResourceSeries: (_opts) => notImplementedEffect("listResourceSeries"),
    getResourceById: (_pageId) => notImplementedEffect("getResourceById"),
    getSourceEntityById: (_pageId) => notImplementedEffect("getSourceEntityById"),
    getSeriesById: (_pageId) => notImplementedEffect("getSeriesById"),
    updateResource: (_pageId, _updates) => notImplementedEffect("updateResource"),
    updateSourceEntity: (_pageId, _updates) => notImplementedEffect("updateSourceEntity"),
    updateSeries: (_pageId, _updates) => notImplementedEffect("updateSeries"),
    deletePage: (_pageId) => notImplementedEffect("deletePage"),
    updatePage: (_pageId, _properties) => notImplementedEffect("updatePage"),
    getPage: (_pageId) => notImplementedEffect("getPage"),
  };

  return { ...base, ...overrides };
}
