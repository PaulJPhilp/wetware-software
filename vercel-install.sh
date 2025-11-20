#!/bin/bash
set -e

# Navigate to root (parent of apps/web)
cd "$(dirname "$0")"

echo "Installing dependencies with Bun..."
bun install --frozen-lockfile
