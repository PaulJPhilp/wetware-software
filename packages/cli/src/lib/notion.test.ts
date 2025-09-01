import * as Effect from "effect/Effect";
import { describe, expect, it } from "vitest";
import type { NotionService } from "./notion";

describe("Notion service", () => {
  it("addResource returns page id and url", async () => {
    const svc: NotionService = {
      addResource: () => Effect.succeed({ pageId: "p1", url: "u1" }),
      addSourceEntity: () => Effect.succeed({ pageId: "s1", url: "su1" }),
    };
    const res = await Effect.runPromise(
      svc.addResource({
        resource_name: "n",
        resource_url: "https://x",
        resource_type: "Article",
        curator_note: "note",
        focus_area: ["Tech-Centric"],
        tags: [],
        source_entity_name: null,
        read_time_minutes: null,
        icon_name: null,
        resource_series_name: null,
        resource_series_part_number: null,
      }),
    );
    expect(res.pageId).toBe("p1");
    expect(res.url).toBe("u1");
  });
});
