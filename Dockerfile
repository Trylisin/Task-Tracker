# from base image node
FROM lts

WORKDIR /usr/node
WORKDIR app

RUN pwd

# command executable and version
ENTRYPOINT ["node"]
