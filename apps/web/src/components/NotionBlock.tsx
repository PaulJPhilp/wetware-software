"use client";

import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FC, type ReactNode } from "react";

import dynamic from "next/dynamic";

// Lazy-loaded syntax highlighter component
const LazySyntaxHighlighter = dynamic(() =>
  Promise.all([
    import("react-syntax-highlighter"),
    import("react-syntax-highlighter/dist/esm/styles/prism"),
  ]).then(([{ Prism }, { atomDark }]) => {
    return ({ language, children }: { language: string; children: string }) => (
      <Prism language={language} style={atomDark} className="rounded-lg">
        {children}
      </Prism>
    );
  }),
);

import { AnchorHeading } from "./AnchorHeading";
import { ShareLink } from "./ShareLink";

interface NotionBlockProps {
  block: BlockObjectResponse;
}

const RichText: FC<{ text: RichTextItemResponse }> = ({ text }) => {
  if (!text) return null;

  const content = text.plain_text || "";

  if (text.type === "text") {
    const annotations = text.annotations || {};
    let element: ReactNode = content;

    // Apply text formatting
    if (annotations.code) {
      element = <code className="bg-charcoal/5 px-1.5 py-0.5 rounded">{element}</code>;
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
          href={text.text.link.url}
          className="text-orange hover:text-orange/80 transition-colors underline underline-offset-4"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
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
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-50 transition-colors"
        aria-label="Copy code to clipboard"
      >
        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
      <LazySyntaxHighlighter language={language}>{code}</LazySyntaxHighlighter>
    </div>
  );
};

export function NotionBlock({ block }: NotionBlockProps) {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          {block.paragraph.rich_text.map((text, idx) => (
            <RichText key={`${block.id}-${idx}-${text.plain_text}`} text={text} />
          ))}
        </p>
      );
    case "heading_1": {
      const h1Text = block.heading_1.rich_text.map((text) => text.plain_text).join("");
      const h1Id = h1Text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <AnchorHeading id={h1Id} level={1} className="fluid-h1 mt-6 mb-2">
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
        <AnchorHeading id={h2Id} level={2} className="fluid-h2 mt-6 mb-2">
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
        <AnchorHeading id={h3Id} level={3} className="fluid-h3 mt-4 mb-1">
          {block.heading_3.rich_text.map((text, idx) => (
            <RichText key={`${block.id}-${idx}-${text.plain_text}`} text={text} />
          ))}
        </AnchorHeading>
      );
    }
    case "bulleted_list_item":
      return (
        <li>
          {block.bulleted_list_item.rich_text.map((text, idx) => (
            <RichText key={`${block.id}-${idx}-${text.plain_text}`} text={text} />
          ))}
        </li>
      );
    case "numbered_list_item":
      return (
        <li>
          {block.numbered_list_item.rich_text.map((text, idx) => (
            <RichText key={`${block.id}-${idx}-${text.plain_text}`} text={text} />
          ))}
        </li>
      );
    case "code":
      return <CodeBlock block={block} />;
    case "quote":
      return (
        <blockquote className="border-l-4 border-orange/60 pl-4 italic bg-orange/5 p-4 rounded-r-lg">
          {block.quote.rich_text.map((text, idx) => (
            <RichText key={`${block.id}-${idx}-${text.plain_text}`} text={text} />
          ))}
        </blockquote>
      );
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

        return (
          <figure className="my-6">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-md">
              <Image
                src={block.image.external.url}
                alt={generateAltText(caption, block.image.external.url)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="object-cover"
                priority={false}
              />
            </div>
            {caption && (
              <figcaption className="text-sm text-muted text-center mt-2 italic">
                {block.image.caption.map((text, idx) => (
                  <RichText key={`${block.id}-caption-${idx}-${text.plain_text}`} text={text} />
                ))}
              </figcaption>
            )}
          </figure>
        );
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

        return (
          <figure className="my-6">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-md">
              <Image
                src={block.image.file.url}
                alt={generateAltText(caption, block.image.file.url)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="object-cover"
                priority={false}
              />
            </div>
            {caption && (
              <figcaption className="text-sm text-muted text-center mt-2 italic">
                {block.image.caption.map((text, idx) => (
                  <RichText key={`${block.id}-caption-${idx}-${text.plain_text}`} text={text} />
                ))}
              </figcaption>
            )}
          </figure>
        );
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

      return (
        <div
          id={calloutId}
          className="bg-orange/5 border-l-4 border-orange/60 p-4 rounded-r-lg my-6"
        >
          <div className="flex items-start space-x-3">
            {block.callout.icon && "emoji" in block.callout.icon && (
              <span>{block.callout.icon.emoji}</span>
            )}
            <div className="text-brand flex-1">
              {block.callout.rich_text.map((text, idx) => (
                <RichText key={`${block.id}-${idx}-${text.plain_text}`} text={text} />
              ))}
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
