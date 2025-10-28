interface EpigraphProps {
  author?: string;
  children: React.ReactNode;
}

export function Epigraph({ author, children }: EpigraphProps) {
  return (
    <blockquote className="my-8 border-orange/60 border-l-4 bg-orange/5 px-4 py-3 font-serif text-brand text-lg leading-relaxed">
      <p>"{children}"</p>
      {author ? <footer className="mt-2 text-muted text-sm">— {author}</footer> : null}
    </blockquote>
  );
}
