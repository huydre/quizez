#!/usr/bin/env bash
# Start db + api + web concurrently for local development.
set -euo pipefail
cd "$(dirname "$0")/.."

docker compose up -d db
trap 'docker compose stop' EXIT

(cd apps/api && ./gradlew bootRun --no-daemon) &
API_PID=$!
(cd apps/web && pnpm dev) &
WEB_PID=$!

wait $API_PID $WEB_PID
