# ─── Stage 1: Install dependencies ───
FROM node:18-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

# Copy workspace root config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy all package manifests (needed for workspace resolution)
COPY apps/ws-backend/package.json ./apps/ws-backend/package.json
COPY packages/db/package.json ./packages/db/package.json
COPY packages/be-common/package.json ./packages/be-common/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# ─── Stage 2: Generate Prisma client & build ───
FROM node:18-alpine AS builder
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

# Copy deps from previous stage
COPY --from=deps /app ./

# Copy source code
COPY apps/ws-backend ./apps/ws-backend
COPY packages/db ./packages/db
COPY packages/be-common ./packages/be-common
COPY packages/typescript-config ./packages/typescript-config

# Generate Prisma client
RUN cd packages/db && npx prisma generate

# Build the ws-backend
RUN cd apps/ws-backend && pnpm run build

# ─── Stage 3: Production runner ───
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 wsbackend

# Copy built output and dependencies
COPY --from=builder /app/apps/ws-backend/dist ./dist
COPY --from=builder /app/apps/ws-backend/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

USER wsbackend

EXPOSE 3002
ENV PORT=3002

CMD ["node", "dist/index.js"]
