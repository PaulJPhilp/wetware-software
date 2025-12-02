export type EffectHubProject = {
  id: string; // Matches GitHub repo name exactly
  name: string; // Display name
  tagline: string; // Short tagline for cards
  githubRepo: string; // Full repo path (PaulJPhilp/repo-name)
  npmPackage?: string; // Optional npm package name
  description?: string; // 1-2 paragraph description for splash page
  keyFeatures?: string[]; // 3-5 bullet points
  docsUrl?: string; // Custom docs URL (defaults to GitHub README)
  status?: "active" | "beta" | "alpha";
};

export const EFFECT_HUB_PROJECTS: EffectHubProject[] = [
  {
    id: "EffectPatterns",
    name: "EffectPatterns",
    tagline: "The definitive open-source reference for Effect-TS patterns.",
    githubRepo: "PaulJPhilp/EffectPatterns",
    description:
      "A comprehensive, community-driven knowledge-base of practical patterns for building sound systems with Effect-TS. This living document helps developers transition from core concepts to advanced architectural strategies by focusing on the 'why' behind the code.\n\nCovers 20+ major categories including Error Management, Building APIs, Core Concepts, Concurrency, Testing, and more. Each pattern explains not just 'how' but 'why' certain approaches work, helping developers make informed architectural decisions.",
    keyFeatures: [
      "Comprehensive pattern library covering 20+ categories",
      "Goal-oriented approach explaining the 'why' behind patterns",
      "Progressive difficulty from Beginner to Advanced",
      "Community-driven with open contributions",
      "AI coding rules for better IDE integration",
    ],
    status: "active",
  },
  {
    id: "effect-supermemory",
    name: "effect-supermemory",
    tagline: "Effect-native SDK for Supermemory.ai – reliable memory for AI agents.",
    githubRepo: "PaulJPhilp/effect-supermemory",
    description:
      "An Effect-native SDK for Supermemory.ai, providing reliable, type-safe memory management for AI agents. Built with Effect-TS for robust error handling and composable operations.\n\nIntegrates seamlessly with AI agent workflows, providing persistent memory storage and retrieval with full type safety and error handling.",
    keyFeatures: [
      "Effect-native integration with Supermemory.ai",
      "Type-safe memory operations",
      "Robust error handling and retry logic",
      "Composable with other Effect services",
      "Perfect for AI agent memory persistence",
    ],
    status: "active",
  },
  {
    id: "effect-env",
    name: "effect-env",
    tagline: "Framework-agnostic validation for type-safe environment variables.",
    githubRepo: "PaulJPhilp/effect-env",
    npmPackage: "effect-env",
    description:
      "A framework-agnostic library for validating and managing environment variables with full type safety. Built on Effect-TS for robust configuration management.\n\nProvides schema-based validation, clear error messages, and seamless integration with Effect-TS applications. Works in Node.js, browsers, and edge environments.",
    keyFeatures: [
      "Schema-based environment variable validation",
      "Full TypeScript type inference",
      "Clear, actionable error messages",
      "Framework-agnostic design",
      "Effect-TS integration for composability",
    ],
    status: "active",
  },
  {
    id: "effect-regex",
    name: "effect-regex",
    tagline: "Effective Regex Builder – type-safe, composable regular expressions with Effect.",
    githubRepo: "PaulJPhilp/effect-regex",
    description:
      "A type-safe, composable regular expression builder for Effect-TS. Write readable, maintainable regex patterns with full type safety and error handling.\n\nCombines the power of regular expressions with Effect's composability, making complex pattern matching more manageable and less error-prone.",
    keyFeatures: [
      "Type-safe regex pattern building",
      "Composable pattern combinators",
      "Clear error messages for invalid patterns",
      "Effect-native for seamless integration",
      "Readable, maintainable regex code",
    ],
    status: "active",
  },
  {
    id: "effect-json",
    name: "effect-json",
    tagline: "Type-safe and sound JSON parsing and stringification with Effect.",
    githubRepo: "PaulJPhilp/effect-json",
    description:
      "Type-safe JSON parsing and stringification built on Effect-TS. Provides robust error handling for JSON operations with full type safety.\n\nGoes beyond standard JSON.parse/stringify with schema validation, custom error types, and composable operations that integrate seamlessly with Effect pipelines.",
    keyFeatures: [
      "Type-safe JSON parsing with schema validation",
      "Robust error handling for malformed JSON",
      "Custom error types for better debugging",
      "Composable with Effect pipelines",
      "Support for custom serialization logic",
    ],
    status: "active",
  },
  {
    id: "effect-cli-tui",
    name: "effect-cli-tui",
    tagline: "Effect-native CLI/TUI toolkit – building robust terminal UIs and agent harnesses.",
    githubRepo: "PaulJPhilp/effect-cli-tui",
    description:
      "A comprehensive toolkit for building command-line interfaces and terminal UIs with Effect-TS. Perfect for creating robust CLI tools and agent harnesses.\n\nProvides composable command builders, interactive prompts, progress indicators, and full terminal UI capabilities with Effect's error handling and resource management.",
    keyFeatures: [
      "Composable CLI command builders",
      "Interactive terminal UI components",
      "Progress indicators and spinners",
      "Effect-native resource management",
      "Perfect for AI agent harnesses",
    ],
    status: "active",
  },
  {
    id: "effect-actor",
    name: "effect-actor",
    tagline: "Effect-TS rewrite of xState – explicit state machines for complex behaviors.",
    githubRepo: "PaulJPhilp/effect-actor",
    description:
      "An Effect-TS implementation of state machines inspired by xState. Provides explicit, type-safe state management for complex behaviors and workflows.\n\nPerfect for modeling complex agent behaviors, workflow orchestration, and any scenario requiring explicit state transitions with full type safety.",
    keyFeatures: [
      "Type-safe state machine definitions",
      "Explicit state transitions",
      "Effect-native for composability",
      "Inspired by xState patterns",
      "Perfect for agent behavior modeling",
    ],
    status: "active",
  },
  {
    id: "effect-mdx",
    name: "effect-mdx",
    tagline: "Effect-native MDX rendering for robust, type-safe content pipelines.",
    githubRepo: "PaulJPhilp/effect-mdx",
    description:
      "A robust, type-safe MDX processing library built with Effect-TS. Parse, compile, and render MDX content with full error handling and composability.\n\nPerfect for static sites, documentation platforms, and content pipelines. Supports frontmatter, custom components, and the full unified ecosystem (remark, rehype).",
    keyFeatures: [
      "Type-safe MDX parsing and compilation",
      "Frontmatter support with validation",
      "Extensible with remark/rehype plugins",
      "Effect-native error handling",
      "Works in Node.js and edge environments",
    ],
    status: "active",
  },
  {
    id: "create-effect-agent",
    name: "create-effect-agent",
    tagline: "Rapid scaffolding for Effect-TS AI agents – like create-react-app, but for agents.",
    githubRepo: "PaulJPhilp/create-effect-agent",
    description:
      "A scaffolding tool for quickly creating Effect-TS AI agents. Like create-react-app, but for building production-ready AI agents with best practices built in.\n\nGenerates a complete project structure with Effect services, configuration management, testing setup, and example agent implementations.",
    keyFeatures: [
      "Rapid project scaffolding",
      "Best practices built in",
      "Effect service architecture",
      "Testing setup included",
      "Example agent implementations",
    ],
    status: "active",
  },
];

export function getEffectHubProjectById(id: string): EffectHubProject | undefined {
  return EFFECT_HUB_PROJECTS.find((project) => project.id === id);
}

export function getCenterpieceProject(): EffectHubProject {
  // EffectPatterns is always the first project
  return EFFECT_HUB_PROJECTS[0]!;
}
