interface EpigraphProps {
  author?: string;
  children: React.ReactNode;
}

export function Epigraph({ author, children }: EpigraphProps) {
  return (
    <blockquote className="my-8 border-l-4 border-orange/60 bg-orange/5 px-4 py-3 text-lg font-serif leading-relaxed text-brand">
      <p>"{children}"</p>
      {author ? <footer className="mt-2 text-sm text-muted">— {author}</footer> : null}
    </blockquote>
  );
}
