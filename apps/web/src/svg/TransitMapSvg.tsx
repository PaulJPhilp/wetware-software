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
  const isInterchange = (stopId: string) => {
    return data.interchanges?.some((interchange) => interchange.stopIds.includes(stopId)) ?? false;
  };

  // Create stop map for quick lookup
  const stopMap = new Map(data.stops.map((stop) => [stop.id, stop]));

  return (
    <svg
      ref={svgRef}
      viewBox={`${minX} ${minY} ${width} ${height}`}
      className="transit-map-svg"
      aria-label="Transit map"
      style={{ backgroundColor: mergedTheme.colors.background }}
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
            key={line.id}
            points={points}
            stroke={line.color}
            strokeWidth={mergedTheme.lineWidth}
            fill="none"
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
          mergedTheme,
        );
        return (
          <g
            key={stop.id}
            className="station"
            role="button"
            tabIndex={0}
            aria-label={`${stop.title} (${stop.years})`}
          >
            <circle
              cx={stop.x}
              cy={stop.y}
              r={radius}
              fill={mergedTheme.colors.text}
              stroke={isInterchangeStop ? mergedTheme.colors.background : undefined}
              strokeWidth={isInterchangeStop ? 2 : 0}
            />
            <text
              x={labelPosition.x}
              y={labelPosition.y}
              fontSize={mergedTheme.fontSize}
              fill={mergedTheme.colors.text}
              textAnchor={labelPosition.textAnchor as import("./helpers/label").TextAnchor}
              dominantBaseline={
                labelPosition.dominantBaseline as import("./helpers/label").DominantBaseline
              }
            >
              {stop.title}
            </text>
            <title>{`${stop.title} (${stop.years})`}</title>
          </g>
        );
      })}
    </svg>
  );
}
