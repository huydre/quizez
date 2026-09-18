# ---- build ----
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY apps/api/gradlew apps/api/gradlew.bat ./
COPY apps/api/gradle ./gradle
COPY apps/api/settings.gradle.kts apps/api/build.gradle.kts ./
RUN ./gradlew dependencies --no-daemon -q || true
COPY apps/api/src ./src
RUN ./gradlew bootJar --no-daemon -x test

# ---- runtime ----
FROM eclipse-temurin:21-jre
WORKDIR /app
RUN useradd -r -u 1001 quizez
COPY --from=build /app/build/libs/*.jar app.jar
USER quizez
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
