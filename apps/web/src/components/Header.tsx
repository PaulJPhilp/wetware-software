"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const contentLinks = (
    <>
      <Link
        href="/series"
        className="block px-4 py-2 text-sm hover:text-orange hover:bg-muted/50 transition-colors"
        onClick={handleLinkClick}
      >
        Series
      </Link>
      <Link
        href="/essays"
        className="block px-4 py-2 text-sm hover:text-orange hover:bg-muted/50 transition-colors"
        onClick={handleLinkClick}
      >
        Essays
      </Link>
      <Link
        href="/articles"
        className="block px-4 py-2 text-sm hover:text-orange hover:bg-muted/50 transition-colors"
        onClick={handleLinkClick}
      >
        Articles
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-[100] bg-card border-b border-border">
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
              className="font-bold text-sm md:text-base hover:text-orange transition-colors leading-none"
            >
              Wetware & Software
            </Link>
            <span className="text-[10px] md:text-[11px] text-muted-foreground whitespace-nowrap">
              The Practice of Human-AI Collaboration
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 flex-nowrap">
          <Link
            href="/about"
            className="text-sm hover:text-orange transition-colors whitespace-nowrap px-2 py-2"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-sm hover:text-orange transition-colors whitespace-nowrap px-2 py-2"
          >
            Projects
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsContentOpen(!isContentOpen)}
              className="flex items-center gap-1 text-sm hover:text-orange transition-colors whitespace-nowrap px-2 py-2"
              onBlur={() => setTimeout(() => setIsContentOpen(false), 150)}
            >
              Content
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isContentOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isContentOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-black border border-border rounded-lg shadow-lg py-2 min-w-[120px] z-10">
                {contentLinks}
              </div>
            )}
          </div>
          <Link
            href="/resources"
            className="text-sm hover:text-orange transition-colors whitespace-nowrap px-2 py-2"
          >
            Resources
          </Link>
          <Link
            href="/connect"
            className="text-sm hover:text-orange transition-colors whitespace-nowrap px-2 py-2"
          >
            Connect
          </Link>
          <ThemeToggle className="ml-2" />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <ThemeToggle className="mr-2" />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="flex flex-col px-2 py-4">
            <Link
              href="/about"
              className="block px-4 py-2 text-sm hover:text-orange transition-colors"
              onClick={handleLinkClick}
            >
              About
            </Link>
            <Link
              href="/projects"
              className="block px-4 py-2 text-sm hover:text-orange transition-colors"
              onClick={handleLinkClick}
            >
              Projects
            </Link>
            <div className="px-4 py-2 text-sm font-semibold">Content</div>
            <div className="pl-4">{contentLinks}</div>
            <Link
              href="/resources"
              className="block px-4 py-2 text-sm hover:text-orange transition-colors"
              onClick={handleLinkClick}
            >
              Resources
            </Link>
            <Link
              href="/connect"
              className="block px-4 py-2 text-sm hover:text-orange transition-colors"
              onClick={handleLinkClick}
            >
              Connect
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
