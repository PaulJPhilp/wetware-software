/**
 * Keyboard Navigation Demo Component
 * Demonstrates enhanced keyboard navigation features
 */

"use client";

import { SearchModal } from "@/components/SearchModal";
import { Button } from "@/components/ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { generateAccessibilityReport, runAccessibilityTests } from "@/lib/accessibility-testing";
import { ChevronDown, Download, Edit, Search, Settings, Share, Trash } from "lucide-react";
import { useRef, useState } from "react";

export function KeyboardNavigationDemo() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [testResults, setTestResults] = useState<string>("");
  const demoRef = useRef<HTMLDivElement>(null);

  const runTests = () => {
    if (demoRef.current) {
      const testSuite = runAccessibilityTests(demoRef.current);
      const report = generateAccessibilityReport([testSuite]);
      setTestResults(report);
      console.log("Accessibility Test Results:", report);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-8" ref={demoRef}>
      <div className="space-y-4 text-center">
        <h1 className="font-bold text-3xl text-foreground">Keyboard Navigation Demo</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          This demo showcases the enhanced keyboard navigation features. Try navigating using only
          your keyboard: Tab, Arrow keys, Enter, Space, and Escape.
        </p>
      </div>

      {/* Keyboard Instructions */}
      <div className="rounded-lg bg-muted/20 p-6">
        <h2 className="mb-4 font-semibold text-xl">Keyboard Shortcuts</h2>
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-medium">General Navigation</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <kbd className="rounded bg-muted px-1">Tab</kbd> - Move to next element
              </li>
              <li>
                <kbd className="rounded bg-muted px-1">Shift + Tab</kbd> - Move to previous element
              </li>
              <li>
                <kbd className="rounded bg-muted px-1">Enter</kbd> /{" "}
                <kbd className="rounded bg-muted px-1">Space</kbd> - Activate button
              </li>
              <li>
                <kbd className="rounded bg-muted px-1">Escape</kbd> - Close modal/dropdown
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-medium">Menu Navigation</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <kbd className="rounded bg-muted px-1">↑</kbd> /{" "}
                <kbd className="rounded bg-muted px-1">↓</kbd> - Navigate menu items
              </li>
              <li>
                <kbd className="rounded bg-muted px-1">Enter</kbd> - Select menu item
              </li>
              <li>
                <kbd className="rounded bg-muted px-1">Home</kbd> - First item
              </li>
              <li>
                <kbd className="rounded bg-muted px-1">End</kbd> - Last item
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Demo Components */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Dropdown Demo */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Enhanced Dropdown</h3>
          <p className="text-muted-foreground text-sm">
            Full keyboard navigation with arrow keys, proper ARIA attributes, and focus management.
          </p>

          <Dropdown>
            <DropdownTrigger className="w-full justify-between">
              Actions <ChevronDown className="h-4 w-4" />
            </DropdownTrigger>
            <DropdownContent align="start">
              <DropdownItem onClick={() => console.log("Edit clicked")}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => console.log("Share clicked")}>
                <Share className="mr-2 h-4 w-4" />
                Share
              </DropdownItem>
              <DropdownItem onClick={() => console.log("Download clicked")}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem onClick={() => console.log("Settings clicked")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownItem>
              <DropdownItem onClick={() => console.log("Delete clicked")}>
                <Trash className="mr-2 h-4 w-4 text-destructive" />
                <span className="text-destructive">Delete</span>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>

        {/* Modal Demo */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Enhanced Modal</h3>
          <p className="text-muted-foreground text-sm">
            Focus trapping, escape key handling, and proper ARIA attributes for screen readers.
          </p>

          <Modal>
            <ModalTrigger className="w-full">Open Modal</ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Demo Modal</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <p className="mb-4 text-muted-foreground">
                  This modal demonstrates proper focus management. Notice how:
                </p>
                <ul className="mb-4 space-y-2 text-muted-foreground text-sm">
                  <li>• Focus is trapped within the modal</li>
                  <li>• Tab cycles through focusable elements</li>
                  <li>• Escape key closes the modal</li>
                  <li>• Focus returns to the trigger button when closed</li>
                </ul>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Sample Button 1
                  </Button>
                  <Button size="sm" variant="outline">
                    Sample Button 2
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <ModalClose>Cancel</ModalClose>
                <Button onClick={() => console.log("Confirmed")}>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>

        {/* Search Modal Demo */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Search Modal</h3>
          <p className="text-muted-foreground text-sm">
            Complex modal with search functionality, arrow key navigation through results.
          </p>

          <Button className="w-full" onClick={() => setIsSearchOpen(true)} variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Open Search
          </Button>

          <SearchModal isOpen={isSearchOpen} onCloseAction={() => setIsSearchOpen(false)} />
        </div>
      </div>

      {/* Accessibility Testing */}
      <div className="rounded-lg bg-muted/20 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-xl">Accessibility Testing</h2>
          <Button onClick={runTests} size="sm" variant="outline">
            Run Tests
          </Button>
        </div>

        <p className="mb-4 text-muted-foreground text-sm">
          Click "Run Tests" to validate the accessibility of the components above. Results will be
          logged to the console and displayed below.
        </p>

        {testResults && (
          <div className="max-h-64 overflow-y-auto rounded border bg-background p-4">
            <pre className="whitespace-pre-wrap text-xs">{testResults}</pre>
          </div>
        )}
      </div>

      {/* Implementation Notes */}
      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-950/20">
        <h2 className="mb-4 font-semibold text-blue-900 text-xl dark:text-blue-100">
          Implementation Highlights
        </h2>
        <div className="grid gap-6 text-sm md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-medium text-blue-800 dark:text-blue-200">
              Enhanced Components
            </h3>
            <ul className="space-y-1 text-blue-700 dark:text-blue-300">
              <li>✅ Focus trap for modals</li>
              <li>✅ Arrow navigation for menus</li>
              <li>✅ Escape key handling</li>
              <li>✅ Proper ARIA attributes</li>
              <li>✅ Screen reader announcements</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-medium text-blue-800 dark:text-blue-200">
              WCAG 2.1 Compliance
            </h3>
            <ul className="space-y-1 text-blue-700 dark:text-blue-300">
              <li>✅ Level AA keyboard support</li>
              <li>✅ Focus indicators visible</li>
              <li>✅ Logical tab order</li>
              <li>✅ No keyboard traps</li>
              <li>✅ Screen reader compatible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
