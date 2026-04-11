#!/bin/bash
set -e

CONSUL_IP=$1

if [ -z "$CONSUL_IP" ]; then
  echo "Usage: ./setup-nomad.sh <consul-ip>"
  exit 1
fi

echo "=== Nomad Setup ==="
echo "Consul server: $CONSUL_IP"

# Install Docker
echo "Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# Install Nomad
echo "Installing Nomad..."
cd /tmp
wget -q https://releases.hashicorp.com/nomad/1.7.0/nomad_1.7.0_linux_amd64.zip
unzip -q nomad_1.7.0_linux_amd64.zip
mv nomad /usr/local/bin/
rm nomad_1.7.0_linux_amd64.zip
nomad version

# Create directories
mkdir -p /etc/nomad.d /var/nomad /opt/jamroom

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
Type=notify
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
