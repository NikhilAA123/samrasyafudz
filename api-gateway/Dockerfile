# ---------- Build stage ----------
FROM eclipse-temurin:17-jdk AS builder

WORKDIR /workspace

COPY gradlew gradlew.bat ./
COPY gradle ./gradle
COPY build.gradle.kts settings.gradle.kts gradle.properties ./
COPY common-security ./common-security

RUN sed -i 's#distributionUrl=.*#distributionUrl=https\\://services.gradle.org/distributions/gradle-8.14-bin.zip#' gradle/wrapper/gradle-wrapper.properties

COPY api-gateway ./api-gateway

RUN sed -i 's/\r$//' gradlew && chmod +x gradlew && ./gradlew :api-gateway:bootJar --no-daemon

# ---------- Runtime stage ----------
FROM eclipse-temurin:17-jre

WORKDIR /app
COPY --from=builder /workspace/api-gateway/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]