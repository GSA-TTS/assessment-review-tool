#!/bin/bash
# Validate the syntax of a directory of JSON files.

DIR_WITH_JSON="$1"

for file in "$DIR_WITH_JSON"/*.json; do
    if ! jq -e . "$file" > /dev/null 2>&1; then
	echo "file $file contains invalid JSON"
	exit 1
    fi
done
