<div align="center">

<h1>Quick Start Guide</h1>
<p>Get AeonSage running in 5 minutes</p>

<p>
  <img src="https://img.shields.io/badge/time-5_min-00C853?style=flat-square" alt="Time">
  <img src="https://img.shields.io/badge/difficulty-easy-2088FF?style=flat-square" alt="Difficulty">
  <img src="https://img.shields.io/badge/prerequisites-Node.js_22-339933?style=flat-square&logo=node.js&logoColor=white" alt="Prerequisites">
</p>

</div>

---

## Prerequisites

Before you start, make sure you have:

- **Node.js 22.12.0+** installed
- An API key from at least one AI provider:
  - [Anthropic Claude](https://console.anthropic.com/)
  - [OpenAI GPT](https://platform.openai.com/)
  - [Google Gemini](https://aistudio.google.com/)

---

## Step 1: Install AeonSage

```bash
# Install globally via pnpm
pnpm add -g aeonsage@latest

# Verify installation
aeonsage --version
```

---

## Step 2: Run Setup Wizard

The setup wizard configures your gateway and AI providers:

```bash
aeonsage onboard --install-daemon
```

During setup, you will configure:
- Gateway port and authentication token
- AI provider API keys
- Background service installation

---

## Step 3: Start the Gateway

```bash
aeonsage gateway --port 18789 --verbose
```

Open your browser and go to: `http://127.0.0.1:18789/`

---

## Step 4: Verify Installation

Run the diagnostic tool to check everything is working:

```bash
aeonsage doctor
```

---

## Step 5: Connect Messaging Channels (Optional)

### WhatsApp
```bash
aeonsage channels login
# Scan the QR code with your phone
```

### Telegram / Discord
```bash
aeonsage configure --section telegram
# or
aeonsage configure --section discord
```

---

## Step 6: Send Your First Message

1. Send a message to your connected channel (WhatsApp, Telegram, etc.)
2. Watch the gateway logs for AI processing
3. Receive the AI response

---

## What's Next?

| Resource | Description |
|:---------|:------------|
| [Installation Details](./install.md) | Full installation options |
| [Channel Setup](./channels.md) | Connect more messaging platforms |
| [Gateway Configuration](./gateway/configuration.md) | Advanced settings |
| [Tool Development](./capabilities/creating-skills.md) | Build custom tools |

---

## Troubleshooting

| Issue | Solution |
|:------|:---------|
| Node.js version error | Upgrade to Node.js 22.12.0+ |
| Gateway won't start | Check if port 18789 is in use |
| AI provider error | Verify your API key in `.env` |
| Channel not connecting | Run `aeonsage doctor` for diagnostics |

For more help, run:
```bash
aeonsage doctor --verbose
```

---

<div align="center">

**[← Back to Documentation](./README.md)** · **[Next: Installation →](./install.md)**

</div>
