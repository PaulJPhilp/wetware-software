"use client";

import { normalizeImageSrc } from "@/lib/image-utils";
import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FC, type ReactNode } from "react";

import { AnchorHeading } from "./AnchorHeading";
import { ShareLink } from "./ShareLink";

interface NotionBlockProps {
  block: BlockObjectResponse;
}

// Only use next/image for hosts allowed in next.config.ts to avoid 400s.
// Keep this list in sync with apps/web/next.config.ts images.remotePatterns
const isNextImageAllowed = (url: string): boolean => {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    const host = u.hostname.toLowerCase();
    return (
      host === "prod-files-secure.s3.us-west-2.amazonaws.com" ||
      host === "s3.us-west-2.amazonaws.com" ||
      host === "notion.so" ||
      host === "www.notion.so"
    );
  } catch {
    return false;
  }
};

// Regex to detect Markdown image tokens like: ![alt](src "title") or ![alt](src)
// Use a non-global version for testing to avoid lastIndex state issues.
// Accept straight or curly quotes around the optional title.
const mdImageTest = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+["“”]([^"“”]*)["“”])?\)/;

const hasMdImageToken = (text: string): boolean => mdImageTest.test(text);

// Render inline text mixed with Markdown image tokens
// Note: This path does not preserve Notion inline annotations; we trade
// annotation fidelity for inline image support when tokens are present.
const _renderTextWithInlineImages = (fullText: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  // Create a local global regex to tokenize without sharing state
  // Accept straight or curly quotes for the optional title
  const re = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+["“”]([^"“”]*)["“”])?\)/g;
  let match: RegExpExecArray | null = re.exec(fullText);

  while (match !== null) {
    const [all, alt, src, title] = match;
    const start = match.index;
    const end = start + all.length;

    // Preceding text
    if (start > lastIndex) {
      nodes.push(fullText.slice(lastIndex, start));
    }

    // Inline <img>
    if (src) {
      nodes.push(
        <span
          className="relative inline-block h-auto max-w-full align-middle"
          key={`mdimg-${start}-${src}`}
          style={{ verticalAlign: "middle", maxWidth: "100%", height: "auto" }}
        >
          <Image
            alt={alt || title || "Content illustration"}
            className="inline-block h-auto max-w-full align-middle"
            height={200}
            onError={() => console.error("img failed to load:", src)}
            onLoadingComplete={() => console.log("img loaded:", src)}
            src={src}
            style={{ objectFit: "contain" }}
            width={400}
          />
        </span>
      );
    }

    lastIndex = end;
    match = re.exec(fullText);
  }

  // Trailing text
  if (lastIndex < fullText.length) {
    nodes.push(fullText.slice(lastIndex));
  }

  return nodes;
};

// Parse optional title metadata for inline images. Supports syntax:
// "Caption text | w=480, h=200" (commas or spaces between entries)
// Returns both cleaned caption and style hints.
const parseImageTitleMeta = (
  rawTitle?: string
): {
  caption?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
} => {
  if (!rawTitle) {
    return {};
  }

  const result: {
    caption?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
  } = {};

  const [captionPart, optionsPart] = rawTitle.split("|");
  const caption = captionPart?.trim();
  if (caption) {
    result.caption = caption;
  }

  if (optionsPart) {
    const entries = optionsPart
      .split(/[\s,]+/)
      .map((segment) => segment.trim())
      .filter((segment): segment is string => segment.length > 0);

    for (const entry of entries) {
      const [keyRaw, valueRaw] = entry.split("=");
      if (!(keyRaw && valueRaw)) {
        continue;
      }

      const key = keyRaw.toLowerCase();
      const value = valueRaw.trim();

      if (key === "w" || key === "width") {
        result.width = value.endsWith("%") ? value : Number.parseFloat(value);
      } else if (key === "h" || key === "height") {
        result.height = value.endsWith("%") ? value : Number.parseFloat(value);
      } else if (key === "class" || key === "classname") {
        result.className = value;
      }
    }
  }

  return result;
};

// Create a shallow RichText-like object with updated plain_text/content,
// preserving annotations and link for rendering with <RichText />.
const cloneTextWithContent = (
  text: RichTextItemResponse,
  content: string
): RichTextItemResponse => {
  const t: RichTextItemResponse = { ...text };
  if ("text" in t && t.text) {
    t.text = { ...t.text, content };
  }
  t.plain_text = content;
  return t;
};

// Render a single RichText segment, splitting around any markdown image tokens
// while preserving the segment's annotations on surrounding text.
const renderSegmentWithInlineImages = (
  text: RichTextItemResponse,
  keyBase: string
): ReactNode[] => {
  const content = text.plain_text || "";
  const nodes: ReactNode[] = [];
  const re = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+["“”]([^"“”]*)["“”])?\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null = re.exec(content);

  while (match !== null) {
    const [all, altRaw, src, titleRaw] = match;
    const start = match.index;
    const end = start + all.length;

    if (start > lastIndex) {
      const pre = content.slice(lastIndex, start);
      if (pre)
        nodes.push(
          <RichText key={`${keyBase}-pre-${start}`} text={cloneTextWithContent(text, pre)} />
        );
    }

    const meta = parseImageTitleMeta(titleRaw);
    const alt = (altRaw || meta.caption || "Content illustration").trim();
    const style: React.CSSProperties = {};
    if (meta.width !== undefined) style.width = meta.width as string | number;
    if (meta.height !== undefined) style.height = meta.height as string | number;
    const cls = `inline-block align-middle max-w-full h-auto ${meta.className || ""}`.trim();

    if (src) {
      nodes.push(
        <span className={cls} key={`${keyBase}-img-${start}`} style={style}>
          <Image
            alt={alt}
            className={cls}
            height={meta.height ? Number(meta.height) || 200 : 200}
            onError={() => console.error("img failed to load:", src)}
            onLoadingComplete={() => console.log("img loaded:", src)}
            src={normalizeImageSrc(src) || src}
            style={{ objectFit: "contain", ...style }}
            width={meta.width ? Number(meta.width) || 400 : 400}
          />
        </span>
      );
    }

    lastIndex = end;
    match = re.exec(content);
  }

  if (lastIndex < content.length) {
    const tail = content.slice(lastIndex);
    if (tail)
      nodes.push(
        <RichText key={`${keyBase}-tail-${lastIndex}`} text={cloneTextWithContent(text, tail)} />
      );
  }

  // If no matches, return original as-is
  if (nodes.length === 0) return [<RichText key={keyBase} text={text} />];
  return nodes;
};

// Render an array of RichText segments with inline images preserved
const renderAnnotatedWithInlineImages = (
  blockId: string,
  segments: RichTextItemResponse[]
): ReactNode[] => {
  const anyHas = segments.some((t) => hasMdImageToken(t.plain_text || ""));
  if (!anyHas) {
    return segments.map((t, idx) => (
      <RichText key={`${blockId}-${idx}-${t.plain_text}`} text={t} />
    ));
  }
  const out: ReactNode[] = [];
  segments.forEach((t, idx) => {
    out.push(
      ...renderSegmentWithInlineImages(t, `${blockId}-${idx}-${(t.plain_text || "").slice(0, 8)}`)
    );
  });
  return out;
};

const RichText: FC<{ text: RichTextItemResponse }> = ({ text }) => {
  if (!text) return null;

  const content = text.plain_text || "";

  if (text.type === "text") {
    const annotations = text.annotations || {};
    let element: ReactNode = content;

    // Apply text formatting
    if (annotations.code) {
      element = <code className="rounded bg-charcoal/5 px-1.5 py-0.5">{element}</code>;
    }
    if (annotations.bold) {
      element = <strong>{element}</strong>;
    }
    if (annotations.italic) {
      element = <em>{element}</em>;
    }
    if (annotations.strikethrough) {
      element = <del>{element}</del>;
    }
    if (annotations.underline) {
      element = <u>{element}</u>;
    }
    if (text.text.link?.url) {
      const isExternal = text.text.link.url.startsWith("http");
      element = (
        <Link
          className="text-orange underline underline-offset-4 transition-colors hover:text-orange/80"
          href={text.text.link.url}
          rel={isExternal ? "noopener noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {element}
        </Link>
      );
    }

    return <>{element}</>;
  }

  return <>{content}</>;
};

const CodeBlock: FC<{ block: BlockObjectResponse }> = ({ block }) => {
  const [isCopied, setIsCopied] = useState(false);

  // @ts-expect-error
  const code = block.code.rich_text.map((text) => text.plain_text).join("");
  // @ts-expect-error
  const language = block.code.language || "javascript";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="isolation-isolate relative">
      <button
        aria-label="Copy code to clipboard"
        className="absolute top-2 right-2 z-10 rounded-lg bg-muted p-1.5 text-muted-foreground transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-50"
        onClick={handleCopy}
        type="button"
      >
        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100 text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export function NotionBlock({ block }: NotionBlockProps) {
  switch (block.type) {
    case "paragraph": {
      // Join paragraph text to detect simple Markdown image syntax
      const fullText = block.paragraph.rich_text.map((t) => t.plain_text).join("");

      // Matches ![alt](url "title") or ![alt](url)
      const imgMd = fullText.match(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/);

      // If the entire paragraph is just the image token, render as an image
      if (imgMd && fullText.trim() === imgMd[0]) {
        const alt = imgMd[1] || "";
        const src = imgMd[2];
        if (!src) {
          return null;
        }
        const title = imgMd[3];

        return (
          <figure className="my-6">
            <div className="w-full overflow-hidden rounded-lg shadow-md">
              {/* Use a plain img to support public/ paths without layout reqs */}
              <Image
                alt={alt || title || "Content illustration"}
                className="block h-auto w-full"
                height={400}
                onError={() => console.error("img failed to load:", src)}
                onLoadingComplete={() => console.log("img loaded:", src)}
                src={normalizeImageSrc(src) || src}
                style={{ objectFit: "contain" }}
                width={800}
              />
            </div>
            {(title || alt) && (
              <figcaption className="mt-2 text-center text-muted text-sm italic">
                {title || alt}
              </figcaption>
            )}
          </figure>
        );
      }

      // Otherwise, render annotated text preserving inline images
      return (
        <p className="text-gray-900 dark:text-white">
          {renderAnnotatedWithInlineImages(block.id, block.paragraph.rich_text)}
        </p>
      );
    }
    case "heading_1": {
      const h1Text = block.heading_1.rich_text.map((text) => text.plain_text).join("");
      const h1Id = h1Text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <AnchorHeading
          className="fluid-h1 mt-6 mb-2 text-gray-900 dark:text-white"
          id={h1Id}
          level={1}
        >
          {block.heading_1.rich_text.map((text, idx) => (
            <RichText key={`${block.id}-${idx}-${text.plain_text}`} text={text} />
          ))}
        </AnchorHeading>
      );
    }
    case "heading_2": {
      const h2Text = block.heading_2.rich_text.map((text) => text.plain_text).join("");
      const h2Id = h2Text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <AnchorHeading
          className="fluid-h2 mt-6 mb-2 text-gray-900 dark:text-white"
          id={h2Id}
          level={2}
        >
          {block.heading_2.rich_text.map((text, idx) => (
            <RichText key={`${block.id}-${idx}-${text.plain_text}`} text={text} />
          ))}
        </AnchorHeading>
      );
    }
    case "heading_3": {
      const h3Text = block.heading_3.rich_text.map((text) => text.plain_text).join("");
      const h3Id = h3Text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <AnchorHeading
          className="fluid-h3 mt-4 mb-1 text-gray-900 dark:text-white"
          id={h3Id}
          level={3}
        >
          {block.heading_3.rich_text.map((text, idx) => (
            <RichText key={`${block.id}-${idx}-${text.plain_text}`} text={text} />
          ))}
        </AnchorHeading>
      );
    }
    case "bulleted_list_item": {
      const _fullText = block.bulleted_list_item.rich_text.map((t) => t.plain_text).join("");
      return (
        <li>{renderAnnotatedWithInlineImages(block.id, block.bulleted_list_item.rich_text)}</li>
      );
    }
    case "numbered_list_item": {
      const _fullText = block.numbered_list_item.rich_text.map((t) => t.plain_text).join("");
      return (
        <li>{renderAnnotatedWithInlineImages(block.id, block.numbered_list_item.rich_text)}</li>
      );
    }
    case "code":
      return <CodeBlock block={block} />;
    case "quote": {
      const _fullText = block.quote.rich_text.map((t) => t.plain_text).join("");
      return (
        <blockquote className="rounded-r-lg border-orange/60 border-l-4 bg-orange/5 p-4 pl-4 italic">
          {renderAnnotatedWithInlineImages(block.id, block.quote.rich_text)}
        </blockquote>
      );
    }
    case "image":
      if ("external" in block.image) {
        const caption =
          block.image.caption && block.image.caption.length > 0
            ? block.image.caption.map((text) => text.plain_text).join(" ")
            : "";

        // Generate descriptive alt text based on caption or URL
        const generateAltText = (caption: string, url: string) => {
          if (caption) {
            // If caption contains "diagram", "chart", "graph", etc., make it more descriptive
            if (
              caption.toLowerCase().includes("diagram") ||
              caption.toLowerCase().includes("chart") ||
              caption.toLowerCase().includes("graph") ||
              caption.toLowerCase().includes("figure")
            ) {
              return caption;
            }
            return caption;
          }

          // Fallback: try to extract meaningful info from URL
          const urlParts = url.split("/");
          const filename = urlParts[urlParts.length - 1];
          if (filename && filename !== "") {
            return `Content illustration: ${filename.replace(/[-_]/g, " ").replace(/\.[^/.]+$/, "")}`;
          }

          return "Content illustration";
        };

        {
          const url = block.image.external?.url;
          if (!url) {
            return null;
          }
          const isSvg = url.split("?")[0]?.toLowerCase().endsWith(".svg") ?? false;
          const allowed = isNextImageAllowed(url);
          return (
            <figure className="my-6">
              <div className="w-full overflow-hidden rounded-lg shadow-md">
                {isSvg || !allowed ? (
                  <Image
                    alt={generateAltText(caption, url)}
                    className="block h-auto w-full"
                    height={400}
                    onError={() => console.error("Image failed to load:", url)}
                    onLoadingComplete={() => console.log("img loaded:", url)}
                    src={normalizeImageSrc(url) || url}
                    style={{ objectFit: "contain" }}
                    width={800}
                  />
                ) : (
                  <div
                    className="relative aspect-video w-full overflow-hidden"
                    style={{ minHeight: 1 }}
                  >
                    <Image
                      alt={generateAltText(caption, url)}
                      className="object-cover"
                      fill
                      onError={() => console.error("next/image failed to load:", url)}
                      onLoad={() => console.log("next/image loaded:", url)}
                      priority={false}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      src={normalizeImageSrc(url) || url}
                    />
                  </div>
                )}
              </div>
              {caption && (
                <figcaption className="mt-2 text-center text-muted text-sm italic">
                  {block.image.caption.map((text, idx) => (
                    <RichText key={`${block.id}-caption-${idx}-${text.plain_text}`} text={text} />
                  ))}
                </figcaption>
              )}
            </figure>
          );
        }
      }
      if ("file" in block.image) {
        const caption =
          block.image.caption && block.image.caption.length > 0
            ? block.image.caption.map((text) => text.plain_text).join(" ")
            : "";

        const generateAltText = (caption: string, url: string) => {
          if (caption) {
            if (
              caption.toLowerCase().includes("diagram") ||
              caption.toLowerCase().includes("chart") ||
              caption.toLowerCase().includes("graph") ||
              caption.toLowerCase().includes("figure")
            ) {
              return caption;
            }
            return caption;
          }

          const urlParts = url.split("/");
          const filename = urlParts[urlParts.length - 1];
          if (filename && filename !== "") {
            return `Content illustration: ${filename.replace(/[-_]/g, " ").replace(/\.[^/.]+$/, "")}`;
          }

          return "Content illustration";
        };

        {
          const url = block.image.file?.url;
          if (!url) {
            return null;
          }
          const isSvg = url.split("?")[0]?.toLowerCase().endsWith(".svg") ?? false;
          const allowed = isNextImageAllowed(url);
          return (
            <figure className="my-6">
              <div className="w-full overflow-hidden rounded-lg shadow-md">
                {isSvg || !allowed ? (
                  <Image
                    alt={generateAltText(caption, url)}
                    className="block h-auto w-full"
                    height={400}
                    onError={() => console.error("Image failed to load:", url)}
                    onLoadingComplete={() => console.log("img loaded:", url)}
                    src={normalizeImageSrc(url) || url}
                    style={{ objectFit: "contain" }}
                    width={800}
                  />
                ) : (
                  <div
                    className="relative aspect-video w-full overflow-hidden"
                    style={{ minHeight: 1 }}
                  >
                    <Image
                      alt={generateAltText(caption, url)}
                      className="object-cover"
                      fill
                      onError={() => console.error("next/image failed to load:", url)}
                      onLoad={() => console.log("next/image loaded:", url)}
                      priority={false}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      src={normalizeImageSrc(url) || url}
                    />
                  </div>
                )}
              </div>
              {caption && (
                <figcaption className="mt-2 text-center text-muted text-sm italic">
                  {block.image.caption.map((text, idx) => (
                    <RichText key={`${block.id}-caption-${idx}-${text.plain_text}`} text={text} />
                  ))}
                </figcaption>
              )}
            </figure>
          );
        }
      }
      return null;
    case "callout": {
      // Generate ID from callout content for linkability
      const calloutText = block.callout.rich_text.map((text) => text.plain_text).join(" ");
      const generateCalloutId = (text: string) => {
        // Extract key phrases for common callout types
        if (text.toLowerCase().includes("what to watch")) {
          return "what-to-watch";
        }
        if (text.toLowerCase().includes("ai factory risk")) {
          return "ai-factory-risk";
        }
        if (text.toLowerCase().includes("key takeaway")) {
          return "key-takeaway";
        }
        if (text.toLowerCase().includes("warning")) {
          return "warning";
        }
        if (text.toLowerCase().includes("tip")) {
          return "tip";
        }
        if (text.toLowerCase().includes("note")) {
          return "note";
        }

        // Fallback: create ID from first few words
        const words = text
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .split(/\s+/)
          .slice(0, 3);
        return words.join("-");
      };

      const calloutId = generateCalloutId(calloutText);

      const _fullText = block.callout.rich_text.map((t) => t.plain_text).join(" ");

      return (
        <div
          className="my-6 rounded-r-lg border-orange/60 border-l-4 bg-orange/5 p-4"
          id={calloutId}
        >
          <div className="flex items-start space-x-3">
            {block.callout.icon && "emoji" in block.callout.icon && (
              <span>{block.callout.icon.emoji}</span>
            )}
            <div className="flex-1 text-brand">
              {renderAnnotatedWithInlineImages(block.id, block.callout.rich_text)}
            </div>
            <ShareLink id={calloutId} />
          </div>
        </div>
      );
    }
    case "divider":
      return <hr className="my-8" />;
    default:
      return null;
  }
}
