FROM node:20-bookworm

RUN npx -y playwright@1.41.0 install --with-deps
