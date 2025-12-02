import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CardComponentProps } from "@/lib/component-types";
import type { Resource } from "@/lib/data/resourceTypes";
import { ExternalLink } from "lucide-react";
import { WhatsNewBadge } from "./WhatsNewBadge";

interface ResourceCardProps extends CardComponentProps {
  /** Resource data to display */
  resource: Resource;
  /** Index for staggered animation delays */
  index?: number;
}

export function ResourceCard({
  resource,
  className,
  testId,
  hoverable = true,
  index,
}: ResourceCardProps) {
  return (
    <Card
      className={`group hover:-translate-y-1.5 motion-safe:fade-in motion-safe:slide-in-from-bottom-4 relative z-0 flex h-full flex-col overflow-hidden border-charcoal/15 bg-gradient-to-br from-card via-card/98 to-card/95 shadow-sm transition-all duration-300 ease-out hover:scale-[1.02] hover:border-charcoal/35 hover:shadow-primary/5 hover:shadow-xl motion-safe:animate-in py-3 ${
        hoverable ? "" : ""
      } ${className || ""}`}
      data-testid={testId}
      style={
        index !== undefined
          ? {
              animationDelay: `${index * 75}ms`,
              animationFillMode: "both",
            }
          : undefined
      }
    >
      {/* Animated border on hover */}
      <div className="absolute inset-0 rounded-xl border-2 border-charcoal/0 transition-all duration-300 group-hover:border-charcoal/25" />

      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 transition-all duration-300 group-hover:from-primary/5 group-hover:via-primary/0 group-hover:to-primary/5" />

      {/* Clickable overlay for the entire card */}
      <a
        aria-label={`Open ${resource.title}`}
        className="absolute inset-0 z-10"
        href={resource.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="sr-only">Open resource</span>
      </a>

      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 font-bold text-lg transition-colors duration-200 group-hover:text-primary/90">
            {resource.title}
          </CardTitle>
          <div className="flex items-center gap-2 shrink-0">
            {resource.githubRepo && (
              <WhatsNewBadge githubRepo={resource.githubRepo} />
            )}
            {resource.type && (
              <Badge
                className="bg-primary/10 px-2 py-1 text-primary text-xs transition-all duration-200 group-hover:scale-105 group-hover:bg-primary/20"
                variant="outline"
              >
                {resource.type}
              </Badge>
            )}
          </div>
        </div>

        <p className="line-clamp-3 text-muted-foreground text-sm leading-snug transition-colors duration-200 group-hover:text-foreground/80">
          {resource.description}
        </p>
      </CardHeader>

      <CardContent className="hidden" />

      <CardFooter className="relative z-20 flex flex-col items-start gap-2 pt-2">
        {resource.authorSource && (
          <p className="text-muted-foreground text-xs transition-colors duration-200 group-hover:text-foreground/70">
            by {resource.authorSource}
          </p>
        )}
        <div className="flex items-center gap-2 text-muted-foreground text-sm transition-all duration-200 group-hover:text-foreground">
          <ExternalLink className="h-4 w-4 text-orange transition-transform duration-200 group-hover:translate-x-0.5" />
          <span>Visit resource</span>
        </div>
      </CardFooter>
    </Card>
  );
}

