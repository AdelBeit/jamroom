## Jamroom

Virtual music jam room PWA. Made for mobile. Gather your friends and play the keyboard or the drums together.

[Play Here](https://jam.adelbeit.com)

## Features:

- PWA
- Customizable drumpads
- Multiplayer, invite your friends through the users dropdown
- Scrollable full keyboard
- Playable offline

Powered by:

- Typescript
- ReactJS
- NextJS
- Socket.io (Websocket)
- Redis (pub/sub adapter for multi-instance broadcasting)
- Docker / Docker Compose
- ToneJS (Web Audio API)
- Zustand

## Running locally

```bash
cp .env.example .env
# fill in REDIS_PASSWORD and REDIS_URL in .env
docker compose up
```

## Deploy

- CI builds and pushes `ghcr.io/adelbeit/jamroom:<sha>` on each `main` push.
- Tag a commit with `deploy-*` to trigger the deploy workflow (e.g., `git tag deploy-v1.0 && git push --tags`).
- Deploy to Nomad: workflow runs `nomad job run infra/jamroom.nomad` with the image tag.
- Rollback: tag a prior commit and push the tag to re-run deployment.

## Ops Runbook

### Adding a Node to the Cluster

1. **Install Nomad and Consul** on the new node (assumes base OS is configured)
   ```bash
   # Follow official Nomad/Consul installation guides
   # Ensure agents can reach the cluster network
   ```

2. **Start Nomad Agent** (client mode)
   ```bash
   nomad agent -config=/etc/nomad.d/nomad.hcl
   ```

3. **Start Consul Agent** (client mode)
   ```bash
   consul agent -config-dir=/etc/consul.d
   ```

4. **Verify node joined cluster**
   ```bash
   nomad node status
   consul members
   ```

### Removing a Node from the Cluster

1. **Drain the node** (gracefully stop allocations)
   ```bash
   nomad node drain -enable -deadline=5m <node-id>
   ```

2. **Monitor drain progress**
   ```bash
   nomad node status <node-id>
   ```

3. **Stop Nomad Agent**
   ```bash
   systemctl stop nomad
   ```

4. **Leave Consul cluster**
   ```bash
   consul leave
   ```

### Drain Behavior & Health Checks

The app uses graceful shutdown to ensure WebSocket connections finish properly:

1. **Drain initiated**: Node drain or job update stops accepting new connections
2. **Shutdown window**: 30 seconds for existing connections to close gracefully
3. **Kill timeout**: After 30s + 10s buffer, forcefully terminates the process
4. **Health validation**: `/api/health` checks HTTP 200 + Redis connectivity
5. **Automatic rollback**: If health checks fail for 3 consecutive intervals (15s), Nomad auto-reverts the job

**Example: Node drain with graceful shutdown**
```bash
# Stop accepting new connections, but let existing sockets finish (2 min max)
nomad node drain -enable -deadline=2m <node-id>
```

### Monitoring

- Check job status: `nomad job status jamroom`
- View allocations: `nomad alloc status <alloc-id>`
- Logs: `nomad alloc logs <alloc-id> jamroom` (app) or `jamroom-redis` (redis)
- Consul services: `consul catalog services` or UI at `http://<consul-ip>:8500`
- Health check: `curl http://<app-ip>:8080/api/health`

[Figma File](https://www.figma.com/file/mL6jPwkLXq2MvPu1FzyQnt/Music-App?node-id=0%3A1)
