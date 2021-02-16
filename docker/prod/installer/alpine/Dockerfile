FROM node:alpine3.12 AS build
LABEL maintainer="jeff.chousterman@cloudical.io"

COPY ./frontend/package.json /usr/workdir/
COPY ./frontend/package-lock.json /usr/workdir/
COPY ./frontend/vue.config.js /usr/workdir/
COPY ./frontend/public /usr/workdir/public
COPY ./frontend/src /usr/workdir/src

# RUN apk update && \
#     apk upgrade --available && \
#     sync && apk add --update --no-cache \
#     git

# RUN mkdir -p /tmp/downloads && \
# wget -qO- ${VANILLASTACK_ANSIBLE_SOURCE} | tar xvz --strip-components 1 -C /tmp/downloads && \
# cd /tmp/downloads && git submodule update --init --recursive /tmp/downloads
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
ARG VANILLASTACK_ANSIBLE_SOURCE='https://github.com/vanillastack/vanillastack/archive/v1.6.5.tar.gz'
ENV VANILLASTACK_ANSIBLE_SOURCE=${VANILLASTACK_ANSIBLE_SOURCE}
ARG ANSIBLEPATH='/tmp/ansible'
ENV ANSIBLEPATH ${ANSIBLEPATH}
ENV ANSIBLE_CONFIG=${ANSIBLEPATH}'/ansible.cfg'
ENV COLLECTIONS_PATHS=${ANSIBLEPATH}'/collections'
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
    apk upgrade --available && \
    sync && apk add --update --no-cache \
    openssh-client git musl-dev libffi-dev openssl-dev ca-certificates \
    python3 py3-pip python3-dev \
    gcc make --virtual build-dependencies build-base && \
    pip3 install -r requirements.txt && \
    ansible-galaxy install -r requirements.yml && \
    rm -rf /var/cache/apk*  && \
    npm install && npm audit fix

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
