#!/usr/bin/env bash

function cleanup {
    webpackPids=$(ps aux | grep "webpack --watch" | awk '{ print $2 }')

    if [ -n "${webpackPids}" ]; then
        echo "Killing existing webpack background process with PID [${webpackPids}]"
        for pid in $webpackPids
        do
            echo $pid
            kill -9 $pid
        done
    fi
}
cleanup
trap cleanup EXIT
