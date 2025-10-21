import { z } from "zod";

export const StopSchema = z.object({
  id: z.string(),
  title: z.string(),
  years: z.string(),
  x: z.number(),
  y: z.number(),
  bullets: z.array(z.string()),
  carryForward: z.array(z.string()).optional(),
  artifact: z.string().optional(),
  labelPos: z.enum(["top", "right", "bottom", "left"]).optional(),
});
export const LineSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  stops: z.array(z.string()),
});

export const InterchangeSchema = z.object({
  stopIds: z.array(z.string()),
});

export const MapDataSchema = z.object({
  stops: z.array(StopSchema),
  lines: z.array(LineSchema),
  interchanges: z.array(InterchangeSchema).optional(),
});
export type Stop = z.infer<typeof StopSchema>;
export type Line = z.infer<typeof LineSchema>;
export type Interchange = z.infer<typeof InterchangeSchema>;
export type MapData = z.infer<typeof MapDataSchema>;
