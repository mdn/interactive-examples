#!/bin/bash

if [[ -z "$1" ]]; then
    echo "Bucket name required"
    exit 1
fi

SHORT_CACHE="--cache-control max-age=1800" # 30 minutes
LONG_CACHE="--cache-control max-age=2629800" # 1 month
ARGS="--acl public-read --delete ${@:2}"
cd docs

for path in pages live-examples; do
    aws s3 sync $path s3://$1/$path ${SHORT_CACHE} ${ARGS}
done

for path in css js; do
    aws s3 sync $path s3://$1/$path --exclude '*' --include 'editor-*' ${SHORT_CACHE} ${ARGS}
    aws s3 sync $path s3://$1/$path --exclude 'editor-*' ${LONG_CACHE} ${ARGS}
done

aws s3 sync media s3://$1/media ${LONG_CACHE} ${ARGS}
