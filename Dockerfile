FROM jekyll/builder:3.8
RUN gem install jekyll-gist
VOLUME ["/srv/jekyll"]
EXPOSE 4000/tcp
ENTRYPOINT ["jekyll", "serve"]
