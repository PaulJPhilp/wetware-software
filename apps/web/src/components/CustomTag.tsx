import type { BaseComponentProps } from "@/lib/component-types";
import { cn } from "@/lib/utils";
import type * as React from "react";

interface CustomTagProps extends BaseComponentProps, React.ComponentProps<"span"> {
  /** Tag content */
  children: React.ReactNode;
  /** Visual variant for different tag styles */
  variant?: "default" | "primary" | "secondary" | "success" | "warning";
}

export function CustomTag({
  children,
  className,
  testId,
  variant = "default",
  ...props
}: CustomTagProps) {
  const variants = {
    default: "bg-charcoal/80 text-silver dark:bg-charcoal dark:text-silver",
    primary: "bg-orange text-white border-orange",
    secondary: "bg-muted text-muted-foreground border-muted-foreground/20",
    success: "bg-green-500 text-white border-green-500",
    warning: "bg-red-500 text-white border-red-500",
  };

  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 font-medium text-xs",
        variants[variant],
        className
      )}
      data-slot="custom-tag"
      data-testid={testId}
      {...props}
    >
      {children}
    </span>
  );
}
