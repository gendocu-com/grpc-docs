FROM node

ENV PROTOC_GEN_DOC_VERSION=1.5.0

RUN apt-get update && apt-get install -y protobuf-compiler
RUN wget -O protoc-gen-doc.tar.gz https://github.com/pseudomuto/protoc-gen-doc/releases/download/v${PROTOC_GEN_DOC_VERSION}/protoc-gen-doc-${PROTOC_GEN_DOC_VERSION}.linux-amd64.go1.16.6.tar.gz && \
    tar -xf protoc-gen-doc.tar.gz && \
    cp -r protoc-gen-doc*/ /protoc-plugins/
ENV PATH="/protoc-plugins/:${PATH}"
RUN git clone --depth 1 https://github.com/googleapis/googleapis.git /deps/googleapis/
RUN git clone --depth 1 https://github.com/gendocu-com/grpc-docs && \
    cd ./grpc-docs && \
    yarn && \
    cd example && \
    yarn
RUN mkdir -p /output-gen

ENV NODE_OPTIONS=--openssl-legacy-provider
ADD docker/files/App.tsx /grpc-docs/example/src/App.tsx
ADD docker/entrypoint.sh /home/entrypoint.sh
RUN cd /grpc-docs/example/ && yarn build

ENTRYPOINT ["bash", "/home/entrypoint.sh"]
