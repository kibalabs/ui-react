# Stage 1: build
FROM node:18.2.0 as build

WORKDIR /app
COPY makefile $WORKDIR

# Install requirements
COPY package.json .
COPY package-lock.json .
RUN make install

# Build app
COPY . $WORKDIR
RUN make build
