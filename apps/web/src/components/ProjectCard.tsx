import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CardComponentProps } from "@/lib/component-types";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type Project = {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl?: string;
  status: "active" | "archived" | "maintenance";
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

interface ProjectCardProps extends CardComponentProps {
  /** Project data to display */
  project: Project;
  /** Whether to show the description */
  showDescription?: boolean;
  /** Whether to show the technology tags */
  showTechnologies?: boolean;
  /** GitHub star count (only displayed if >= 10) */
  stars?: number;
}

const statusColors = {
  active: "bg-muted text-muted-foreground",
  archived: "bg-muted text-muted-foreground",
  maintenance: "bg-muted text-muted-foreground",
};

export function ProjectCard({
  project,
  showDescription = true,
  showTechnologies = true,
  className,
  testId,
  hoverable = true,
  stars,
}: ProjectCardProps) {
  return (
    <Card
      className={`group relative z-0 flex h-full flex-col border-border transition-all duration-200 ${
        hoverable ? "hover:shadow-lg" : ""
      } ${className || ""}`}
      data-testid={testId}
    >
      {/* Clickable overlay for the entire card */}
      <Link
        aria-label={`Open ${project.name} details`}
        className="absolute inset-0 z-10"
        href={`/projects/${project.id}`}
      >
        <span className="sr-only">Open project</span>
      </Link>
      {/* Project image */}
      {project.imageUrl && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-muted/20">
          <Image
            alt={project.name}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={project.imageUrl}
          />
        </div>
      )}

      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 font-bold text-lg transition-colors">
            {project.name}
          </CardTitle>
          <div className="flex shrink-0 items-center gap-2">
            {stars !== undefined && stars >= 10 && (
              <span className="whitespace-nowrap text-muted-foreground text-xs">
                • {stars.toLocaleString()}★
              </span>
            )}
            <Badge
              className={`px-2 py-1 text-xs ${statusColors[project.status]}`}
              variant="outline"
            >
              {project.status}
            </Badge>
          </div>
        </div>

        {showDescription && (
          <p className="line-clamp-3 text-muted-foreground text-sm leading-snug">
            {project.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Technologies */}
        {showTechnologies && (
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge
                className="bg-secondary px-2 py-1 text-secondary-foreground text-xs"
                key={tech}
                variant="outline"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="relative z-20 flex items-center border-border border-t pt-4">
        <div className="flex items-center space-x-2">
          <Button asChild size="sm" variant="outline">
            <a
              aria-label={`View ${project.name} on GitHub`}
              href={project.githubUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>
          {project.demoUrl && (
            <Button asChild size="sm" variant="outline">
              <a
                aria-label={`Open ${project.name} live demo`}
                href={project.demoUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
