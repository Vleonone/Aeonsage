# Skill Registry & Personas

> **New Feature**: Dynamic skill discovery and persona-based configuration

---

## Overview

AeonSage now includes an integrated skill registry system that:

- Discovers 1700+ skills from community registry
- Allows dynamic installation and management
- Provides persona presets for quick configuration

---

## Skill Manager Tool

The `skill_manager` tool is available to all agents.

### Actions

| Action | Description |
|--------|-------------|
| `search` | Search skills by keyword |
| `install` | Download and install a skill |
| `uninstall` | Remove an installed skill |
| `list` | List all installed skills |
| `update` | Update an installed skill |
| `sync` | Sync registry from GitHub |
| `stats` | Get registry statistics |
| `categories` | List available categories |
| `popular` | Get recommended skills |
| `read` | Read installed skill content |

### Examples

```typescript
// Search for browser automation skills
skill_manager({ action: "search", query: "browser automation" })

// Install a specific skill
skill_manager({ action: "install", skillName: "agent-memory" })

// List installed skills
skill_manager({ action: "list" })
```

---

## Categories

| Category | Description |
|----------|-------------|
| AI & Agents | AI models, agents, intelligent automation |
| Development | Coding, IDEs, development tools |
| Browser & Web | Web browsing, scraping, automation |
| DevOps & Cloud | Infrastructure, containers, deployment |
| Search & Research | Web search, information gathering |
| Finance & Trading | Crypto, stocks, financial data |
| Media & Creative | Images, video, audio, content |
| Productivity | Email, calendar, task management |
| Security | Security tools, password management |
| CLI & System | Terminal commands, system utilities |

---

## Personas

Pre-configured skill sets for different roles:

| Persona | Included Skills |
|---------|-----------------|
| Full-Stack Developer | coding, github, docker, git, terminal |
| Research Analyst | web-search, browse, document-analysis |
| Crypto Trader | crypto-price, trading-signals, portfolio |
| DevOps Engineer | docker, kubernetes, aws, ssh, terraform |
| Content Creator | writing, seo, image-generation, tts |
| Executive Assistant | email, calendar, reminder, weather |
| Security Specialist | security-audit, encryption, log-analyzer |
| Data Scientist | python, data-analysis, visualization |

### Applying a Persona

```typescript
// In agent configuration
{
  "persona": "developer",
  "systemPromptHint": "You are an expert full-stack developer..."
}
```

---

## Skill Files Location

```
~/.aeonsage/skills/
├── registry.json          # Cached skill index
└── installed/             # Downloaded skills
    └── skill-name/
        ├── SKILL.md       # Skill instructions
        ├── metadata.json  # Skill metadata
        └── scripts/       # Optional scripts
```

---

## API Reference

### Registry Functions

```typescript
import { syncRegistry, searchSkills, getPopularSkills } from './skills';

// Sync from GitHub
await syncRegistry();

// Search skills
const results = searchSkills({ query: 'browser', limit: 10 });

// Get popular skills
const popular = getPopularSkills(5);
```

### Installer Functions

```typescript
import { installSkill, uninstallSkill, listInstalledSkills } from './skills';

// Install
await installSkill('agent-memory');

// List installed
const installed = listInstalledSkills();

// Uninstall
await uninstallSkill('agent-memory');
```

---

## See Also

- [Tools Overview](../tools/README.md)
- [Agent Configuration](../gateway/agents.md)
- [Plugins Guide](../plugin.md)
