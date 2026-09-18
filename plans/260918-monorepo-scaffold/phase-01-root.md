# Phase 01 — Root Workspace

## Goal
Root monorepo plumbing: pnpm workspace, ignores, env template, README, compose with db/api/web.

## Files to create
- `package.json` — private root, scripts (`dev`, `build`), packageManager pnpm@10
- `pnpm-workspace.yaml` — packages: `apps/*`, `packages/*`
- `.npmrc` — frozen-lockfile / shamefully-hoist defaults
- `.gitignore` — node, next, gradle build, .env, docker leftovers
- `.dockerignore` — node_modules, .git, build outputs
- `.env.example` — POSTGRES_*, SPRING_DATASOURCE_*, JWT_*, NEXT_PUBLIC_API_URL, API_URL
- `README.md` — prereqs (Java 21, Node 22, pnpm 10, Docker 29), quickstart (compose up), repo map
- `docker-compose.yml` — services db (postgres:16-alpine, pg_isready healthcheck, volume), api (build apps/api, depends_on db healthy, env datasource/JWT, port 8080), web (build apps/web, depends_on api, port 3000)

## Steps
1. Write package.json + pnpm-workspace.yaml + .npmrc.
2. Write .gitignore + .dockerignore + .env.example.
3. Write README.md skeleton section.
4. Write docker-compose.yml with healthchecks + env wiring.
5. Validate: `pnpm install --dry-run` (lockfile resolves), `docker compose config` parses.

## Acceptance
- `docker compose config` succeeds; db has healthcheck, api `depends_on: db healthy`.
- `.env.example` covers every env var referenced in compose.
- No app code touched.

## Rollback
Delete root files listed above; nothing else depends on them yet.
