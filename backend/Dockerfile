FROM openjdk:11-jdk-slim

WORKDIR /app

# Copiar o arquivo JAR do Spring Boot para o container
COPY out/artifacts/backend_jar/backend.jar app.jar

# Expor a porta 8080 para o Spring Boot
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
