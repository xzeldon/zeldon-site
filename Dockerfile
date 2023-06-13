FROM node:20-slim as build

WORKDIR /opt

COPY ./package.json /opt/package.json
COPY ./package-lock.json /opt/package-lock.json

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.24-alpine-slim

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /opt/dist /usr/share/nginx/html
