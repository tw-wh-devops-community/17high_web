#!/usr/bin/env bash
docker-machine create --driver virtualbox mysql

eval $(docker-machine env mysql)

docker run \
    --name mysql \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=5ecret \
    -e MYSQL_USER=17high \
    -e MYSQL_PASSWORD=17high \
    -e MYSQL_DATABASE=17high \
    -d \
    mysql:5.7 \
    --character-set-server=utf8mb4 \
    --collation-server=utf8mb4_unicode_ci

exit 0