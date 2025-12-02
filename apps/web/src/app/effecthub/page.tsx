import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EFFECT_HUB_PROJECTS, getCenterpieceProject } from "@/lib/effectHubProjects";
import { fetchMultipleRepoStars } from "@/lib/github";
import { Github, Star } from "lucide-react";
import Link from "next/link";

// Revalidate is handled by fetch in lib/github.ts

export const metadata = {
  title: "EffectHub - The Effect-TS Toolkit",
  description:
    "Smooth >>> Chaos: Building Production-Grade AI Systems with Effect. A comprehensive toolkit of Effect-TS libraries for building robust AI agents and systems.",
};

export default async function EffectHubPage() {
  // Fetch GitHub stars for all projects
  const repoStars = await fetchMultipleRepoStars(EFFECT_HUB_PROJECTS.map((p) => p.githubRepo));

  const centerpieceProject = getCenterpieceProject();
  const otherProjects = EFFECT_HUB_PROJECTS.slice(1).sort((a, b) => {
    const starsA = repoStars[a.githubRepo] ?? 0;
    const starsB = repoStars[b.githubRepo] ?? 0;
    return starsB - starsA; // Sort descending by star count
  });

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12">
      {/* Hero Section */}
      <section className="space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
            The Effect-TS Toolkit
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Smooth {">>>"} Chaos</span>: Building
            Production-Grade AI Systems with Effect.
          </p>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            I've built this comprehensive collection of Effect-TS libraries and tools to enable
            robust, type-safe AI agents and systems. From environment validation to state machines,
            from MDX rendering to unified model management.
          </p>
        </div>
      </section>

      {/* Centerpiece Project - EffectPatterns */}
      <section className="space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Star className="h-6 w-6 text-primary" />
          <h2 className="font-bold text-2xl text-foreground">Featured Project</h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="group hover:-translate-y-2 motion-safe:fade-in motion-safe:slide-in-from-bottom-4 relative z-0 overflow-hidden border-charcoal/20 bg-gradient-to-br from-card via-card/95 to-card/80 shadow-lg shadow-primary/5 transition-all duration-300 ease-out hover:scale-[1.02] hover:border-charcoal/40 hover:shadow-2xl hover:shadow-primary/10 motion-safe:animate-in motion-safe:duration-500">
            {/* Animated border glow effect */}
            <div className="absolute inset-0 rounded-xl border-2 border-charcoal/0 transition-all duration-300 group-hover:border-charcoal/30" />

            {/* Subtle shine effect on hover */}
            <div className="-inset-x-10 -inset-y-10 absolute bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:translate-x-[200%] group-hover:opacity-100" />

            <Link
              aria-label={`Open ${centerpieceProject.name} details`}
              className="absolute inset-0 z-10"
              href={`/effecthub/${centerpieceProject.id}`}
            >
              <span className="sr-only">Open project</span>
            </Link>

            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="font-bold text-2xl transition-colors group-hover:text-primary/90">
                  {centerpieceProject.name}
                </CardTitle>
                <div className="flex shrink-0 items-center gap-2">
                  {repoStars[centerpieceProject.githubRepo] && (
                    <span className="flex items-center gap-1 text-muted-foreground text-sm transition-all duration-200 group-hover:text-foreground">
                      <Star className="h-4 w-4 fill-orange text-orange transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
                      {repoStars[centerpieceProject.githubRepo]?.toLocaleString()}
                    </span>
                  )}
                  <Badge
                    className="bg-primary/10 px-3 py-1 text-primary transition-all duration-200 group-hover:scale-105 group-hover:bg-primary/20"
                    variant="outline"
                  >
                    {centerpieceProject.status || "active"}
                  </Badge>
                </div>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed transition-colors duration-200 group-hover:text-foreground/90">
                {centerpieceProject.tagline}
              </p>

              {centerpieceProject.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {centerpieceProject.description.split("\n\n")[0]}
                </p>
              )}
            </CardHeader>

            <CardFooter className="relative z-20 flex items-center gap-3 pt-4">
              <Button
                asChild
                className="transition-all duration-200 hover:scale-105 hover:border-primary/50"
                size="sm"
                variant="outline"
              >
                <a
                  aria-label={`View ${centerpieceProject.name} on GitHub`}
                  href={`https://github.com/${centerpieceProject.githubRepo}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Github className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  GitHub
                </a>
              </Button>
              <Button
                asChild
                className="transition-all duration-200 hover:scale-105"
                size="sm"
                variant="default"
              >
                <Link href={`/effecthub/${centerpieceProject.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-2xl text-foreground">The Toolkit</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, index) => (
            <Card
              className="group hover:-translate-y-1.5 motion-safe:fade-in motion-safe:slide-in-from-bottom-4 relative z-0 flex h-full flex-col overflow-hidden border-charcoal/15 bg-gradient-to-br from-card via-card/98 to-card/95 shadow-sm transition-all duration-300 ease-out hover:scale-[1.02] hover:border-charcoal/35 hover:shadow-primary/5 hover:shadow-xl motion-safe:animate-in py-3"
              key={project.id}
              style={{
                animationDelay: `${index * 75}ms`,
                animationFillMode: "both",
              }}
            >
              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-xl border-2 border-charcoal/0 transition-all duration-300 group-hover:border-charcoal/25" />

              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 transition-all duration-300 group-hover:from-primary/5 group-hover:via-primary/0 group-hover:to-primary/5" />

              <Link
                aria-label={`Open ${project.name} details`}
                className="absolute inset-0 z-10"
                href={`/effecthub/${project.id}`}
              >
                <span className="sr-only">Open project</span>
              </Link>

              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-2 font-bold text-lg transition-colors duration-200 group-hover:text-primary/90">
                    {project.name}
                  </CardTitle>
                  <div className="flex shrink-0 items-center gap-2">
                    {repoStars[project.githubRepo] !== null && (
                      <span className="flex items-center gap-1 whitespace-nowrap text-muted-foreground text-xs transition-all duration-200 group-hover:text-foreground">
                        <Star className="h-3 w-3 fill-orange text-orange transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
                        {repoStars[project.githubRepo]?.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <p className="line-clamp-3 text-muted-foreground text-sm leading-snug transition-colors duration-200 group-hover:text-foreground/80">
                  {project.tagline}
                </p>
              </CardHeader>

              <CardContent className="hidden" />

              <CardFooter className="relative z-20 flex items-center pt-2">
                <Button
                  asChild
                  className="transition-all duration-200 hover:scale-105 hover:border-primary/50"
                  size="sm"
                  variant="outline"
                >
                  <a
                    aria-label={`View ${project.name} on GitHub`}
                    href={`https://github.com/${project.githubRepo}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Github className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    Code
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="space-y-6 rounded-xl bg-card p-8 text-center text-foreground">
        <div className="space-y-4">
          <h2 className="font-bold text-2xl">Building with Effect-TS?</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            These libraries are designed to work together, providing a complete toolkit for building
            production-grade AI systems with Effect-TS. All projects are open source and welcome
            contributions.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="default">
            <a href="https://github.com/PaulJPhilp" rel="noopener noreferrer" target="_blank">
              <Github className="mr-2 h-4 w-4" />
              View All on GitHub
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/blog">Read About Effect-TS</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
