#!/usr/bin/env sh

yc serverless function version create \
    --function-name ryuk \
    --runtime nodejs14 \
    --entrypoint index.handler \
    --memory 1G \
    --execution-timeout 600s \
    --source-path ryuk.zip
