import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects, projects } from "@/lib/projects";
import { Archive, Code, Github, Star, Wrench } from "lucide-react";

// Hardcoded GitHub star counts (only for repos with >= 10 stars)
const projectStars: Record<string, number> = {
  "effect-patterns": 432,
  "effective-agent": 38,
  buddy: 12,
};

export default function ProjectsPage() {
  const featuredProjects = getFeaturedProjects();
  const featuredProject = featuredProjects[0]; // Only show the first featured project
  const otherProjects = projects.filter((p) => p.id !== featuredProject?.id);

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    archived: projects.filter((p) => p.status === "archived").length,
    maintenance: projects.filter((p) => p.status === "maintenance").length,
  };

  return (
    <div className="relative mx-auto max-w-7xl space-y-12 px-4 py-12">
      {/* Header Section */}
      <section className="space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
            Projects
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
            Welcome to my workshop. Here, you'll find a collection of practical AI applications and
            robust software systems. These projects demonstrate how I use modern technologies like
            TypeScript, Effect-TS, and Next.js, along with advanced AI orchestration frameworks, to
            solve real-world problems and deliver tangible engineering value.
          </p>
        </div>

        {/* Project Stats */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">{stats.total} Total Projects</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
            <Star className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">{stats.active} Active</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">{stats.maintenance} Maintenance</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
            <Archive className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">{stats.archived} Archived</span>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      {featuredProject && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 text-foreground" />
            <h2 className="font-bold text-2xl text-foreground">Featured Project</h2>
          </div>

          <div className="mx-auto max-w-4xl">
            <ProjectCard
              project={featuredProject}
              {...(projectStars[featuredProject.id] && {
                stars: projectStars[featuredProject.id],
              })}
            />
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Code className="h-5 w-5 text-foreground" />
          <h2 className="font-bold text-2xl text-foreground">All Projects</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              {...(projectStars[project.id] && {
                stars: projectStars[project.id],
              })}
            />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="space-y-6 rounded-xl bg-card p-8 text-center text-foreground">
        <div className="space-y-4">
          <h2 className="font-bold text-2xl">More Coming Soon</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            I'm constantly working on new projects and experiments. Follow my GitHub to stay updated
            on the latest developments in software engineering and robotics.
          </p>
        </div>
        <Button asChild variant="secondary">
          <a href="https://github.com/PaulJPhilp" rel="noopener noreferrer" target="_blank">
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </a>
        </Button>
      </section>
    </div>
  );
}
