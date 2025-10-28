"use client";

import { KEYS } from "@/lib/keyboard-navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(function handleMount() {
    setIsMounted(true);
  }, []);

  const resolvedTheme = isMounted ? (theme === "system" ? systemTheme : theme) : undefined;
  const isDark = resolvedTheme === "dark";

  function handleToggle() {
    setTheme(isDark ? "light" : "dark");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === KEYS.ENTER || event.key === KEYS.SPACE) {
      event.preventDefault();
      handleToggle();
    }
  }

  // Render both icons stacked so SSR/CSR markup matches, then control visibility after mount
  return (
    <button
      aria-label="Toggle theme"
      aria-pressed={false}
      className={`relative inline-flex h-6 w-6 items-center justify-center rounded-md border border-border bg-card text-card-foreground transition-colors hover:bg-muted/50 ${className}`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <Sun
        className={`absolute h-3 w-3 transition-opacity ${isMounted && !isDark ? "opacity-0" : "opacity-100"}`}
      />
      <Moon
        className={`h-3 w-3 transition-opacity ${isMounted && isDark ? "opacity-0" : "opacity-100"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
