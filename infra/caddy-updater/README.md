# Caddy Upstream Updater

Polls Consul every 5s → updates Caddyfile → reloads Caddy.

## TLS Modes

**Caddy owns SSL** (default): template uses `{$DOMAIN}`, set `CADDY_HTTP_PORT=80` + `CADDY_HTTPS_PORT=443`

**External LB owns SSL**: template uses `http://{$DOMAIN}`, set `CADDY_HTTP_PORT=<port>`, omit `CADDY_HTTPS_PORT`

## Env Vars

| Var | Default | |
|---|---|---|
| `DOMAIN` | — | domain to serve |
| `CADDY_HTTP_PORT` | `80` | host HTTP port |
| `CADDY_HTTPS_PORT` | `443` | host HTTPS port |
| `CONSUL_HTTP_ADDR` | `localhost:8500` | |
| `SERVICE_NAME` | `jamroom-app` | Consul service to watch |

## Image

Auto-built by GitHub Actions on changes to this directory or `Caddyfile.template`.
