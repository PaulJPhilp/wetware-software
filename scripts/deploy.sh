#!/usr/bin/env bash
set -euo pipefail

# Deploy script for wetware-software (monorepo)
# - Uses bunx if available, otherwise falls back to npx
# - Sources .env.local if present (but does not commit it)
# - Requires VERCEL_TOKEN to be set (or in .env.local)

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB_DIR="$REPO_ROOT/apps/web"
ENV_FILE="$REPO_ROOT/.env.local"

# Load .env.local if present
if [[ -f "$ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  set -a
  source "$ENV_FILE"
  set +a
fi

# Prefer bunx if available. Use --yes to confirm.
DEPLOY_BASE=(--prod --yes)
if [[ -n "${VERCEL_TOKEN:-}" ]]; then
  # use token flag when available
  if command -v bunx >/dev/null 2>&1; then
    DEPLOY_CMD=(bunx vercel "${DEPLOY_BASE[@]}" --token "$VERCEL_TOKEN")
  else
    DEPLOY_CMD=(npx vercel "${DEPLOY_BASE[@]}" --token "$VERCEL_TOKEN")
  fi
else
  # rely on CLI session (vercel login) or environment provided by OS
  if command -v bunx >/dev/null 2>&1; then
    DEPLOY_CMD=(bunx vercel "${DEPLOY_BASE[@]}")
  else
    DEPLOY_CMD=(npx vercel "${DEPLOY_BASE[@]}")
  fi
fi

cd "$WEB_DIR"
# Ensure a production build exists
if [[ ! -d ".next" ]]; then
  echo "No .next directory found; running bun run build"
  bun install || true
  bun run build
fi
# Create Vercel prebuilt output locally so we can deploy with --prebuilt.
if command -v vercel >/dev/null 2>&1; then
  echo "Running: vercel build (local, production target)"
  # vercel build will produce .vercel/output following the Build Output API
  # Build with production target to match the --prebuilt --prod deploy
  vercel build --prod
else
  echo "vercel CLI not found in PATH; cannot create prebuilt output. Proceeding to deploy without --prebuilt."
  # remove --prebuilt from the command
  DEPLOY_CMD=(${DEPLOY_CMD[@]//--prebuilt/})
fi

echo "Running vercel deploy (token hidden)"
"${DEPLOY_CMD[@]}"
