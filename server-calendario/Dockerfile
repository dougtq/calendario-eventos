# ========================== Base Image ==========================
FROM alpine:3.4 AS base

LABEL maintainer="douglas.expalves@gmail.com"

RUN apk update && apk add --no-cache nodejs && rm -rf /var/cache/apk/*

# ========================== Build Image ==========================
FROM alpine:3.4 AS builder

RUN apk update && apk add --no-cache nodejs && mkdir /calendario

COPY ./package.json ./calendario/package.json

WORKDIR /calendario

RUN npm install

COPY . .

RUN npm run build

# ========================== Runtime Image ==========================
FROM base AS runtime

RUN mkdir -p /calendario/dist

COPY ./package.json ./calendario/package.json

WORKDIR /calendario/

COPY --from=builder /calendario/dist ./dist/

RUN npm install --production

ENTRYPOINT ["npm", "start"]