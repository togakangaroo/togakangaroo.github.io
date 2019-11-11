#!/bin/bash

docker run --rm --volume="$(pwd):/srv/jekyll" --name "blog" -p 4000:4000 jekyll "$@"

