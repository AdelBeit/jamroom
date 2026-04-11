#!/bin/bash
set -e

echo "=== Central Services Setup ==="

# Install Docker
echo "Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# Install Docker Compose
echo "Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Nomad
echo "Installing Nomad..."
cd /tmp
wget -q https://releases.hashicorp.com/nomad/1.7.0/nomad_1.7.0_linux_amd64.zip
unzip -q nomad_1.7.0_linux_amd64.zip
mv nomad /usr/local/bin/
rm nomad_1.7.0_linux_amd64.zip

# Install Consul
echo "Installing Consul..."
wget -q https://releases.hashicorp.com/consul/1.20.1/consul_1.20.1_linux_amd64.zip
unzip -q consul_1.20.1_linux_amd64.zip
mv consul /usr/local/bin/
rm consul_1.20.1_linux_amd64.zip

# Create directories
mkdir -p /etc/nomad.d /var/nomad /etc/consul.d /var/consul /opt/jamroom

# Nomad server config
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

# Consul server config
cat > /etc/consul.d/consul.hcl <<'EOF'
server           = true
bootstrap_expect = 1
ui               = true
client_addr      = "0.0.0.0"
bind_addr        = "0.0.0.0"

ports {
  http = 8500
  dns  = 8600
}
EOF

# Systemd for Nomad
cat > /etc/systemd/system/nomad.service <<'EOF'
[Unit]
Description=Nomad
After=network.target
Requires=consul.service

[Service]
Type=notify
ExecStart=/usr/local/bin/nomad agent -config=/etc/nomad.d/nomad.hcl
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# Systemd for Consul
cat > /etc/systemd/system/consul.service <<'EOF'
[Unit]
Description=Consul
After=network.target

[Service]
Type=notify
ExecStart=/usr/local/bin/consul agent -server -config-dir=/etc/consul.d
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# Start services
systemctl daemon-reload
systemctl enable consul nomad
systemctl start consul
systemctl start nomad

sleep 5

echo "=== Setup Complete ==="
echo "Nomad UI: http://$(hostname -I | awk '{print $1}'):4646/ui/"
echo "Consul UI: http://$(hostname -I | awk '{print $1}'):8500/ui/"
