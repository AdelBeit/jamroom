# Caddy Upstream Updater

Go service that polls Consul for healthy app servers and dynamically updates Caddy's upstream configuration.

## How it works

1. **Polls Consul** every 5 seconds for healthy instances of `jamroom-app`
2. **Detects changes** in the upstream list
3. **Renders template** with current upstreams: `Caddyfile.template` → `/etc/caddy/Caddyfile`
4. **Reloads Caddy** via `caddy reload` (zero-downtime)

## Architecture

```
Consul Catalog
     ↓
Caddy Updater (polls every 5s)
     ↓
Caddyfile.template → render with upstreams → Caddyfile
     ↓
caddy reload (no downtime)
```

## Environment Variables

- `CONSUL_HTTP_ADDR`: Consul HTTP API address (default: `localhost:8500`)
- `SERVICE_NAME`: Consul service name to watch (default: `jamroom-app`)
- `CADDYFILE_TEMPLATE`: Path to template file (default: `/etc/caddy/Caddyfile.template`)
- `CADDYFILE_PATH`: Path to output Caddyfile (default: `/etc/caddy/Caddyfile`)

## Building

```bash
docker build -t caddy-updater:latest -f infra/caddy-updater/Dockerfile .
```

## Running

Typically runs in the same container as Caddy:

```bash
docker run -v ./Caddyfile.template:/etc/caddy/Caddyfile.template \
           -e CONSUL_HTTP_ADDR=consul:8500 \
           -e SERVICE_NAME=jamroom-app \
           caddy-updater:latest
```

Or via docker-compose - see root `docker-compose.yml`.
