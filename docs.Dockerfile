# Stage 1: build
FROM node:24.11.1 AS build

WORKDIR /app
COPY makefile .

# Install requirements
COPY package.json .
COPY package-lock.json .
RUN make install

# Build app
COPY . .
RUN make build-docs

# Stage 2: Serve build files with nginx
FROM ghcr.io/kibalabs/app-serve:latest
COPY --from=build /app/dist /usr/share/nginx/html
