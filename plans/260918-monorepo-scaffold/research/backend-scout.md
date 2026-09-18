# Research — Backend Scout (reconstructed 260918)

Source: Research summary in planner context (no new findings).

- Gradle Kotlin DSL; pin `org.springframework.boot` 4.1.x + `io.spring.dependency-management`; Java toolchain 21.
- Commit gradle wrapper (`gradlew` + `gradle/wrapper/`); no maven/gradle preinstalled assumed.
- Layout: `com.quizez.api` with `config/common/auth/wordsets/paths/study/srs/infra` feature packages.
- Minimal deps: starter-web, starter-validation, starter-data-jpa, starter-security, starter-oauth2-resource-server, starter-actuator, postgresql, flyway, starter-test, testcontainers.
- Compose api: multi-stage `eclipse-temurin:21` build → jre; `depends_on: db healthy`; env-based datasource/JWT; `ddl-auto=validate` + flyway enabled.
- DB: `postgres:16-alpine` with `pg_isready` healthcheck.
