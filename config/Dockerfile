FROM node:24-slim as build

WORKDIR /opt

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.24-alpine-slim

COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /opt/dist /usr/share/nginx/html