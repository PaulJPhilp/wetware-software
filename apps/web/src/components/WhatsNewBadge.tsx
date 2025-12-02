"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface WhatsNewBadgeProps {
  /** GitHub repository in format "owner/repo" */
  githubRepo: string;
}

interface ReleaseInfo {
  version: string;
  name: string | null;
  body: string | null;
  publishedAt: string;
  isMajor: boolean;
  isMinor: boolean;
}

/**
 * Client component that fetches and displays "What's New" badge
 * for resources with recent major/minor releases
 */
export function WhatsNewBadge({ githubRepo }: WhatsNewBadgeProps) {
  const [releaseInfo, setReleaseInfo] = useState<ReleaseInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReleaseInfo() {
      try {
        const [owner, repo] = githubRepo.split("/");
        if (!owner || !repo) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(`/api/github/releases?owner=${owner}&repo=${repo}`);
        if (response.ok) {
          const data = await response.json();
          // Only set release info if data is not null (null means no recent release)
          if (data !== null) {
            setReleaseInfo(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch release info:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReleaseInfo();
  }, [githubRepo]);

  if (isLoading || !releaseInfo) {
    return null;
  }

  // Format release notes for tooltip (first 200 chars)
  const releaseNotes = releaseInfo.body
    ? releaseInfo.body.slice(0, 200).replace(/\n+/g, " ").trim() +
      (releaseInfo.body.length > 200 ? "..." : "")
    : `New ${releaseInfo.isMajor ? "major" : "minor"} release: ${releaseInfo.version}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            className="shrink-0 bg-orange/10 px-2 py-1 text-orange text-xs transition-all duration-200 hover:scale-105 hover:bg-orange/20 cursor-help"
            variant="outline"
          >
            <Sparkles className="mr-1 h-3 w-3" />
            What's New
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          <div className="space-y-2">
            <div className="font-semibold">
              {releaseInfo.name || releaseInfo.version}
            </div>
            <p className="text-sm text-muted-foreground">{releaseNotes}</p>
            <p className="text-xs text-muted-foreground">
              Published {new Date(releaseInfo.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

