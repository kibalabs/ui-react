# Stage 1: build
FROM node:22.2.0 AS build

WORKDIR /app
COPY makefile .

# Install requirements
COPY package.json .
COPY package-lock.json .
RUN make install

# Build app
COPY . .
RUN make build
