import { MapDataSchema, type MapData } from "./schema";

export function loadMap(input: string | unknown): MapData {
  let data: unknown;

  if (typeof input === "string") {
    try {
      data = JSON.parse(input);
    } catch (error) {
      throw new Error(`Invalid JSON: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  } else {
    data = input;
  }

  const result = MapDataSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Validation failed: ${issues}`);
  }

  return result.data;
}
