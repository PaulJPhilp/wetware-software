"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useHeaderHeight } from "./HeaderContext";

export function Header() {
  const [isContentOpen, setIsContentOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const { theme, systemTheme } = useTheme();
  const [_isMounted, setIsMounted] = useState(false);
  const { setHeaderHeight: setContextHeaderHeight } = useHeaderHeight();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Measure header height and update on resize using ResizeObserver
    const el = headerRef.current;
    if (!el) return;

    const setHeightFromEl = () => {
      const newHeight = Math.round(el.offsetHeight || 28);
      setContextHeaderHeight(newHeight);
    };

    setHeightFromEl();

    const ro = new ResizeObserver(() => {
      setHeightFromEl();
    });
    ro.observe(el);

    // also update on window resize as a fallback
    const onResize = () => setHeightFromEl();
    window.addEventListener("resize", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [setContextHeaderHeight]);

  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const _isDark = resolvedTheme === "dark";

  // Use practical minimum font-size and smaller paddings for perceived size reduction
  const navLinkClass =
    "text-xs text-charcoal dark:text-white hover:text-orange transition-colors px-[4px] py-[2px] cursor-pointer leading-none font-semibold";

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 w-full text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700"
      style={{
        backgroundColor: _isMounted ? (_isDark ? "#111827" : "#f8f8f8") : "#f8f8f8",
        zIndex: 99999,
        isolation: 'isolate'
      }}
    >
      <nav className="w-full px-4 md:px-6 py-2 flex items-center justify-between font-sans">
        {/* Logo and Title */}
        <div className="flex items-center gap-1">
          <Image
            src="/images/avatar.jpeg"
            alt="Paul J Philp Avatar"
            width={24}
            height={24}
            className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-700 shadow"
            priority
          />
          <div className="flex flex-col leading-tight">
            <Link
              href="/"
              className="font-bold text-[15px] md:text-[16px] hover:text-orange transition-colors leading-none"
            >
              Wetware & Software
            </Link>
            <span className="text-[11px] md:text-[12px] text-gray-600 dark:text-gray-400 whitespace-nowrap leading-none">
              The Practice of Human-AI Collaboration
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
  <div className="flex items-center gap-[6px] ml-2">
          <Link href="/about" className={navLinkClass}>
            About
          </Link>
          <Link href="/projects" className={navLinkClass}>
            Projects
          </Link>
          <button
            type="button"
            onClick={() => setIsContentOpen(!isContentOpen)}
            className={`${navLinkClass} relative`}
            aria-haspopup="true"
            aria-expanded={isContentOpen}
            onBlur={() => setTimeout(() => setIsContentOpen(false), 150)}
          >
            Content
            {isContentOpen && (
              <div
                className="absolute top-full left-0 mt-[2px] bg-[#f8f8f8] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-[2px] min-w-[100px]"
                style={{ zIndex: 100000 }}
              >
                <Link
                  href="/essays"
                  className="block px-[6px] py-[3px] text-[11px] text-gray-900 dark:text-white hover:text-orange hover:bg-orange/10 transition-colors"
                >
                  Essays
                </Link>
                <Link
                  href="/articles"
                  className="block px-[6px] py-[3px] text-[11px] text-gray-900 dark:text-white hover:text-orange hover:bg-orange/10 transition-colors"
                >
                  Articles
                </Link>
              </div>
            )}
          </button>
          <Link href="/resources" className={navLinkClass}>
            Resources
          </Link>
          <Link href="/connect" className={navLinkClass}>
            Connect
          </Link>
          <ThemeToggle className="ml-2" />
        </div>
      </nav>
    </header>
  );
}
