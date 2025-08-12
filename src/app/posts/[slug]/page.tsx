import { NotionContent } from "@/components/NotionContent";
import { PostCard } from "@/components/PostCard";
import { SeriesNavigation } from "@/components/SeriesNavigation";
import { Badge } from "@/components/ui/badge";
import { type FocusArea, getPostContent, getPublishedPosts } from "@/lib/notion-utils";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Bot, Brain, Briefcase, Code, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Map Focus Areas to Lucide icons
const focusAreaIcons: Record<FocusArea, typeof Brain> = {
	"Human-Centric": Brain,
	"Tech-Centric": Bot,
	"Human-AI Collaboration": Users,
	Coding: Code,
	"Business of AI": Briefcase,
};

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const posts = await getPublishedPosts();
	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		return {
			title: "Post Not Found",
		};
	}

	return {
		title: post.name,
		description: post.description,
	};
}

export async function generateStaticParams() {
	const posts = await getPublishedPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const posts = await getPublishedPosts();
	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		notFound();
	}

	const blocks = await getPostContent(post.id);
	const FocusIcon = focusAreaIcons[post.focusArea] || Brain; // Fallback to Brain if focus area not found

	// Get series posts if this post is part of a series
	const seriesPosts = post.seriesId ? posts.filter((p) => p.seriesId === post.seriesId) : [];

	// Get related posts (same focus area, excluding current post)
	const relatedPosts = posts
		.filter((p) => p.focusArea === post.focusArea && p.id !== post.id)
		.slice(0, 3);

	return (
		<div className="max-w-4xl mx-auto py-12 px-4 md:px-8 space-y-8">
			{/* Series Navigation */}
			{post.seriesId && seriesPosts.length > 1 && (
				<SeriesNavigation currentPost={post} seriesPosts={seriesPosts} />
			)}

			<article className="bg-card rounded-xl shadow-lg border border-card space-y-12 p-8">
				{/* Header */}
				<header className="space-y-6 text-center pb-6 border-b border-card">
					<div className="flex items-center justify-center gap-4 mb-2">
						<Badge variant="secondary" className="font-sans text-base px-3 py-1">
							{post.type}
						</Badge>
						<FocusIcon className="w-6 h-6 text-orange animate-bounce" />
					</div>
					<h1 className="text-4xl md:text-5xl font-sans font-bold mb-2 text-charcoal leading-tight">
						{post.name}
					</h1>
					<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-charcoal/60 mb-2">
						<time>{post.publishDate}</time>
						<span>•</span>
						<span>{post.readTime} min read</span>
					</div>
					{post.tags.length > 0 && (
						<div className="flex flex-wrap items-center justify-center gap-2 text-sm text-charcoal/60">
							{post.tags.map((tag) => (
								<span
									key={tag.name}
									className="hover:text-orange transition-colors bg-silver px-2 py-1 rounded"
								>
									#{tag.name}
								</span>
							))}
						</div>
					)}
				</header>

				{/* Content */}
				<section className="prose prose-lg prose-charcoal max-w-none text-left leading-relaxed">
					<p className="text-xl text-charcoal/80 mb-8 font-serif italic leading-relaxed">
						{post.description}
					</p>
					<div className="space-y-6 font-serif text-lg leading-loose text-charcoal">
						<NotionContent blocks={blocks.results as BlockObjectResponse[]} />
					</div>
				</section>

				{/* Footer */}
				<footer className="border-t pt-8">
					<div className="flex justify-center mb-8">
						<Link
							href="/"
							className="text-sm font-sans text-charcoal/60 hover:text-orange transition-colors px-4 py-2 rounded-lg bg-silver shadow"
						>
							← Back to all posts
						</Link>
					</div>

					{/* Related Posts */}
					{relatedPosts.length > 0 && (
						<div className="mt-8">
							<h3 className="text-2xl font-sans font-bold mb-6 text-center text-charcoal">
								More on {post.focusArea}
							</h3>
							<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
								{relatedPosts.map((relatedPost) => (
									<Link
										key={relatedPost.id}
										href={`/posts/${relatedPost.slug}`}
										className="block group"
									>
										<PostCard post={relatedPost} />
									</Link>
								))}
							</div>
						</div>
					)}
				</footer>
			</article>
		</div>
	);
}
