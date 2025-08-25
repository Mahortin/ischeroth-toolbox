# Stage 1: Build JAR (optional if you want multi-stage)
# FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
# WORKDIR /app
# COPY . .
# RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Copy pre-built JAR from target folder (you can automate this with the build stage above)
COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]