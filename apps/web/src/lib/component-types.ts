/**
 * Standardized component prop interfaces and types
 * This file defines common patterns for component props to ensure consistency
 */

import type { ReactNode } from "react";

/**
 * Base props that most components should accept
 */
export interface BaseComponentProps {
  /** Additional CSS classes to apply */
  className?: string;
  /** Child components */
  children?: ReactNode;
  /** Test ID for testing purposes */
  testId?: string;
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * Props for components that can show loading states
 */
export interface LoadingProps {
  /** Whether the component is in a loading state */
  isLoading?: boolean;
  /** Loading text or element to display */
  loadingText?: string;
}

/**
 * Props for components that handle click events
 */
export interface ClickableProps {
  /** Click event handler */
  onClick?: () => void;
  /** Whether the component is clickable */
  clickable?: boolean;
}

/**
 * Props for card-like components
 */
export interface CardComponentProps extends BaseComponentProps {
  /** Whether to show hover effects */
  hoverable?: boolean;
  /** Card variant style */
  variant?: "default" | "outlined" | "elevated" | "flat";
}

/**
 * Props for list item components
 */
export interface ListItemProps extends BaseComponentProps, ClickableProps {
  /** Whether the item is selected */
  selected?: boolean;
  /** Whether the item is active */
  active?: boolean;
}

/**
 * Props for components that display content with metadata
 */
export interface ContentDisplayProps extends BaseComponentProps {
  /** Title of the content */
  title: string;
  /** Description or subtitle */
  description?: string;
  /** Image URL */
  imageUrl?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Whether to show the image */
  showImage?: boolean;
}

/**
 * Props for navigation components
 */
export interface NavigationProps extends BaseComponentProps {
  /** Current active path */
  currentPath?: string;
  /** Navigation items */
  items?: NavigationItem[];
}

export interface NavigationItem {
  /** Display label */
  label: string;
  /** Link href */
  href: string;
  /** Whether the link is external */
  external?: boolean;
  /** Icon component */
  icon?: ReactNode;
}

/**
 * Common size variants for components
 */
export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Common color variants for components
 */
export type ComponentVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

/**
 * Props for components with size variants
 */
export interface SizedProps {
  /** Size variant */
  size?: ComponentSize;
}

/**
 * Props for components with color variants
 */
export interface VariantProps {
  /** Color variant */
  variant?: ComponentVariant;
}

/**
 * Utility type to make certain props required
 */
export type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Utility type for component props that extend HTML element props
 */
export type ComponentPropsWithRef<T extends keyof React.JSX.IntrinsicElements> =
  BaseComponentProps & React.JSX.IntrinsicElements[T];
