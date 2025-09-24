// lib/notion/errors.ts
/**
 * Custom error classes for Notion API operations
 * Provides structured error handling with context information
 */

export class NotionError extends Error {
    public readonly context: Record<string, unknown>;

    constructor(message: string, context: Record<string, unknown> = {}) {
        super(message);
        this.name = "NotionError";
        this.context = context;
    }
}

export class NotionParsingError extends NotionError {
    constructor(message: string, context: Record<string, unknown> = {}) {
        super(message, context);
        this.name = "NotionParsingError";
    }
}

export class NotionQueryError extends NotionError {
    constructor(message: string, context: Record<string, unknown> = {}) {
        super(message, context);
        this.name = "NotionQueryError";
    }
}

export class NotionValidationError extends NotionError {
    public readonly property?: string;

    constructor(message: string, property?: string) {
        super(message, { property });
        this.name = "NotionValidationError";
        if (property !== undefined) {
            this.property = property;
        }
    }
}

export class NotionPropertyMissingError extends NotionError {
    constructor(propertyName: string, pageId?: string) {
        super(`Missing required property: ${propertyName}`, { property: propertyName, pageId });
        this.name = "NotionPropertyMissingError";
    }
}

export class NotionPropertyTypeError extends NotionError {
    constructor(propertyName: string, expectedType: string, actualType: string) {
        super(
            `Invalid property type for ${propertyName}. Expected: ${expectedType}, Got: ${actualType}`,
            { property: propertyName, expectedType, actualType }
        );
        this.name = "NotionPropertyTypeError";
    }
}