export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 aria-label="404 Not Found" className="mb-4 font-bold text-5xl text-orange">
        404
      </h1>
      <p className="mb-6 text-charcoal/80 text-lg">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <a
        aria-label="Go to homepage"
        className="rounded-lg bg-orange px-4 py-2 font-semibold text-white shadow transition-colors duration-200 hover:bg-orange/80 focus:outline-none focus:ring-2 focus:ring-orange"
        href="/"
      >
        Go to Homepage
      </a>
    </main>
  );
}
