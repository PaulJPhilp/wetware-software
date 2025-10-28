# AI Service

Provides AI-powered text generation capabilities for the Wetware CLI, using Google's Gemini model to process and generate JSON responses for resources, sources, and series content.

## Capabilities

- **Resource Generation**: Convert resource content into structured JSON
- **Source Entity Generation**: Extract structured data from source blocks  
- **Series Generation**: Process series content into JSON format
- **Error Handling**: Comprehensive error types for different failure scenarios
- **Logging**: Optional verbose logging for debugging

## Usage

### Basic Usage

```typescript
import { AIService, AIServiceLive } from "./services/ai";
import { Effect } from "effect";

const program = Effect.gen(function* () {
  const ai = yield* AIService;
  
  const result = yield* ai.generateResourceJson({
    prompt: "Extract structured data from this resource",
    resourceBlock: "Your content here...",
    verbose: true
  });
  
  return result;
});

// Execute with live implementation
Effect.runPromise(
  program.pipe(Effect.provide(AIServiceLive))
);
```

### Configuration

The AI service requires a Google AI API key. It can be configured in two ways:

1. **Via EnvService** (recommended): Use the environment service for centralized configuration
2. **Direct environment variable**: Set `GOOGLE_AI_API_KEY` in your environment

## API Reference

### AIService

The main service interface with three methods:

- `generateResourceJson(args)`: Generate JSON from resource content
- `generateSourceEntityJson(args)`: Generate JSON from source entity content  
- `generateSeriesJson(args)`: Generate JSON from series content

Each method accepts:
- `prompt`: System prompt for the AI
- `resourceBlock/sourceBlock/seriesBlock`: Content to process
- `verbose?`: Enable verbose logging (optional)

### Error Types

- `AIServiceError`: Base error class
- `AICallError`: AI API call failures
- `AIConfigError`: Configuration issues
- `AIResponseError`: Invalid AI responses

## Testing

The service includes comprehensive test coverage:

- Unit tests for individual methods
- Integration tests with AI API
- Error handling validation
- Schema validation tests

Run tests with:
```bash
npm test -- ai
```

## Architecture

The service follows the standard service pattern:

- **api.ts**: Service interface definition
- **service.ts**: Live implementation with Effect.Service
- **types.ts**: TypeScript type definitions
- **errors.ts**: Custom error classes
- **schema.ts**: Effect schema validation
- **utils.ts**: Helper functions and utilities
- **index.ts**: Barrel exports and documentation

## Dependencies

- `@ai-sdk/google`: Google AI SDK integration
- `ai`: Core AI SDK
- `effect`: Effect system for error handling and composition
- `EnvService`: Optional environment configuration service
