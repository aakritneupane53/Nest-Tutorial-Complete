# ---- Stage 1: build ----
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci                 # install ALL deps (incl. dev)
COPY . .
RUN npm run build          # compile TS -> dist/

# ---- Stage 2: runtime ----
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev      # prod deps only -> smaller image
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]