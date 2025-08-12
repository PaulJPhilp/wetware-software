import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Briefcase, ExternalLink, Github, Globe, Lightbulb } from "lucide-react";
import Link from "next/link";

interface Project {
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    githubUrl?: string;
    demoUrl?: string;
    status: "Active" | "In Development" | "Completed";
    type: "Open Source" | "Client Work" | "Research" | "Tool";
}

export default function WorkPage() {
    const featuredProjects: Project[] = [
        {
            title: "Buddy: Human-AI Collaboration Framework",
            description:
                "A TypeScript framework for building robust AI agents with human-in-the-loop workflows",
            longDescription:
                "Buddy is an experimental framework that explores new patterns for human-AI collaboration, focusing on trust, transparency, and effective handoffs between human and AI decision-making processes.",
            technologies: ["TypeScript", "Effect-TS", "LangChain", "React", "Notion API"],
            githubUrl: "https://github.com/PaulJPhilp",
            status: "In Development",
            type: "Research",
        },
        {
            title: "NotebookLM to Website Pipeline",
            description:
                "Automated system for converting NotebookLM study guides into interactive web experiences",
            longDescription:
                "A productized workflow that transforms NotebookLM-generated content into structured, searchable, and interactive study guides hosted as web applications.",
            technologies: ["Next.js", "Tailwind CSS", "Google AI", "Vercel", "TypeScript"],
            status: "Active",
            type: "Tool",
        },
    ];

    const upcomingProjects = [
        {
            title: "Lighthouse Keeper",
            description: "AI-powered content curation and insight extraction system",
            type: "Research",
        },
        {
            title: "Complex Adaptive Patterns (CAPs) Library",
            description: "Reusable patterns for managing complexity in software systems",
            type: "Open Source",
        },
    ];

    return (
        <main className="max-w-6xl mx-auto py-12 px-4 space-y-12">
            {/* Header Section */}
            <section className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <Briefcase className="w-8 h-8 text-orange" />
                    <h1 className="text-4xl md:text-5xl font-sans font-bold text-charcoal">
                        Work & Portfolio
                    </h1>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                    <p className="text-xl font-serif text-charcoal/80">
                        Welcome to my workshop where human systems meet AI innovation
                    </p>
                    <p className="text-lg text-charcoal/60">
                        Explore projects, experiments, and collaborations that push the boundaries of what's
                        possible when humans and AI work together. From production-ready frameworks to research
                        prototypes, each project represents a step forward in understanding and improving
                        human-AI collaboration.
                    </p>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-sans font-bold text-charcoal">Featured Projects</h2>
                    <p className="text-charcoal/60">Current focus areas and active development</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {featuredProjects.map((project) => (
                        <Card key={project.title} className="group hover:shadow-lg transition-shadow">
                            <CardHeader className="space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        {project.type === "Research" ? (
                                            <Lightbulb className="w-5 h-5 text-orange" />
                                        ) : (
                                            <Bot className="w-5 h-5 text-orange" />
                                        )}
                                        <Badge variant="outline" className="text-xs">
                                            {project.type}
                                        </Badge>
                                    </div>
                                    <Badge
                                        variant={project.status === "Active" ? "default" : "secondary"}
                                        className={project.status === "Active" ? "bg-green-500" : ""}
                                    >
                                        {project.status}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-sans text-charcoal group-hover:text-orange transition-colors">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="text-charcoal/60">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-charcoal/70">{project.longDescription}</p>

                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <Badge key={tech} variant="secondary" className="text-xs bg-silver">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex gap-3 pt-2">
                                    {project.githubUrl && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                <Github className="w-4 h-4 mr-2" />
                                                Code
                                            </a>
                                        </Button>
                                    )}
                                    {project.demoUrl && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                                <Globe className="w-4 h-4 mr-2" />
                                                Demo
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Upcoming Projects */}
            <section className="space-y-6">
                <h3 className="text-2xl font-sans font-bold text-charcoal">Coming Soon</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    {upcomingProjects.map((project) => (
                        <div
                            key={project.title}
                            className="p-6 bg-silver/30 rounded-lg border-2 border-dashed border-charcoal/20"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4 text-orange/60" />
                                    <Badge variant="outline" className="text-xs text-charcoal/60">
                                        {project.type}
                                    </Badge>
                                </div>
                                <h4 className="font-sans font-semibold text-charcoal">{project.title}</h4>
                                <p className="text-sm text-charcoal/60">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-charcoal text-white rounded-lg p-8 text-center space-y-6">
                <div className="space-y-4">
                    <h2 className="text-2xl font-sans font-bold">Explore My Work</h2>
                    <p className="text-white/80 max-w-2xl mx-auto">
                        Dive deeper into my projects, contributions, and experiments in human-AI collaboration.
                        Check out my GitHub for code, documentation, and active development.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button variant="outline" asChild className="bg-white text-charcoal hover:bg-white/90">
                        <a href="https://github.com/PaulJPhilp" target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub Profile
                        </a>
                    </Button>
                    <Button
                        variant="outline"
                        asChild
                        className="text-white border-white/40 hover:bg-white/10"
                    >
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
