#!/bin/bash


cd $(dirname $0)
cd ..
typeset LOCAL_PATH=`pwd`
cd $(dirname $0)
SERVER_NAME=spider_resume

PIDS=$(ps -ef | grep "/${SERVER_NAME}/" | grep -v grep | awk '{print $2}')
if [ -z "$PIDS" ]; then
    echo "The $SERVER_NAME stopped!"  >> $LOCAL_PATH/stdout.log
    exit 0
else
    echo "The $SERVER_NAME running!"  >> $LOCAL_PATH/stdout.log
    exit 0
fi
