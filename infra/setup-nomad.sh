#!/bin/bash
set -e

CONSUL_IP=$1

if [ -z "$CONSUL_IP" ]; then
  echo "Usage: ./setup-nomad.sh <consul-ip>"
  exit 1
fi

echo "=== Nomad Setup ==="
echo "Consul server: $CONSUL_IP"

# Install Docker (skip if already installed)
if ! command -v docker &> /dev/null; then
  echo "Installing Docker..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sh get-docker.sh
  rm get-docker.sh
else
  echo "Docker already installed, skipping..."
fi

# Install Nomad
echo "Installing Nomad..."
cd /tmp
wget -q https://releases.hashicorp.com/nomad/1.7.0/nomad_1.7.0_linux_amd64.zip
unzip -q nomad_1.7.0_linux_amd64.zip
mv nomad /usr/local/bin/
rm nomad_1.7.0_linux_amd64.zip
nomad version

# Install CNI plugins (required for bridge networking)
echo "Installing CNI plugins..."
CNI_VERSION="v1.3.0"
mkdir -p /opt/cni/bin
wget -q -O cni-plugins.tgz "https://github.com/containernetworking/plugins/releases/download/${CNI_VERSION}/cni-plugins-linux-amd64-${CNI_VERSION}.tgz"
tar -xzf cni-plugins.tgz -C /opt/cni/bin
rm cni-plugins.tgz

# Create directories
mkdir -p /etc/nomad.d /var/nomad /opt/jamroom /opt/jamroom/infra /opt/jamroom/redis_data

# Download infrastructure blueprints
echo "Downloading infrastructure blueprints..."
REPO_URL="https://raw.githubusercontent.com/AdelBeit/jamroom/main"
curl -fsSL "$REPO_URL/docker-compose.yml" -o /opt/jamroom/docker-compose.yml
curl -fsSL "$REPO_URL/Caddyfile.template" -o /opt/jamroom/Caddyfile.template
curl -fsSL "$REPO_URL/infra/jamroom.nomad" -o /opt/jamroom/infra/jamroom.nomad

# Create config for SERVER (central droplet)
if [ "$2" = "server" ]; then
  echo "Configuring Nomad SERVER..."
  cat > /etc/nomad.d/nomad.hcl <<'EOF'
data_dir = "/var/nomad"

server {
  enabled          = true
  bootstrap_expect = 1
}

client {
  enabled = true
  host_volume "redis_data" {
    path      = "/opt/jamroom/redis_data"
    read_only = false
  }
}

consul {
  address = "127.0.0.1:8500"
}

ui {
  enabled = true
}
EOF

# Create config for CLIENT (app droplets)
else
  echo "Configuring Nomad CLIENT..."
  cat > /etc/nomad.d/nomad.hcl <<EOF
data_dir = "/var/nomad"

client {
  enabled = true
  servers = ["$CONSUL_IP:4647"]
}

consul {
  address = "$CONSUL_IP:8500"
}
EOF
fi

# Systemd unit
cat > /etc/systemd/system/nomad.service <<'EOF'
[Unit]
Description=Nomad
After=network.target

[Service]
Type=exec
ExecStart=/usr/local/bin/nomad agent -config=/etc/nomad.d/nomad.hcl
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# Start Nomad
systemctl daemon-reload
systemctl enable nomad
systemctl start nomad

echo "=== Nomad Setup Complete ==="
systemctl status nomad
