FROM nginx:latest as frontend

COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
