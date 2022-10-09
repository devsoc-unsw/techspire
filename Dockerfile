FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN npm install && \
	npx next build && \
	npx next export

FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf
