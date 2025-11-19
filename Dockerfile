# -------------------------
# STAGE 1: Builder
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL deps (including devDeps for TypeScript)
RUN npm install

# Copy the full source code
COPY . .

# Build TypeScript -> dist/
RUN npm run build



# -------------------------
# STAGE 2: Production Image
# -------------------------
FROM node:20-alpine AS production

WORKDIR /app

# Copy ONLY package files again
COPY package*.json ./

# Install only production deps (no dev deps)
RUN npm install --omit=dev

# Copy build output from builder stage
COPY --from=builder /app/dist ./dist

# If you need only necessary files from source (OPTIONAL)
# COPY --from=builder /app/src/config ./src/config

EXPOSE 3000

CMD ["node", "-r", "tsconfig-paths/register", "dist/app.js"]
