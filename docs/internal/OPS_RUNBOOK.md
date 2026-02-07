# AeonSage Operations Runbook

> ⚠️ **Internal Documentation - Operations Team Only**

## Server Architecture

### Production Server (BuyVM)
| Item | Value |
| :--- | :--- |
| **IP** | `104.244.72.76` |
| **Location** | Luxembourg |
| **OS** | Ubuntu 20.04 LTS |
| **Specs** | 2 vCPU / 2GB RAM / 160GB SSD |

### Service Inventory

| Service | Port | Management Command |
| :--- | :--- | :--- |
| **Gateway** | 18789 | `pm2 restart aeonsage-gateway` |
| **Nginx** | 80/443 | `systemctl restart nginx` |
| **Docker** | — | `systemctl restart docker` |

---

## Daily Operations

### 1. Check Service Status
```bash
pm2 list
pm2 logs aeonsage-gateway --lines 50
```

### 2. Restart Services
```bash
pm2 restart all
# Or restart individually
pm2 restart aeonsage-gateway
```

### 3. Update Deployment
```bash
cd /opt/aeonsage
git pull origin main
pnpm install
pnpm build
pm2 restart all
```

### 4. View Logs
```bash
# Gateway logs
pm2 logs aeonsage-gateway

# System logs
journalctl -u aeonsage-gateway -f
```

---

## Troubleshooting

### High Memory Usage
```bash
# Check memory usage
pm2 monit

# Restart if needed
pm2 restart aeonsage-gateway
```

### Gateway Unresponsive
```bash
# Check process
pm2 status

# Restart
pm2 delete aeonsage-gateway
pm2 start ecosystem.config.cjs
```

---

*Last updated: 2026-02-03*
