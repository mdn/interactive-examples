#!/bin/bash
cd "$(dirname ${BASH_SOURCE[0]})"/..
echo "Starting build"
docker run -v "$PWD":/mdn -w /mdn node:latest npm install && npm run build
echo "Build finished"
