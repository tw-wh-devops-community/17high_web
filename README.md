# 17High

[![Build Status](https://travis-ci.org/tw-wh-devops-community/17high_web.svg?branch=development)](https://travis-ci.org/tw-wh-devops-community/17high_web)

## CI & Test environment
[CI](http://52.80.48.188:18080/job/17high/view/delivery-pipeline/) is host on aws china with Jenkins

[Test Environment](http://52.80.48.188:8081)

## Requirement:

[Docker](https://docs.docker.com/docker-for-mac/install/#download-docker-for-mac) is installed;

Java8 is installed

## install front develop dependency
```
Enter src/websrc, read README.md and prepare front-end develop environment
And then You need to do nothing but read  'Run Spring boot on local' section.
```
## Run Spring boot on local

~~~
./localrun.sh
This script contains 'yarn bundle-watch' and './gradlew bootRun',so springboot will start, and react will automatic compile.
~~~
You don't need start mysql on local manually. bootRun will start a local h2 database for development.

## Run dode check
~~~
./gradlew check
~~~

## Run backend unit test alone
~~~
./gradlew test
~~~

## Run backend integration test alone
~~~
./gradlew integration
~~~
integration test will use h2 in memory database as its data backbone.

## Run Mysql on local Docker
you can run
```
./startMysql.sh
```

## Page URLs

~~~~
default page: /#/screen
screen page: /#/screen
list page: /#/home
add event page: /#/editor
~~~~

## EC2 On and Off Travis Jobs
[Travis jobs](https://www.travis-ci.org/) build on two branches, one is for start and the other one is for stop.
ps: please make sure you have access of [on-and-off repo](https://github.com/tw-wh-devops-community/17high_web_on_off.git)

## AWS login url
[Wuhan Devops AWS Login Console](https://735490473697.signin.amazonaws.cn/console)