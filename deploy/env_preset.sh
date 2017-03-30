#!/usr/bin/env bash

aws cloudformation create-stack --stack-name Wuhan17high --template-body file://./deploy/templates/ec2_instance.json

if ! type "git" > /dev/null; then
    sudo yum -y install git
    git --version
fi

if ! type "docker" > /dev/null; then
    sudo rpm -iUvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
    sudo yum update -y
    sudo yum -y install docker-io
    sudo service docker start
    sudo chkconfig docker on
fi

if ! type "docker-compose" > /dev/null; then
    wget "https://github.com/docker/compose/releases/download/1.11.2/docker-compose-$(uname -s)-$(uname -m)"
    sudo mv ./"docker-compose-$(uname -s)-$(uname -m)" /usr/bin/docker-compose
    chmod +x /usr/bin/docker-compose
    docker-compose --version
fi

if [ -d "17high_web" ]; then
    cd 17high_web
    git clean -df
    git checkout .
    git checkout deploy
    git pull origin deploy
else
    git clone https://github.com/tw-wh-devops-community/17high_web.git
    cd 17high_web
    git checkout deploy
fi
