"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 aria-label="500 Internal Server Error" className="mb-4 font-bold text-5xl text-orange">
        500
      </h1>
      <p className="mb-6 text-charcoal/80 text-lg">Something went wrong. Please try again later.</p>
      <a
        aria-label="Go to homepage"
        className="rounded-lg bg-orange px-4 py-2 font-semibold text-white shadow transition-colors duration-200 hover:bg-orange/80 focus:outline-none focus:ring-2 focus:ring-orange"
        href="/"
      >
        Go to Homepage
      </a>
      <pre className="mt-6 max-w-xl overflow-auto rounded-lg bg-silver p-4 text-charcoal/60 text-xs">
        {error?.message}
      </pre>
    </main>
  );
}
