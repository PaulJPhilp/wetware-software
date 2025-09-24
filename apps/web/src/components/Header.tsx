"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useHeaderHeight } from "./HeaderContext";

const HEADER_CLASS = "fixed inset-x-0 top-0 w-full text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900";
const NAV_CLASS = "w-full px-2 md:px-3 py-[2px] flex items-center justify-between font-sans";
const NAV_LINK_CLASS = "text-[10px] text-gray-900 dark:text-white hover:text-orange transition-colors px-[4px] py-[2px] hover:underline cursor-pointer leading-none";
const TITLE_CLASS = "font-bold text-[12px] md:text-[13px] hover:text-orange transition-colors leading-none";
const SUBTITLE_CLASS = "text-[10px] md:text-[11px] text-gray-600 dark:text-gray-400 whitespace-nowrap leading-none";

export function Header() {
  const [isContentOpen, setIsContentOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const { setHeaderHeight: setContextHeaderHeight } = useHeaderHeight();

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setHeightFromEl = () => {
      const newHeight = Math.round(el.offsetHeight || 28);
      setContextHeaderHeight(newHeight);
    };
    setHeightFromEl();
    const ro = new ResizeObserver(() => setHeightFromEl());
    ro.observe(el);
    const onResize = () => setHeightFromEl();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [setContextHeaderHeight]);

  // Compute a simple checksum of static DOM-relevant strings (debug only)
  useEffect(() => {
    const checksum = btoa(
      [HEADER_CLASS, NAV_CLASS, NAV_LINK_CLASS, TITLE_CLASS, SUBTITLE_CLASS].join("|")
    );
    // eslint-disable-next-line no-console
    console.log("[Header checksum]", checksum);
  }, []);

  return (
    <header ref={headerRef} className={HEADER_CLASS} style={{ zIndex: 99999, isolation: "isolate" }}>
      <nav className={NAV_CLASS}>
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
            <Link href="/" className={TITLE_CLASS}>
              Wetware & Software
            </Link>
            <span className={SUBTITLE_CLASS}>The Practice of Human-AI Collaboration</span>
          </div>
        </div>
        <div className="flex items-center gap-[6px] ml-2">
          <Link href="/about" className={NAV_LINK_CLASS}>About</Link>
          <Link href="/projects" className={NAV_LINK_CLASS}>Projects</Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsContentOpen(!isContentOpen)}
              className={NAV_LINK_CLASS}
              aria-haspopup="true"
              aria-expanded={isContentOpen}
              onBlur={() => setTimeout(() => setIsContentOpen(false), 150)}
            >
              Content
            </button>
            {isContentOpen && (
              <div
                className="absolute top-full left-0 mt-[2px] bg-[#f8f8f8] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-[2px] min-w-[100px]"
                style={{ zIndex: 100000 }}
              >
                <Link href="/essays" className="block px-[6px] py-[3px] text-[10px] text-gray-900 dark:text-white hover:text-orange hover:bg-orange/10 transition-colors">Essays</Link>
                <Link href="/articles" className="block px-[6px] py-[3px] text-[10px] text-gray-900 dark:text-white hover:text-orange hover:bg-orange/10 transition-colors">Articles</Link>
              </div>
            )}
          </div>
          <Link href="/resources" className={NAV_LINK_CLASS}>Resources</Link>
          <Link href="/connect" className={NAV_LINK_CLASS}>Connect</Link>
          <ThemeToggle className="ml-2" />
        </div>
      </nav>
    </header>
  );
}
