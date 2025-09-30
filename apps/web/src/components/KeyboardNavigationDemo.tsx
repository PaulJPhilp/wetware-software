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
    <div ref={demoRef} className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Keyboard Navigation Demo</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          This demo showcases the enhanced keyboard navigation features. Try navigating using only
          your keyboard: Tab, Arrow keys, Enter, Space, and Escape.
        </p>
      </div>

      {/* Keyboard Instructions */}
      <div className="bg-muted/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium mb-2">General Navigation</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <kbd className="bg-muted px-1 rounded">Tab</kbd> - Move to next element
              </li>
              <li>
                <kbd className="bg-muted px-1 rounded">Shift + Tab</kbd> - Move to previous element
              </li>
              <li>
                <kbd className="bg-muted px-1 rounded">Enter</kbd> /{" "}
                <kbd className="bg-muted px-1 rounded">Space</kbd> - Activate button
              </li>
              <li>
                <kbd className="bg-muted px-1 rounded">Escape</kbd> - Close modal/dropdown
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Menu Navigation</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <kbd className="bg-muted px-1 rounded">↑</kbd> /{" "}
                <kbd className="bg-muted px-1 rounded">↓</kbd> - Navigate menu items
              </li>
              <li>
                <kbd className="bg-muted px-1 rounded">Enter</kbd> - Select menu item
              </li>
              <li>
                <kbd className="bg-muted px-1 rounded">Home</kbd> - First item
              </li>
              <li>
                <kbd className="bg-muted px-1 rounded">End</kbd> - Last item
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Demo Components */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dropdown Demo */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Enhanced Dropdown</h3>
          <p className="text-sm text-muted-foreground">
            Full keyboard navigation with arrow keys, proper ARIA attributes, and focus management.
          </p>

          <Dropdown>
            <DropdownTrigger className="w-full justify-between">
              Actions <ChevronDown className="w-4 h-4" />
            </DropdownTrigger>
            <DropdownContent align="start">
              <DropdownItem onClick={() => console.log("Edit clicked")}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => console.log("Share clicked")}>
                <Share className="w-4 h-4 mr-2" />
                Share
              </DropdownItem>
              <DropdownItem onClick={() => console.log("Download clicked")}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem onClick={() => console.log("Settings clicked")}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownItem>
              <DropdownItem onClick={() => console.log("Delete clicked")}>
                <Trash className="w-4 h-4 mr-2 text-destructive" />
                <span className="text-destructive">Delete</span>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>

        {/* Modal Demo */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Enhanced Modal</h3>
          <p className="text-sm text-muted-foreground">
            Focus trapping, escape key handling, and proper ARIA attributes for screen readers.
          </p>

          <Modal>
            <ModalTrigger className="w-full">Open Modal</ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Demo Modal</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <p className="text-muted-foreground mb-4">
                  This modal demonstrates proper focus management. Notice how:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Focus is trapped within the modal</li>
                  <li>• Tab cycles through focusable elements</li>
                  <li>• Escape key closes the modal</li>
                  <li>• Focus returns to the trigger button when closed</li>
                </ul>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Sample Button 1
                  </Button>
                  <Button variant="outline" size="sm">
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
          <h3 className="text-lg font-semibold">Search Modal</h3>
          <p className="text-sm text-muted-foreground">
            Complex modal with search functionality, arrow key navigation through results.
          </p>

          <Button onClick={() => setIsSearchOpen(true)} className="w-full" variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Open Search
          </Button>

          <SearchModal isOpen={isSearchOpen} onCloseAction={() => setIsSearchOpen(false)} />
        </div>
      </div>

      {/* Accessibility Testing */}
      <div className="bg-muted/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Accessibility Testing</h2>
          <Button onClick={runTests} variant="outline" size="sm">
            Run Tests
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Click "Run Tests" to validate the accessibility of the components above. Results will be
          logged to the console and displayed below.
        </p>

        {testResults && (
          <div className="bg-background rounded border p-4 max-h-64 overflow-y-auto">
            <pre className="text-xs whitespace-pre-wrap">{testResults}</pre>
          </div>
        )}
      </div>

      {/* Implementation Notes */}
      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
          Implementation Highlights
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-200">
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
            <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-200">
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
