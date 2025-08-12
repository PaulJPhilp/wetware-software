import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
			<h1 className="text-4xl font-sans font-bold">Post Not Found</h1>
			<p className="text-xl text-charcoal/80">
				Sorry, the post you're looking for doesn't exist.
			</p>
			<Link
				href="/"
				className="text-sm font-sans text-orange hover:text-orange/80 transition-colors"
			>
				← Back to all posts
			</Link>
		</div>
	);
}
