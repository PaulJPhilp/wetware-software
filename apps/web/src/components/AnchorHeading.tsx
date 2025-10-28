import Link from "next/link";
import type { ReactNode } from "react";

interface AnchorHeadingProps {
  id: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
}

export function AnchorHeading({ id, level = 2, children, className }: AnchorHeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return (
    <Tag
      className={`group scroll-mt-24 transition-colors hover:text-orange ${className || ""}`}
      id={id}
    >
      {children}
      <Link className="inline-flex items-center gap-2 no-underline" href={`#${id}`}>
        <span className="invisible ml-2 inline-flex h-4 w-4 items-center justify-center rounded text-orange opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
          #
        </span>
      </Link>
    </Tag>
  );
}
