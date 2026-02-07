<div align="center">

<h1>Model Configuration Guide</h1>
<p>Configure and manage AI providers and models</p>

<p>
  <img src="https://img.shields.io/badge/providers-10+-00C853?style=flat-square" alt="Providers">
  <img src="https://img.shields.io/badge/models-Claude_GPT_Gemini-2088FF?style=flat-square" alt="Models">
  <img src="https://img.shields.io/badge/local-Ollama-FF751F?style=flat-square" alt="Local">
</p>

</div>

---

## Supported Providers

| Provider | Models | Recommendation | Configuration |
|:---------|:-------|:--------------:|:-------------|
| **Anthropic** | Claude 3.5/3 Opus/Sonnet/Haiku | ⭐⭐⭐ Highly Recommended | API Key |
| **OpenAI** | GPT-4o/4/3.5 | ⭐⭐⭐ Highly Recommended | API Key |
| **Google** | Gemini Pro/Ultra | ⭐⭐ Recommended | API Key |
| **OpenRouter** | Multi-model | ⭐⭐ Recommended | API Key |
| **Ollama** | Local models | Self-hosted | Local |
| **Groq** | Llama/Mixtral | ⭐⭐ Recommended | API Key |

---

## Quick Configuration

### Configuration Wizard (Recommended)

```bash
aeonsage configure --section auth
```

### Environment Variables

```env
# .env file

# Anthropic (recommended)
ANTHROPIC_API_KEY=sk-ant-xxx

# OpenAI
OPENAI_API_KEY=sk-xxx

# Google AI
GOOGLE_AI_API_KEY=xxx

# OpenRouter
OPENROUTER_API_KEY=sk-or-xxx
```

---

## CLI Commands

### List Available Models

```bash
aeonsage models list
```

### Check Model Status

```bash
aeonsage models status
```

### Switch Models

```bash
# Switch default model
aeonsage models switch claude-3-opus

# Switch during conversation
/model gpt-4o
```

### Test Models

```bash
aeonsage models test claude-3-5-sonnet
```

---

## Model Recommendations

### By Use Case

| Scenario | Recommended Model | Reason |
|:---------|:------------------|:-------|
| **Daily conversations** | Claude 3.5 Sonnet | Balance of performance and cost |
| **Complex tasks** | Claude 3 Opus / GPT-4 | Strongest reasoning |
| **Fast response** | Claude 3 Haiku / GPT-3.5 | Low latency |
| **Code generation** | Claude 3.5 Sonnet | Excellent coding ability |
| **Long documents** | Claude 3 / GPT-4-128k | Large context window |

### By Cost

| Level | Models | Cost |
|:------|:-------|:-----|
| Premium | GPT-4, Claude Opus | Higher |
| Standard | Claude Sonnet, GPT-4o | Moderate |
| Economy | Claude Haiku, GPT-3.5 | Lower |
| Free | Ollama (local) | Free |

---

## Local Models (Ollama)

### Install Ollama

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh
```

### Download Models

```bash
ollama pull llama3
ollama pull codellama
ollama pull mistral
```

### Configure AeonSage

```bash
aeonsage configure --section ollama
```

---

## FAQ

### Q: "Model is not allowed"

**Cause:** Insufficient API key permissions or quota exceeded

**Solution:**
```bash
aeonsage models status
aeonsage configure --section auth
```

### Q: Slow responses

**Solution:**
```bash
# Switch to faster model
aeonsage models switch claude-3-haiku
```

### Q: How to reduce costs?

1. Use Haiku/GPT-3.5 for simple tasks
2. Configure local Ollama
3. Use OpenRouter free models

---

## Related Documentation

| Document | Description |
|:---------|:------------|
| [Quick Start](./QUICKSTART.md) | 5-minute guide |
| [Configuration Wizard](./wizard.md) | Setup wizard |
| [Troubleshooting](./troubleshooting.md) | Common issues |

---

<div align="center">

**[← Back to Documentation](./README.md)**

</div>
