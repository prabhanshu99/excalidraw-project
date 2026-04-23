FROM node:18-alpine

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy the entire monorepo
COPY . .

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN cd packages/db && npx prisma generate

# Build the WebSocket backend
RUN cd apps/ws-backend && pnpm run build

EXPOSE 3002

# Start the WebSocket server
CMD ["node", "apps/ws-backend/dist/index.js"]
