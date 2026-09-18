# Research — Frontend Scout (reconstructed 260918)

Source: Research summary in planner context (no new findings).

- `pnpm create next-app@latest apps/web --typescript --tailwind --app --src-dir --import-alias "@/*" --eslint --use-pnpm --turbopack` → Next 16.x, React 19, Node 22, Turbopack, Tailwind v4.
- Root: private `package.json` + `pnpm-workspace.yaml` (`apps/*`, `packages/*`) + `.npmrc`.
- `src/lib/api.ts`: fetch wrapper with env base URL, Bearer injection, typed `ApiError`; HttpOnly-cookie guidance (tokens never in JS).
- `next.config.ts`: `output: standalone`; multi-stage `node:22-alpine` Dockerfile (frozen lockfile, run standalone `server.js`).
- Compose web: `depends_on: api`; `NEXT_PUBLIC_API_URL` (browser) vs `API_URL` (server-side) split.
