export async function register() {
    // Instrumentation setup for development and production
    // This file is required by Next.js when instrumentation is enabled
}

export async function onRequestError(err: any, request: any, context: any) {
    // Handle request errors
    console.error('Request error:', err);
}