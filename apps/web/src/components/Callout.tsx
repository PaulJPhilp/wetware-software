import { cn } from "@/lib/utils";

const variants = {
  info: "border-orange/60 bg-orange/5",
  tip: "border-orange/70 bg-orange/10",
  warning: "border-orange bg-orange/10",
  success: "border-orange/60 bg-orange/5",
} as const;

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}

export function Callout({ title, children, variant = "info", className }: CalloutProps) {
  return (
    <div className={cn("my-6 rounded-md border-l-4 p-4 text-brand", variants[variant], className)}>
      {title ? <h4 className="mb-1 font-semibold">{title}</h4> : null}
      <div className="text-muted">{children}</div>
    </div>
  );
}
