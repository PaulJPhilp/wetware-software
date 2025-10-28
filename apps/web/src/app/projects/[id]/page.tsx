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
    <main className="mx-auto max-w-6xl space-y-12 px-4 py-12">
      {/* Back Navigation */}
      <div className="flex items-center gap-4">
        <Button asChild size="sm" variant="outline">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Project Header */}
      <section className="space-y-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Project Image */}
          {project.imageUrl && (
            <div className="lg:w-1/3">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-charcoal/5">
                <Image
                  alt={project.name}
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  src={project.imageUrl}
                />
              </div>
            </div>
          )}

          {/* Project Info */}
          <div className={`flex-1 ${project.imageUrl ? "" : "lg:w-full"}`}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h1 className="font-bold font-sans text-3xl text-charcoal leading-tight md:text-4xl dark:text-white">
                  {project.name}
                </h1>
                <Badge className={`flex items-center gap-1 ${statusInfo.color}`}>
                  <StatusIcon className="h-3 w-3" />
                  {statusInfo.label}
                </Badge>
              </div>

              <p className="text-charcoal/80 text-lg leading-relaxed dark:text-gray-300">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge
                    className="bg-silver/50 px-3 py-1 text-charcoal text-sm dark:bg-charcoal/50 dark:text-silver"
                    key={tech}
                    variant="outline"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button asChild>
                  <a
                    aria-label={`View ${project.name} source on GitHub`}
                    href={project.githubUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Source
                  </a>
                </Button>
                {project.demoUrl && (
                  <Button asChild variant="outline">
                    <a
                      aria-label={`Open ${project.name} live demo`}
                      href={project.demoUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>

              {/* Project Dates */}
              <div className="flex items-center gap-4 pt-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                {project.updatedAt !== project.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
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
          <h2 className="font-bold font-sans text-2xl text-charcoal dark:text-white">
            About This Project
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {project.longDescription
                  .split("\n\n")
                  .filter((p) => p.trim())
                  .map((paragraph) => (
                    <p className="mb-4 last:mb-0" key={paragraph.slice(0, 50)}>
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
          <h2 className="font-bold font-sans text-2xl text-charcoal dark:text-white">
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
      <section className="space-y-6 rounded-xl bg-silver/30 p-8 text-center dark:bg-charcoal/30">
        <div className="space-y-4">
          <h2 className="font-bold font-sans text-2xl text-charcoal dark:text-white">
            Interested in This Project?
          </h2>
          <p className="mx-auto max-w-2xl text-charcoal/80 dark:text-gray-300">
            Check out the source code, contribute to the development, or get in touch if you'd like
            to collaborate.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild>
            <a
              aria-label={`View ${project.name} on GitHub`}
              href={project.githubUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/connect">
              <ExternalLink className="mr-2 h-4 w-4" />
              Get in Touch
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
