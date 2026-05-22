# =========================
# BUILD STAGE
# =========================
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy project
COPY pom.xml .
COPY src ./src

# Build full project (backend + frontend via Maven plugin)
RUN mvn clean package -DskipTests


# =========================
# RUNTIME STAGE
# =========================
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy generated JAR
COPY --from=build /app/target/EmployeeApp-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8081

# Run Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
