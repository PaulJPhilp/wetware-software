import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-32 text-center">
      <h1 className="font-bold font-sans text-4xl">Post Not Found</h1>
      <p className="text-charcoal/80 text-xl">Sorry, the post you're looking for doesn't exist.</p>
      <Link
        className="font-sans text-orange text-sm transition-colors hover:text-orange/80"
        href="/"
      >
        ← Back to all posts
      </Link>
    </div>
  );
}
