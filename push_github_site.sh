#!/usr/bin/env bash

find . -name '.DS_Store' -type f -delete
git add .
if [ -z "$1" ]; then
	git commit -u -m "update website"
else
	git commit -u -m "update: $1"
fi

git push origin master

