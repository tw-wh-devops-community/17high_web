#!/usr/bin/env bash

aws cloudformation create-stack --stack-name Wuhan17high --template-body file://./deploy/templates/ec2_instance.json
aws cloudformation update-stack --stack-name Wuhan17high --template-body file://./deploy/templates/ec2_instance.json
aws cloudformation delete-stack --stack-name Wuhan17high

if ! type "git" > /dev/null; then
    sudo yum -y install git
    git --version
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
    export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
    export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    docker-compose stop
    docker-compose up -d
else
    git clone https://github.com/tw-wh-devops-community/17high_web.git
    cd 17high_web
    git checkout deploy
    export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
    export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    docker-compose up -d
fi





