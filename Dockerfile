FROM node:24-bookworm-slim

WORKDIR /usr/src/

COPY . .

RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
RUN npm ci
RUN npm run build

EXPOSE 5000

CMD [ "npm", "start" ]
