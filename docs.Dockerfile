FROM node:16.4.1-stretch as build

WORKDIR /app

# Install dependecies
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY . .

RUN npm run build-docs

# Serve with nginx
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/config.d

EXPOSE 80
CMD ["nginx" , "-g", "daemon off;"]