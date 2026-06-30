# ─────────────────────────────────────────────────────────────
# Backend — Spring Boot (Java 17) ko'p bosqichli build
#  1) Maven bilan jar yig'iladi (test'siz)
#  2) Yengil JRE image'da ishga tushiriladi
# Build konteksti: ./backend (docker-compose'dan)
# ─────────────────────────────────────────────────────────────

# 1-bosqich: build
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /build
# Bog'liqliklar keshi (avval pom)
COPY pom.xml .
RUN mvn -q dependency:go-offline -DskipTests || true
COPY src ./src
RUN mvn -q clean package -DskipTests

# 2-bosqich: ishga tushirish
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /build/target/NSS-1.0.jar app.jar
EXPOSE 8000
ENTRYPOINT ["java", "-jar", "app.jar"]
