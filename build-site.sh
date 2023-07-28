#!/bin/bash

if [ "$(docker ps -aq -f name=blog)" ]; then
    docker stop blog
    docker rm blog
fi

docker run --rm --volume="$(pwd):/srv/jekyll" --name "blog" -p 4000:4000 jekyll --incremental "$@"

