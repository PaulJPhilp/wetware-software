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

type SearchResult = {
  id: string;
  title: string;
  type: "post" | "series" | "page";
  url: string;
  excerpt?: string;
  date?: string;
};

// Mock search function - replace with real search implementation
const mockSearch = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) {
    return [];
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      title: `Sample Post about ${query}`,
      type: "post" as const,
      url: "/blog/posts/sample-post",
      excerpt: `This is a sample post that mentions ${query} in the content...`,
      date: "2024-01-15",
    },
    {
      id: "2",
      title: `${query} Series`,
      type: "series" as const,
      url: "/blog/series/sample-series",
      excerpt: `A comprehensive series covering ${query} topics...`,
    },
  ].filter(() => Math.random() > 0.3); // Randomly filter results
};

type SearchModalProps = {
  isOpen: boolean;
  onCloseAction: () => void;
};

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
        resultsRef.current.querySelectorAll("[data-search-result]")
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
      default:
        break;
    }
  };

  const getResultIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "post":
        return <FileText className="h-4 w-4" />;
      case "series":
        return <Calendar className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Modal onOpenChangeAction={(open) => !open && onCloseAction()} open={isOpen}>
      <ModalContent closeOnOverlayClick={true} showCloseButton={true} size="lg">
        <ModalHeader>
          <ModalTitle>Search</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
              <input
                aria-describedby="search-instructions"
                aria-label="Search query"
                className="w-full rounded-lg border border-border bg-background py-2 pr-4 pl-10 text-foreground transition-colors placeholder:text-muted-foreground focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search posts, series, and pages..."
                ref={inputRef}
                type="text"
                value={query}
              />
            </div>

            {/* Instructions */}
            <div className="text-muted-foreground text-xs" id={instructionsId}>
              Use arrow keys to navigate results, Enter to select, Escape to close
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-orange border-b-2" />
                <span className="ml-2 text-muted-foreground text-sm">Searching...</span>
              </div>
            )}

            {/* Results */}
            {!isLoading && results.length > 0 && (
              <div
                aria-label="Search results"
                className="max-h-96 space-y-2 overflow-y-auto"
                ref={resultsRef}
                role="listbox"
              >
                {results.map((result, index) => (
                  <div
                    aria-selected={selectedIndex === index}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50 focus:bg-muted focus:outline-none"
                    data-search-result
                    key={result.id}
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
                    role="option"
                    tabIndex={-1}
                  >
                    <div className="mt-0.5 flex-shrink-0 text-muted-foreground">
                      {getResultIcon(result.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-1 font-medium text-foreground">{result.title}</h3>
                      {result.excerpt && (
                        <p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
                          {result.excerpt}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2 text-muted-foreground text-xs">
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
              <div className="py-8 text-center">
                <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-medium text-foreground">No results found</h3>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your search terms or browse our content directly.
                </p>
              </div>
            )}

            {/* Empty State */}
            {!(isLoading || query.trim()) && (
              <div className="py-8 text-center">
                <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-medium text-foreground">Start typing to search</h3>
                <p className="text-muted-foreground text-sm">
                  Search through posts, series, and pages.
                </p>
              </div>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
