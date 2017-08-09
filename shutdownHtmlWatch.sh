#!/usr/bin/env bash

function cleanup {
    webpackPids=$(ps aux | grep "^webpack --watch$" | awk '{ print $2 }')
    count=0
    echo "begin closing"
    if [ -n "${webpackPids}" ]; then
        echo "Killing existing webpack background process with PID [${webpackPids}]"
        for pid in $webpackPids
        do
            count = count + 1
            echo $pid
            kill -9 $pid
        done
        echo "things being closed:${pid}"
    fi
    echo "end closing"
}
cleanup
trap cleanup EXIT
