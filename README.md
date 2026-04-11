# Jamroom

Real-time multiplayer music jam room PWA. Play instruments together with friends online.

[Play](https://jam.adelbeit.com)

## Overview

Web-based collaboration app for live musical performance. Real-time audio sync via Web Audio API, distributed state via Redis pub/sub, orchestrated on Nomad with service discovery via Consul.

## Tech Stack

**Client:** React 18, Next.js 12, TypeScript, Zustand (state), ToneJS (audio synthesis), Socket.io-client

**Server:** Node.js, Next.js API routes, Socket.io (WebSocket + fallbacks)

**Infrastructure:** Redis (session pub/sub), Nomad (scheduling), Consul (service discovery), Caddy (reverse proxy + auto-HTTPS)

**Hosting:** DigitalOcean (Droplets)

**Deployment:** Docker, GitHub Actions (CI/CD)

## Architecture

```
Clients (React + Socket.io)
    ↓ WebSocket
Next.js Server (Socket.io handler)
    ↓ pub/sub
Redis (broadcasts across instances)
```

Each client maintains local Zustand state. User actions (note played, user joined) emit via Socket.io → server routes to Redis pub/sub → all listening clients receive update → local state + audio sync.

**Routing & Sessions:** Caddy (reverse proxy) uses sticky sessions via cookies to route repeat connections to the same app instance. Redis pub/sub ensures state sync across instances. State is ephemeral (no persistence).

## Quick Start

### Local Development

```bash
cp .env.example .env
# Set REDIS_PASSWORD and REDIS_URL in .env

docker compose up      # Starts: app, Redis, Consul, Nomad, Caddy
yarn dev               # Run app (separate terminal)
```

Available at `http://localhost:3000`

### Scripts

```bash
yarn dev              # Build + Consul init
yarn dev:next         # Next.js dev only
yarn build            # Production build
yarn start            # Production server
yarn lint             # ESLint
yarn test:smoke       # Smoke tests
```

## Deployment

### Release

Tag a commit with `deploy-*` prefix to trigger CI:

```bash
git tag deploy-v1.0.0
git push --tags
```

CI builds Docker image (`ghcr.io/adelbeit/jamroom-app:<sha>`), pushes to registry, triggers Nomad job with image tag.

Rollback: tag an older commit with same pattern.

### Production Ops

**Status:**
```bash
nomad job status jamroom
nomad alloc status <alloc-id>
nomad alloc logs <alloc-id> jamroom
```

**Add node:**
1. Install Nomad + Consul agents (client mode)
2. Verify: `nomad node status`, `consul members`

**Remove node:**
```bash
nomad node drain -enable -deadline=2m <node-id>
systemctl stop nomad && consul leave
```

**Graceful shutdown:** 30s drain window for WebSocket close, 40s kill timeout. Health check (`/api/health`) validates HTTP 200 + Redis. Auto-rollback if 3 consecutive health checks fail.

**Monitor:**
```bash
nomad job status jamroom              # Job status
consul catalog services               # Registered services
curl http://<app-ip>:8080/api/health  # Health
```

## Project Structure

```
pages/               Next.js pages + API routes
├── api/socket.ts   WebSocket handler
└── api/health.ts   Health check
src/
├── components/     React components
├── screens/        Full-page views
├── hooks/          React hooks
├── utils/          Helpers + Zustand stores
└── types.d.ts      TypeScript definitions
public/             Static assets
infra/              Infrastructure as Code
├── jamroom.nomad   Nomad job spec
└── caddy-updater/  Service discovery integration
__tests__/          Test suite
docker-compose.yml  Local dev services
dockerfile          Production image
```

## Resources

- [Design](https://www.figma.com/file/mL6jPwkLXq2MvPu1FzyQnt/Music-App?node-id=0%3A1)
- [Setup Guide](./infra/SETUP.md)
