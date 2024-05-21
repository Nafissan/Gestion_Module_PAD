FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD target/pss-backend-1.0-SNAPSHOT-jar-with-dependencies.jar /app.jar
CMD ["java","-jar","/app.jar","--spring.profile.active=prod"]
EXPOSE 9080