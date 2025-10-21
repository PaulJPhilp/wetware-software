export interface Stop {
  id: string;
  title: string;
  years: string;
  x: number;
  y: number;
  bullets: string[];
  carryForward?: string[];
  artifact?: string;
  labelPos?: "top" | "right" | "bottom" | "left";
}
export interface Line {
  id: string;
  name: string;
  color: string;
  stops: string[];
}

export interface Interchange {
  stopIds: string[];
}

export interface MapData {
  stops: Stop[];
  lines: Line[];
  interchanges?: Interchange[];
}
