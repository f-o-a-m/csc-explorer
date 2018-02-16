FROM nginx:1.13.6-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build/ /usr/share/nginx/html
