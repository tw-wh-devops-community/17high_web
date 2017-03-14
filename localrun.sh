#!/usr/bin/env bash
source shutdownHtmlWatch.sh

cd src/websrc
yarn bundle-watch &
cd ./../..
./gradlew clean bootRun