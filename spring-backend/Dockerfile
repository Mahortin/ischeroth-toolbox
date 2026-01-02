# --- build stage ---
    FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
    WORKDIR /app
    
    # Copy only build descriptors first for caching
    COPY pom.xml ./
    COPY mvnw ./
    COPY .mvn .mvn
    RUN chmod +x mvnw
    
    # Download dependencies (cache layer)
    RUN ./mvnw -q -DskipTests dependency:go-offline
    
    # Copy sources and build
    COPY src ./src
    RUN ./mvnw -DskipTests package
    
    # --- runtime stage ---
    FROM eclipse-temurin:21-jre-alpine
    WORKDIR /app
    
    COPY --from=builder /app/target/*.jar app.jar
    EXPOSE 8080
    ENTRYPOINT ["java", "-jar", "app.jar"]
    