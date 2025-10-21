import { describe, expect, it } from "vitest";
import { loadMap } from "../loadMap";
import { MapDataSchema } from "../schema";

describe("schema validation", () => {
  const validMapData = {
    stops: [
      {
        id: "stop1",
        title: "Station One",
        years: "2020-2025",
        x: 100,
        y: 200,
        bullets: ["Bullet 1", "Bullet 2"],
        carryForward: ["Tag1"],
        artifact: "image.png",
      },
      {
        id: "stop2",
        title: "Station Two",
        years: "2021-2025",
        x: 150,
        y: 250,
        bullets: ["Bullet A"],
      },
      {
        id: "stop3",
        title: "Station Three",
        years: "2022-2025",
        x: 200,
        y: 300,
        bullets: ["Bullet X", "Bullet Y"],
        carryForward: ["Tag2", "Tag3"],
      },
    ],
    lines: [
      {
        id: "line1",
        name: "Red Line",
        color: "#ff0000",
        stops: ["stop1", "stop2"],
      },
      {
        id: "line2",
        name: "Blue Line",
        color: "#0000ff",
        stops: ["stop2", "stop3"],
      },
    ],
    interchanges: [
      {
        stopIds: ["stop2"],
      },
    ],
  };
  it("validates good sample", () => {
    const result = MapDataSchema.safeParse(validMapData);
    expect(result.success).toBe(true);
  });

  it("loads valid JSON string", () => {
    const json = JSON.stringify(validMapData);
    expect(() => loadMap(json)).not.toThrow();
    const data = loadMap(json);
    expect(data.lines).toHaveLength(2);
  });

  it("loads valid object", () => {
    expect(() => loadMap(validMapData)).not.toThrow();
    const data = loadMap(validMapData);
    expect(data.lines[0]?.name).toBe("Red Line");
    expect(data.stops).toHaveLength(3);
  });

  it("throws on invalid JSON", () => {
    expect(() => loadMap("{invalid")).toThrow("Invalid JSON");
  });

  it("throws on validation error", () => {
    const invalid = { lines: [{ id: 123, name: "Test" }] }; // id should be string
    expect(() => loadMap(invalid)).toThrow("Validation failed");
  });

  it("throws with helpful error messages", () => {
    const invalid = { lines: [{ id: 123, name: "Test", color: "red", stops: [] }] };
    try {
      loadMap(invalid);
    } catch (error) {
      expect((error as Error).message).toContain("lines.0.id");
      expect((error as Error).message).toContain("Expected string");
    }
  });
});
