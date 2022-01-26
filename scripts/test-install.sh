#!/bin/bash

set -eo pipefail

for VERSION in 8 .. 17
do
  echo "testing $VERSION"
  docker run --rm -w /root node:${VERSION} bash -c "npm init -y && npm install --only=dev grpc-docs && echo 'npm success' "
  docker run --rm -w /root node:${VERSION} bash -c "npm init -y && yarn add grpc-docs && echo 'yarn success' "
done

