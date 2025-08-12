import type {
	BlockObjectResponse,
	RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import Link from "next/link";
import type { FC, ReactNode } from "react";

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
						className="text-orange hover:text-orange/80 transition-colors"
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
			return (
				<pre className="bg-charcoal/5 p-4 rounded-lg overflow-auto">
					<code>
						{block.code.rich_text.map((text, idx) => (
							<RichText
								key={`${block.id}-${idx}-${text.plain_text}`}
								text={text}
							/>
						))}
					</code>
				</pre>
			);
		case "quote":
			return (
				<blockquote className="border-l-4 border-orange pl-4 italic">
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
							className="w-full rounded-lg shadow-md"
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
							className="w-full rounded-lg shadow-md"
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
