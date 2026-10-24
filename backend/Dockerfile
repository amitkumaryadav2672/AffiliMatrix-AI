# ==========================================
# AffiliMatrix AI - Backend Service Dockerfile
# ==========================================
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install wget for healthcheck (included in alpine)
RUN apk add --no-cache wget

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Copy dependency manifests
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev || npm install --omit=dev

# Copy application source code
COPY src/ ./src/

# Non-root user for security
USER node

# Expose backend port
EXPOSE 5000

# Health check probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Start backend server
CMD ["node", "src/server.js"]
