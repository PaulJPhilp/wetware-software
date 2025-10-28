import type { Interchange, Stop } from "../../schema";
import type { Theme } from "../../theme";

export type TextAnchor = "start" | "middle" | "end" | "inherit";
export type DominantBaseline =
  | "middle"
  | "alphabetic"
  | "hanging"
  | "auto"
  | "use-script"
  | "no-change"
  | "reset-size"
  | "ideographic"
  | "mathematical"
  | "central"
  | "text-after-edge"
  | "text-before-edge";

export function calculateLabelPosition(
  stop: Stop,
  allStops: Stop[],
  interchanges: Interchange[],
  theme: Theme
): { x: number; y: number; textAnchor: TextAnchor; dominantBaseline: DominantBaseline } {
  const { x, y, labelPos } = stop;
  const radius = isInterchange(stop.id, interchanges)
    ? theme.interchangeRadius
    : theme.stationRadius;

  // If explicit position is set, use it
  if (labelPos) {
    return getPositionForDirection(labelPos, x, y, radius, theme);
  }

  // Default to right
  let position = getPositionForDirection("right", x, y, radius, theme);

  // Check for collision with other stations
  const collides = allStops.some((otherStop) => {
    if (otherStop.id === stop.id) return false;
    const distance = Math.sqrt((position.x - otherStop.x) ** 2 + (position.y - otherStop.y) ** 2);
    return distance < theme.collisionThreshold;
  });

  if (collides) {
    // Try above
    position = getPositionForDirection("top", x, y, radius, theme);
  }

  return position;
}

function getPositionForDirection(
  direction: "top" | "right" | "bottom" | "left",
  x: number,
  y: number,
  radius: number,
  theme: Theme
): { x: number; y: number; textAnchor: TextAnchor; dominantBaseline: DominantBaseline } {
  const padding = radius + theme.labelPadding;

  switch (direction) {
    case "top":
      return {
        x,
        y: y - padding,
        textAnchor: "middle",
        dominantBaseline: "alphabetic",
      };
    case "right":
      return {
        x: x + padding,
        y: y + theme.fontSize / 3, // approximate baseline
        textAnchor: "start",
        dominantBaseline: "middle",
      };
    case "bottom":
      return {
        x,
        y: y + padding + theme.fontSize,
        textAnchor: "middle",
        dominantBaseline: "hanging",
      };
    case "left":
      return {
        x: x - padding,
        y: y + theme.fontSize / 3,
        textAnchor: "end",
        dominantBaseline: "middle",
      };
  }
}

function isInterchange(stopId: string, interchanges: Interchange[]): boolean {
  return interchanges.some((interchange) => interchange.stopIds.includes(stopId));
}
