FROM node:latest as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build-dev

FROM nginx:latest as frontend

COPY nginx.conf /etc/nginx/conf.d/nginx.conf

COPY --from=build /app/dist/FediUniFrontend/ /usr/share/nginx/html/
