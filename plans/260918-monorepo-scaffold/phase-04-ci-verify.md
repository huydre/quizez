# Phase 04 — CI + Verification

## Goal
CI builds both apps (no deploy) + manual acceptance runbook proving the scaffold is healthy end-to-end.

## Files to create
- `.github/workflows/ci.yml` — jobs: (1) `build-api`: setup Java 21 + `./gradlew build` in apps/api; (2) `build-web`: setup Node 22 + pnpm 10 + `pnpm --filter web build`; (3) `compose-build`: `docker compose build` (db/api/web). Trigger: push + PR. No deploy step.
- No app code changes; may add `scripts/verify.sh` (optional): gradlew build → pnpm build → compose up → curl checks.

## Steps
1. Write ci.yml with pinned toolchain versions (Java 21, Node 22, pnpm 10).
2. Push to branch; confirm all three jobs green.
3. Local acceptance: `docker compose up --build -d`, wait for healthy.
4. Curl `localhost:8080/actuator/health` → UP; open `localhost:3000` → landing renders.
5. `docker compose down -v` for clean state.

## Acceptance
- CI green on all three jobs; no deploy/migration side effects.
- `./gradlew build` green, `pnpm build` green, `compose up` all services healthy.
- Actuator health UP + web landing reachable from fresh clone with `.env` copied from example.

## Rollback
Delete `.github/workflows/ci.yml` (+ `scripts/verify.sh` if added); no infra persists beyond CI config.
