FROM node:16.20.1-alpine as base

RUN mkdir -p /app
RUN chmod -R 777 /app
WORKDIR /app
COPY . /app

RUN wget -O- https://get.pnpm.io/v6.14.js | node - add --global pnpm@6
RUN pnpm install
RUN npx prisma generate

###########################################################################
# Build linter image
###########################################################################
FROM base AS linter
WORKDIR /app
RUN pnpm run lint

###########################################################################
# Build nex build image
###########################################################################

FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=base /app/node_modules ./node_modules
# FIXME (Leo Liu): This is a workaround and should be implemented in DigiTool-Azure-Pipelines.
ARG NEXT_PUBLIC_BASE_PATH=/neptune
RUN pnpm build

###########################################################################
# Production image, copy all the files and run next
###########################################################################
FROM node:16.20.1-alpine AS runtime
WORKDIR /app
ENV NODE_ENV development

# Copying necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Exposing port and defining start command
EXPOSE 3000
ENV PORT 3000

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
RUN apk add --no-cache bash

CMD /wait-for-it.sh pg-neptune:5432 --timeout=30 -- npm run start:dev

