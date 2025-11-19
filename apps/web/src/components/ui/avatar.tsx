"use client";

import {
    Avatar as RadixAvatar,
    AvatarFallback as RadixAvatarFallback,
    AvatarImage as RadixAvatarImage,
} from "@radix-ui/react-avatar";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.ComponentProps<typeof RadixAvatar>) {
  return (
    <RadixAvatar
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      data-slot="avatar"
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof RadixAvatarImage>) {
  return (
    <RadixAvatarImage
      className={cn("aspect-square size-full", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof RadixAvatarFallback>) {
  return (
    <RadixAvatarFallback
      className={cn("flex size-full items-center justify-center rounded-full bg-muted", className)}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
