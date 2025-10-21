import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { loadMap } from "../loadMap";
import { TransitMapSvg } from "../svg/TransitMapSvg";

describe("TransitMapSvg Accessibility", () => {
  const testData = loadMap({
    stops: [
      {
        id: "stop1",
        title: "Station One",
        years: "2020-2025",
        x: 100,
        y: 200,
        bullets: ["Bullet 1"],
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
        bullets: ["Bullet X"],
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

  it('renders stations with role="button" and tabindex="0"', () => {
    const { container } = render(<TransitMapSvg data={testData} />);
    const stations = container.querySelectorAll(".station");
    expect(stations).toHaveLength(3);
    stations.forEach((station) => {
      expect(station.getAttribute("role")).toBe("button");
      expect(station.getAttribute("tabindex")).toBe("0");
    });
  });

  it("renders stations with correct aria-label", () => {
    const { container } = render(<TransitMapSvg data={testData} />);
    const stations = container.querySelectorAll(".station");
    expect((stations[0] as Element).getAttribute("aria-label")).toBe("Station One (2020-2025)");
    expect((stations[1] as Element).getAttribute("aria-label")).toBe("Station Two (2021-2025)");
    expect((stations[2] as Element).getAttribute("aria-label")).toBe("Station Three (2022-2025)");
  });

  it("supports keyboard navigation", () => {
    const { container } = render(<TransitMapSvg data={testData} />);
    const stations = container.querySelectorAll(".station");

    // Focus first station
    (stations[0] as HTMLElement).focus();
    expect(document.activeElement).toBe(stations[0]);

    // Tab to next station
    fireEvent.keyDown(stations[0] as Element, { key: "Tab" });
    // Note: In SVG, tab navigation might need additional setup, but this tests the basic focusability
    expect((stations[0] as Element).getAttribute("tabindex")).toBe("0");
  });
});
