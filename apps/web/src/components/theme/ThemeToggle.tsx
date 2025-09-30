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

  const resolvedTheme = theme === "system" ? systemTheme : theme;
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
      type="button"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      className={`inline-flex items-center justify-center rounded-md border border-border bg-card text-card-foreground hover:bg-muted/50 transition-colors h-6 w-6 relative ${className}`}
    >
      <Sun
        className={`h-3 w-3 transition-opacity absolute ${isMounted && !isDark ? "opacity-0" : "opacity-100"}`}
      />
      <Moon
        className={`h-3 w-3 transition-opacity ${isMounted && isDark ? "opacity-0" : "opacity-100"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
