FROM anapsix/alpine-java:jdk8

WORKDIR /root
ENV GRADLE_USER_HOME /gradle
ENV GRADLE_OPTS -Dorg.gradle.daemon=true
RUN apk update && \
    apk add nodejs && \
    npm install --global yarn && \
    wget -O gradle.zip http://services.gradle.org/distributions/gradle-3.4.1-bin.zip && \
    unzip gradle.zip && \
    rm gradle.zip && \
    ln -s "$HOME/gradle-3.4.1/bin/gradle" /sbin/gradle

WORKDIR /app

VOLUME ["/app", "/gradle"]
EXPOSE 8080
CMD ["bash"]