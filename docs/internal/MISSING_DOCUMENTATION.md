---
summary: "Documentation gaps and missing extension docs - internal tracking"
read_when:
  - Adding documentation for new extensions
  - Auditing docs completeness
---

# Missing Documentation Tracking

> **Internal Use Only** - This document tracks documentation gaps in the public docs/

---

## Extension Documentation Gaps

The following extensions in `extensions/` directory lack corresponding documentation in `docs/channels/` or `docs/plugins/`:

### Priority 1: Core Extensions

| Extension | Type | Missing Doc | Priority | Notes |
|:----------|:-----|:------------|:---------|:------|
| copilot-proxy | Auth | docs/plugins/copilot-proxy.md | High | GitHub Copilot integration |
| diagnostics-otel | Observability | docs/plugins/diagnostics-otel.md | Medium | OpenTelemetry diagnostics |
| memory-core | Memory | docs/plugins/memory-core.md | High | Core memory system |
| memory-lancedb | Storage | docs/plugins/memory-lancedb.md | Medium | LanceDB vector storage |
| ollama-local | Provider | docs/providers/ollama-local.md | High | Local LLM provider |

### Priority 2: Integration Extensions

| Extension | Type | Missing Doc | Priority | Notes |
|:----------|:-----|:------------|:---------|:------|
| moonshotai-kimi | Provider | docs/providers/moonshotai-kimi.md | Low | Moonshot AI integration |
| open-prose | Utility | docs/plugins/open-prose.md | Medium | Prose/scripting utilities |
| qwen-portal-auth | Auth | docs/plugins/qwen-portal-auth.md | Low | Qwen portal authentication |
| llm-task | Task | docs/plugins/llm-task.md | Medium | LLM task management |

### Priority 3: Legacy/Internal

| Extension | Type | Status | Notes |
|:----------|:-----|:-------|:------|
| lobster | Tool | Redirect exists | Now "Workflows", docs/tools/lobster.md exists |

---

## Documentation Templates

### For Channel Extensions

Use this structure for new channel docs:

```markdown
---
summary: "[Channel] setup and configuration guide"
---

# [Channel Name]

## Overview

- Quick description
- Requirements
- Feature support matrix

## Setup

### Prerequisites

- Required accounts/tokens
- Installation steps

### Configuration

```json
{
  "[channel]": {
    "enabled": true,
    "token": "..."
  }
}
```

## Features

| Feature | Support | Notes |
|:--------|:--------|:------|
| Text | Yes | |
| Media | Partial | Images only |
| Reactions | No | |
| Groups | Yes | |

## Troubleshooting

Common issues and solutions.
```

### For Plugin Extensions

```markdown
---
summary: "[Plugin] functionality and configuration"
---

# [Plugin Name]

## Overview

What this plugin does.

## Installation

```bash
aeonsage plugins add [plugin-name]
```

## Configuration

Configuration options.

## Usage

How to use the plugin.

## API Reference

If applicable.
```

---

## Action Items

- [ ] Create docs/plugins/copilot-proxy.md
- [ ] Create docs/plugins/memory-core.md
- [ ] Create docs/providers/ollama-local.md
- [ ] Review extensions/lobster/ - update or archive docs
- [ ] Set up CI check for missing extension docs

---

*Last updated: 2026-02-07*
