import type { Project } from "@/components/ProjectCard";

export const projects: Project[] = [
  {
    id: "effect-patterns",
    name: "Effect Patterns Hub",
    description:
      "A comprehensive, community-driven knowledge-base of practical patterns for building sound systems with Effect-TS, featuring goal-oriented solutions from beginner to advanced levels.",
    longDescription: `The Effect Patterns Hub is a comprehensive, community-driven knowledge-base that serves as the definitive guide for practical Effect-TS patterns. This living document helps developers transition from core concepts to advanced architectural strategies by focusing on the "why" behind the code.

Key features include:
• Comprehensive Pattern Library: Covers 20+ major categories including Error Management, Building APIs, Core Concepts, Concurrency, Testing, and more
• Goal-Oriented Approach: Each pattern explains not just "how" but "why" certain approaches work, helping developers make informed architectural decisions
• Progressive Difficulty: Patterns are categorized from Beginner (🟢) to Intermediate (🟡) to Advanced (🟠) levels
• Community-Driven: Open for contributions from the Effect-TS community to continuously expand and improve the knowledge-base
• Practical Examples: Real-world examples showing how to apply patterns in actual application development
• AI Coding Rules: Includes machine-readable rules for AI IDEs and coding agents to better understand Effect-TS patterns

This repository serves as both a learning resource and a reference guide for developers working with Effect-TS, providing structured guidance for common challenges and advanced architectural patterns.`,
    technologies: ["TypeScript", "Effect-TS", "Community"],
    githubUrl: "https://github.com/PaulJPhilp/EffectPatterns",
    status: "active",
    featured: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-09-16",
  },
  {
    id: "effect-mdx",
    name: "effect-mdx",
    description:
      "A robust, type-safe, and purely functional library for processing MDX content, built with the Effect-TS ecosystem.",
    longDescription: `effect-mdx is a comprehensive library for processing MDX (Markdown with JSX) content using Effect-TS. It provides a high-level API for parsing, compiling, and manipulating MDX files with robust error handling and composable asynchronous runtime.

Key features include:
• Purely Functional: Built entirely with Effect-TS for robust error handling and composition
• Service-Based Architecture: Uses Effect's Service pattern for easy testing and dependency management
• Frontmatter-Aware: First-class support for parsing and validating YAML frontmatter
• Extensible Compilation: Leverages the unified ecosystem (remark, rehype) for flexible MDX processing
• Typed Errors: Custom, typed errors for predictable failure modes

The library supports both backend (Node.js) and frontend (browser/edge) use cases, making it perfect for static sites, documentation platforms, content pipelines, or interactive UIs that render MDX on the client.`,
    technologies: ["TypeScript", "Effect-TS", "MDX", "Remark", "Rehype", "Node.js"],
    githubUrl: "https://github.com/PaulJPhilp/effect-mdx",
    status: "active",
    featured: true,
    createdAt: "2024-08-08",
    updatedAt: "2024-08-08",
  },
  {
    id: "effect-ai-cli",
    name: "Effect AI CLI",
    description:
      "A production-ready command-line interface built with Effect-TS for managing AI workflows, tracking metrics, and maintaining run history.",
    longDescription: `The Effect AI CLI is a comprehensive TypeScript CLI application built with Effect-TS for managing AI-powered pattern processing, run management, and observability. It demonstrates advanced Effect-TS patterns including service composition, resource management, observability, and AI integration.

Key features include:
• AI Integration: Seamless integration with multiple AI providers (OpenAI, Anthropic, Google)
• Run Management: Complete lifecycle management for AI processing runs
• Metrics Tracking: Comprehensive metrics collection and reporting
• Observability: Full OpenTelemetry integration for tracing and monitoring
• Configuration Management: Flexible configuration with environment variables
• Authentication: Secure API key management
• Extensibility: Plugin system to add custom commands via CliPlugin

The CLI provides tools for managing AI workflows with execution plans, provider fallbacks, and comprehensive metrics tracking. It uses a modern Effect-TS service architecture with proper service layer composition and dependency injection.`,
    technologies: ["TypeScript", "Effect-TS", "Node.js", "OpenTelemetry", "CLI"],
    githubUrl: "https://github.com/PaulJPhilp/effect-ai-cli",
    status: "active",
    featured: true,
    createdAt: "2024-09-01",
    updatedAt: "2024-09-16",
  },
  {
    id: "effect-notion",
    name: "effect-notion",
    description:
      "A lightweight, production-ready server that acts as a secure proxy for the Notion API, built with Effect-TS for robust error handling and type safety.",
    longDescription: `effect-notion is a lightweight, production-ready server that acts as a secure proxy for the Notion API. Built with the powerful Effect library, it provides a robust, type-safe, and efficient way to fetch data from Notion databases and pages.

Key features include:
• Secure Notion API Proxy: Safely access the Notion API without exposing your credentials on the client-side
• Rich Filtering Capabilities: Dynamically filter Notion database entries using a flexible JSON-based query language
• Logical Field Overrides: Decouple your application from your Notion schema by mapping Notion's field names to logical names
• Codegen for Type Safety: Generate TypeScript types from your live Notion database to ensure end-to-end type safety
• Built with Effect: Leverages the Effect library for a highly performant, concurrent, and error-resilient server
• Ready to Deploy: Includes configurations for easy deployment to services like Vercel
• Consistent Error Model: All errors return normalized JSON with a stable shape and a requestId for tracing

This server is ideal for developers building front-end applications (blogs, documentation sites, personal portfolios) that use Notion as a CMS. It acts as a secure and robust backend layer, abstracting away the complexities of the Notion API.`,
    technologies: ["TypeScript", "Effect-TS", "Node.js", "Notion API", "Vercel"],
    githubUrl: "https://github.com/PaulJPhilp/effect-notion",
    status: "active",
    featured: true,
    createdAt: "2024-09-10",
    updatedAt: "2024-09-16",
  },
  {
    id: "effective-agent",
    name: "Effective Agent",
    description:
      "A TypeScript application framework for building robust, scalable, concurrent, and maintainable AI agents and agent-based systems using Effect-TS.",
    longDescription: `Effective Agent is a comprehensive TypeScript application framework for building robust, scalable, concurrent, and maintainable AI agents and agent-based systems. It is designed to reduce the complexity of developing sophisticated agents by providing a modular, Effect-TS-based architecture that leverages the Effect system for composable asynchronous operations, strong type safety, and powerful dependency management.

Key features include:
• Unified Service Interface: Access all AI services (models, providers, policies) through a single AgentRuntimeService
• Self-Configuring Services: Services load their own configurations, reducing coupling and improving maintainability
• Type-Safe Agent Management: Create and manage agents with full TypeScript type safety
• Advanced Error Recovery: Built-in circuit breakers, retries, and fallback strategies
• Performance Monitoring: Comprehensive metrics and health checking for all services
• Configuration Validation: Schema-based validation for all configuration files

The framework features a modular service architecture with separate domains for AI services, core infrastructure, pipeline processing, and agent capabilities. At its heart is the AgentRuntimeService, which serves as the central orchestration layer for agent lifecycle management, service access, message processing, and runtime coordination.`,
    technologies: ["TypeScript", "Effect-TS", "Node.js", "AI Agents", "Framework"],
    githubUrl: "https://github.com/PaulJPhilp/EffectiveAgent",
    status: "active",
    featured: true,
    createdAt: "2024-06-01",
    updatedAt: "2024-09-16",
  },
  {
    id: "buddy",
    name: "Buddy",
    description:
      "A comprehensive AI-powered application built with Effect-TS, featuring multiple AI provider integrations, modern React UI, and advanced state management.",
    longDescription: `Buddy is a sophisticated, full-stack AI-powered application that demonstrates advanced integration of multiple AI providers and modern web technologies. Built as a monorepo with Bun, React, and TypeScript, it showcases the power of combining Effect-TS with contemporary frontend and backend development practices.

Key features include:
• Multi-Provider AI Integration: Seamless integration with Anthropic, OpenAI, Google, Fireworks, and Perplexity AI services
• Effect-TS Architecture: Built on the Effect-TS ecosystem with platform, RPC, and SQL modules for robust, type-safe operations
• Modern React Stack: Next.js 15 with React 19, TypeScript, and Tailwind CSS for a cutting-edge frontend experience
• Advanced UI Components: Radix UI primitives with shadcn/ui for accessible, customizable component library
• Database Integration: PostgreSQL support with Effect SQL for type-safe database operations
• Authentication: NextAuth.js integration for secure user authentication and session management
• Real-time Communication: WebSocket support for live updates and interactive features
• Testing Infrastructure: Comprehensive testing setup with Vitest, Playwright for E2E testing, and fast-check for property-based testing
• Development Experience: Turbo monorepo management, Biome for code formatting, and hot reloading development server

This application serves as a reference implementation for building scalable, AI-enhanced applications with modern web technologies and functional programming principles.`,
    technologies: [
      "TypeScript",
      "Effect-TS",
      "React",
      "Next.js",
      "Bun",
      "PostgreSQL",
      "AI Integration",
    ],
    githubUrl: "https://github.com/PaulJPhilp/buddy",
    status: "active",
    featured: true,
    createdAt: "2024-07-01",
    updatedAt: "2024-09-16",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectsByStatus(status: Project["status"]): Project[] {
  return projects.filter((project) => project.status === status);
}
