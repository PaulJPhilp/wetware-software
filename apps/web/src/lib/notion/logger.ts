// lib/notion/logger.ts
/**
 * Structured logging for Notion operations
 * Provides consistent logging with proper log levels and context
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogContext = {
  [key: string]: unknown;
};

/**
 * Structured logger for Notion operations
 */
export const logger = {
  debug: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[NOTION:DEBUG] ${message}`, context ? JSON.stringify(context, null, 2) : "");
    }
  },

  info: (message: string, context?: LogContext) => {
    console.log(`[NOTION:INFO] ${message}`, context ? JSON.stringify(context, null, 2) : "");
  },

  warn: (message: string, context?: LogContext) => {
    console.warn(`[NOTION:WARN] ${message}`, context ? JSON.stringify(context, null, 2) : "");
  },

  error: (message: string, error?: Error | unknown, context?: LogContext) => {
    const errorInfo =
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : { error };

    const logContext = { ...errorInfo, ...context };
    console.error(`[NOTION:ERROR] ${message}`, JSON.stringify(logContext, null, 2));
  },

  // Specific loggers for different operations
  query: {
    start: (operation: string, context?: LogContext) => {
      logger.debug(`Starting ${operation}`, context);
    },

    success: (operation: string, resultCount?: number, context?: LogContext) => {
      logger.debug(`Completed ${operation}`, {
        resultCount,
        ...context,
      });
    },

    error: (operation: string, error: Error | unknown, context?: LogContext) => {
      logger.error(`Failed ${operation}`, error, context);
    },
  },

  parsing: {
    warn: (message: string, pageId?: string, context?: LogContext) => {
      logger.warn(`Parsing warning: ${message}`, {
        pageId,
        ...context,
      });
    },

    error: (message: string, pageId?: string, error?: Error | unknown, context?: LogContext) => {
      logger.error(`Parsing error: ${message}`, error, {
        pageId,
        ...context,
      });
    },

    skip: (reason: string, pageId?: string, context?: LogContext) => {
      logger.warn(`Skipping page: ${reason}`, {
        pageId,
        ...context,
      });
    },
  },

  cache: {
    hit: (key: string) => {
      logger.debug(`Cache hit for key: ${key}`);
    },

    miss: (key: string) => {
      logger.debug(`Cache miss for key: ${key}`);
    },

    set: (key: string, ttl?: number) => {
      logger.debug(`Cache set for key: ${key}`, { ttl });
    },
  },
};

/**
 * Performance timer utility
 */
export function createTimer() {
  const start = Date.now();

  return {
    elapsed: () => Date.now() - start,

    end: (operation: string, context?: LogContext) => {
      const elapsed = Date.now() - start;
      logger.debug(`${operation} completed in ${elapsed}ms`, context);
      return elapsed;
    },
  };
}

/**
 * Function wrapper for automatic logging
 */
export function withLogging<T extends (...args: unknown[]) => unknown>(
  fn: T,
  operationName: string
): T {
  return ((...args: Parameters<T>) => {
    const timer = createTimer();
    logger.query.start(operationName, { args });

    try {
      const result = fn(...args);

      // Handle async functions
      if (result instanceof Promise) {
        return result
          .then((value) => {
            timer.end(operationName);
            logger.query.success(operationName, undefined, { args });
            return value;
          })
          .catch((error) => {
            timer.end(operationName);
            logger.query.error(operationName, error, { args });
            throw error;
          });
      }

      // Handle sync functions
      timer.end(operationName);
      logger.query.success(operationName, undefined, { args });
      return result;
    } catch (error) {
      timer.end(operationName);
      logger.query.error(operationName, error, { args });
      throw error;
    }
  }) as T;
}
