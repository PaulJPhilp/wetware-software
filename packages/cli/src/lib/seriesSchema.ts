import { z } from "zod";

export function buildSeriesSchema() {
  return z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    goal: z.string().min(1),
  });
}

export type SeriesInput = z.infer<ReturnType<typeof buildSeriesSchema>>;
