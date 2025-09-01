import { cn } from "@/lib/utils";
import type * as React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function Icon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("icon", className)}
      {...props}
    >
      <title>Circle icon</title>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
