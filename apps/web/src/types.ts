export type Stop = {
  id: string;
  title: string;
  years: string;
  x: number;
  y: number;
  bullets: string[];
  carryForward?: string[];
  artifact?: string;
  labelPos?: "top" | "right" | "bottom" | "left";
};
export type Line = {
  id: string;
  name: string;
  color: string;
  stops: string[];
};

export type Interchange = {
  stopIds: string[];
};

export type MapData = {
  stops: Stop[];
  lines: Line[];
  interchanges?: Interchange[];
};
