# Phase 03 — Frontend Skeleton

## Goal
Empty Next.js 16.x app skeleton in `apps/web` with standalone output, api wrapper, Dockerfile. No pages beyond default landing.

## Files to create
- `apps/web/*` via: `pnpm create next-app@latest apps/web --typescript --tailwind --app --src-dir --import-alias "@/*" --eslint --use-pnpm --turbopack` (Next 16.x, React 19, Tailwind v4)
- `apps/web/next.config.ts` — `output: "standalone"`
- `apps/web/src/lib/api.ts` — fetch wrapper: env base URL, Bearer injection param, typed `ApiError`, no hardcoded host
- `apps/web/.env.example` (+ `.env.local` gitignored) — `NEXT_PUBLIC_API_URL` (browser) vs `API_URL` (server-side) split
- `apps/web/Dockerfile` — multi-stage node:22-alpine: deps (frozen lockfile) → build → runner executing `server.js` (standalone)
- Root `pnpm-workspace.yaml` already covers `apps/*` (Phase 01)

## Steps
1. Run create-next-app with exact flags; verify Tailwind v4 + src-dir layout.
2. Set `output: standalone` in next.config.ts.
3. Add `src/lib/api.ts` wrapper + HttpOnly-cookie guidance comment (cookies set by API, never JS-accessible tokens).
4. Add env files with public/server URL split.
5. Write Dockerfile; wire compose web service (`depends_on: api`).

## Acceptance
- `pnpm --filter web build` green; standalone `.next/standalone/server.js` produced.
- Landing page renders; no fetch calls at build time.
- `api.ts` reads base URL from env; throws typed `ApiError` on non-2xx.

## Rollback
Delete `apps/web/`; remove web service from compose; `pnpm install` to refresh lockfile.
