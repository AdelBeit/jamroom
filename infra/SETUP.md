# Manual Infrastructure Setup

## Local Testing First

Before deploying to droplets, test locally:

### 1. Start Consul + Redis + Caddy with docker-compose

```bash
docker compose up consul redis caddy
```

### 2. Start Nomad in a separate terminal

```bash
nomad agent -dev
```

### 3. Test connection

```bash
# Check Nomad sees Consul
nomad server members
consul members

# Deploy a test job
nomad job run /tmp/test.nomad

# Check Consul registered the service
consul catalog services
consul catalog service test-redis

# Clean up
nomad job stop test-redis
```

If all that works, you're ready for droplets!

---

## Droplet Setup

### Central Droplet (Nomad Server + Consul Server)

SSH in:

```bash
ssh root@<central-ip>
```

Download and run setup script:

```bash
curl -fsSL https://raw.githubusercontent.com/adelbeit/jamroom/main/infra/setup-nomad.sh | bash -s 127.0.0.1 server
```

Start docker-compose services (Consul, Redis, Caddy):

```bash
cd /opt/jamroom

# Create .env
cat > .env <<'EOF'
REDIS_PASSWORD=your_secure_password
DOMAIN=jam.example.com
EOF

# Start services
docker compose up -d consul redis caddy
```

Verify:

```bash
nomad server members
consul members
curl http://localhost:8500/v1/status/leader
```

---

### App Droplets (Nomad Client)

SSH into app server 1:

```bash
ssh root@<app1-ip>
```

Run setup script with central IP:

```bash
curl -fsSL https://raw.githubusercontent.com/adelbeit/jamroom/main/infra/setup-nomad.sh | bash -s <central-ip>
```

Repeat for app server 2.

Verify from central droplet:

```bash
nomad node status
# Should show 2 clients
```

---

## Deploy the App

From central droplet:

```bash
nomad job run \
  -var "image_tag=latest" \
  -var "redis_url=redis://127.0.0.1:6379" \
  -var "redis_password=your_password" \
  /opt/jamroom/infra/jamroom.nomad
```

Check status:

```bash
nomad job status jamroom
nomad alloc status <alloc-id>
nomad alloc logs <alloc-id> jamroom
```

---

## Useful Commands

```bash
# On central droplet
nomad status                    # All jobs
nomad job status jamroom        # Jamroom status
nomad node status               # All nodes
nomad alloc status <alloc-id>   # Allocation details
nomad alloc logs <alloc-id>     # App logs

consul catalog services         # All services
consul catalog service jamroom-app  # App service details

# View Nomad UI
http://<central-ip>:4646/ui/

# View Consul UI
http://<central-ip>:8500/ui/
```

---

## Troubleshooting

### Nomad client not showing up

From central:

```bash
nomad node status
```

From app server:

```bash
systemctl status nomad
journalctl -u nomad -n 50
```

### Redis connection issues

Test from central:

```bash
redis-cli -p 6379 -a your_password ping
```

### App container not starting

```bash
nomad alloc logs <alloc-id> jamroom
```
