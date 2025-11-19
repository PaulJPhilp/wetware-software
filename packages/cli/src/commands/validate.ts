import { Console, Effect } from "effect";
import { validate } from "effect-env";
import { rawEnvSchema } from "../env";

/**
 * Validate environment variables command
 */
const validateOptions = Options.boolean("verbose").pipe(
  Options.withDefault(false),
  Options.withDescription("Enable verbose output")
);

export const validateCommand = Command.make("validate", { validateOptions }).pipe(
  Command.withDescription("Validate environment variables"),
  Command.withHandler(({ validateOptions: verbose }) =>
    Effect.gen(function* () {
      if (verbose) {
        yield* Console.log("🔍 Validating environment variables...");
      }

      // Validate environment variables
      yield* validate(rawEnvSchema, process.env);

      if (verbose) {
        yield* Console.log("✅ All environment variables are valid");
      } else {
        console.log("✅ Environment variables are valid");
      }
    })
  )
);
