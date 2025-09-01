export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-5xl font-bold text-orange mb-4" aria-label="404 Not Found">
        404
      </h1>
      <p className="text-lg text-charcoal/80 mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="px-4 py-2 rounded-lg bg-orange text-white font-semibold shadow hover:bg-orange/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange"
        aria-label="Go to homepage"
      >
        Go to Homepage
      </a>
    </main>
  );
}
