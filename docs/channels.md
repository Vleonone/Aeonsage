<div align="center">

<h1>Channel Configuration Guide</h1>
<p>Connect AeonSage to your messaging platforms</p>

<p>
  <img src="https://img.shields.io/badge/channels-10+-00C853?style=flat-square" alt="Channels">
  <img src="https://img.shields.io/badge/platforms-Telegram_Discord_Slack_WhatsApp_Signal-2088FF?style=flat-square" alt="Platforms">
  <img src="https://img.shields.io/badge/status-Production_ready-FF751F?style=flat-square" alt="Status">
</p>

</div>

---

## Supported Channels

| Channel | Type | Status | Complexity |
|:--------|:-----|:------:|:----------:|
| **WhatsApp** | QR Login | ✅ Available | ⭐ Low |
| **Telegram** | Bot Token | ✅ Available | ⭐ Low |
| **Discord** | Bot Token | ✅ Available | ⭐⭐ Medium |
| **Slack** | OAuth | ✅ Available | ⭐⭐ Medium |
| **Signal** | Local | ✅ Available | ⭐⭐⭐ High |
| **iMessage** | macOS | ✅ Available | ⭐ Low |
| **Matrix** | Token | ✅ Available | ⭐⭐ Medium |
| **Google Chat** | Service Account | ✅ Available | ⭐⭐⭐ High |
| **Microsoft Teams** | OAuth | ✅ Available | ⭐⭐⭐ High |
| **Mattermost** | Plugin | ✅ Available | ⭐⭐ Medium |
| **Zalo** | Token | ✅ Available | ⭐⭐ Medium |

---

## Quick Connect

### WhatsApp

```bash
aeonsage channels login
# Scan QR code with your phone
```

[Detailed WhatsApp Setup →](./channels/whatsapp.md)

---

### Telegram

1. Message [@BotFather](https://t.me/BotFather) to create a bot
2. Copy your Bot Token
3. Configure:

```bash
aeonsage configure --section telegram
```

[Detailed Telegram Setup →](./channels/telegram.md)

---

### Discord

1. Create app at [Discord Developer Portal](https://discord.com/developers/applications)
2. Add Bot and copy Token
3. Configure:

```bash
aeonsage configure --section discord
```

[Detailed Discord Setup →](./channels/discord.md)

---

## Universal Commands

### List All Channels

```bash
aeonsage channels list
```

### Check Channel Status

```bash
aeonsage channels status
aeonsage channels status whatsapp
```

### Reconnect Channels

```bash
aeonsage channels reconnect
aeonsage channels reconnect telegram
```

### Disconnect Channels

```bash
aeonsage channels disconnect whatsapp
```

---

## Multi-Channel Configuration

### Using Multiple Channels Simultaneously

Configure in `.env`:

```env
# Enable WhatsApp and Telegram
TELEGRAM_BOT_TOKEN=xxx
# WhatsApp uses QR login, no token needed

# Enable Discord
DISCORD_BOT_TOKEN=xxx
```

### Channel Priority

```bash
aeonsage configure --section channel-priority
# Set response priority order
```

---

## Troubleshooting

### Channel Connection Failed

```bash
# Run diagnostics
aeonsage doctor --channels

# Check logs
grep "channel" ~/.aeonsage/logs/gateway.log
```

### Message Delays

Check network and API rate limits:
```bash
ping api.telegram.org
```

### Bot Not Responding to Group Messages

Verify bot permissions allow reading group messages.

---

## Related Documentation

| Document | Description |
|:---------|:------------|
| [Quick Start](./QUICKSTART.md) | Get running in 5 minutes |
| [Security Configuration](./security.md) | Secure your deployment |
| [Troubleshooting](./troubleshooting.md) | Common issues |

---

<div align="center">

**[← Back to Documentation](./README.md)** · **[Next: Troubleshooting →](./troubleshooting.md)**

<p>
  <img src="https://img.shields.io/badge/Need_help?-Join_Discord-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord">
</p>

</div>
