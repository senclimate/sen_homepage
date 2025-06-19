#!/usr/bin/env bash

rm -rf public resources
find . -name '.DS_Store' -type f -delete
git add .
if [ -z "$1" ]; then
	git commit -u -m "update website"
else
	git commit -u -m "update: $1"
fi

git push origin main
