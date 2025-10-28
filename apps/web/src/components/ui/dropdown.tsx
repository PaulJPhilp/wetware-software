/**
 * Accessible Dropdown Component with Keyboard Navigation
 */

"use client";

import {
  KEYS,
  announceToScreenReader,
  getFocusableElements,
  useArrowNavigation,
  useClickOutside,
  useEscapeKey,
} from "@/lib/keyboard-navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a Dropdown");
  }
  return context;
}

interface DropdownProps {
  children: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Dropdown({ children, defaultOpen = false, onOpenChange }: DropdownProps) {
  const [isOpen, setIsOpenState] = useState(defaultOpen);
  const triggerId = `dropdown-trigger-${Math.random().toString(36).substr(2, 9)}`;
  const contentId = `dropdown-content-${Math.random().toString(36).substr(2, 9)}`;

  const setIsOpen = (open: boolean) => {
    setIsOpenState(open);
    onOpenChange?.(open);

    // Announce state change to screen readers
    announceToScreenReader(open ? "Dropdown menu opened" : "Dropdown menu closed", "polite");
  };

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerId, contentId }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownContext.Provider>
  );
}

interface DropdownTriggerProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

export function DropdownTrigger({ children, className, asChild = false }: DropdownTriggerProps) {
  const { isOpen, setIsOpen, triggerId, contentId } = useDropdown();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case KEYS.ENTER:
        case KEYS.SPACE:
          event.preventDefault();
          setIsOpen(!isOpen);
          break;
        case KEYS.ARROW_DOWN:
          event.preventDefault();
          setIsOpen(true);
          // Focus will be handled by DropdownContent
          break;
        case KEYS.ESCAPE:
          if (isOpen) {
            event.preventDefault();
            setIsOpen(false);
          }
          break;
      }
    },
    [isOpen, setIsOpen]
  );

  useEffect(() => {
    const trigger = triggerRef.current;
    if (trigger) {
      trigger.addEventListener("keydown", handleKeyDown);
      return () => trigger.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyDown]);

  if (asChild) {
    // Clone the child element and add our props
    return (
      <button
        aria-controls={contentId}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={className}
        id={triggerId}
        onClick={handleClick}
        ref={triggerRef}
        type="button"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      aria-controls={contentId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2 font-medium text-foreground text-sm transition-colors hover:bg-muted/50",
        className
      )}
      id={triggerId}
      onClick={handleClick}
      ref={triggerRef}
      type="button"
    >
      {children}
      <ChevronDown
        className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
      />
    </button>
  );
}

interface DropdownContentProps {
  children: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

export function DropdownContent({
  children,
  className,
  align = "start",
  side = "bottom",
  sideOffset = 4,
}: DropdownContentProps) {
  const { isOpen, setIsOpen, triggerId, contentId } = useDropdown();
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle escape key and click outside
  useEscapeKey(() => setIsOpen(false), isOpen);
  const clickOutsideRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false), isOpen);

  // Get focusable items for arrow navigation
  const [focusableItems, setFocusableItems] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const items = getFocusableElements(contentRef.current);
      setFocusableItems(items);
    }
  }, [isOpen]);

  // Arrow navigation
  const { setCurrentIndex } = useArrowNavigation(focusableItems, isOpen, {
    loop: true,
    orientation: "vertical",
    onSelect: (index) => {
      // Trigger click on the selected item
      const item = focusableItems[index];
      if (item) {
        item.click();
      }
    },
  });

  // Focus first item when opened
  useEffect(() => {
    if (isOpen && focusableItems.length > 0) {
      const firstItem = focusableItems[0];
      if (firstItem) {
        setTimeout(() => {
          firstItem.focus();
          setCurrentIndex(0);
        }, 0);
      }
    }
  }, [isOpen, focusableItems, setCurrentIndex]);

  // Position classes based on props
  const positionClasses = {
    top: "bottom-full mb-1",
    bottom: "top-full mt-1",
    left: "right-full mr-1",
    right: "left-full ml-1",
  };

  const alignClasses = {
    start: side === "top" || side === "bottom" ? "left-0" : "top-0",
    center:
      side === "top" || side === "bottom"
        ? "left-1/2 -translate-x-1/2"
        : "top-1/2 -translate-y-1/2",
    end: side === "top" || side === "bottom" ? "right-0" : "bottom-0",
  };

  if (!isOpen) return null;

  return (
    <div
      aria-labelledby={triggerId}
      className={cn(
        "fade-in-0 zoom-in-95 absolute z-dropdown min-w-[8rem] animate-in overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg",
        positionClasses[side],
        alignClasses[align],
        className
      )}
      id={contentId}
      ref={(node) => {
        contentRef.current = node;
        if (clickOutsideRef) {
          clickOutsideRef.current = node;
        }
      }}
      role="menu"
      style={{ marginTop: side === "bottom" ? sideOffset : undefined }}
    >
      {children}
    </div>
  );
}

interface DropdownItemProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

export function DropdownItem({
  children,
  className,
  disabled = false,
  onClick,
  href,
}: DropdownItemProps) {
  const { setIsOpen } = useDropdown();

  const handleClick = () => {
    if (disabled) return;

    onClick?.();
    setIsOpen(false);
  };

  const commonProps = {
    role: "menuitem",
    className: cn(
      "relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors",
      disabled
        ? "pointer-events-none opacity-50"
        : "hover:bg-muted focus:bg-muted focus:text-accent-foreground",
      className
    ),
    onClick: handleClick,
    tabIndex: -1, // Managed by roving tabindex
  };

  if (href && !disabled) {
    return (
      <a href={href} {...commonProps}>
        {children}
      </a>
    );
  }

  return <div {...commonProps}>{children}</div>;
}

interface DropdownSeparatorProps {
  className?: string;
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return <div aria-hidden="true" className={cn("my-1 h-px bg-border", className)} />;
}

interface DropdownLabelProps {
  children: ReactNode;
  className?: string;
}

export function DropdownLabel({ children, className }: DropdownLabelProps) {
  return (
    <div
      className={cn("px-2 py-1.5 font-semibold text-muted-foreground text-xs", className)}
      role="presentation"
    >
      {children}
    </div>
  );
}
