#!/bin/bash -x
cd "$(dirname ${BASH_SOURCE[0]})"/..
echo "Starting build"
docker run -v "$PWD":/mdn -w /mdn node:latest bash -c "rm -rf node_modules && /usr/local/bin/npm install && /usr/local/bin/npm run build"
if [ $? -eq 0 ]; then
    echo "Build finished"
    exit 0
else
    echo "Build failed" >&2
    exit 1
fi
