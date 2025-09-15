"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isSeriesOpen, setIsSeriesOpen] = useState(false);
  const { theme, systemTheme } = useTheme();
  const [_isMounted, setIsMounted] = useState(false);
  const _router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const _isDark = resolvedTheme === "dark";

  const navLinkClass =
    "text-xs text-gray-900 dark:text-white hover:text-orange transition-colors px-2 py-2 hover:underline cursor-pointer";

  return (
    <header
      className="fixed inset-x-0 top-0 w-full h-14 md:h-16 z-[100] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700"
      style={{
        backgroundColor: _isMounted ? (_isDark ? "#111827" : "#f8f8f8") : "#f8f8f8",
      }}
    >
      <nav className="w-full px-4 md:px-6 py-1 flex items-center justify-between font-sans">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/avatar.jpeg"
            alt="Paul J Philp Avatar"
            width={28}
            height={28}
            className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 shadow"
            priority
          />
          <div className="flex flex-col leading-tight">
            <Link
              href="/"
              className="font-bold text-sm md:text-base hover:text-orange transition-colors leading-none"
            >
              Wetware & Software
            </Link>
            <span className="text-[10px] md:text-[11px] text-gray-600 dark:text-gray-400 whitespace-nowrap">
              The Practice of Human-AI Collaboration
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center gap-1 ml-4">
          <Link href="/about" className={navLinkClass}>
            About
          </Link>
          <Link href="/projects" className={navLinkClass}>
            Projects
          </Link>
          <button
            type="button"
            onClick={() => setIsSeriesOpen(!isSeriesOpen)}
            className={navLinkClass}
            aria-expanded={isSeriesOpen}
          >
            Series
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsContentOpen(!isContentOpen)}
              className={navLinkClass}
              aria-haspopup="true"
              aria-expanded={isContentOpen}
              onBlur={() => setTimeout(() => setIsContentOpen(false), 150)}
            >
              Content
            </button>
            {isContentOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[#f8f8f8] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 min-w-[120px] z-10">
                <Link
                  href="/series"
                  className="block px-4 py-2 text-sm text-gray-900 dark:text-white hover:text-orange hover:bg-orange/10 transition-colors"
                >
                  Series
                </Link>
                <Link
                  href="/essays"
                  className="block px-4 py-2 text-sm text-gray-900 dark:text-white hover:text-orange hover:bg-orange/10 transition-colors"
                >
                  Essays
                </Link>
                <Link
                  href="/articles"
                  className="block px-4 py-2 text-sm text-gray-900 dark:text-white hover:text-orange hover:bg-orange/10 transition-colors"
                >
                  Articles
                </Link>
              </div>
            )}
          </div>
          <Link href="/resources" className={navLinkClass}>
            Resources
          </Link>
          <Link href="/connect" className={navLinkClass}>
            Connect
          </Link>
          <ThemeToggle className="ml-2" />
        </div>
      </nav>

      {/* Series Panel */}
      {isSeriesOpen && (
        <section
          aria-label="Series panel"
          className="w-full bg-[#f8f8f8] dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-inner"
        >
          <div className="px-4 md:px-6 py-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Series</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Explore all series and sequences of posts.
                </p>
                <Link
                  href="/series"
                  className="text-xs text-gray-900 dark:text-white hover:text-orange mt-2 inline-block"
                >
                  View all series →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </header>
  );
}
