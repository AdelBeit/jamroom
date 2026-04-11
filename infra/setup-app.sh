#!/bin/bash
set -e

CENTRAL_IP=$1

if [ -z "$CENTRAL_IP" ]; then
  echo "Usage: ./setup-app.sh <central-droplet-ip>"
  exit 1
fi

echo "=== App Server Setup ==="
echo "Central server: $CENTRAL_IP"

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

# Create directories
mkdir -p /etc/nomad.d /var/nomad

# Nomad client config
cat > /etc/nomad.d/nomad.hcl <<EOF
data_dir = "/var/nomad"

client {
  enabled = true
  servers = ["$CENTRAL_IP:4647"]
}

consul {
  address = "$CENTRAL_IP:8500"
}
EOF

# Systemd for Nomad
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

# Start service
systemctl daemon-reload
systemctl enable nomad
systemctl start nomad

echo "=== App Server Setup Complete ==="
echo "Nomad client started, connecting to $CENTRAL_IP"
