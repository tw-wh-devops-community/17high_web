#!/usr/bin/env bash

function cleanup {
    webpackPids=$(ps aux | grep "webpack-dev-server" | awk '{ print $2 }')
    count=0
    echo "begin closing"
    if [ -n "${webpackPids}" ]; then
        echo "Killing existing webpack background process with PID [${webpackPids}]"
        for pid in $webpackPids
        do
            count=`expr $count + 1`
            echo $pid
            kill -9 $pid
        done
        echo "things being closed:${count}"
    fi
    echo "end closing"
}
cleanup
trap cleanup EXIT
