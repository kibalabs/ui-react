# Stage 1: build
FROM node:26.13.0 AS build

WORKDIR /app
COPY makefile .

# Install requirements
COPY package.json .
COPY package-lock.json .
RUN make install

# Build app
COPY . .
RUN make build
