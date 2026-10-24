# ==========================================
# AffiliMatrix AI - Frontend Dockerfile
# Multi-stage production build (Vite + Nginx)
# ==========================================

# Stage 1: Build React/Vite assets
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies required for Vite build)
RUN npm ci || npm install

# Copy application source code
COPY index.html ./
COPY vite.config.js ./
COPY public/ ./public/
COPY src/ ./src/

# Build static production bundle
RUN npm run build

# Stage 2: Serve via Nginx
FROM nginx:alpine

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy built production assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/healthz || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
