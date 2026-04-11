# Build stage
FROM golang:1.20-alpine AS builder

WORKDIR /app

# Copy go mod files from infra/caddy-updater
COPY infra/caddy-updater/go.mod infra/caddy-updater/go.sum* ./

# Download dependencies (no go.sum required, will be generated)
RUN go mod download 2>/dev/null || true

# Copy source from infra/caddy-updater
COPY infra/caddy-updater/main.go .

# Build binary
RUN CGO_ENABLED=0 GOOS=linux go build -o caddy-updater main.go

# Runtime stage
FROM caddy:2-alpine

# Copy compiled updater from builder
COPY --from=builder /app/caddy-updater /usr/local/bin/caddy-updater

# Copy template from repo root
COPY Caddyfile.template /etc/caddy/Caddyfile.template

# Make updater executable
RUN chmod +x /usr/local/bin/caddy-updater

# Copy entrypoint script from infra/caddy-updater
COPY infra/caddy-updater/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
