"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-5xl font-bold text-orange mb-4" aria-label="500 Internal Server Error">
        500
      </h1>
      <p className="text-lg text-charcoal/80 mb-6">Something went wrong. Please try again later.</p>
      <a
        href="/"
        className="px-4 py-2 rounded-lg bg-orange text-white font-semibold shadow hover:bg-orange/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange"
        aria-label="Go to homepage"
      >
        Go to Homepage
      </a>
      <pre className="mt-6 text-xs text-charcoal/60 bg-silver p-4 rounded-lg max-w-xl overflow-auto">
        {error?.message}
      </pre>
    </main>
  );
}
