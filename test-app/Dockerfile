# Stage 1: build
FROM node:18.2.0 as build

WORKDIR /app

# Install requirements
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Build app
COPY . .
RUN npm run build-static

# Stage 2: Serve build files with nginx
FROM ghcr.io/kibalabs/app-serve:latest
COPY --from=build /app/dist /usr/share/nginx/html
