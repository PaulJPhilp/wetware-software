import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CardComponentProps } from "@/lib/component-types";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Project {
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
}

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
  active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  archived: "bg-muted text-muted-foreground",
  maintenance: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
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
      className={`group relative flex flex-col h-full border-charcoal/20 transition-all duration-200 z-0 ${
        hoverable ? "hover:border-orange/50 hover:shadow-lg" : ""
      } ${className || ""}`}
      data-testid={testId}
    >
      {/* Clickable overlay for the entire card */}
      <Link
        href={`/projects/${project.id}`}
        aria-label={`Open ${project.name} details`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">Open project</span>
      </Link>
      {/* Project image */}
      {project.imageUrl && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal/5 rounded-t-xl">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}

      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-sans font-bold group-hover:text-orange transition-colors line-clamp-2">
            {project.name}
          </CardTitle>
          <div className="flex items-center gap-2 shrink-0">
            {stars !== undefined && stars >= 10 && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                • {stars.toLocaleString()}★
              </span>
            )}
            <Badge
              variant="outline"
              className={`text-xs px-2 py-1 ${statusColors[project.status]}`}
            >
              {project.status}
            </Badge>
          </div>
        </div>

        {showDescription && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-snug">
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
                key={tech}
                variant="outline"
                className="text-xs px-2 py-1 bg-silver/50 text-charcoal dark:bg-charcoal/50 dark:text-silver"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center pt-4 border-t border-charcoal/10 relative z-20">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hover:text-orange hover:bg-orange/5 transition-colors"
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} on GitHub`}
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
          {project.demoUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hover:text-orange hover:bg-orange/5 transition-colors"
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name} live demo`}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
