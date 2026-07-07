# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat \
  && corepack enable \
  && corepack prepare pnpm@10.17.1 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches/
RUN pnpm install --frozen-lockfile

FROM base AS builder
ARG NEXT_PUBLIC_SERVER_URL=https://nyalalabs.org
ARG NEXT_PUBLIC_R2_PUBLIC_URL=
ARG CLOUDFLARE_R2_ACCOUNT_ID=
ARG DATABASE_URL=postgresql://payload:build@host.docker.internal:5432/nyala_payload
ARG MONGODB_URI=mongodb://build:build@host.docker.internal:27017/build
ARG DEPLOY_TARGET=vps
ARG PAYLOAD_BUILD=1
ARG ALLOW_R2_DEV_URL=0

ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV ALLOW_R2_DEV_URL=${ALLOW_R2_DEV_URL}
ENV NEXT_PUBLIC_R2_PUBLIC_URL=${NEXT_PUBLIC_R2_PUBLIC_URL}
ENV CLOUDFLARE_R2_ACCOUNT_ID=${CLOUDFLARE_R2_ACCOUNT_ID}
ENV DATABASE_URL=${DATABASE_URL}
ENV MONGODB_URI=${MONGODB_URI}
ENV DEPLOY_TARGET=${DEPLOY_TARGET}
ENV PAYLOAD_BUILD=${PAYLOAD_BUILD}
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM base AS migrator
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches/
RUN pnpm install --frozen-lockfile
COPY . .
CMD ["pnpm", "migrate"]

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/fonts ./fonts
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000',(r)=>{process.exit(r.statusCode<500?0:1)}).on('error',()=>process.exit(1))"

ENTRYPOINT ["/entrypoint.sh"]
