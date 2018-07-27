#!/bin/bash

cd $(dirname $0)
cd ..
LOCAL_PATH=`pwd`

SRC_PATH="$LOCAL_PATH/src/main.py"

nohup /usr/local/bin/python $SRC_PATH > /tmp/spider_chsi_START.log 2>&1 &