/**
 * Accessibility Testing Utilities
 * Helper functions for testing keyboard navigation and screen reader compatibility
 */

import { getFocusableElements } from "./keyboard-navigation";

/**
 * Test results interface
 */
export type AccessibilityTestResult = {
  passed: boolean;
  message: string;
  element?: HTMLElement;
  severity: "error" | "warning" | "info";
};

/**
 * Test suite results
 */
export type AccessibilityTestSuite = {
  name: string;
  results: AccessibilityTestResult[];
  passed: boolean;
  score: number; // 0-100
};

/**
 * Test if element has proper focus indicators
 */
export function testFocusIndicators(element: HTMLElement): AccessibilityTestResult[] {
  const results: AccessibilityTestResult[] = [];

  // Check if element is focusable
  const focusable = element.matches(
    'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
  );

  if (focusable) {
    const styles = window.getComputedStyle(element, ":focus");
    const hasFocusRing =
      styles.outline !== "none" ||
      styles.boxShadow !== "none" ||
      element.classList.contains("focus-ring");

    results.push({
      passed: hasFocusRing,
      message: hasFocusRing
        ? "Element has proper focus indicators"
        : "Element lacks visible focus indicators",
      element,
      severity: hasFocusRing ? "info" : "error",
    });
  }

  return results;
}

/**
 * Test keyboard navigation in a container
 */
export function testKeyboardNavigation(container: HTMLElement): AccessibilityTestResult[] {
  const results: AccessibilityTestResult[] = [];
  const focusableElements = getFocusableElements(container);

  // Test if there are focusable elements
  results.push({
    passed: focusableElements.length > 0,
    message: `Found ${focusableElements.length} focusable elements`,
    element: container,
    severity: focusableElements.length > 0 ? "info" : "warning",
  });

  // Test tab order
  let tabIndexIssues = 0;
  focusableElements.forEach((element, _index) => {
    const tabIndex = element.getAttribute("tabindex");
    const expectedTabIndex = element.matches('[tabindex="-1"]') ? "-1" : "0";

    if (tabIndex && tabIndex !== expectedTabIndex && tabIndex !== "0") {
      tabIndexIssues++;
    }
  });

  results.push({
    passed: tabIndexIssues === 0,
    message:
      tabIndexIssues === 0
        ? "Tab order is properly configured"
        : `${tabIndexIssues} elements have problematic tab indices`,
    element: container,
    severity: tabIndexIssues === 0 ? "info" : "warning",
  });

  return results;
}

/**
 * Test ARIA attributes
 */
export function testAriaAttributes(element: HTMLElement): AccessibilityTestResult[] {
  const results: AccessibilityTestResult[] = [];

  // Test for required ARIA labels
  const needsLabel = element.matches("button, input, select, textarea");
  if (needsLabel) {
    const hasLabel =
      element.getAttribute("aria-label") ||
      element.getAttribute("aria-labelledby") ||
      element.querySelector(`label[for="${element.id}"]`) ||
      element.textContent?.trim();

    results.push({
      passed: !!hasLabel,
      message: hasLabel ? "Element has proper labeling" : "Element lacks accessible label",
      element,
      severity: hasLabel ? "info" : "error",
    });
  }

  // Test ARIA expanded for buttons with dropdowns
  if (element.matches("button[aria-haspopup]")) {
    const hasExpanded = element.hasAttribute("aria-expanded");

    results.push({
      passed: hasExpanded,
      message: hasExpanded
        ? "Dropdown button has aria-expanded"
        : "Dropdown button missing aria-expanded",
      element,
      severity: hasExpanded ? "info" : "error",
    });
  }

  // Test role consistency
  const role = element.getAttribute("role");
  if (role) {
    const validRoles = [
      "button",
      "link",
      "menuitem",
      "tab",
      "tabpanel",
      "dialog",
      "menu",
      "listbox",
      "option",
      "combobox",
      "textbox",
      "search",
      "navigation",
    ];

    results.push({
      passed: validRoles.includes(role),
      message: validRoles.includes(role)
        ? `Valid role: ${role}`
        : `Invalid or unnecessary role: ${role}`,
      element,
      severity: validRoles.includes(role) ? "info" : "warning",
    });
  }

  return results;
}

/**
 * Test modal/dialog accessibility
 */
export function testModalAccessibility(modal: HTMLElement): AccessibilityTestResult[] {
  const results: AccessibilityTestResult[] = [];

  // Test modal attributes
  const hasRole = modal.getAttribute("role") === "dialog";
  const hasModal = modal.getAttribute("aria-modal") === "true";
  const hasLabelledBy = modal.hasAttribute("aria-labelledby");

  results.push({
    passed: hasRole,
    message: hasRole ? "Modal has dialog role" : "Modal missing dialog role",
    element: modal,
    severity: hasRole ? "info" : "error",
  });

  results.push({
    passed: hasModal,
    message: hasModal ? "Modal has aria-modal=true" : "Modal missing aria-modal",
    element: modal,
    severity: hasModal ? "info" : "error",
  });

  results.push({
    passed: hasLabelledBy,
    message: hasLabelledBy ? "Modal has aria-labelledby" : "Modal missing aria-labelledby",
    element: modal,
    severity: hasLabelledBy ? "info" : "warning",
  });

  // Test focus trap
  const focusableElements = getFocusableElements(modal);
  results.push({
    passed: focusableElements.length > 0,
    message: `Modal contains ${focusableElements.length} focusable elements`,
    element: modal,
    severity: focusableElements.length > 0 ? "info" : "warning",
  });

  return results;
}

/**
 * Test dropdown/menu accessibility
 */
export function testDropdownAccessibility(
  trigger: HTMLElement,
  dropdown: HTMLElement
): AccessibilityTestResult[] {
  const results: AccessibilityTestResult[] = [];

  // Test trigger attributes
  const hasHaspopup = trigger.hasAttribute("aria-haspopup");
  const hasExpanded = trigger.hasAttribute("aria-expanded");
  const hasControls = trigger.hasAttribute("aria-controls");

  results.push({
    passed: hasHaspopup,
    message: hasHaspopup ? "Trigger has aria-haspopup" : "Trigger missing aria-haspopup",
    element: trigger,
    severity: hasHaspopup ? "info" : "error",
  });

  results.push({
    passed: hasExpanded,
    message: hasExpanded ? "Trigger has aria-expanded" : "Trigger missing aria-expanded",
    element: trigger,
    severity: hasExpanded ? "info" : "error",
  });

  results.push({
    passed: hasControls,
    message: hasControls ? "Trigger has aria-controls" : "Trigger missing aria-controls",
    element: trigger,
    severity: hasControls ? "info" : "warning",
  });

  // Test dropdown attributes
  const hasRole = dropdown.getAttribute("role") === "menu";
  const hasLabelledBy = dropdown.hasAttribute("aria-labelledby");

  results.push({
    passed: hasRole,
    message: hasRole ? "Dropdown has menu role" : "Dropdown missing menu role",
    element: dropdown,
    severity: hasRole ? "info" : "error",
  });

  results.push({
    passed: hasLabelledBy,
    message: hasLabelledBy ? "Dropdown has aria-labelledby" : "Dropdown missing aria-labelledby",
    element: dropdown,
    severity: hasLabelledBy ? "info" : "warning",
  });

  // Test menu items
  const menuItems = dropdown.querySelectorAll('[role="menuitem"]');
  results.push({
    passed: menuItems.length > 0,
    message: `Found ${menuItems.length} menu items`,
    element: dropdown,
    severity: menuItems.length > 0 ? "info" : "warning",
  });

  return results;
}

/**
 * Run comprehensive accessibility tests on a component
 */
export function runAccessibilityTests(
  element: HTMLElement,
  options: {
    testFocus?: boolean;
    testKeyboard?: boolean;
    testAria?: boolean;
    testModals?: boolean;
    testDropdowns?: boolean;
  } = {}
): AccessibilityTestSuite {
  const {
    testFocus = true,
    testKeyboard = true,
    testAria = true,
    testModals = true,
    testDropdowns = true,
  } = options;

  const results: AccessibilityTestResult[] = [];

  if (testFocus) {
    results.push(...testFocusIndicators(element));
  }

  if (testKeyboard) {
    results.push(...testKeyboardNavigation(element));
  }

  if (testAria) {
    results.push(...testAriaAttributes(element));
  }

  if (testModals && element.matches('[role="dialog"]')) {
    results.push(...testModalAccessibility(element));
  }

  if (testDropdowns) {
    const triggers = element.querySelectorAll("[aria-haspopup]");
    triggers.forEach((trigger) => {
      const controlsId = trigger.getAttribute("aria-controls");
      if (controlsId) {
        const dropdown = document.getElementById(controlsId);
        if (dropdown) {
          results.push(...testDropdownAccessibility(trigger as HTMLElement, dropdown));
        }
      }
    });
  }

  // Calculate score
  const totalTests = results.length;
  const passedTests = results.filter((r) => r.passed).length;
  const score = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 100;

  return {
    name: element.tagName.toLowerCase() + (element.id ? `#${element.id}` : ""),
    results,
    passed: results.every((r) => r.severity !== "error" || r.passed),
    score,
  };
}

/**
 * Generate accessibility report
 */
export function generateAccessibilityReport(testSuites: AccessibilityTestSuite[]): string {
  let report = "# Accessibility Test Report\n\n";

  const overallScore = testSuites.reduce((sum, suite) => sum + suite.score, 0) / testSuites.length;
  report += `**Overall Score: ${Math.round(overallScore)}/100**\n\n`;

  testSuites.forEach((suite) => {
    report += `## ${suite.name} (${suite.score}/100)\n\n`;

    const errors = suite.results.filter((r) => r.severity === "error");
    const warnings = suite.results.filter((r) => r.severity === "warning");
    const info = suite.results.filter((r) => r.severity === "info");

    if (errors.length > 0) {
      report += "### ❌ Errors\n";
      errors.forEach((error) => {
        report += `- ${error.message}\n`;
      });
      report += "\n";
    }

    if (warnings.length > 0) {
      report += "### ⚠️ Warnings\n";
      warnings.forEach((warning) => {
        report += `- ${warning.message}\n`;
      });
      report += "\n";
    }

    if (info.length > 0) {
      report += "### ✅ Passed\n";
      info.forEach((item) => {
        if (item.passed) {
          report += `- ${item.message}\n`;
        }
      });
      report += "\n";
    }
  });

  return report;
}

/**
 * Keyboard testing utilities
 */
export class KeyboardTester {
  private readonly element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  /**
   * Simulate key press
   */
  keyDown(key: string, options: KeyboardEventInit = {}) {
    const event = new KeyboardEvent("keydown", {
      key,
      bubbles: true,
      cancelable: true,
      ...options,
    });

    this.element.dispatchEvent(event);
    return !event.defaultPrevented;
  }

  /**
   * Test tab navigation
   */
  testTabNavigation(): AccessibilityTestResult[] {
    const results: AccessibilityTestResult[] = [];
    const focusableElements = getFocusableElements(this.element);

    focusableElements.forEach((element, index) => {
      element.focus();
      const isFocused = document.activeElement === element;

      results.push({
        passed: isFocused,
        message: isFocused
          ? `Element ${index + 1} can receive focus`
          : `Element ${index + 1} cannot receive focus`,
        element,
        severity: isFocused ? "info" : "error",
      });
    });

    return results;
  }

  /**
   * Test escape key handling
   */
  testEscapeKey(): boolean {
    return this.keyDown("Escape");
  }

  /**
   * Test arrow key navigation
   */
  testArrowKeys(): {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
  } {
    return {
      up: this.keyDown("ArrowUp"),
      down: this.keyDown("ArrowDown"),
      left: this.keyDown("ArrowLeft"),
      right: this.keyDown("ArrowRight"),
    };
  }
}

/**
 * Screen reader testing utilities
 */
export function testScreenReaderCompatibility(element: HTMLElement): AccessibilityTestResult[] {
  const results: AccessibilityTestResult[] = [];

  // Test for screen reader only content
  const srOnlyElements = element.querySelectorAll(".sr-only, .visually-hidden");
  results.push({
    passed: srOnlyElements.length > 0,
    message: `Found ${srOnlyElements.length} screen reader only elements`,
    element,
    severity: "info",
  });

  // Test for proper heading hierarchy
  const headings = element.querySelectorAll("h1, h2, h3, h4, h5, h6");
  let headingIssues = 0;
  let lastLevel = 0;

  headings.forEach((heading) => {
    const level = Number.parseInt(heading.tagName.charAt(1), 10);
    if (level > lastLevel + 1) {
      headingIssues++;
    }
    lastLevel = level;
  });

  results.push({
    passed: headingIssues === 0,
    message:
      headingIssues === 0
        ? "Heading hierarchy is correct"
        : `${headingIssues} heading hierarchy issues found`,
    element,
    severity: headingIssues === 0 ? "info" : "warning",
  });

  return results;
}
