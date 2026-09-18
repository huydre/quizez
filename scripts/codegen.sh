#!/usr/bin/env bash
# Regenerate contracts/openapi.yaml from the running API + TS client types.
# Requires the API running locally (scripts/dev.sh or compose).
set -euo pipefail
cd "$(dirname "$0")/.."

API_BASE="${API_BASE:-http://localhost:8080}"
curl -sf "$API_BASE/v3/api-docs" -o contracts/openapi.yaml
pnpm --filter @quizez/api-client codegen
echo "contracts/openapi.yaml + packages/api-client updated"
