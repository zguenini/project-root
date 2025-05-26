# 1. Etape de build (utilise l'image officielle Node)
FROM node:18-alpine AS builder
WORKDIR /app

# Copie uniquement les fichiers nécessaires pour installer les dépendances (cache optimisé)
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
  else npm install; \
  fi

# Copie le reste du code et build l'app
COPY . .
# Optionnel : Si tu utilises Prisma, exécute les migrations ici
# RUN npx prisma generate && npx prisma migrate deploy
RUN npm run build

# 2. Etape de prod : runner minimal, sécurisé
FROM node:18-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Copie uniquement le build et les dépendances prod
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./
# Facultatif, si tu utilises Prisma
#COPY --from=builder /app/prisma ./prisma   

# Ne jamais exposer les fichiers sensibles (src, tests, docs...)

# Liveness/Readiness probes, PORT variable support
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/main.js"]
