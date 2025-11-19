import { Effect } from "effect";

const META_TAG_REGEX =
  /<meta[^>]+(?:name|property)=["']([^"']+)["'][^>]+content=["']([^"']+)["'][^>]*>/i;

const TITLE_TAG_REGEX = /<title[^>]*>([^<]+)<\/title>/i;

function extractMeta(html: string, name: string): string | null {
  const matches = html.match(new RegExp(META_TAG_REGEX, META_TAG_REGEX.flags));
  if (!matches) {
    return null;
  }

  const metaName = matches[1] ?? null;
  const content = matches[2] ?? null;
  if (metaName === name) {
    return content;
  }

  return null;
}

function extractTitle(html: string): string | null {
  const m = html.match(TITLE_TAG_REGEX);
  return m?.[1]?.trim() ?? null;
}

export type PageMetadata = {
  title: string | null;
  description: string | null;
};

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
