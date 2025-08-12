import { z } from "zod";

export function buildSourceEntitySchema() {
  const SourceType = z.enum([
    "Individual",
    "YouTube Channel",
    "Company",
    "Open Source Project",
    "Community",
    "Publication",
    "Podcast",
    "University",
  ]);

  const FocusArea = z.enum([
    "Human-Centric",
    "Tech-Centric",
    "Collaboration",
    "Coding",
    "Business of AI",
  ]);

  return z.object({
    name: z.string().min(1),
    type: SourceType,
    url: z.string().url().nullable().optional(),
    description: z.string().min(1),
    endorsement: z.string().min(1),
    focus_area: z.array(FocusArea).nonempty(),
  });
}

export type SourceEntityInput = z.infer<
  ReturnType<typeof buildSourceEntitySchema>
>;
