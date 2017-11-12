FROM node:8.9.1

ENV TINI_VERSION v0.16.1
ADD https://github.com/krallin/tini/releases/download/$TINI_VERSION/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

USER node

RUN mkdir -p /home/node/.npm/modules
ENV NODE_PATH=/home/node/.npm/modules

RUN mkdir -p /home/node/.npm/global
ENV NPM_CONFIG_PREFIX=/home/node/.npm/global
ENV PATH="$PATH:/home/node/.npm/global/bin"

VOLUME /home/node/.npm

EXPOSE 4200

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
