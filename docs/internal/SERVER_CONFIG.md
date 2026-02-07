# Internal Server Configuration

> ⚠️ **INTERNAL ONLY** - Do not commit to public repository

---

## BuyVM Production Server

| Property | Value |
|----------|-------|
| **Provider** | BuyVM (FranTech Solutions) |
| **Location** | Luxembourg, EU |
| **IP Address** | `104.244.72.76` |
| **Hostname** | `aeonsage-lux01` |
| **Purpose** | Primary production gateway |

### Specifications

| Spec | Value |
|------|-------|
| CPU | AMD Ryzen 9 7950X3D (2 vCPU) |
| RAM | 8 GB |
| Storage | 160 GB NVMe SSD |
| Network | 1 Gbps |
| OS | Ubuntu 20.04 LTS |

### Current Resource Usage

| Resource | Usage | Status |
|----------|-------|--------|
| RAM | ~200MB / 8GB | ✅ 2.5% |
| CPU | ~1% idle | ✅ Underutilized |
| Disk | ~15GB / 160GB | ✅ 9% |

---

## Gateway Configuration

**Config File**: `/root/.aeonsage/server-aeonsage.json`

```json
{
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "aeonsage-buyvm-2026"
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "openrouter/anthropic/claude-3.5-sonnet"
      }
    }
  }
}
```

---

## Telegram Bot

| Property | Value |
|----------|-------|
| Bot Username | `@AeonNickBot` |
| Bot Token | `8465614659:AAE_SYaLpbn...` (truncated) |
| Allowed User ID | `6118724722` |
| DM Policy | `allowlist` |
| Group Policy | `allowlist` |

---

## SSH Access

```bash
# Connect to server
ssh root@104.244.72.76

# Quick status check
systemctl status aeonsage

# View logs
journalctl -u aeonsage -f
```

---

## Deployment Checklist

- [x] Node.js v18.20.8 installed
- [x] Nginx reverse proxy configured
- [x] SSL certificate (Let's Encrypt)
- [x] Firewall configured (ufw)
- [x] Telegram bot connected
- [ ] Docker installed
- [ ] PM2 process manager
- [ ] Swap configured
- [ ] Monitoring (optional)

---

## Security Notes

1. **Authentication**: Token-based auth required for all API calls
2. **Network**: Gateway binds to loopback only (127.0.0.1)
3. **Firewall**: Only ports 22, 80, 443 open
4. **Location**: EU jurisdiction (GDPR compliant)

---

## Optimization Roadmap

### Phase 1: Basic Optimization (Current)
- [ ] Install Docker for containerization
- [ ] Add swap (2GB)
- [ ] Set up PM2 with auto-restart

### Phase 2: Local LLM Integration
- [ ] Configure Vast.ai GPU instance
- [ ] Deploy Ollama for local LLM
- [ ] WireGuard tunnel to GPU server

### Phase 3: Production Hardening
- [ ] Fail2ban for SSH protection
- [ ] Automated backups
- [ ] Prometheus/Grafana monitoring

---

## Related Documents

- [Public BuyVM Guide](../platforms/buyvm.md) - Open source documentation
- [Hosting Plan](../../../.gemini/antigravity/brain/*/hosting-plan.md) - Detailed optimization plan
