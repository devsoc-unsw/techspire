FROM node:18.10.0-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn run build && \
	yarn run build:ci

FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf
