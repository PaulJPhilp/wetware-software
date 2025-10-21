"use client";

import { useState } from "react";
import { loadMap } from "../../loadMap";
import { downloadSvg } from "../../svg/helpers/serialize";
import { TransitMapSvg } from "../../svg/TransitMapSvg";

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
export default function CareerMapDemo() {
  const [svgElement, setSvgElement] = useState<SVGSVGElement | null>(null);
  const mapData = loadMap(careerData);

  const handleExport = () => {
    if (svgElement) {
      downloadSvg(svgElement.outerHTML, "career-timeline.svg");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Career Timeline Map</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Interactive Career Visualization
            </h2>
            <p className="text-gray-600">
              A Beck-style subway map showing career progression across different domains. Stations
              represent key experiences, lines show career paths, and interchanges mark transitions
              between domains.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <TransitMapSvg
              data={mapData}
              onMount={(svg: SVGSVGElement) => {
                setSvgElement(svg);
              }}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Keyboard accessible (Tab navigation)</li>
                <li>• Screen reader friendly</li>
                <li>• SVG export capability</li>
                <li>• Collision-aware label positioning</li>
                <li>• Interchange visualization</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Controls</h3>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleExport}
                  disabled={!svgElement}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {svgElement ? "Export as SVG" : "Loading..."}
                </button>
                <p className="text-xs text-gray-500">
                  Use Tab to navigate stations, Space/Enter to interact
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
