# Multi-stage Dockerfile for Node TypeScript Express app
# Builder: install dev deps and compile TypeScript
FROM node:20-alpine AS builder
WORKDIR /app

# Install build-time dependencies
COPY package*.json ./
RUN npm install

# Copy config and source, then build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Runtime: smaller image with only production deps
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built output from builder
COPY --from=builder /app/build ./build

# Default port from the app (can be overridden with -e PORT)
EXPOSE 3000

CMD ["node", "build/server.js"]
