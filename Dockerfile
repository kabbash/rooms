# syntax=docker/dockerfile:1.7
#
# Production image for Cloud Run. Built once per commit on main by
# .github/workflows/deploy-dev.yml, then promoted unchanged to staging.
#
#   docker build -t rooms .
#   docker run --rm -p 8080:8080 -e DATABASE_URL=... rooms

ARG NODE_VERSION=22

# ─── Base ────────────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS base
RUN corepack enable
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# prisma.config.ts and src/lib/env.ts require DATABASE_URL to be set at build
# time. Nothing connects during the build, so a placeholder is enough.
# The real value is injected by Cloud Run at runtime (Secret Manager).
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"

# ─── Dependencies ────────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml prisma.config.ts ./
COPY prisma ./prisma
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ─── Build ───────────────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm exec prisma generate && pnpm build

# ─── Runtime ─────────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=8080

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

# `output: "standalone"` (next.config.ts) traces only the files the server needs.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 8080
CMD ["node", "server.js"]
