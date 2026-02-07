# AeonSage on BuyVM

Deploy AeonSage on BuyVM for privacy-focused, high-performance VPS hosting.

---

## Why BuyVM

- Privacy-focused hosting (no DMCA abuse)
- High-performance SSD storage
- DDoS protection included
- 1Gbps network
- Affordable pricing

---

## Resource Requirements

| Component | Memory | vCPU |
|:----------|:-------|:-----|
| AeonSage Instance | ~400MB | 0.5 |
| Gateway Service | ~100MB | 0.2 |
| **Total** | **~500MB** | **0.7** |

**Minimum**: 1GB RAM, 1 vCPU, 20GB storage

---

## Quick Deploy

### Option 1: One-Line Install

```bash
curl -fsSL https://raw.githubusercontent.com/Vleonone/AeonSage-Silicon-Intelligence/main/scripts/quickstart.sh | bash
```

### Option 2: Docker Compose

```bash
git clone https://github.com/Vleonone/AeonSage-Silicon-Intelligence.git
cd AeonSage-Silicon-Intelligence
docker compose -f docker-compose.quickstart.yml up -d
```

---

## Post-Install Configuration

```bash
# Run setup wizard
aeonsage onboard --install-daemon

# Verify installation
aeonsage doctor
```

---

## Features

- Private AI Gateway
- 15+ AI Provider Integration
- WhatsApp / Telegram / Discord / Slack
- Browser Automation
- Custom Skills
- VDID Authentication
- Backend Wallet Integration

---

## See Also

- [Installation Guide](../install.md)
- [Docker Setup](../install/docker.md)
- [Linux Guide](./linux.md)
- [Hetzner Guide](./hetzner.md)
