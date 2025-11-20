#!/bin/bash
set -e

echo "Building web app..."
bun run build:web

echo "Build complete!"
