import { describe, expect, it } from "vitest";
import { downloadSvg, toSvgString } from "../svg/helpers/serialize";

describe("SVG Serialization", () => {
  // Create a mock SVG element for testing
  const createMockSvgElement = (): SVGSVGElement => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `
            <g class="lines">
                <polyline points="100,200 150,250" stroke="#ff0000" fill="none"/>
            </g>
            <g class="stations">
                <circle cx="100" cy="200" r="5" class="station"/>
                <circle cx="150" cy="250" r="5" class="station"/>
            </g>
            <g class="labels">
                <text x="100" y="180">Station One</text>
                <text x="150" y="230">Station Two</text>
            </g>
        `;
    return svg as SVGSVGElement;
  };

  describe("toSvgString", () => {
    it("should generate a valid SVG string", () => {
      const mockSvg = createMockSvgElement();
      const svgString = toSvgString(mockSvg);

      expect(typeof svgString).toBe("string");
      expect(svgString).toContain("<svg");
      expect(svgString).toContain("</svg>");
      expect(svgString).toContain("Station One");
      expect(svgString).toContain("Station Two");
      expect(svgString).toContain("#ff0000");
    });

    it("should include XML declaration", () => {
      const mockSvg = createMockSvgElement();
      const svgString = toSvgString(mockSvg);

      expect(svgString).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    });
  });

  describe("downloadSvg", () => {
    it("should not throw when called with valid parameters", () => {
      expect(() => {
        downloadSvg("<svg></svg>", "test-map.svg");
      }).not.toThrow();
    });
  });
});
