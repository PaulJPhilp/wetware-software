# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo for the "Wetware & Software" blog, containing:
- **Web Application**: Next.js 15 blog powered by Notion CMS
- **CLI Tool**: Effect-TS based CLI for managing blog content in Notion
- **Shared Package**: Common utilities and types used across both applications

The blog explores the intersection of human systems and advanced AI, focusing on new paradigms of human-AI collaboration.

## Development Commands

### Running Development Servers
```bash
bun run dev:web        # Start Next.js web app (http://localhost:3000)
bun run dev:cli        # Start CLI in watch mode
```

### Building
```bash
bun run build:all      # Build everything (shared → web → cli)
bun run build:web      # Build web app only (includes prebuild check)
bun run build:cli      # Build CLI only
bun run build:shared   # Build shared package only
```

Note: Build order matters. Shared package must build before web or CLI.

### Testing
```bash
bun run test:cli       # Run CLI tests with Vitest
bun run test:all       # Currently same as test:cli
```

To run a single test file:
```bash
cd packages/cli && bun run vitest run src/path/to/file.test.ts
```

### Code Quality
```bash
bun run check          # Lint with Biome (no fixes)
bun run format         # Format all code with Biome
bun run lint:fix       # Auto-fix linting issues (includes unsafe fixes)
```

## Architecture

### Monorepo Structure
- **`apps/web/`**: Next.js 15 web application
  - Uses App Router with TypeScript
  - Notion API integration for content management
  - Tailwind CSS with fluid typography
  - React 19 with shadcn/ui components

- **`packages/cli/`**: CLI tool for content management
  - Built with Effect-TS for functional programming patterns
  - Uses `@effect/cli` for command structure
  - AI-powered content processing with Google Gemini
  - Vitest for testing

- **`packages/shared/`**: Shared utilities and types
  - Notion client setup (`createNotionClient`)
  - TypeScript types for Post, Series, Resource, SourceEntity
  - Focus areas: "Human-Centric", "Tech-Centric", "Human-AI Collaboration", etc.

### Data Flow
1. Content is stored in Notion databases (Posts, Series, Resources)
2. CLI tool manages content creation/updates via Notion API and AI assistance
3. Web app fetches and displays content from Notion at build/runtime
4. Shared package provides type safety across both applications

### Effect-TS Patterns (CLI)
The CLI is built using Effect-TS functional patterns:
- **Services**: Dependencies modeled as services (`OpenAI`, `Notion`) with layer-based DI
- **Effect.gen**: Business logic written with generator functions for sequential async code
- **Layers**: `OpenAIProviderLayer`, `NotionClientLayer` for dependency injection
- **Type Safety**: Full `Effect<Success, Error, Requirements>` type tracking

Example service usage pattern:
```typescript
const program = Effect.gen(function* () {
  const notion = yield* Notion;
  const result = yield* notion.someMethod();
  return result;
});
```

### Environment Variables
- `.env.local` required for Notion API credentials
- Web app runs prebuild check: `node scripts/check-env.mjs`
- CLI uses `dotenv` to load environment variables
- Required: `NOTION_API_KEY`, `BLOG_POSTS_DATABASE_ID`, `SERIES_DATABASE_ID`, `GOOGLE_AI_API_KEY`

### TypeScript Configuration
- Root `tsconfig.json` with path aliases:
  - `@/*` → `apps/web/src/*`
  - `@wetware/*` → `packages/*/src`
- Strict mode enabled across all packages
- Biome enforces `noExplicitAny: error` and type imports

## Coding Standards (from .cursor/rules)

### Effect-TS Best Practices
- **Use Effect.gen for business logic**: Write sequential async code with generator functions
- **Model dependencies as services**: Create services with `Effect.Service` and provide via layers
- **Type safety**: Leverage Effect's three-channel types `Effect<A, E, R>` for full error and dependency tracking
- **Use `pipe` for composition**: Chain operations with `pipe` for better readability

### General Principles
- **DRY**: Extract and reuse common logic instead of duplicating
- **Strict Typing**: Avoid `any`, use explicit return types, enable strict mode
- **Clear Naming**: Use domain-oriented names that express intent
- **Pure Functions**: Minimize side effects, prefer pure functions
- **Test Public Behavior**: Write tests for public interfaces, not implementation details

### Code Style
- Format with Biome (2 spaces, line width 100)
- Use `readonly` for immutable properties
- Prefer discriminated unions over loose types
- Use type imports: `import type { Foo } from 'bar'`

## Common Workflows

### Adding a New CLI Command
1. Create command file in `packages/cli/src/commands/`
2. Export command built with `@effect/cli` Command/Args/Options
3. Add command to root command in `packages/cli/src/index.ts`
4. Add test file `commandName.test.ts` using Vitest
5. Update types in `packages/shared/src/types.ts` if needed

### Adding a New Page to Web App
1. Create route in `apps/web/src/app/[route]/page.tsx`
2. Fetch data from Notion using utilities in `apps/web/src/lib/notion/`
3. Use shared types from `@wetware/shared`
4. Add tests in `apps/web/src/test/` if applicable

### Modifying Shared Types
1. Update `packages/shared/src/types.ts`
2. Run `bun run build:shared` to rebuild
3. Verify no breaking changes in CLI and web app
4. Update dependent code in both packages

## AI Prompts
The CLI uses AI prompts stored in `packages/cli/prompts/`:
- `addResources.txt` - Resource creation prompt
- `addSeries.txt` - Series creation prompt
- `addSource.txt` - Source addition prompt
- `addSourceEntity.txt` - Source entity creation prompt

These are loaded by the AI service and used with Google Gemini for content generation.

## Testing Strategy
- CLI: Unit tests with Vitest in `packages/cli/src/**/*.test.ts`
- Tests use Effect's testing utilities and mock services
- Web app: Tests in `apps/web/src/test/` (Vitest configured)
- Run tests before committing changes to CLI

## Deployment
- Web app configured for Vercel deployment
- Uses monorepo file tracing: `outputFileTracingRoot: "../../"`
- Build analyzer available: `bun run build:analyze` (web only)
- PWA support with Workbox configured
