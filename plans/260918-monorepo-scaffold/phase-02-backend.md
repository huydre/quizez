# Phase 02 — Backend Skeleton

## Goal
Empty Spring Boot 4.1.x API skeleton (Gradle Kotlin DSL, Java 21) with package layout, config, Flyway placeholder, Dockerfile. No business logic.

## Files to create
- `apps/api/settings.gradle.kts`, `build.gradle.kts` — plugins: `org.springframework.boot` 4.1.x + `io.spring.dependency-management`; java toolchain 21
- `apps/api/gradle.properties` — version pins
- `gradlew` + `gradle/wrapper/` — committed wrapper (no local gradle assumed)
- Deps (build.gradle.kts): starter-web, starter-validation, starter-data-jpa, starter-security, starter-oauth2-resource-server, starter-actuator, postgresql, flyway-core, starter-test, testcontainers (test scope)
- `src/main/java/com/quizez/api/ApiApplication.java` + `config/`, `common/`, `auth/`, `wordsets/`, `paths/`, `study/`, `srs/`, `infra/` empty packages (package-info or placeholder only) + one health endpoint (actuator suffices; optional `@RestController` ping)
- `src/main/resources/application.yml` (+ `application-local.yml`) — datasource from env, `ddl-auto: validate`, `flyway.enabled: true`, actuator health exposure, JWT placeholder keys (no signing code)
- `src/main/resources/db/migration/V1__init.sql` — empty (comment header only)
- `apps/api/Dockerfile` — multi-stage: eclipse-temurin:21 build → jre runtime, `./gradlew bootJar`
- `apps/api/.dockerignore` (if needed beyond root)

## Steps
1. Generate start.spring.io-equivalent layout manually (or via curl) with pinned versions.
2. Commit wrapper; set toolchain 21.
3. Add dependency block per list above.
4. Create feature-package skeleton + ApiApplication + health exposure.
5. Write application.yml/local + empty V1 migration.
6. Write Dockerfile; wire compose api service env (Phase 01).

## Acceptance
- `./gradlew build` green; `GET /actuator/health` returns UP against compose db.
- Flyway validates empty V1 without error; `ddl-auto=validate`.
- No endpoints beyond health/actuator; no JWT signing code.

## Rollback
Delete `apps/api/`; remove api service from compose; remove backend env vars from .env.example.
