FROM node:alpine3.12 AS build
LABEL maintainer="jeff.chousterman@cloudical.io"

COPY ./frontend/package.json /usr/workdir/
COPY ./frontend/package-lock.json /usr/workdir/
COPY ./frontend/vue.config.js /usr/workdir/
COPY ./frontend/public /usr/workdir/public
COPY ./frontend/src /usr/workdir/src

WORKDIR /usr/workdir
#RUN rm -rf node_modules && rm -rf dist
RUN npm install && npm audit fix

## Build Vue App
RUN npm run build


FROM node:alpine3.12

## Setting up Env
ENV PORT=8080
ENV IP=localhost
ENV NODE_ENV=development
ENV MODE=installer
ENV DEBUG=false
ARG VANILLASTACK_ANSIBLE_SOURCE='https://github.com/vanillastack/vanillastack/archive/202101-0a283595.tar.gz'
ENV VANILLASTACK_ANSIBLE_SOURCE=${VANILLASTACK_ANSIBLE_SOURCE}
ARG ANSIBLEPATH='/tmp/ansible'
ENV ANSIBLEPATH ${ANSIBLEPATH}
EXPOSE ${PORT}
WORKDIR /usr/workdir

## Copy package files
COPY ./backend/package.json ./
COPY ./docker/prod/installer/alpine/requirements.txt ./

## Install nginx, Ansible and pre-req
RUN apk update && \
    apk upgrade --available && \
    sync && apk add --update --no-cache \
    openssh-client musl-dev libffi-dev openssl-dev ca-certificates \
    python3 py3-pip python3-dev \
    gcc make --virtual build-dependencies build-base && \
    pip3 install -r requirements.txt && \
    rm -rf /var/cache/apk*  && \
    npm install && npm audit fix

## copy app files
COPY ./backend/src ./src/
#RUN rm -rf ./public/*
COPY --from=build  /usr/workdir/dist ./public
RUN mkdir -p /tmp/downloads && \
wget -qO- ${VANILLASTACK_ANSIBLE_SOURCE} | tar xvz --strip-components 1 -C /tmp/downloads && \
mv /tmp/downloads/ansible ${ANSIBLEPATH} && \
rm -rf /tmp/downloads
    # wget ${VANILLASTACK_ANSIBLE_SOURCE} | tar -xz -C ${ANSIBLEPATH}
# COPY ./ansible ${ANSIBLEPATH}
COPY ./version ./

RUN echo -e '\n\
    #!/bin/sh\n\
    filename=$1\n\
    while read line; do\n\
    echo "$line"\n\
    sleep 0.2\n\
    done <$filename\n\
    \n'\
    > /usr/workdir/src/templates/dry-run_setup.sh && \
    chmod +x /usr/workdir/src/templates/dry-run_setup.sh

## Install npm Modules
## Build and prep Frontend

#RUN  rm -rf ./dist/* && npm run build \
#    && rm -rf ./src/public/* && cp -r ./dist/* ./src/public

## Run nginx and backend
CMD ["npm", "run", "start"]
