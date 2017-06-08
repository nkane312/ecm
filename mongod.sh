#!/bin/bash

mongod=/var/www/html/ecm/MongoDB/Server/3.2/bin/mongod.exe
mongod_data=/var/www/html/ecm/data/db
prog=mongod.sh
RETVAL=0

stop() {
    grep_mongo=`ps aux | grep -v grep | grep ${mongod}`
    if [ ${#grep_mongo} -gt 0 ]
    then
	echo "Stop MongoDB."
	PID=`ps ax | grep -v grep | grep ${mongod} | awk '{ print $1 }'`
	`kill -2 ${PID}`
	RETVAL=$?
    else
	echo "MongoDB is not running."
    fi
}
start() {
    grep_mongo=`ps aux | grep -v grep | grep ${mongod}`
    if [ -n "${grep_mongo}" ]
    then
	echo "MongoDB is already running."
    else
	echo "Start MongoDB."
	`mongod --dbpath ${mongod_data}`
	RETVAL=$?
    fi
}

case "$1" in
    start)
	start
	;;
    stop)
	stop
	;;
    restart)
	stop
	start
	;;
    *)
	echo $"Usage: $prog {start|stop|restart}"
	exit 1
esac

exit $RETVAL