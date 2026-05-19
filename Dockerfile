# Step 1: Build the React frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
COPY .npmrc ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# Step 2: Set up the production Express backend
FROM node:20-alpine
WORKDIR /app
COPY backendObfuscated/package*.json ./backendObfuscated/
WORKDIR /app/backendObfuscated
RUN npm ci --only=production
COPY backendObfuscated/ ./
COPY --from=frontend-builder /app/dist /app/dist

# Expose port and run
ENV NODE_ENV=production
CMD ["node", "server.js"]
