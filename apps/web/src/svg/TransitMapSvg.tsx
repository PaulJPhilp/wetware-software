import { useEffect, useRef } from "react";
import type { MapData } from "../schema";
import type { Theme } from "../theme";
import { defaultTheme } from "../theme";
import { buildPolylinePoints } from "./helpers/geometry";
import { calculateLabelPosition } from "./helpers/label";

interface TransitMapSvgProps {
  data: MapData;
  theme?: Partial<Theme>;
  onMount?: (el: SVGSVGElement) => void;
}

export function TransitMapSvg({ data, theme = {}, onMount }: TransitMapSvgProps) {
  const mergedTheme = { ...defaultTheme, ...theme };
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && onMount) {
      onMount(svgRef.current);
    }
  }, [onMount]);

  // Calculate viewBox
  const allX = data.stops.map((s) => s.x);
  const allY = data.stops.map((s) => s.y);
  const minX = Math.min(...allX) - 20;
  const maxX = Math.max(...allX) + 120; // extra for labels
  const minY = Math.min(...allY) - 20;
  const maxY = Math.max(...allY) + 20;
  const width = maxX - minX;
  const height = maxY - minY;

  // Helper to check if stop is interchange
  const isInterchange = (stopId: string) =>
    data.interchanges?.some((interchange) => interchange.stopIds.includes(stopId)) ?? false;

  // Create stop map for quick lookup
  const stopMap = new Map(data.stops.map((stop) => [stop.id, stop]));

  return (
    <svg
      aria-label="Transit map"
      className="transit-map-svg"
      ref={svgRef}
      style={{ backgroundColor: mergedTheme.colors.background }}
      viewBox={`${minX} ${minY} ${width} ${height}`}
    >
      <title>Transit map</title>
      {/* Render lines */}
      {data.lines.map((line) => {
        const stops = line.stops
          .map((id) => stopMap.get(id))
          .filter((s): s is (typeof data.stops)[number] => Boolean(s));
        if (stops.length < 2) return null;
        const points = buildPolylinePoints(stops);
        return (
          <polyline
            fill="none"
            key={line.id}
            points={points}
            stroke={line.color}
            strokeWidth={mergedTheme.lineWidth}
          />
        );
      })}

      {/* Render stations */}
      {data.stops.map((stop) => {
        const isInterchangeStop = isInterchange(stop.id);
        const radius = isInterchangeStop
          ? mergedTheme.interchangeRadius
          : mergedTheme.stationRadius;
        const labelPosition = calculateLabelPosition(
          stop,
          data.stops,
          data.interchanges || [],
          mergedTheme
        );
        return (
          <g aria-label={`${stop.title} (${stop.years})`} className="station" key={stop.id}>
            <circle
              cx={stop.x}
              cy={stop.y}
              fill={mergedTheme.colors.text}
              r={radius}
              stroke={isInterchangeStop ? mergedTheme.colors.background : undefined}
              strokeWidth={isInterchangeStop ? 2 : 0}
            />
            <text
              dominantBaseline={
                labelPosition.dominantBaseline as import("./helpers/label").DominantBaseline
              }
              fill={mergedTheme.colors.text}
              fontSize={mergedTheme.fontSize}
              textAnchor={labelPosition.textAnchor as import("./helpers/label").TextAnchor}
              x={labelPosition.x}
              y={labelPosition.y}
            >
              {stop.title}
            </text>
            <title>{`${stop.title} (${stop.years})`}</title>
            {/* Accessible button overlay for keyboard and screen reader users */}
            <foreignObject
              height={radius * 2}
              style={{ pointerEvents: "none" }}
              width={radius * 2}
              x={stop.x - radius}
              y={stop.y - radius}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <button
                  aria-label={`${stop.title} (${stop.years})`}
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    border: "none",
                    background: "transparent",
                    pointerEvents: "auto",
                    padding: 0,
                    margin: 0,
                  }}
                  type="button"
                />
              </div>
            </foreignObject>
          </g>
        );
      })}
    </svg>
  );
}
