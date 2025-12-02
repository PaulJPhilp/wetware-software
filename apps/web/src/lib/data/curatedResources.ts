import type { ResourceCategory } from "./resourceTypes";

export const CURATED_RESOURCES: ResourceCategory[] = [
  {
    title: "Resources for Learning Effect.ts",
    description:
      "A curated collection of official documentation, community guides, tutorials, and video content to help you master Effect-TS.",
    resources: [
      // Official Documentation and Guides
      {
        title: "Official Effect Documentation",
        url: "https://effect.website/docs",
        description:
          "The official docs provide a sequential learning path from fundamental concepts to advanced topics, covering everything from basic usage to error handling, concurrency, streams, and more. It's an ideal starting point for beginners and remains an authoritative reference for advanced use cases, with comprehensive guides and an API reference.",
        type: "Official Docs",
        authorSource: "Effect Team",
      },
      {
        title: "Effect Solutions (Idiomatic Guide)",
        url: "https://www.effect.website/solutions",
        description:
          "A community-maintained, high-level guide focused on teaching idiomatic Effect patterns. It offers prescriptive best practices for structuring Effect.ts applications (e.g., dependency injection with services/layers, data modeling, error handling, testing, etc.), helping developers write production-grade code in an idiomatic style.",
        type: "Idiomatic Guide",
        authorSource: "Kit Langton et al.",
      },
      {
        title: "Effect Playground (Interactive Sandbox)",
        url: "https://effect.website/playground",
        description:
          "An interactive coding environment embedded in the official site. It lets you experiment with Effect-TS code right in your browser – great for hands-on learning. You can write and run Effect programs, share code snippets, and even visualize execution traces in real-time through the built-in trace viewer, which is invaluable for understanding how effects execute and interact.",
        type: "Interactive Tool",
        authorSource: "Effect Team",
      },
      // Libraries
      {
        title: "effect-json",
        url: "https://github.com/PaulJPhilp/effect-json",
        description:
          "Type-safe and sound JSON parsing and stringification with Effect. Provides robust error handling for JSON operations with full type safety, schema validation, and composable operations that integrate seamlessly with Effect pipelines.",
        type: "Library",
        authorSource: "PaulJPhilp",
        githubRepo: "PaulJPhilp/effect-json",
      },
      // Tutorials and Blog Posts
      {
        title: "A Gentle Introduction to Effect TS",
        url: "https://mavnn.co.uk/effect-ts-intro/",
        description:
          "A beginner-friendly tutorial that introduces Effect-TS from the perspective of a TypeScript developer. It explains the core Effect type (as a safer replacement for Promise) and fundamental concepts like generators, hot vs. cold effects, and pipelines in a familiar async/await style.",
        type: "Blog Post",
        authorSource: "Mavnn",
      },
      // Video Content
      {
        title: "Effect Days Conference Talks (YouTube)",
        url: "https://www.youtube.com/@Effect-TS/playlists",
        description:
          "Talks from official Effect Days conferences (2024 & 2025) covering a wide range of topics from basics to advanced use cases, presented by core team members and community users.",
        type: "Video Series",
        authorSource: "Effect-TS Official",
      },
      // Community Forums and Discussions
      {
        title: "Effect Discord Community",
        url: "https://discord.gg/effect-ts",
        description:
          "The official Effect-TS Discord server is very active and welcoming to developers of all levels. It's the best place to ask questions, get help, and discuss ideas in real time with the core team and community.",
        type: "Community Forum",
        authorSource: "Effect Team",
      },
    ],
  },
  {
    title: "Resources for AI Coding",
    description:
      "A curated collection of guides, frameworks, and tools for building robust AI-powered applications with TypeScript.",
    resources: [
      // Beginner-Friendly AI Resources
      {
        title: "GitHub Copilot (Free Plan)",
        url: "https://github.com/features/copilot/",
        description:
          "Popular AI pair-programmer integrated into VS Code, offering intelligent code completions and chat assistance. Great for boilerplate, function generation, and learning new APIs.",
        authorSource: "GitHub",
        type: "Coding Assistant",
      },
      {
        title: "Codeium (Free for Individuals)",
        url: "https://codeium.com/",
        description:
          "A completely free alternative to Copilot, supporting 70+ languages (including JS/TS) with fast, context-aware code suggestions. Plugs into major IDEs.",
        authorSource: "Codeium",
        type: "Coding Assistant",
      },
      {
        title: "Amazon CodeWhisperer (Free for Personal Use)",
        url: "https://aws.amazon.com/codewhisperer/",
        description:
          "AWS's AI coding companion offering real-time suggestions and security scans. Free for individual developers, including commercial use.",
        authorSource: "Amazon AWS",
        type: "Coding Assistant",
      },
      {
        title: "Tabnine (Community Edition)",
        url: "https://www.tabnine.com/",
        description:
          "One of the original AI code completion tools, focusing on probabilistic suggestions and privacy. Free basic version supports single-line completions and can run locally.",
        authorSource: "Tabnine",
        type: "Coding Assistant",
      },
      {
        title: "Replit Ghostwriter (Free Tier)",
        url: "https://replit.com/site/ghostwriter",
        description:
          "An AI assistant built into Replit's online IDE for code suggestions and explanations. Helpful for beginners doing quick experiments in the browser.",
        authorSource: "Replit",
        type: "Coding Assistant",
      },
      {
        title: "ChatGPT (OpenAI Free)",
        url: "https://chat.openai.com/",
        description:
          "OpenAI's conversational AI for generating code snippets, getting explanations, or debugging errors via a free web interface (GPT-3.5 and limited GPT-4.5).",
        authorSource: "OpenAI",
        type: "Q&A / Generator",
      },
      // Testing, Debugging, and QA Tools
      {
        title: "CodiumAI (Qodó)",
        url: "https://www.codium.ai/",
        description:
          "AI test-generation assistant that analyzes source code and suggests unit tests and edge-case scenarios. Helps write thorough tests with less effort.",
        authorSource: "CodiumAI",
        type: "Testing Tool",
      },
      {
        title: "AI-Augmented Testing (Various Tools)",
        url: "https://github.com/topics/ai-testing",
        description:
          "Covers new QA tools (e.g., Copilot for tests, Bug0) that use AI to make testing easier, generating test cases and even self-healing flaky tests. Many have free tiers.",
        authorSource: "Community / Various",
        type: "Testing Tool",
      },
      {
        title: "PythonTutor JavaScript Visual Debugger (with AI Tutor)",
        url: "https://pythontutor.com/javascript.html#mode=edit",
        description:
          "Run JS/TS code step-by-step in your browser and get plain-language explanations from an AI Tutor – perfect for understanding what your code is doing and why a bug happens.",
        authorSource: "Philip Guo",
        type: "Debugging Tool",
      },
      {
        title: "TrackJS AI Debugger (Free Tier)",
        url: "https://trackjs.com/features/ai-powered-debugger",
        description:
          "For runtime JavaScript errors, this AI-powered debugger explains errors and suggests fixes, translating cryptic stack traces into human-readable diagnoses. Free tier available.",
        authorSource: "TrackJS",
        type: "Debugging Tool",
      },
      {
        title: "CodeGPT Extension (VS Code)",
        url: "https://marketplace.visualstudio.com/items?itemName=carloslazo.codegpt",
        description:
          "Open-source VS Code extension integrating with OpenAI's API (using your free credits). Highlight code to ask for explanations, bug fixes, or rewrites directly in your IDE.",
        authorSource: "Carlos Lazo",
        type: "IDE Extension",
      },
      // Learning Communities and Tutorials
      {
        title: "OpenAI Discord (Developers' Corner)",
        url: "https://discord.gg/openai",
        description:
          "The official OpenAI Discord server for discussing ChatGPT, GPT-4/5, API support, prompt engineering, and showcasing projects. Ask questions and get help from other developers.",
        authorSource: "OpenAI",
        type: "Community Forum",
      },
      {
        title: "Learn AI Together Discord",
        url: "https://discord.gg/learn-ai-together",
        description:
          "A large community-driven server focused on making AI learning accessible to all levels. Features Q&A, project collaboration, tutorials, and study groups.",
        authorSource: "AI Enthusiasts",
        type: "Community Forum",
      },
      {
        title: "Learn Prompting Discord",
        url: "https://discord.gg/learnprompting",
        description:
          "A community devoted to prompt engineering. Provides courses, a prompt \"hall of fame,\" and an AI assistant to teach prompt testing. Great for effective AI interactions.",
        authorSource: "Learn Prompting",
        type: "Community Forum",
      },
      {
        title: "freeCodeCamp AI Guides",
        url: "https://www.freecodecamp.org/news/tag/ai/",
        description:
          "Comprehensive guides and tutorials on integrating AI into testing workflows, using AI for coding, debugging, and more. Excellent free resource for beginner-friendly walkthroughs.",
        authorSource: "freeCodeCamp",
        type: "Tutorials/Guides",
      },
      {
        title: "Codecademy & Dev.to Cheat Sheets",
        url: "https://www.codecademy.com/resources/blog/openai-api-javascript-cheat-sheet/",
        description:
          "Hands-on introductions and cheat sheets for quickly learning how to call AI APIs from Node.js or use libraries like TensorFlow.js. Great for practical quick-starts.",
        authorSource: "Codecademy / Dev.to",
        type: "Tutorials/Guides",
      },
      // Advanced AI Resources for Senior Engineers
      // Advanced Coding & Code Analysis Tools
      {
        title: "Cursor (AI-Integrated IDE)",
        url: "https://cursor.sh/",
        description:
          "An AI-first code editor with deep AI integration for inline completions, interactive chat, and agent mode to automate multi-step coding tasks. Free tier available.",
        authorSource: "Cursor",
        type: "IDE Extension",
      },
      {
        title: "CodeGeeX (Open Source)",
        url: "https://github.com/THUDM/CodeGeeX",
        description:
          "Open-source AI code assistant supporting 20+ languages for code generation and translation. A powerful free option for open models and multilingual support.",
        authorSource: "Tsinghua University",
        type: "Coding Assistant",
      },
      {
        title: "CodeRabbit (AI Code Reviews)",
        url: "https://coderabbit.ai/",
        description:
          "AI-powered code review assistant integrating with VS Code and GitHub/GitLab. Automatically reviews pull requests and suggests one-click fixes. Free tier for reviews.",
        authorSource: "CodeRabbit",
        type: "Code Review",
      },
      // AI-Powered Testing and Quality at Scale
      {
        title: "Smart Test Generation (Copilot, Qodó)",
        url: "https://github.com/features/copilot/for-docs/",
        description:
          "AI tools that continuously learn from your codebase to generate smart test suites covering edge cases. Accelerates coverage and uncovers bugs early.",
        authorSource: "Various (GitHub, CodiumAI)",
        type: "Testing Tool",
      },
      {
        title: "Autonomous QA Agents (Bug0, etc.)",
        url: "https://bug0.ai/",
        description:
          "AI QA platforms for E2E testing and regression checks. Self-healing test tools dynamically adapt scripts when UI/data changes, reducing flaky tests. Many free community versions.",
        authorSource: "Various",
        type: "Testing Tool",
      },
      // Architecture and Design Assistance
      {
        title: "AI-Assisted Architecture Refactoring",
        url: "https://github.com/topics/ai-software-architecture",
        description:
          "AI assists in analyzing and improving large systems by detecting anti-patterns and suggesting fixes. AI becomes a design reviewer for complex refactoring.",
        authorSource: "Various",
        type: "Architecture Tool",
      },
      {
        title: "Guided System Design with Prompts",
        url: "https://www.freecodecamp.org/news/how-to-do-system-design-with-ai/",
        description:
          "Generative AI as a brainstorming partner for system architects. Detailed prompts yield surprisingly useful designs, identifying bottlenecks or enumerating options.",
        authorSource: "Various",
        type: "Design Assistant",
      },
      // DevOps and Infrastructure Automation
      {
        title: "HolmesGPT (AI Ops Assistant)",
        url: "https://github.com/robusta-dev/holmesgpt",
        description:
          "Open-source on-call DevOps agent for Kubernetes, troubleshooting infra issues and providing automated analysis of alerts. Reduces MTTR on incidents.",
        authorSource: "Robusta.dev",
        type: "DevOps Tool",
      },
      {
        title: "Merlinn (Vespper) AI On-call Agent",
        url: "https://github.com/vespper-ai/merlinn",
        description:
          "Open-source AI agent for on-call scenarios, assisting developers in triaging incidents in real-time in Slack. Improves on-call experience by handling routine diagnosis.",
        authorSource: "Vespper AI",
        type: "DevOps Tool",
      },
      {
        title: "CI/CD Pipeline Automation (AI-assisted)",
        url: "https://github.com/features/copilot/github-actions-automation",
        description:
          "AI embedded in deployment pipelines to automate DevOps tasks like auto-generating IaC or validating configs. Integrates with GitHub Actions, Azure DevOps, AWS CodePipeline.",
        authorSource: "Various",
        type: "DevOps Tool",
      },
      {
        title: "Open-Source LLMs for DevOps",
        url: "https://aws.amazon.com/blogs/machine-learning/use-open-source-llama-2-models-to-build-generative-ai-applications-with-amazon-sagemaker-jumpstart/",
        description:
          "Powerful open models (Llama 3, Mistral) run on-premises for DevOps. Integrate AI into logging stacks to detect anomalies or build intelligent alerting systems. Free (requires compute).",
        authorSource: "Various (Meta, Mistral, Elastic)",
        type: "DevOps Tool",
      },
      // Integrating AI into Applications (for JS/TS Devs)
      {
        title: "Hugging Face Transformers.js",
        url: "https://huggingface.co/docs/transformers.js",
        description:
          "Open-source library to run Hugging Face Transformer models directly in JavaScript (Node/browser). Integrate features like AI chatbots, summarization, or image recognition into products.",
        authorSource: "Hugging Face",
        type: "Library",
      },
      {
        title: "TensorFlow.js",
        url: "https://www.tensorflow.org/js",
        description:
          "Google's open-source library for running and training ML models in JavaScript. Build neural networks or use pre-trained models for tasks like image classification in Node/browser.",
        authorSource: "Google",
        type: "Library",
      },
      {
        title: "Community Projects & Boilerplates (GitHub)",
        url: "https://github.com/topics/openai-chatbot",
        description:
          "Numerous GitHub projects and boilerplates as examples of AI integration in JS. Learn how others structure prompts, handle API rate limits, and manage model outputs in a type-safe way.",
        authorSource: "Community",
        type: "Community Projects",
      },
    ],
  },
];

