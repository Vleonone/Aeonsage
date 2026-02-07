# Remote Access Guide

## Overview

AeonSage Gateway runs locally by default (127.0.0.1:18789). This guide covers methods to access your Gateway from other devices or remote locations.

---

## Access Methods Comparison

| Method | Difficulty | Security | Best For |
|--------|------------|----------|----------|
| **Tailscale** | Low | High | Recommended, zero-config VPN |
| **SSH Tunnel** | Medium | High | Existing SSH server access |
| **Cloudflare Tunnel** | Medium | High | No public IP required |
| **Nginx Reverse Proxy** | High | Medium | Server with public IP |
| **Direct Exposure** | Low | Low | Internal testing only |

---

## Method 1: Tailscale (Recommended)

[Tailscale](https://tailscale.com/) provides zero-configuration VPN — the simplest and most secure option.

### Setup Steps

1. **Install Tailscale**
   - Download: https://tailscale.com/download
   - Install on both the AeonSage host device and accessing devices

2. **Authenticate**
   ```bash
   tailscale up
   ```

3. **Start Gateway (binding to Tailscale IP)**
   ```bash
   aeonsage gateway --host 0.0.0.0 --port 18789
   ```

4. **Get Tailscale IP**
   ```bash
   tailscale ip -4
   # Output example: 100.64.x.x
   ```

5. **Access from other devices**
   ```
   http://100.64.x.x:18789/
   ```

### Optional: Tailscale Serve (HTTPS)

```bash
# Use Tailscale to provide HTTPS
tailscale serve https / http://127.0.0.1:18789
```

---

## Method 2: SSH Tunnel

Best for servers with existing SSH access.

### Local Port Forwarding

Access remote AeonSage from your local machine:

```bash
ssh -L 18789:localhost:18789 user@your-server.com
```

Then access: `http://localhost:18789/`

### Remote Port Forwarding

Expose local AeonSage to a remote server:

```bash
ssh -R 18789:localhost:18789 user@your-server.com
```

### Persistent Tunnel (autossh)

```bash
# Install autossh
brew install autossh  # macOS
apt install autossh   # Ubuntu

# Persistent tunnel
autossh -M 0 -f -N -L 18789:localhost:18789 user@your-server.com
```

---

## Method 3: Cloudflare Tunnel

No public IP required; access through Cloudflare's network.

### Setup Steps

1. **Install cloudflared**
   ```bash
   # macOS
   brew install cloudflare/cloudflare/cloudflared

   # Linux
   curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
   chmod +x cloudflared
   ```

2. **Authenticate**
   ```bash
   cloudflared tunnel login
   ```

3. **Create tunnel**
   ```bash
   cloudflared tunnel create aeonsage
   ```

4. **Configure tunnel** (`~/.cloudflared/config.yml`)
   ```yaml
   tunnel: <tunnel-id>
   credentials-file: /path/to/credentials.json

   ingress:
     - hostname: aeonsage.yourdomain.com
       service: http://localhost:18789
     - service: http_status:404
   ```

5. **Run tunnel**
   ```bash
   cloudflared tunnel run aeonsage
   ```

6. **Access**
   ```
   https://aeonsage.yourdomain.com/
   ```

---

## Method 4: Nginx Reverse Proxy

For servers with public IP.

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name aeonsage.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:18789;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Add HTTPS (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d aeonsage.yourdomain.com
```

---

## Security Recommendations

### 1. Enable Gateway Token

```bash
# Generate secure token
openssl rand -hex 32

# Configure in .env
AEONSAGE_GATEWAY_TOKEN=your-generated-token
```

### 2. Firewall Rules

```bash
# Allow only specific IP ranges
ufw allow from 192.168.1.0/24 to any port 18789
```

### 3. Use HTTPS

Always use HTTPS when exposing Gateway to the public internet.

### 4. Restrict Access Origins

Configure in `.env`:
```env
AEONSAGE_ALLOWED_ORIGINS=https://your-domain.com
```

---

## VPS Deployment Recommendations

### Recommended Specifications

| Spec | Minimum | Recommended |
|------|---------|-------------|
| CPU | 1 core | 2 cores |
| RAM | 2 GB | 4 GB |
| Storage | 20 GB | 40 GB |
| Bandwidth | 1 TB/month | Unlimited |

### Recommended Cloud Providers

- **Hetzner** — Cost-effective, European nodes
- **DigitalOcean** — Simple, reliable
- **Vultr** — Global nodes
- **AWS Lightsail** — Predictable pricing

### Deployment Script

```bash
# One-click deployment to new server
curl -fsSL https://raw.githubusercontent.com/Vleonone/aeonsage/main/scripts/quickstart.sh | bash

# Setup auto-start
aeonsage onboard --install-daemon
```

---

## Related Documentation

- [Quick Start](./QUICKSTART.md)
- [Installation Guide](./install.md)
- [Security Configuration](./security.md)

---

*Last updated: 2026-02-06*
