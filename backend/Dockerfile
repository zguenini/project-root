# --- Étape 1 : Build ---
FROM node:18-alpine AS builder
WORKDIR /app

# Installation des dépendances avec cache optimisé
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
  else npm install; \
  fi

# Copie du code et build
COPY . .
# RUN npx prisma generate && npx prisma migrate deploy  # si Prisma utilisé
RUN npm run build

# --- Étape 2 : Production ---
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copie du build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Liveness/Readiness
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/main.js"]
