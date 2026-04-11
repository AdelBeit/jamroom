# Manual Infrastructure Setup

## Step 1: Setup Central Droplet

SSH into your central droplet:

```bash
ssh root@<central-droplet-ip>
```

Download and run the setup script:

```bash
curl -fsSL https://raw.githubusercontent.com/adelbeit/jamroom/main/infra/setup-central.sh | bash
```

Wait for it to complete (~2 minutes).

Verify services are running:

```bash
nomad server members
consul members
systemctl status nomad consul
```

---

## Step 2: Setup App Server Droplets

SSH into app server 1:

```bash
ssh root@<app1-droplet-ip>
```

Run setup script with central IP:

```bash
curl -fsSL https://raw.githubusercontent.com/adelbeit/jamroom/main/infra/setup-app.sh | bash -s <central-droplet-ip>
```

Wait for it to complete.

Verify Nomad is running:

```bash
systemctl status nomad
```

**Repeat for app server 2** with the same command.

---

## Step 3: Verify Cluster

From your local machine, check the Nomad UI:

```
http://<central-droplet-ip>:4646/ui/
```

You should see:
- 1 Nomad server
- 2 Nomad clients (your app servers)

Check Consul UI:

```
http://<central-droplet-ip>:8500/ui/
```

---

## Step 4: Deploy the App

Option A: Via GitHub Actions (automatic)

```bash
git tag deploy-v1.0
git push --tags
```

Watch the deploy workflow in GitHub Actions.

Option B: Manual from central droplet

```bash
ssh root@<central-ip>

nomad job run \
  -var "image_tag=latest" \
  -var "redis_url=redis://127.0.0.1:6379" \
  -var "redis_password=your_password" \
  /tmp/jamroom.nomad
```

---

## Troubleshooting

### Nomad client not showing up

From central:

```bash
nomad server members
nomad node status
```

From app server:

```bash
systemctl status nomad
journalctl -u nomad -n 50
```

### Redis password issues

From central:

```bash
cd /opt/jamroom
cat .env  # Check password
redis-cli -p 6379 ping
# If prompted for password:
redis-cli -p 6379 -a your_password ping
```

### Can't connect to services

Check firewall rules on DigitalOcean dashboard. App servers need to reach:
- Central IP:4647 (Nomad)
- Central IP:8500 (Consul)
- Central IP:6379 (Redis)

---

## Useful Commands

```bash
# On central droplet
nomad status                    # All jobs
nomad job status jamroom        # Jamroom job status
nomad alloc status <alloc-id>   # Allocation details
nomad alloc logs <alloc-id> jamroom  # App logs

consul catalog services         # All registered services
consul catalog service jamroom-app   # App service details
```
