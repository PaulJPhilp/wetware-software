"use client";

import type {
	BlockObjectResponse,
	RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode, useEffect, useState } from "react";

interface NotionBlockProps {
	block: BlockObjectResponse;
}

type ElementProps = {
	children: ReactNode;
};

const RichText: FC<{ text: RichTextItemResponse }> = ({ text }) => {
	if (!text) return null;

	const content = text.plain_text || "";

	if (text.type === "text") {
		let Element: FC<ElementProps> = ({ children }) => <>{children}</>;
		const annotations = text.annotations || {};

		if (annotations.code) {
			const PrevElement = Element;
			Element = ({ children }) => (
				<code className="bg-charcoal/5 px-1.5 py-0.5 rounded">
					<PrevElement>{children}</PrevElement>
				</code>
			);
		}
		if (annotations.bold) {
			const PrevElement = Element;
			Element = ({ children }) => (
				<strong>
					<PrevElement>{children}</PrevElement>
				</strong>
			);
		}
		if (annotations.italic) {
			const PrevElement = Element;
			Element = ({ children }) => (
				<em>
					<PrevElement>{children}</PrevElement>
				</em>
			);
		}
		if (annotations.strikethrough) {
			const PrevElement = Element;
			Element = ({ children }) => (
				<del>
					<PrevElement>{children}</PrevElement>
				</del>
			);
		}
		if (annotations.underline) {
			const PrevElement = Element;
			Element = ({ children }) => (
				<u>
					<PrevElement>{children}</PrevElement>
				</u>
			);
		}
		if (text.text.link?.url) {
			const PrevElement = Element;
			const url = text.text.link.url;
			Element = ({ children }) =>
				url ? (
					<Link
						href={url}
						className="text-orange hover:text-orange/80 transition-colors underline underline-offset-4"
					>
						<PrevElement>{children}</PrevElement>
					</Link>
				) : (
					<PrevElement>{children}</PrevElement>
				);
		}

		return <Element>{content}</Element>;
	}

	return <>{content}</>;
};

const CodeBlock: FC<{ block: BlockObjectResponse }> = ({ block }) => {
	const [isCopied, setIsCopied] = useState(false);

	// @ts-ignore
	const code = block.code.rich_text.map((text) => text.plain_text).join("");

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
				className="absolute top-2 right-2 p-1.5 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
				aria-label="Copy code to clipboard"
			>
				{isCopied ? (
					<Check className="w-4 h-4" />
				) : (
					<Copy className="w-4 h-4" />
				)}
			</button>
			<pre className="bg-charcoal/5 p-4 rounded-lg overflow-auto text-base">
				<code>{code}</code>
			</pre>
		</div>
	);
};

export function NotionBlock({ block }: NotionBlockProps) {
	switch (block.type) {
		case "paragraph":
			return (
				<p>
					{block.paragraph.rich_text.map((text, idx) => (
						<RichText
							key={`${block.id}-${idx}-${text.plain_text}`}
							text={text}
						/>
					))}
				</p>
			);
		case "heading_1":
			return (
				<h1 className="text-3xl font-sans font-bold mt-8 mb-4">
					{block.heading_1.rich_text.map((text, idx) => (
						<RichText
							key={`${block.id}-${idx}-${text.plain_text}`}
							text={text}
						/>
					))}
				</h1>
			);
		case "heading_2":
			return (
				<h2 className="text-2xl font-sans font-bold mt-8 mb-4">
					{block.heading_2.rich_text.map((text, idx) => (
						<RichText
							key={`${block.id}-${idx}-${text.plain_text}`}
							text={text}
						/>
					))}
				</h2>
			);
		case "heading_3":
			return (
				<h3 className="text-xl font-sans font-bold mt-6 mb-3">
					{block.heading_3.rich_text.map((text, idx) => (
						<RichText
							key={`${block.id}-${idx}-${text.plain_text}`}
							text={text}
						/>
					))}
				</h3>
			);
		case "bulleted_list_item":
			return (
				<li>
					{block.bulleted_list_item.rich_text.map((text, idx) => (
						<RichText
							key={`${block.id}-${idx}-${text.plain_text}`}
							text={text}
						/>
					))}
				</li>
			);
		case "numbered_list_item":
			return (
				<li>
					{block.numbered_list_item.rich_text.map((text, idx) => (
						<RichText
							key={`${block.id}-${idx}-${text.plain_text}`}
							text={text}
						/>
					))}
				</li>
			);
		case "code":
			return <CodeBlock block={block} />;
		case "quote":
			return (
				<blockquote className="border-l-4 border-orange pl-4 italic bg-muted p-4 rounded-r-lg">
					{block.quote.rich_text.map((text, idx) => (
						<RichText
							key={`${block.id}-${idx}-${text.plain_text}`}
							text={text}
						/>
					))}
				</blockquote>
			);
		case "image":
			if ("external" in block.image) {
				return (
					<figure className="my-6">
						<Image
							src={block.image.external.url}
							alt={block.image.caption && block.image.caption.length > 0
								? block.image.caption.map((text) => text.plain_text).join(' ')
								: "Content illustration"}
							className="w-full h-auto rounded-lg shadow-md"
							width={800}
							height={400}
						/>
						{block.image.caption && block.image.caption.length > 0 && (
							<figcaption className="text-sm text-charcoal/60 text-center mt-2 italic">
								{block.image.caption.map((text, idx) => (
									<RichText
										key={`${block.id}-caption-${idx}-${text.plain_text}`}
										text={text}
									/>
								))}
							</figcaption>
						)}
					</figure>
				);
			}
			if ("file" in block.image) {
				return (
					<figure className="my-6">
						<Image
							src={block.image.file.url}
							alt={block.image.caption && block.image.caption.length > 0
								? block.image.caption.map((text) => text.plain_text).join(' ')
								: "Content illustration"}
							className="w-full h-auto rounded-lg shadow-md"
							width={800}
							height={400}
						/>
						{block.image.caption && block.image.caption.length > 0 && (
							<figcaption className="text-sm text-charcoal/60 text-center mt-2 italic">
								{block.image.caption.map((text, idx) => (
									<RichText
										key={`${block.id}-caption-${idx}-${text.plain_text}`}
										text={text}
									/>
								))}
							</figcaption>
						)}
					</figure>
				);
			}
			return null;
		case "callout":
			return (
				<div className="bg-silver/40 border-l-4 border-orange p-4 rounded-r-lg my-6">
					<div className="flex items-start space-x-3">
						{block.callout.icon && "emoji" in block.callout.icon && (
							<span className="text-xl">{block.callout.icon.emoji}</span>
						)}
						<div>
							{block.callout.rich_text.map((text, idx) => (
								<RichText
									key={`${block.id}-${idx}-${text.plain_text}`}
									text={text}
								/>
							))}
						</div>
					</div>
				</div>
			);
		case "divider":
			return <hr className="my-8" />;
		default:
			return null;
	}
}
