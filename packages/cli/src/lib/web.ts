import * as Effect from "effect/Effect";

function extractMeta(html: string, name: string): string | null {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i"
  );
  const m = html.match(re);
  return m?.[1] ?? null;
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m?.[1]?.trim() ?? null;
}

export interface PageMetadata {
  title: string | null;
  description: string | null;
}

export function fetchPageMetadata(url: string) {
  return Effect.tryPromise({
    try: async (): Promise<PageMetadata> => {
      const res = await fetch(url, { redirect: "follow" });
      const html = await res.text();
      const title = extractTitle(html) ?? extractMeta(html, "og:title");
      const description = extractMeta(html, "og:description") || extractMeta(html, "description");
      return { title, description };
    },
    catch: (e) => new Error(`Failed to fetch metadata: ${String(e)}`),
  });
}
