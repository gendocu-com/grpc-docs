#!/bin/bash

#set -eo pipefail

for VERSION in 8 9 10 11 12 13 14 15 16 17
do
  echo "testing $VERSION"
  docker run --rm -w /root node:${VERSION} bash -c "npm init -y > /dev/null && npm install grpc-docs > /dev/null && echo 'npm with node:${VERSION} success'"
#  docker run --rm -w /root node:${VERSION} bash -c "apt-get update > /dev/null && apt-get upgrade -y > /dev/null && npm init -y > /dev/null && npm install grpc-docs > /dev/null && echo 'npm with node:${VERSION} success'"
#  docker run --rm -w /root node:${VERSION} bash -c "npm init -y > /dev/null && yarn add grpc-docs && echo 'yarn with node:${VERSION} success'"
done

for UBUNTU_V in "16.04"
do
  docker run --rm -w /root ubuntu:${UBUNTU_V} bash -c "apt-get update > /dev/null && apt-get install -y nodejs npm git > /dev/null && npm init -y > /dev/null && npm install grpc-docs > /dev/null && echo 'npm with ubuntu:${VERSION} success'"

done
