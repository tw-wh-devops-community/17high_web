#!/usr/bin/env sh
dockers=$(docker ps -a --format "{{.Names}}")
hasDocker="false"
for docker in $dockers
do
    if [ "$docker" = "local_mysql" ]
    then
        hasDocker="true"
        echo "Docker exists, starting"
        docker start local_mysql
    fi
done

if [ "$hasDocker" = "false" ]
then
    docker run \
        --name local_mysql \
        -p 3306:3306 \
        -e MYSQL_ROOT_PASSWORD=5ecret \
        -e MYSQL_USER=17high \
        -e MYSQL_PASSWORD=17high \
        -e MYSQL_DATABASE=17high \
        -d \
        mysql:5.7 \
        --character-set-server=utf8mb4 \
        --collation-server=utf8mb4_unicode_ci
fi
export MYSQL_HOST=127.0.0.1
export MYSQL_PORT=3306
export MYSQL_USER=17high
export MYSQL_PASSWORD=17high
export MYSQL_DATABASE=17high