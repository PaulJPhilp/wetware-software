"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isContentOpen, setIsContentOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75 border-b border-border">
      <nav className="max-w-screen-2xl mx-auto px-4 md:px-6 py-1 flex items-center justify-between font-sans min-h-0">
        <div className="flex items-center gap-2">
          <Image
            src="/images/avatar.jpeg"
            alt="Paul J Philp Avatar"
            width={28}
            height={28}
            className="w-7 h-7 rounded-full border border-border shadow"
            priority
          />
          <div className="flex flex-col leading-tight">
            <Link
              href="/"
              className="font-bold text-sm md:text-base lg:text-lg hover:text-orange transition-colors leading-none"
            >
              Wetware & Software
            </Link>
            <span className="text-[10px] md:text-[11px] text-muted-foreground whitespace-nowrap">
              The Practice of Human-AI Collaboration
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-nowrap">
          <Link
            href="/about"
            className="text-[9px] md:text-[11px] hover:text-orange transition-colors whitespace-nowrap"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-[9px] md:text-[11px] hover:text-orange transition-colors whitespace-nowrap"
          >
            Projects
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsContentOpen(!isContentOpen)}
              className="flex items-center gap-1 text-[9px] md:text-[11px] hover:text-orange transition-colors whitespace-nowrap px-1"
              onBlur={() => setTimeout(() => setIsContentOpen(false), 150)}
            >
              Content
              <ChevronDown
                className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${isContentOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isContentOpen && (
              <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[80px] z-10">
                <Link
                  href="/series"
                  className="block px-2 py-1 text-xs md:text-sm hover:text-orange hover:bg-muted/50 transition-colors"
                  onClick={() => setIsContentOpen(false)}
                >
                  Series
                </Link>
                <Link
                  href="/essays"
                  className="block px-2 py-1 text-xs md:text-sm hover:text-orange hover:bg-muted/50 transition-colors"
                  onClick={() => setIsContentOpen(false)}
                >
                  Essays
                </Link>
                <Link
                  href="/articles"
                  className="block px-2 py-1 text-xs md:text-sm hover:text-orange hover:bg-muted/50 transition-colors"
                  onClick={() => setIsContentOpen(false)}
                >
                  Articles
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/resources"
            className="text-[9px] md:text-[11px] hover:text-orange transition-colors whitespace-nowrap"
          >
            Resources
          </Link>
          <Link
            href="/connect"
            className="text-[9px] md:text-[11px] hover:text-orange transition-colors whitespace-nowrap"
          >
            Connect
          </Link>
          <ThemeToggle className="ml-2" />
        </div>
      </nav>
    </header>
  );
}
