/**
 * Search Modal Component
 * Demonstrates keyboard navigation and focus management in modals
 */

"use client";

import { Modal, ModalBody, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/modal";
import {
  KEYS,
  announceToScreenReader,
  debounce,
  useArrowNavigation,
} from "@/lib/keyboard-navigation";
import { Calendar, FileText, Search, User } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

interface SearchResult {
  id: string;
  title: string;
  type: "post" | "project" | "series" | "page";
  url: string;
  excerpt?: string;
  date?: string;
}

// Mock search function - replace with real search implementation
const mockSearch = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) return [];

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      title: `Sample Post about ${query}`,
      type: "post" as const,
      url: "/posts/sample-post",
      excerpt: `This is a sample post that mentions ${query} in the content...`,
      date: "2024-01-15",
    },
    {
      id: "2",
      title: `Project: ${query} Implementation`,
      type: "project" as const,
      url: "/projects/sample-project",
      excerpt: `A project that implements ${query} functionality...`,
    },
    {
      id: "3",
      title: `${query} Series`,
      type: "series" as const,
      url: "/series/sample-series",
      excerpt: `A comprehensive series covering ${query} topics...`,
    },
  ].filter(() => Math.random() > 0.3); // Randomly filter results
};

interface SearchModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export function SearchModal({ isOpen, onCloseAction }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const instructionsId = useId();

  // Get result elements for keyboard navigation
  const [resultElements, setResultElements] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (isOpen && resultsRef.current) {
      const elements = Array.from(
        resultsRef.current.querySelectorAll("[data-search-result]"),
      ) as HTMLElement[];
      setResultElements(elements);
    }
  }, [isOpen]);

  // Arrow navigation for search results
  const { setCurrentIndex } = useArrowNavigation(resultElements, isOpen && results.length > 0, {
    loop: true,
    orientation: "vertical",
    onSelect: (index) => {
      const result = results[index];
      if (result) {
        // Navigate to result
        window.location.href = result.url;
        onCloseAction();
      }
    },
  });

  // Debounced search function
  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await mockSearch(searchQuery);
      setResults(searchResults);
      setSelectedIndex(-1);

      // Announce results to screen readers
      announceToScreenReader(`${searchResults.length} search results found`, "polite");
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  // Handle query change
  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Handle input keyboard navigation
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case KEYS.ARROW_DOWN:
        event.preventDefault();
        if (results.length > 0) {
          setCurrentIndex(0);
          resultElements[0]?.focus();
        }
        break;
      case KEYS.ESCAPE:
        event.preventDefault();
        onCloseAction();
        break;
      case KEYS.ENTER:
        event.preventDefault();
        if (results.length > 0 && results[0]) {
          // Navigate to first result
          window.location.href = results[0].url;
          onCloseAction();
        }
        break;
    }
  };

  const getResultIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "post":
        return <FileText className="w-4 h-4" />;
      case "project":
        return <User className="w-4 h-4" />;
      case "series":
        return <Calendar className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && onCloseAction()}>
      <ModalContent size="lg" showCloseButton={true} closeOnOverlayClick={true}>
        <ModalHeader>
          <ModalTitle>Search</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search posts, projects, and series..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange transition-colors"
                aria-label="Search query"
                aria-describedby="search-instructions"
              />
            </div>

            {/* Instructions */}
            <div id={instructionsId} className="text-xs text-muted-foreground">
              Use arrow keys to navigate results, Enter to select, Escape to close
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange"></div>
                <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
              </div>
            )}

            {/* Results */}
            {!isLoading && results.length > 0 && (
              <div
                ref={resultsRef}
                className="space-y-2 max-h-96 overflow-y-auto"
                role="listbox"
                aria-label="Search results"
              >
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    data-search-result
                    role="option"
                    aria-selected={selectedIndex === index}
                    tabIndex={-1}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 focus:bg-muted focus:outline-none cursor-pointer transition-colors"
                    onClick={() => {
                      window.location.href = result.url;
                      onCloseAction();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        window.location.href = result.url;
                        onCloseAction();
                      }
                    }}
                  >
                    <div className="flex-shrink-0 mt-0.5 text-muted-foreground">
                      {getResultIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground line-clamp-1">{result.title}</h3>
                      {result.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {result.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span className="capitalize">{result.type}</span>
                        {result.date && (
                          <>
                            <span>•</span>
                            <span>{result.date}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && query.trim() && results.length === 0 && (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">No results found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search terms or browse our content directly.
                </p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !query.trim() && (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Start typing to search</h3>
                <p className="text-sm text-muted-foreground">
                  Search through posts, projects, series, and pages.
                </p>
              </div>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
