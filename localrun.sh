#!/usr/bin/env bash
source shutdownHtmlWatch.sh

cd src/websrc
yarn install
yarn bundle-watch &
cd ./../..
./gradlew clean bootRun