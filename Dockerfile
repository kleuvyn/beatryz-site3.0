FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "start"]
