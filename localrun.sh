#!/usr/bin/env bash
source shutdownHtmlWatch.sh

cd src/websrc
yarn install
yarn bundle-watch &
yarn server &
cd ./../..
./gradlew clean bootRun -Penv=dev
