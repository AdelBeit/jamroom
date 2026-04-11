ARG BUILD_ENV=prod

# Install dependencies only when needed
FROM node:20.20.1-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Rebuild the source code only when needed
FROM node:20.20.1-alpine AS builder
WORKDIR /app

# Copy dependencies (cached in deps stage, rarely changes)
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/yarn.lock ./yarn.lock
COPY --from=deps /app/node_modules ./node_modules

# Copy config files (changes less frequently than source)
COPY next.config.js tsconfig.json next-env.d.ts jest.config.js jest.setup.js ./

# Copy source code (changes most frequently)
COPY public ./public
COPY pages ./pages
COPY src ./src
COPY styles ./styles
COPY __tests__ ./__tests__

# Build
RUN yarn build

# Production image (no tests)
FROM node:20.20.1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache curl
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js /app/jest.config.js /app/jest.setup.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 8080

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

# run the app
CMD ["yarn", "docker:start"]

# Test image (includes tests, used for testing environments only)
FROM runner AS runner-test

USER root
COPY --from=builder /app/__tests__ ./__tests__
RUN chown -R nextjs:nodejs /app/__tests__
USER nextjs
