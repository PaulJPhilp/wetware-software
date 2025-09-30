/**
 * Keyboard Navigation Utilities
 * Provides reusable functions for implementing accessible keyboard navigation
 */

import { useCallback, useEffect, useRef } from "react";

/**
 * Key codes for common navigation keys
 */
export const KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  ESCAPE: "Escape",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  HOME: "Home",
  END: "End",
  TAB: "Tab",
} as const;

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "a[href]",
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(", ");

  return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
}

/**
 * Trap focus within a container (for modals, dropdowns, etc.)
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Store the currently focused element
    lastFocusedElement.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    const focusableElements = getFocusableElements(container);

    if (focusableElements.length === 0) return;

    // Focus the first focusable element
    const firstElement = focusableElements[0];
    if (firstElement) {
      firstElement.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== KEYS.TAB) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab: focus previous element
        if (document.activeElement === firstElement && lastElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: focus next element
        if (document.activeElement === lastElement && firstElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // Restore focus to the previously focused element
      if (lastFocusedElement.current) {
        lastFocusedElement.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
}

/**
 * Handle arrow key navigation for lists/menus
 */
export function useArrowNavigation<T extends HTMLElement>(
  items: T[],
  isActive: boolean,
  options: {
    loop?: boolean;
    orientation?: "vertical" | "horizontal" | "both";
    onSelect?: (index: number) => void;
  } = {},
) {
  const { loop = true, orientation = "vertical", onSelect } = options;
  const currentIndex = useRef(-1);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive || items.length === 0) return;

      const isVertical = orientation === "vertical" || orientation === "both";
      const isHorizontal = orientation === "horizontal" || orientation === "both";

      let newIndex = currentIndex.current;

      switch (event.key) {
        case KEYS.ARROW_DOWN:
          if (isVertical) {
            event.preventDefault();
            newIndex = loop
              ? (currentIndex.current + 1) % items.length
              : Math.min(currentIndex.current + 1, items.length - 1);
          }
          break;

        case KEYS.ARROW_UP:
          if (isVertical) {
            event.preventDefault();
            newIndex = loop
              ? currentIndex.current <= 0
                ? items.length - 1
                : currentIndex.current - 1
              : Math.max(currentIndex.current - 1, 0);
          }
          break;

        case KEYS.ARROW_RIGHT:
          if (isHorizontal) {
            event.preventDefault();
            newIndex = loop
              ? (currentIndex.current + 1) % items.length
              : Math.min(currentIndex.current + 1, items.length - 1);
          }
          break;

        case KEYS.ARROW_LEFT:
          if (isHorizontal) {
            event.preventDefault();
            newIndex = loop
              ? currentIndex.current <= 0
                ? items.length - 1
                : currentIndex.current - 1
              : Math.max(currentIndex.current - 1, 0);
          }
          break;

        case KEYS.HOME:
          event.preventDefault();
          newIndex = 0;
          break;

        case KEYS.END:
          event.preventDefault();
          newIndex = items.length - 1;
          break;

        case KEYS.ENTER:
        case KEYS.SPACE:
          if (currentIndex.current >= 0 && onSelect) {
            event.preventDefault();
            onSelect(currentIndex.current);
          }
          break;

        default:
          return;
      }

      if (newIndex !== currentIndex.current && newIndex >= 0 && newIndex < items.length) {
        const targetItem = items[newIndex];
        if (targetItem) {
          currentIndex.current = newIndex;
          targetItem.focus();
        }
      }
    },
    [items, isActive, loop, orientation, onSelect],
  );

  useEffect(() => {
    if (isActive) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyDown, isActive]);

  return {
    setCurrentIndex: (index: number) => {
      currentIndex.current = index;
    },
    getCurrentIndex: () => currentIndex.current,
  };
}

/**
 * Handle escape key to close overlays
 */
export function useEscapeKey(callback: () => void, isActive: boolean = true) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KEYS.ESCAPE) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [callback, isActive]);
}

/**
 * Handle click outside to close overlays
 */
export function useClickOutside<T extends HTMLElement>(
  callback: () => void,
  isActive: boolean = true,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [callback, isActive]);

  return ref;
}

/**
 * Manage roving tabindex for complex widgets
 */
export function useRovingTabIndex<T extends HTMLElement>(items: T[], activeIndex: number) {
  useEffect(() => {
    items.forEach((item, index) => {
      if (index === activeIndex) {
        item.setAttribute("tabindex", "0");
        item.setAttribute("aria-selected", "true");
      } else {
        item.setAttribute("tabindex", "-1");
        item.setAttribute("aria-selected", "false");
      }
    });
  }, [items, activeIndex]);
}

/**
 * Announce changes to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: "polite" | "assertive" = "polite",
) {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Keyboard event handler factory for common interactions
 */
export function createKeyboardHandler(handlers: Record<string, (event: KeyboardEvent) => void>) {
  return (event: KeyboardEvent) => {
    const handler = handlers[event.key];
    if (handler) {
      handler(event);
    }
  };
}

/**
 * Check if an element is currently focused
 */
export function isFocused(element: HTMLElement | null): boolean {
  return element === document.activeElement;
}

/**
 * Focus an element and scroll it into view if needed
 */
export function focusElement(
  element: HTMLElement,
  options?: {
    preventScroll?: boolean;
    scrollIntoView?: boolean;
  },
) {
  const { preventScroll = false, scrollIntoView = true } = options || {};

  element.focus({ preventScroll });

  if (scrollIntoView && !preventScroll) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
