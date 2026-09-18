# Quizez

Vietnamese-first vocabulary learning web app — product spec repo (OpenQuiz-inspired).

## Docs

- `docs/explore/openquiz-ai-analysis.md` — deep-dive analysis of openquiz.ai (features, data ingestion, differentiators)
- `docs/user-stories/mvp-core-user-stories.md` — 18 user stories, MVP scope
- `docs/use-cases/` — 35 use cases (19 MVP + 16 phase 2), 13-field Wiegers/IIBA template

## Monorepo layout

- `apps/api` — Spring Boot 4.1.x (Java 21, Gradle Kotlin DSL)
- `apps/web` — Next.js 16 (TypeScript, Tailwind v4, pnpm)
- `packages/` — shared packages (future)
- `docs/` — product specs (analysis, user stories, use cases)

## Quickstart

Prereqs: Java 21, Node 22, pnpm 10, Docker 29.

```bash
cp .env.example .env
docker compose up --build
# api: http://localhost:8080/actuator/health
# web: http://localhost:3000
```

Local dev without Docker for the app tier:

```bash
docker compose up db          # postgres only
cd apps/api && ./gradlew bootRun
cd apps/web && pnpm dev
```
