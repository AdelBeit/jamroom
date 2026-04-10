# Build stage
FROM golang:1.20-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum* ./

# Download dependencies (no go.sum required, will be generated)
RUN go mod download 2>/dev/null || true

# Copy source
COPY main.go .

# Build binary
RUN CGO_ENABLED=0 GOOS=linux go build -o caddy-updater main.go

# Runtime stage
FROM caddy:2-alpine

# Copy compiled updater from builder
COPY --from=builder /app/caddy-updater /usr/local/bin/caddy-updater

# Copy template
COPY Caddyfile.template /etc/caddy/Caddyfile.template

# Make updater executable
RUN chmod +x /usr/local/bin/caddy-updater

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
