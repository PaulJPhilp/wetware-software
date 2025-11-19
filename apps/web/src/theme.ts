export type Theme = {
  lineWidth: number;
  stationRadius: number;
  interchangeRadius: number;
  fontSize: number;
  labelPadding: number;
  collisionThreshold: number; // distance threshold for collision detection
  colors: {
    background: string;
    text: string;
    lineDefault: string;
  };
};

export const defaultTheme: Theme = {
  lineWidth: 4,
  stationRadius: 8,
  interchangeRadius: 12,
  fontSize: 12,
  labelPadding: 4,
  collisionThreshold: 50, // pixels
  colors: {
    background: "white",
    text: "black",
    lineDefault: "#666666",
  },
};
