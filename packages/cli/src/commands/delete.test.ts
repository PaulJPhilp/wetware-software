import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import type { MockInstance } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("effect/Console", () => {
  return {
    log: vi.fn(() => Effect.void),
    error: vi.fn(() => Effect.void),
  };
});
import { Notion } from "../lib/notion";
import { createNotionMock } from "../test/notionTestUtils";
import { deleteEntity } from "./delete";

describe("deleteEntity", () => {
  let logSpy: MockInstance<Parameters<typeof Console.log>, ReturnType<typeof Console.log>>;
  let errorSpy: MockInstance<Parameters<typeof Console.error>, ReturnType<typeof Console.error>>;

  beforeEach(() => {
    logSpy = Console.log as unknown as MockInstance<
      Parameters<typeof Console.log>,
      ReturnType<typeof Console.log>
    >;
    errorSpy = Console.error as unknown as MockInstance<
      Parameters<typeof Console.error>,
      ReturnType<typeof Console.error>
    >;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("archives the requested page and reports success", async () => {
    const notion = createNotionMock({
      deletePage: (pageId) =>
        Effect.sync(() => {
          expect(pageId).toBe("resource-123");
        }),
    });

    const program = deleteEntity("resource-123").pipe(Effect.provideService(Notion, notion));

    await Effect.runPromise(program);

    expect(logSpy).toHaveBeenCalledWith("Successfully deleted entity with ID: resource-123");
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("logs errors from the Notion delete operation", async () => {
    const notion = createNotionMock({
      deletePage: () => Effect.fail(new Error("Notion API error")),
    });

    const program = deleteEntity("source-999").pipe(Effect.provideService(Notion, notion));

    await Effect.runPromise(program);

    expect(errorSpy).toHaveBeenCalledWith("Error: Notion API error");
    expect(logSpy).not.toHaveBeenCalledWith("Successfully deleted entity with ID: source-999");
  });
});
