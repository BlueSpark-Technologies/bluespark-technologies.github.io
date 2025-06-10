# Install dependencies only when needed
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- Development Stage ---
# Provides a development environment with hot-reloading.
#
# Build command:
# docker build --target development -t bluespark-dev .
#
# Run command:
# docker run -p 3000:3000 -v .:/app -v /app/node_modules bluespark-dev
#
FROM deps AS development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
# --- End Development Stage ---

# Rebuild the source code only when needed
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Don't run as root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Ensure .next/cache/images directory exists and is owned by nextjs
RUN mkdir -p .next/cache/images \
    && chown -R nextjs:nodejs .next

USER nextjs

EXPOSE 3000

CMD ["npm", "start"] 