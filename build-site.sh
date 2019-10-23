#!/bin/bash

docker run --rm --volume="$(pwd):/srv/jekyll" --name "blog" -it -p 4000:4000 jekyll/builder:3.8 jekyll serve "$@"

