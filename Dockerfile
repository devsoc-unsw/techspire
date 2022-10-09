FROM node:18.10.0-alpine as builder

WORKDIR /app

COPY . .

RUN npm install && \
	npm run build && \
	npm run build:ci

FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf
