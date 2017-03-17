#!/usr/bin/env sh

mysqlDockers=$(docker-machine ls | grep "mysql" | awk '{print $1":"$4}')
hasDocker="false"
for docker in $mysqlDockers
do
    name=$(echo $docker | cut -f 1 -d ":")
    state=$(echo $docker | cut -f 2 -d ":")

    if [ "$name" = "mysql" ]
    then
        if [ "$state" = "Stopped" ]
        then
            docker-machine start mysql
        elif [ "$state" = "Running" ]
        then
            hasDocker='true'
            echo "Mysql Docker VirtualBox is Running."
        fi
    fi
done

if [ "$hasDocker" = "false" ]
then
    docker-machine create --driver virtualbox mysql
fi

eval $(docker-machine env mysql)


dockers=$(docker ps -a --format "{{.Names}}")
hasDocker="false"
for docker in $dockers
do
    if [ "$docker" = "mysql" ]
    then
        hasDocker="true"
        echo "Docker exists, starting"
        docker start mysql
    fi
done

if [ "$hasDocker" = "false" ]
then
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
fi