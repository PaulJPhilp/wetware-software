import { cn } from "@/lib/utils";

interface FigureProps {
  children: React.ReactNode;
  caption?: string;
  className?: string;
}

export function Figure({ children, caption, className }: FigureProps) {
  return (
    <figure className={cn("mx-auto my-6 w-full max-w-3xl", className)}>
      {children}
      {caption ? <figcaption className="mt-2 text-muted text-sm">{caption}</figcaption> : null}
    </figure>
  );
}
