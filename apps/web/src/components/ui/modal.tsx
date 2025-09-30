/**
 * Accessible Modal Component with Focus Management
 */

"use client";

import { announceToScreenReader, useEscapeKey, useFocusTrap } from "@/lib/keyboard-navigation";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within a Modal");
  }
  return context;
}

interface ModalProps {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Modal({ children, defaultOpen = false, open, onOpenChange }: ModalProps) {
  const [isOpenState, setIsOpenState] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : isOpenState;

  const setIsOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setIsOpenState(newOpen);
    }
    onOpenChange?.(newOpen);

    // Announce to screen readers
    announceToScreenReader(newOpen ? "Dialog opened" : "Dialog closed", "assertive");
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  return <ModalContext.Provider value={{ isOpen, setIsOpen }}>{children}</ModalContext.Provider>;
}

interface ModalTriggerProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

export function ModalTrigger({ children, className, asChild = false }: ModalTriggerProps) {
  const { setIsOpen } = useModal();

  const handleClick = () => {
    setIsOpen(true);
  };

  if (asChild) {
    // Clone the child and add click handler
    return (
      <button type="button" onClick={handleClick} className={className}>
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-ring transition-colors",
        className,
      )}
    >
      {children}
    </button>
  );
}

interface ModalContentProps {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function ModalContent({
  children,
  className,
  showCloseButton = true,
  closeOnOverlayClick = true,
  size = "md",
}: ModalContentProps) {
  const { isOpen, setIsOpen } = useModal();

  // Focus trap
  const focusTrapRef = useFocusTrap(isOpen);

  // Handle escape key
  useEscapeKey(() => setIsOpen(false), isOpen);

  // Handle overlay click
  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      setIsOpen(false);
    }
  };

  const handleOverlayKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!closeOnOverlayClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  // Size classes
  const sizeClasses: Record<NonNullable<ModalContentProps["size"]>, string> = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw] max-h-[95vh]",
  };

  if (!isOpen) {
    return null;
  }

  const modalContent = (
    <div className="fixed inset-0 z-modal-backdrop bg-black/50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Dismiss dialog"
        onClick={handleOverlayClick}
        onKeyDown={handleOverlayKeyDown}
      />
      <div
        ref={focusTrapRef as React.RefObject<HTMLDivElement>}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          "relative z-modal w-full rounded-lg border border-border bg-background p-6 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200",
          sizeClasses[size],
          className,
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {children}
      </div>
    </div>
  );

  // Render in portal to avoid z-index issues
  if (typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return null;
}

interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
}

export function ModalHeader({ children, className }: ModalHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}>
      {children}
    </div>
  );
}

interface ModalTitleProps {
  children: ReactNode;
  className?: string;
}

import { useId } from "react";

export function ModalTitle({ children, className }: ModalTitleProps) {
  const id = useId();
  return (
    <h2 id={id} className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
      {children}
    </h2>
  );
}

interface ModalDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function ModalDescription({ children, className }: ModalDescriptionProps) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export function ModalBody({ children, className }: ModalBodyProps) {
  return <div className={cn("py-4", className)}>{children}</div>;
}

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}>
      {children}
    </div>
  );
}

interface ModalCloseProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

export function ModalClose({ children, className, asChild = false }: ModalCloseProps) {
  const { setIsOpen } = useModal();

  const handleClick = () => {
    setIsOpen(false);
  };

  if (asChild) {
    return (
      <button type="button" onClick={handleClick} className={className}>
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted/50 focus-ring transition-colors",
        className,
      )}
    >
      {children}
    </button>
  );
}
