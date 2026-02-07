# Telegram Channel Configuration Troubleshooting Guide

> **Created**: 2026-02-04  
> **Issue**: Telegram Bot configured but not connecting properly  
> **Server**: BuyVM (104.244.72.76)

## Problem Summary

When deploying AeonSage Gateway to production, the Telegram channel may show errors like:
- `entries.telegram: plugin not found: telegram`
- `channels.telegram.dmPolicy="open" requires channels.telegram.allowFrom to include "*"`
- `Telegram configured, not enabled yet`

## Root Cause Analysis (Critical Bug)

**Location**: `src/config/plugin-auto-enable.ts` lines 252-259

**Problem**: The `applyPluginAutoEnable` function treats **channels** (telegram, discord, slack) as if they are **plugins**:

```typescript
// Line 252-259
for (const channelId of channelIds) {
  if (isChannelConfigured(cfg, channelId, env)) {
    changes.push({
      pluginId: channelId,  // BUG: channel is NOT a plugin!
      reason: `${channelId} configured`,
    });
  }
}
```

Then at line 373, it calls `enablePluginEntry(next, entry.pluginId)` which adds:
```json
{
  "plugins": {
    "entries": {
      "telegram": { "enabled": true }  // INVALID! telegram is not a plugin
    }
  }
}
```

**Result**: Config validation fails with `plugins.entries.telegram: plugin not found` even though the user never added this to their config.

**Impact**: Gateway logs this warning but continues running with "best-effort" config.

## Root Causes & Solutions

### 1. Invalid `dmPolicy` Value

**Error**: `Invalid option: expected one of "pairing"|"allowlist"|"open"|"disabled"`

**Cause**: Using invalid value like `"allow"` instead of correct options.

**Solution**:
```json
"dmPolicy": "open"  // Valid: pairing, allowlist, open, disabled
```

---

### 2. Missing `allowFrom` Wildcard for Open Policy

**Error**: `dmPolicy="open" requires channels.telegram.allowFrom to include "*"`

**Cause**: When using `dmPolicy: "open"`, you MUST include `"*"` in `allowFrom`.

**Solution**:
```json
{
  "channels": {
    "telegram": {
      "dmPolicy": "open",
      "allowFrom": ["*"]
    }
  }
}
```

---

### 3. Invalid `plugins.entries.telegram` Configuration

**Error**: `plugins.entries.telegram: plugin not found: telegram`

**Cause**: Telegram is a **bundled channel**, NOT a configurable plugin. Don't add it to `plugins.entries`.

**Solution**: Remove any `plugins.entries.telegram` from config. Telegram is auto-enabled when configured under `channels.telegram`.

---

### 4. Config Not Reloading After Changes

**Cause**: PM2 may cache old config or process not fully restarted.

**Solution**:
```bash
pm2 delete aeonsage-gateway
pm2 flush
cd /opt/aeonsage
pm2 start ecosystem.config.cjs
pm2 save
```

---

## Valid Telegram Configuration Template

```json
{
  "meta": {
    "lastTouchedVersion": "2026.1.26"
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "<YOUR_TOKEN>"
    }
  },
  "channels": {
    "telegram": {
      "accounts": {
        "default": {
          "botToken": "<BOT_TOKEN>",
          "enabled": true
        }
      },
      "configWrites": true,
      "dmPolicy": "open",
      "allowFrom": ["*"],
      "groupPolicy": "allowlist",
      "streamMode": "partial",
      "reactionLevel": "extensive"
    }
  }
}
```

## DM Policy Options

| Policy | Description | `allowFrom` Requirement |
|--------|-------------|------------------------|
| `pairing` | Require pairing code | Optional |
| `allowlist` | Only listed users | Array of user IDs |
| `open` | Allow all users | Must include `"*"` |
| `disabled` | DMs blocked | N/A |

## Debugging Commands

```bash
# Check Gateway status
pm2 status

# View logs
pm2 logs aeonsage-gateway --lines 50

# Test Telegram Bot Token
curl https://api.telegram.org/bot<TOKEN>/getMe

# Check webhook status
curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo

# Validate config
cat ~/.aeonsage/aeonsage.json | jq .

# Run doctor
aeonsage doctor --fix
```

## Related Files

- Config: `~/.aeonsage/aeonsage.json`
- PM2 Ecosystem: `/opt/aeonsage/ecosystem.config.cjs`
- Logs: `/root/.pm2/logs/aeonsage-gateway-*.log`
- State: `~/.aeonsage/agents/main/sessions/`
