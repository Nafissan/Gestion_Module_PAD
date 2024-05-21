FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD target/pss-backend-1.0-SNAPSHOT.jar /app.jar
CMD ["java","-jar","/app.jar","--spring.profiles.active=prod"]
EXPOSE 9080