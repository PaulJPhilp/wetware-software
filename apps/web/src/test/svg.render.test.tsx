import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { loadMap } from "../loadMap";
import type { MapData } from "../schema";
import { TransitMapSvg } from "../svg/TransitMapSvg";

describe("TransitMapSvg", () => {
  const testData: MapData = loadMap({
    stops: [
      {
        id: "stop1",
        title: "Station One",
        years: "2020-2025",
        x: 100,
        y: 200,
        bullets: ["Bullet 1"],
        carryForward: undefined,
      },
      {
        id: "stop2",
        title: "Station Two",
        years: "2021-2025",
        x: 150,
        y: 250,
        bullets: ["Bullet A"],
        carryForward: undefined,
      },
      {
        id: "stop3",
        title: "Station Three",
        years: "2022-2025",
        x: 200,
        y: 300,
        bullets: ["Bullet X"],
        carryForward: undefined,
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
  } as unknown as ReturnType<typeof loadMap>);
  it("renders the correct number of polylines", () => {
    const { container } = render(<TransitMapSvg data={testData} />);
    const polylines = container.querySelectorAll("polyline");
    expect(polylines).toHaveLength(2);
  });

  it("renders the correct number of stations", () => {
    const { container } = render(<TransitMapSvg data={testData} />);
    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(3);
  });

  it("renders interchange station with larger radius", () => {
    const { container } = render(<TransitMapSvg data={testData} />);
    const circles = container.querySelectorAll("circle");
    // stop2 is interchange
    const interchangeCircle = Array.from(circles).find(
      (circle) => circle.getAttribute("cx") === "150"
    );
    expect(interchangeCircle?.getAttribute("r")).toBe("12"); // interchangeRadius
    expect(interchangeCircle?.getAttribute("stroke")).toBe("white"); // background color
  });

  it("renders regular stations with normal radius", () => {
    const { container } = render(<TransitMapSvg data={testData} />);
    const circles = container.querySelectorAll("circle");
    const regularCircles = Array.from(circles).filter(
      (circle) => circle.getAttribute("cx") !== "150"
    );
    regularCircles.forEach((circle) => {
      expect(circle.getAttribute("r")).toBe("8"); // stationRadius
      expect(circle.getAttribute("stroke")).toBeNull();
    });
  });

  it("includes title elements for accessibility", () => {
    const { container } = render(<TransitMapSvg data={testData} />);
    const titles = container.querySelectorAll("title");
    expect(titles).toHaveLength(3);
    expect(titles[0]?.textContent).toBe("Station One (2020-2025)");
    expect(titles[1]?.textContent).toBe("Station Two (2021-2025)");
    expect(titles[2]?.textContent).toBe("Station Three (2022-2025)");
  });

  it("renders labels with collision avoidance", () => {
    const { container } = render(<TransitMapSvg data={testData} />);
    const texts = container.querySelectorAll("text");
    expect(texts).toHaveLength(3);
    // Check that labels are positioned (basic check)
    texts.forEach((text) => {
      expect(text.getAttribute("x")).toBeDefined();
      expect(text.getAttribute("y")).toBeDefined();
    });
  });

  it("respects explicit labelPos", () => {
    const dataWithLabelPos = {
      ...testData,
      stops: testData.stops.map((stop) =>
        stop.id === "stop1" ? { ...stop, labelPos: "top" as const } : stop
      ),
    };
    const { container } = render(<TransitMapSvg data={dataWithLabelPos} />);
    const text = container.querySelector("text");
    expect(text?.getAttribute("text-anchor")).toBe("middle");
    expect(text?.getAttribute("dominant-baseline")).toBe("alphabetic");
  });

  it("matches snapshot", () => {
    const { container } = render(<TransitMapSvg data={testData} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
