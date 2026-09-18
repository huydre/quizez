# Monorepo Scaffold Plan (260918)

Empty-structure scaffold for Spring Boot + Next.js monorepo. No business logic.

## Stack (pinned)

- Backend: Spring Boot 4.1.x, Java 21, Gradle Kotlin DSL (`apps/api`), feature packages under `com.quizez.api`
- Frontend: Next.js 16.x + TS + Tailwind v4 + pnpm workspace (`apps/web`), Node 22
- DB: Postgres 16 via docker-compose (`pg_isready` healthcheck)
- Auth: self-issued JWT via Spring Security + Nimbus — dependency + config wiring only, no code
- Env: Java 21, Node 22, pnpm 10, Docker 29, macOS arm64

## Phases

| # | File | Scope |
|---|------|-------|
| 01 | phase-01-root.md | pnpm workspace, git/docker ignores, `.env.example`, README, compose (db/api/web) |
| 02 | phase-02-backend.md | Gradle skeleton, wrapper, deps, package skeleton, `application.yml`, Flyway V1 (empty), Dockerfile |
| 03 | phase-03-frontend.md | create-next-app, standalone config, `src/lib/api.ts`, Dockerfile, env files |
| 04 | phase-04-ci-verify.md | GitHub Actions (build both, compose build), acceptance runbook |

## Global acceptance

- `./gradlew build` green, `pnpm build` green, `compose up` healthy
- `GET /actuator/health` UP + web landing reachable
- No code beyond skeleton (ApiApplication + health endpoint + api.ts wrapper)

## Research inputs

- `research/backend-scout.md`, `research/frontend-scout.md` (reconstructed summaries)
