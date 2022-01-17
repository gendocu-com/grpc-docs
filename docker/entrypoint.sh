#/bin/bash

[ "$(ls -A /input)" ] && \
  (\
      protoc -I /input -I /deps/googleapis/ --doc_out=/output-gen --doc_opt=json,description.json $(find /input -name *.proto);\
      cp -r /output-gen/* /grpc-docs/example/build/example-descriptors/ \
  ) \
  || echo "description generation skipped"

cp -r /grpc-docs/example/build/ /output/
npm install -g http-server
npx http-server /output/
