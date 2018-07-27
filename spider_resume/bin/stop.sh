#!/bin/bash

cd $(dirname $0)

typeset BIN_DIR DEPLOY_DIR CONF_DIR
typeset SERVER_NAME SERVER_PROTOCOL SERVER_PORT LOGS_FILE

export BIN_DIR=$(pwd)
export DEPLOY_DIR=$(dirname $BIN_DIR)


if [ $(id -u) -ne 0 ];then  
    echo "only root can execute" 
	exit 1 
fi

# check PIDS
typeset PIDS
function check_pids()
{
    PIDS=$(ps -ef | grep python | grep "$DEPLOY_DIR" |grep -v "/server.sh"| grep -v grep | awk '{print $2}')
	if [ -z "$PIDS" ]; then
    	echo "ERROR: The $SERVER_NAME does not started!"
    	exit 1
	fi
}

#if [ "$1" != "skip" ]; then
#    $BIN_DIR/dump.sh
#fi

# kill 
function kill_pids()
{
	echo -e "Stopping the $SERVER_NAME ...\c"
	for PID in $PIDS ; do
    	kill $PID > /dev/null 2>&1
	done
}

# check if stop
function check_is_stopped()
{
	typeset -i COUNT=0
	while [ $COUNT -lt 1 ]; do    
    	echo -e ".\c"
    	sleep 1
    	COUNT=1
    	for PID in $PIDS ; do
			PID_EXIST=$(ps -ef | grep $PID |grep -v grep)
			if [ -n "$PID_EXIST" ]; then
            	COUNT=0
            	break
        	fi
    	done
	done

	echo "OK!"
	echo "PID: $PIDS"
}

function main(){
	check_pids
	kill_pids
	check_is_stopped
}

main

