# ---------- Stage 1: builder ----------
FROM node:22-slim@sha256:f3a68cf41a855d227d1b0ab832bed9749469ef38cf4f58182fb8c893bc462383 AS builder

WORKDIR /app

# Layer optimization: copy manifests first (cached when only source changes)
COPY package.json pnpm-lock.yaml ./

# Enable corepack and activate the pnpm version from package.json
RUN corepack enable && corepack prepare --activate

RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# ---------- Stage 2: runtime ----------
FROM nginx:stable-alpine@sha256:6525b050aa05151ca19ec7090851bc8c12006cffdae5187f3d28023402f44cfa

# Copy built assets and nginx config
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Create required temp directories writable by nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /tmp

EXPOSE 8080

# Run as non-root (nginx user is created by the base image)
USER nginx

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
