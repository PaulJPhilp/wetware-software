"use client";

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

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle theme"
      className={`inline-flex items-center justify-center rounded-md border border-border bg-card text-card-foreground hover:bg-muted/50 transition-colors h-6 w-6 ${className}`}
    >
      {isMounted ? (
        isDark ? (
          <Sun className="h-3 w-3" />
        ) : (
          <Moon className="h-3 w-3" />
        )
      ) : (
        <span className="sr-only">Theme</span>
      )}
    </button>
  );
}
