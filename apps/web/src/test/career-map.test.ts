import { describe, expect, it } from "vitest";
import { loadMap } from "../loadMap";

describe("Career Map Data", () => {
  const careerData = {
    stops: [
      {
        id: "mcmaster-1982",
        title: "Interactive Computer Graphics (McMaster)",
        years: "1982",
        x: 80,
        y: 180,
        bullets: [
          "First contact with C and Unix on an LSI‑23 (PDP‑11 clone)",
          "Built interactive graphics demos; low‑level rendering and event loops",
          "Takeaway: systems thinking and performance under constraints",
        ],
        carryForward: ["C/Unix fundamentals", "Event-driven UI", "Performance awareness"],
        artifact: "LSI‑23 + lab setup",
        labelPos: "right",
      },
      {
        id: "office-automation-82-89",
        title: "Unix Office Suites",
        years: "1982–1989",
        x: 140,
        y: 160,
        bullets: [
          "Editors, messaging, and workflow on Unix",
          "Filesystems, word processors, spreadsheets, databases, integrations",
          "Reliability under multi‑user constraints; early API boundaries",
        ],
        carryForward: [
          "API boundaries",
          "Data modeling",
          "Transactional thinking",
          "Integration patterns",
        ],
        labelPos: "top",
      },
      {
        id: "vfx-transition-1989",
        title: "Transition to VFX/3D",
        years: "1989",
        x: 200,
        y: 140,
        bullets: [
          "Shift from office automation to 3D tooling and pipelines",
          "Performance and workflow engineering for artists",
          "Beginning of pipeline orchestration patterns",
        ],
        carryForward: [
          "Tooling for humans-in-the-loop",
          "Pipeline thinking",
          "Performance profiling",
        ],
        labelPos: "right",
      },
      {
        id: "vfx-pipelines-89-97",
        title: "VFX/Industrial Design Tools & Pipelines",
        years: "1989–1997",
        x: 260,
        y: 120,
        bullets: [
          "Pipeline engineering for VFX and industrial design",
          "Scheduling, caching, graph-based orchestration before it was cool",
          "Team Oscar era exposure; reliability under deadline pressure",
        ],
        carryForward: ["Graph orchestration", "Caching & scheduling", "Operational reliability"],
        labelPos: "right",
      },
    ],
    lines: [
      {
        id: "automation",
        name: "Automation",
        color: "#1B7F7A",
        stops: ["mcmaster-1982", "office-automation-82-89"],
      },
      {
        id: "graphics",
        name: "Graphics",
        color: "#D14A3B",
        stops: ["vfx-transition-1989", "vfx-pipelines-89-97"],
      },
    ],
    interchanges: [
      {
        stopIds: ["office-automation-82-89", "vfx-transition-1989"],
      },
    ],
  };

  it("should load career map data successfully", () => {
    const mapData = loadMap(careerData);

    expect(mapData.stops).toHaveLength(4);
    expect(mapData.lines).toHaveLength(2);
    expect(mapData.interchanges).toHaveLength(1);
  });

  it("should have correct stop data", () => {
    const mapData = loadMap(careerData);

    const firstStop = mapData.stops[0];
    expect(firstStop).toBeDefined();
    expect(firstStop?.id).toBe("mcmaster-1982");
    expect(firstStop?.title).toBe("Interactive Computer Graphics (McMaster)");
    expect(firstStop?.years).toBe("1982");
    expect(firstStop?.x).toBe(80);
    expect(firstStop?.y).toBe(180);
    expect(firstStop?.bullets).toHaveLength(3);
    expect(firstStop?.carryForward).toHaveLength(3);
    expect(firstStop?.artifact).toBe("LSI‑23 + lab setup");
    expect(firstStop?.labelPos).toBe("right");
  });

  it("should have correct line data", () => {
    const mapData = loadMap(careerData);

    const automationLine = mapData.lines[0];
    expect(automationLine).toBeDefined();
    expect(automationLine?.id).toBe("automation");
    expect(automationLine?.name).toBe("Automation");
    expect(automationLine?.color).toBe("#1B7F7A");
    expect(automationLine?.stops).toEqual(["mcmaster-1982", "office-automation-82-89"]);
  });

  it("should have correct interchange data", () => {
    const mapData = loadMap(careerData);

    const interchange = mapData.interchanges?.[0];
    expect(interchange).toBeDefined();
    expect(interchange?.stopIds).toEqual(["office-automation-82-89", "vfx-transition-1989"]);
  });
});
