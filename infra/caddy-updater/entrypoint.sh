#!/bin/sh
set -e

echo "[Caddy] Starting with updater..."

# Start Caddy in background
caddy run -c /etc/caddy/Caddyfile &
CADDY_PID=$!

# Give Caddy a moment to start
sleep 1

# Start the updater (foreground) - will keep container running
exec /usr/local/bin/caddy-updater
