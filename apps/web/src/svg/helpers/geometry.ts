import type { Stop } from "../../schema";

export function buildPolylinePoints(stops: Stop[]): string {
  return stops.map((stop) => `${stop.x},${stop.y}`).join(" ");
}
