"use client";

import { EmailContactDialog } from "@/components/EmailContactDialog";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
    KEYS,
    announceToScreenReader,
    getFocusableElements,
    useArrowNavigation,
    useClickOutside,
    useEscapeKey,
} from "@/lib/keyboard-navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useHeaderHeight } from "./header-context";

// Use theme-agnostic tokens so SSR and client class lists match
const HEADER_CLASS =
  "fixed inset-x-0 top-0 w-full text-foreground border-b border-border bg-brand z-header";
const NAV_CLASS = "w-full px-2 md:px-3 py-0.5 flex items-center justify-between font-sans";
const NAV_LINK_CLASS =
  "text-xs text-foreground hover:text-orange transition-colors px-1 py-0.5 hover:underline cursor-pointer leading-none h-6 flex items-center";
// Tighten leading to reduce chances of class divergence during hydration
const TITLE_CLASS =
  "font-bold text-sm md:text-base hover:text-orange transition-colors leading-tight";
const SUBTITLE_CLASS = "text-xs md:text-sm text-muted-foreground whitespace-nowrap leading-none";

export function Header() {
  const [isContentOpen, setIsContentOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  // Deterministic IDs so SSR and client match
  const triggerId = "content-trigger";
  const menuId = "content-menu";
  const { setHeaderHeight: setContextHeaderHeight } = useHeaderHeight();

  // Enhanced dropdown state management
  const setContentOpen = (open: boolean) => {
    setIsContentOpen(open);
    announceToScreenReader(open ? "Content menu opened" : "Content menu closed", "polite");
  };

  useEffect(() => {
    const el = headerRef.current;
    if (!el) {
      return;
    }
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

  // Keyboard navigation for dropdown
  const [dropdownItems, setDropdownItems] = useState<HTMLElement[]>([]);

  // Get focusable items when dropdown opens
  useEffect(() => {
    if (isContentOpen && dropdownRef.current) {
      const items = getFocusableElements(dropdownRef.current);
      setDropdownItems(items);
    }
  }, [isContentOpen]);

  // Arrow navigation for dropdown items
  const { setCurrentIndex } = useArrowNavigation(dropdownItems, isContentOpen, {
    loop: true,
    orientation: "vertical",
    onSelect: (index) => {
      const item = dropdownItems[index];
      if (item) {
        item.click();
      }
    },
  });

  // Handle escape key and click outside
  useEscapeKey(() => setContentOpen(false), isContentOpen);
  const clickOutsideRef = useClickOutside<HTMLDivElement>(
    () => setContentOpen(false),
    isContentOpen
  );

  // Keyboard handler for trigger button
  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case KEYS.ENTER:
      case KEYS.SPACE:
        event.preventDefault();
        setContentOpen(!isContentOpen);
        break;
      case KEYS.ARROW_DOWN:
        event.preventDefault();
        setContentOpen(true);
        // Focus first item after state update
        setTimeout(() => {
          if (dropdownItems.length > 0) {
            const firstItem = dropdownItems[0];
            if (firstItem) {
              firstItem.focus();
              setCurrentIndex(0);
            }
          }
        }, 0);
        break;
      case KEYS.ESCAPE:
        if (isContentOpen) {
          event.preventDefault();
          setContentOpen(false);
        }
        break;
      default:
        break;
    }
  };

  // Focus first dropdown item when opened
  useEffect(() => {
    if (isContentOpen && dropdownItems.length > 0) {
      const firstItem = dropdownItems[0];
      if (firstItem) {
        setTimeout(() => {
          firstItem.focus();
          setCurrentIndex(0);
        }, 0);
      }
    }
  }, [isContentOpen, dropdownItems, setCurrentIndex]);

  // Compute a simple checksum of static DOM-relevant strings (debug only)
  useEffect(() => {
    const checksum = btoa(
      [HEADER_CLASS, NAV_CLASS, NAV_LINK_CLASS, TITLE_CLASS, SUBTITLE_CLASS].join("|")
    );
    // eslint-disable-next-line no-console
    console.log("[Header checksum]", checksum);
  }, []);

  return (
    <header className={HEADER_CLASS} ref={headerRef} suppressHydrationWarning>
      <nav className={NAV_CLASS}>
        <div className="flex items-center gap-1">
          <Image
            alt="Paul J Philp Avatar"
            className="h-6 w-6 rounded-full border border-gray-200 shadow dark:border-gray-700"
            height={24}
            priority
            src="/images/avatar.jpeg"
            width={24}
          />
          <div className="flex flex-col leading-tight">
            <Link className={TITLE_CLASS} href="/">
              Wetware & Software
            </Link>
            <span className={SUBTITLE_CLASS}>The Practice of Human-AI Collaboration</span>
          </div>
        </div>
        <div className="ml-2 flex items-center gap-2">
          <Link className={NAV_LINK_CLASS} href="/about">
            About
          </Link>
          <Link className={NAV_LINK_CLASS} href="/services">
            Services
          </Link>
          <Link className={NAV_LINK_CLASS} href="/projects">
            Projects
          </Link>
          <div className="relative">
            <button
              aria-controls={menuId}
              aria-expanded={isContentOpen}
              aria-haspopup="true"
              className={`${NAV_LINK_CLASS} inline border-0 bg-transparent p-0`}
              id={triggerId}
              onClick={() => setContentOpen(!isContentOpen)}
              onKeyDown={handleTriggerKeyDown}
              ref={triggerRef}
              type="button"
            >
              Content
            </button>
            {isContentOpen && (
              <div
                aria-labelledby={triggerId}
                className="-translate-x-1/2 fade-in-0 zoom-in-95 absolute top-full left-1/2 z-dropdown mt-4 min-w-[100px] transform animate-in rounded-lg border border-border bg-popover py-0.5 shadow-lg backdrop-blur-md duration-200"
                id={menuId}
                ref={(node) => {
                  dropdownRef.current = node;
                  if (clickOutsideRef) {
                    clickOutsideRef.current = node;
                  }
                }}
                role="menu"
              >
                <Link
                  className="block px-1.5 py-1 text-popover-foreground text-xs transition-colors hover:bg-orange/10 hover:text-orange focus:bg-orange/10 focus:text-orange focus:outline-none"
                  href="/blog/essays"
                  onClick={() => setContentOpen(false)}
                  role="menuitem"
                  tabIndex={-1}
                >
                  Essays
                </Link>
                <Link
                  className="block px-1.5 py-1 text-popover-foreground text-xs transition-colors hover:bg-orange/10 hover:text-orange focus:bg-orange/10 focus:text-orange focus:outline-none"
                  href="/blog/articles"
                  onClick={() => setContentOpen(false)}
                  role="menuitem"
                  tabIndex={-1}
                >
                  Articles
                </Link>
              </div>
            )}
          </div>
          <Link className={NAV_LINK_CLASS} href="/blog/resources">
            Resources
          </Link>
          <EmailContactDialog
            renderTriggerAction={({ open }) => (
              <button
                className={`${NAV_LINK_CLASS} inline border-0 bg-transparent p-0`}
                onClick={open}
                type="button"
              >
                Connect
              </button>
            )}
            triggerLabel="Connect"
          />
          <ThemeToggle className="ml-2" />
        </div>
      </nav>
    </header>
  );
}
