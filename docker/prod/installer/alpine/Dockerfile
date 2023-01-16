# FROM node:alpine3.12 AS build
FROM node:16.19.0-alpine3.17 AS build
LABEL maintainer="karsten.samaschke@cloudical.io"

COPY ./frontend/package.json /usr/workdir/
COPY ./frontend/package-lock.json /usr/workdir/
COPY ./frontend/vue.config.js /usr/workdir/
COPY ./frontend/public /usr/workdir/public
COPY ./frontend/src /usr/workdir/src

WORKDIR /usr/workdir

## Install and do the audit fixing
RUN npm install

## Build Vue App
RUN npm run build


# FROM node:alpine3.12
FROM node:16.19.0-alpine3.17

## Setting up Env
ENV PORT=8080
ENV IP=localhost
ENV NODE_ENV=development
ENV MODE=installer
ENV DEBUG=false
ARG VERSION=-1
ENV VERSION ${VERSION}
ARG VANILLASTACK_ANSIBLE_VERSION=2.1.1
ENV VANILLASTACK_ANSIBLE_VERSION ${VANILLASTACK_ANSIBLE_VERSION}
# ARG VANILLASTACK_ANSIBLE_SOURCE='https://github.com/vanillastack/vanillastack/archive/v1.6.5.tar.gz'
ENV VANILLASTACK_ANSIBLE_SOURCE='https://github.com/vanillastack/vanillastack/archive/v'${VANILLASTACK_ANSIBLE_VERSION}'.tar.gz'
ARG ANSIBLEPATH='/tmp/ansible'
ENV ANSIBLEPATH ${ANSIBLEPATH}
ENV ANSIBLE_CONFIG=${ANSIBLEPATH}'/ansible.cfg'
ENV COLLECTIONS_PATHS=${ANSIBLEPATH}'/collections' 
# env nessessary due to issues with newer releases of python package cryptography
ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1
EXPOSE ${PORT}
WORKDIR /usr/workdir

## Copy package files
COPY ./backend/package.json ./
COPY ./docker/prod/installer/alpine/requirements.* ./

## Get VS Ansible Playbooks
RUN mkdir -p /tmp/downloads && mkdir -p ${ANSIBLEPATH} && \
wget -qO- ${VANILLASTACK_ANSIBLE_SOURCE} | tar xvz --strip-components 1 -C  ${ANSIBLEPATH} && \
# mv /tmp/downloads/ansible/* ${ANSIBLEPATH} && \
rm -rf /tmp/downloads && rm -rf ${ANSIBLEPATH}/collections/ansible_collections/community/*

## Install required tools, e.g. Ansible and pre-req
RUN apk update && \
    apk upgrade --ignore alpine-baselayout --available && \
    sync && apk add --update --no-cache \
    openssh-client git musl-dev libffi-dev openssl-dev ca-certificates \
    python3 py3-pip python3-dev \
    gcc make --virtual build-dependencies build-base && \
    pip3 install -r requirements.txt && \
    ansible-galaxy install -r requirements.yml && \
    rm -rf /var/cache/apk*  && \
    npm install && npm audit fix --force

## copy app files
COPY ./backend/src ./src/
#RUN rm -rf ./public/*
COPY --from=build  /usr/workdir/dist ./public

# COPY --from=build  /tmp/downloads ${ANSIBLEPATH}

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
