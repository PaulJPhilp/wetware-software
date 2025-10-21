import { ProjectCard } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjectById, projects } from "@/lib/projects";
import { Archive, ArrowLeft, Calendar, ExternalLink, Github, Star, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

const statusConfig = {
  active: {
    icon: Star,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    label: "Active Development",
  },
  archived: {
    icon: Archive,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
    label: "Archived",
  },
  maintenance: {
    icon: Wrench,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    label: "Maintenance Mode",
  },
};

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} - Projects`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const statusInfo = statusConfig[project.status];
  const StatusIcon = statusInfo.icon;

  // Get related projects (excluding current one)
  const relatedProjects = projects
    .filter((p) => p.id !== project.id)
    .filter((p) => p.technologies.some((tech) => project.technologies.includes(tech)))
    .slice(0, 3);

  return (
    <main className="max-w-6xl mx-auto py-12 px-4 space-y-12">
      {/* Back Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/projects">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Project Header */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Project Image */}
          {project.imageUrl && (
            <div className="lg:w-1/3">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal/5 rounded-xl">
                <Image
                  src={project.imageUrl}
                  alt={project.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Project Info */}
          <div className={`flex-1 ${!project.imageUrl ? "lg:w-full" : ""}`}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h1 className="text-3xl md:text-4xl font-sans font-bold text-charcoal dark:text-white leading-tight">
                  {project.name}
                </h1>
                <Badge className={`flex items-center gap-1 ${statusInfo.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusInfo.label}
                </Badge>
              </div>

              <p className="text-lg text-charcoal/80 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-sm px-3 py-1 bg-silver/50 text-charcoal dark:bg-charcoal/50 dark:text-silver"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.name} source on GitHub`}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Source
                  </a>
                </Button>
                {project.demoUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.name} live demo`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>

              {/* Project Dates */}
              <div className="flex items-center gap-4 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                {project.updatedAt !== project.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      {project.longDescription && (
        <section className="space-y-6">
          <h2 className="text-2xl font-sans font-bold text-charcoal dark:text-white">
            About This Project
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {project.longDescription
                  .split("\n\n")
                  .filter((p) => p.trim())
                  .map((paragraph) => (
                    <p key={paragraph.slice(0, 50)} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-sans font-bold text-charcoal dark:text-white">
            Related Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((relatedProject) => (
              <ProjectCard
                key={relatedProject.id}
                project={relatedProject}
                showDescription={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-silver/30 dark:bg-charcoal/30 rounded-xl p-8 text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-sans font-bold text-charcoal dark:text-white">
            Interested in This Project?
          </h2>
          <p className="text-charcoal/80 dark:text-gray-300 max-w-2xl mx-auto">
            Check out the source code, contribute to the development, or get in touch if you'd like
            to collaborate.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} on GitHub`}
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/connect">
              <ExternalLink className="w-4 h-4 mr-2" />
              Get in Touch
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
