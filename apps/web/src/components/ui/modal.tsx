/**
 * Accessible Modal Component with Focus Management
 */

"use client";

import { announceToScreenReader, useEscapeKey, useFocusTrap } from "@/lib/keyboard-navigation";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalContextValue = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within a Modal");
  }
  return context;
}

type ModalProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChangeAction?: (open: boolean) => void;
};

export function Modal({ children, defaultOpen = false, open, onOpenChangeAction }: ModalProps) {
  const [isOpenState, setIsOpenState] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : isOpenState;

  const setIsOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setIsOpenState(newOpen);
    }
    onOpenChangeAction?.(newOpen);

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

type ModalTriggerProps = {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
};

export function ModalTrigger({ children, className, asChild = false }: ModalTriggerProps) {
  const { setIsOpen } = useModal();

  const handleClick = () => {
    setIsOpen(true);
  };

  if (asChild) {
    // Clone the child and add click handler
    return (
      <button className={className} onClick={handleClick} type="button">
        {children}
      </button>
    );
  }

  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90",
        className
      )}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
}

type ModalContentProps = {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  alignment?: "center" | "top";
  insetClass?: string;
};

export function ModalContent({
  children,
  className,
  showCloseButton = true,
  closeOnOverlayClick = true,
  size = "md",
  alignment = "center",
  insetClass = "inset-0",
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
    if (!closeOnOverlayClick) {
      return;
    }
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

  const containerClasses =
    alignment === "top"
      ? "items-start justify-center pt-6 pb-6"
      : "items-center justify-center p-4";

  const modalContent = (
    <div className={cn("fixed z-modal-backdrop flex bg-black/40 backdrop-blur-sm", insetClass, containerClasses)}>
      <button
        aria-label="Dismiss dialog"
        className="absolute inset-0"
        onClick={handleOverlayClick}
        onKeyDown={handleOverlayKeyDown}
        type="button"
      />
      <div
        aria-labelledby="modal-title"
        aria-modal="true"
        className={cn(
          "fade-in-0 zoom-in-95 relative z-modal w-full animate-in rounded-lg border border-border bg-background p-6 shadow-lg duration-200",
          sizeClasses[size],
          className
        )}
        ref={focusTrapRef as React.RefObject<HTMLDivElement>}
        role="dialog"
      >
        {showCloseButton && (
          <button
            aria-label="Close dialog"
            className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => setIsOpen(false)}
            type="button"
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

type ModalHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function ModalHeader({ children, className }: ModalHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}>
      {children}
    </div>
  );
}

type ModalTitleProps = {
  children: ReactNode;
  className?: string;
};

import { useId } from "react";

export function ModalTitle({ children, className }: ModalTitleProps) {
  const id = useId();
  return (
    <h2 className={cn("font-semibold text-lg leading-none tracking-tight", className)} id={id}>
      {children}
    </h2>
  );
}

type ModalDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export function ModalDescription({ children, className }: ModalDescriptionProps) {
  return <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>;
}

type ModalBodyProps = {
  children: ReactNode;
  className?: string;
};

export function ModalBody({ children, className }: ModalBodyProps) {
  return <div className={cn("py-4", className)}>{children}</div>;
}

type ModalFooterProps = {
  children: ReactNode;
  className?: string;
};

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}>
      {children}
    </div>
  );
}

type ModalCloseProps = {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
};

export function ModalClose({ children, className, asChild = false }: ModalCloseProps) {
  const { setIsOpen } = useModal();

  const handleClick = () => {
    setIsOpen(false);
  };

  if (asChild) {
    return (
      <button className={className} onClick={handleClick} type="button">
        {children}
      </button>
    );
  }

  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-muted/50",
        className
      )}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
}
