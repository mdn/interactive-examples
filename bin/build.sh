#!/bin/bash -x
cd "$(dirname ${BASH_SOURCE[0]})"/..
echo "Starting build"
docker run -v "$PWD":/mdn -w /mdn node:latest bash -c "/usr/local/bin/npm install && /usr/local/bin/npm run build"
echo "Build finished"
