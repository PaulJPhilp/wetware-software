// Revalidate is handled by fetch in lib/github.ts

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EFFECT_HUB_PROJECTS, getEffectHubProjectById } from "@/lib/effectHubProjects";
import { fetchGitHubStars } from "@/lib/github";
import { ArrowLeft, ExternalLink, Github, Package, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Revalidate is handled by fetch in lib/github.ts

interface ProjectPageProps {
  params: Promise<{
    projectName: string;
  }>;
}

export async function generateStaticParams() {
  return EFFECT_HUB_PROJECTS.map((project) => ({
    projectName: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getEffectHubProjectById(resolvedParams.projectName);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} - EffectHub`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getEffectHubProjectById(resolvedParams.projectName);

  if (!project) {
    notFound();
  }

  // Fetch GitHub stars for this project
  const [owner, repo] = project.githubRepo.split("/");
  const stars = owner && repo ? await fetchGitHubStars(owner, repo) : null;

  // Determine docs URL (custom or default to GitHub README)
  const docsUrl =
    project.docsUrl || `https://github.com/${project.githubRepo}#readme`;

  const npmUrl = project.npmPackage
    ? `https://www.npmjs.com/package/${project.npmPackage}`
    : null;

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      {/* Back Navigation */}
      <div>
        <Button asChild size="sm" variant="ghost">
          <Link href="/effecthub">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to EffectHub
          </Link>
        </Button>
      </div>

      {/* Project Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
              {project.name}
            </h1>
            <p className="text-lg text-muted-foreground">{project.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            {stars !== null && (
              <div className="flex items-center gap-1 rounded-lg bg-muted px-3 py-2">
                <Star className="h-4 w-4 fill-current text-muted-foreground" />
                <span className="font-medium text-sm">{stars.toLocaleString()}</span>
              </div>
            )}
            {project.status && (
              <Badge className="px-3 py-1" variant="outline">
                {project.status}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Description */}
      {project.description && (
        <section className="space-y-4">
          <h2 className="font-bold text-xl text-foreground">About</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {project.description.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* Key Features */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-bold text-xl text-foreground">Key Features</h2>
          <ul className="space-y-2">
            {project.keyFeatures.map((feature, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Links Section */}
      <section className="space-y-4 rounded-lg border border-subtle bg-elevated p-6">
        <h2 className="font-bold text-xl text-foreground">Resources</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="default">
            <a
              href={`https://github.com/${project.githubRepo}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>

          <Button asChild variant="outline">
            <a href={docsUrl} rel="noopener noreferrer" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Full Docs
            </a>
          </Button>

          {npmUrl && (
            <Button asChild variant="outline">
              <a href={npmUrl} rel="noopener noreferrer" target="_blank">
                <Package className="mr-2 h-4 w-4" />
                npm Package
              </a>
            </Button>
          )}
        </div>
      </section>

      {/* Additional Info */}
      <section className="rounded-lg bg-muted/50 p-6 text-center">
        <p className="text-muted-foreground text-sm">
          Part of the{" "}
          <Link className="font-medium text-foreground hover:underline" href="/effecthub">
            Effect-TS Toolkit
          </Link>
          . All projects are open source and welcome contributions.
        </p>
      </section>
    </div>
  );
}
