FROM node:12.16.1-stretch as build

WORKDIR /app

# Install dependecies
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY . .

RUN npm run build-docs

# Deploy with nginx
FROM nginx:1.17.10

WORKDIR /app
COPY nginx.conf .
COPY start.sh .
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["./start.sh"]
