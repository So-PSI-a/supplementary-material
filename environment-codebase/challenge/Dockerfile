FROM node:20-alpine AS base
WORKDIR /app

ARG POSTGRES_URL
ENV POSTGRES_URL=$POSTGRES_URL
ENV DATABASE_URL=$POSTGRES_URL

# --- deps ---
FROM base AS deps
COPY package*.json ./

RUN npm ci --ignore-scripts

# --- builder ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN npx nuxt prepare

# Build the application
RUN npm run build

# --- runner ---
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.output ./.output

EXPOSE 3000
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["node", ".output/server/index.mjs"]
