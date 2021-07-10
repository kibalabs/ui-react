FROM node:12.16.1-stretch as build

WORKDIR /app

# Install dependecies
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY . .

RUN npm run build-docs

# Serve with nginx
FROM ghcr.io/kibalabs/app-serve:latest
COPY --from=build /app/dist /usr/share/nginx/html
