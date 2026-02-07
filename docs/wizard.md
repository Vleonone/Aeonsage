<div align="center">

<h1>Onboarding Wizard Guide</h1>
<p>Step-by-step initial configuration</p>

<p>
  <img src="https://img.shields.io/badge/steps-6-00C853?style=flat-square" alt="Steps">
  <img src="https://img.shields.io/badge/duration-5_min-2088FF?style=flat-square" alt="Duration">
  <img src="https://img.shields.io/badge/mode-Interactive_Non--interactive-FF751F?style=flat-square" alt="Mode">
</p>

</div>

---

## Launching the Wizard

```bash
aeonsage onboard --install-daemon
```

### Command Options

| Parameter | Description |
|:----------|:------------|
| `--install-daemon` | Install background service |
| `--skip-auth` | Skip authentication configuration |
| `--skip-channels` | Skip channel configuration |
| `--non-interactive` | Non-interactive mode |

---

## Wizard Steps

### Step 1: Gateway Mode

```
? Select Gateway mode:
  > Local (127.0.0.1) - Localhost only
    LAN (0.0.0.0) - LAN access
    Remote - Remote server
```

**Recommendation:** Select `Local` for first-time setup

### Step 2: Gateway Port

```
? Gateway port [18789]:
```

**Recommendation:** Use default port unless there is a conflict

### Step 3: AI Authentication

```
? Select AI provider:
  > Anthropic (Claude)
    OpenAI (GPT)
    Google (Gemini)
    OpenRouter (Multi-provider)
    Skip for now
```

### Step 4: Channel Configuration

```
? Configure chat channels?
  > Yes, configure now
    Skip, configure later
```

### Step 5: Background Service

```
? Install background service?
  > Yes (recommended)
    No
```

### Step 6: Completion

```
🎉 Setup complete!

Summary:
  Gateway:  http://127.0.0.1:18789
  AI:       Anthropic (claude-3-5-sonnet)
  Channels: WhatsApp, Telegram
  Service:  Running

Next steps:
  - aeonsage status     Check status
  - aeonsage doctor     Diagnose issues
  - aeonsage gateway    Manual start
```

---

## Non-Interactive Mode

Suitable for scripted deployment:

```bash
# Set environment variables
export ANTHROPIC_API_KEY=sk-ant-xxx
export TELEGRAM_BOT_TOKEN=xxx

aeonsage onboard \
  --non-interactive \
  --install-daemon \
  --gateway-port 18789 \
  --provider anthropic
```

---

## Configuration File Locations

After wizard completion, configurations are saved to:

| File | Contents |
|:-----|:---------|
| `~/.aeonsage/aeonsage.json` | Main configuration |
| `~/.aeonsage/credentials/` | Authentication credentials |
| `~/.aeonsage/agents/` | Agent configurations |
| `~/.aeonsage/channels/` | Channel configurations |

---

## Re-running the Wizard

```bash
# Complete reconfiguration
rm -rf ~/.aeonsage
aeonsage onboard --install-daemon

# Partial reconfiguration
aeonsage configure --section auth      # Reconfigure authentication
aeonsage configure --section channels  # Reconfigure channels
```

---

## FAQ

### Q: Wizard was interrupted?

```bash
# Re-run
aeonsage onboard --install-daemon
```

### Q: Service not starting?

```bash
# Check service status
aeonsage gateway status

# Manual start
aeonsage gateway
```

### Q: Authentication failed?

```bash
# Reconfigure authentication
aeonsage configure --section auth
```

---

## Related Documentation

| Document | Description |
|:---------|:------------|
| [Quick Start](./QUICKSTART.md) | 5-minute guide |
| [Installation Guide](./install.md) | Detailed setup |
| [Model Configuration](./models.md) | AI model setup |
| [Channel Configuration](./channels.md) | Messaging platforms |

---

<div align="center">

**[← Back to Documentation](./README.md)**

</div>
