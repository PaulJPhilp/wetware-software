import { cn } from "@/lib/utils";
import type * as React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function Icon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      className={cn("icon", className)}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <title>Circle icon</title>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
