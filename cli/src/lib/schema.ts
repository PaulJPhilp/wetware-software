import { z } from "zod";

export function buildSchema() {
  const FocusArea = z.enum([
    "Human-Centric",
    "Tech-Centric",
    "Collaboration",
    "Coding",
    "Business of AI",
  ]);

  const ResourceType = z.enum([
    "Video",
    "Article",
    "Book",
    "Paper",
    "Tool",
    "Podcast",
    "Course",
  ]);

  const Tag = z.enum([
    "LLMs",
    "Neural Networks",
    "Transformers",
    "Generative AI",
    "Concepts",
    "AI Ethics",
    "Prompt Engineering",
    "Context Engineering",
    "AI Agents",
    "LangChain",
    "LangGraph",
    "Vercel AI SDK",
    "RAG",
    "Fine-tuning",
    "Training",
    "Deployment",
    "AI Infrastructure",
    "APIs",
    "TypeScript",
    "Effect-TS",
    "Functional Programming",
    "Concurrency",
    "Error Handling",
    "Type Safety",
    "System Design",
    "Architecture",
    "Testing",
    "Frontend",
    "Backend",
    "JavaScript",
    "Next.js",
    "Systems Thinking",
    "Collaboration",
    "Productivity",
    "Startup",
    "Product Management",
    "Strategy",
    "Innovation",
    "Business Models",
  ]);

  return z.object({
    resource_name: z.string().min(1),
    resource_url: z.string().url(),
    resource_type: ResourceType,
    curator_note: z.string().min(1),
    focus_area: z.array(FocusArea),
    tags: z.array(Tag).optional().default([]),
    source_entity_name: z.string().nullable().optional(),
    read_time_minutes: z.number().int().nullable().optional(),
    icon_name: z.string().nullable().optional(),
    resource_series_name: z.string().nullable().optional(),
    resource_series_part_number: z.number().int().nullable().optional(),
  });
}
