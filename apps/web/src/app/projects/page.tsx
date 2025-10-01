import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects, projects } from "@/lib/projects";
import { Archive, Code, Github, Star, Wrench } from "lucide-react";

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
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12 relative">
      {/* Header Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-charcoal dark:text-white leading-tight">
            Projects
          </h1>
          <p className="text-lg text-charcoal/80 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to my workshop. Here, you'll find a collection of practical AI applications and
            robust software systems. These projects demonstrate how I use modern technologies like
            TypeScript, Effect-TS, and Next.js, along with advanced AI orchestration frameworks, to
            solve real-world problems and deliver tangible engineering value.
          </p>
        </div>

        {/* Project Stats */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 bg-silver/50 dark:bg-charcoal/50 rounded-lg px-4 py-2">
            <Code className="w-4 h-4 text-orange" />
            <span className="text-sm font-medium">{stats.total} Total Projects</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 rounded-lg px-4 py-2">
            <Star className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">{stats.active} Active</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg px-4 py-2">
            <Wrench className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium">{stats.maintenance} Maintenance</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900/20 rounded-lg px-4 py-2">
            <Archive className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">{stats.archived} Archived</span>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      {featuredProject && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-orange" />
            <h2 className="text-3xl font-sans font-bold text-charcoal dark:text-white">Featured Project</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <ProjectCard project={featuredProject} />
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Code className="w-5 h-5 text-orange" />
          <h2 className="text-2xl font-sans font-bold text-charcoal dark:text-white">All Projects</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-charcoal text-white rounded-xl p-8 text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-sans font-bold">More Coming Soon</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            I'm constantly working on new projects and experiments. Follow my GitHub to stay updated
            on the latest developments in software engineering and robotics.
          </p>
        </div>
        <Button variant="outline" asChild className="bg-white text-charcoal hover:bg-white/90">
          <a href="https://github.com/PaulJPhilp" target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4 mr-2" />
            View on GitHub
          </a>
        </Button>
      </section>
    </div>
  );
}
