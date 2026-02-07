---
summary: "AeonSage system capabilities overview - features and functional modules"
read_when:
  - You want to understand what AeonSage can do
  - You need to differentiate capabilities from tools
---

# Capabilities Overview

AeonSage provides a comprehensive set of capabilities that enable autonomous AI agent operation across multiple dimensions. This document outlines the high-level functional areas of the system.

---

## Core Capabilities

### Multi-Channel Gateway

- Connect to 15+ messaging platforms simultaneously
- Unified message routing across all channels
- Channel-specific feature adaptation (media, reactions, groups)
- WebSocket-based real-time communication

### Agent Orchestration

- Single-agent mode for focused tasks
- Multi-worker parallel execution (Pro feature)
- CEO-Worker delegation patterns
- Session isolation and context management

### Tool System

- 40+ built-in tools (browser, SSH, file system, GitHub, etc.)
- Typed tool interfaces with schema validation
- Tool profiles for capability restriction
- Custom skill/plugin extension

### Security Framework

- Granular permission gates (read/write/execute)
- Safety controls with approval workflows
- Docker sandbox isolation
- Audit logging and compliance

---

## Capability Categories

| Category | Description | Documentation |
|:---------|:------------|:--------------|
| **Messaging** | Channel integrations and routing | [Channels](/channels/) |
| **Tools** | Built-in and custom agent tools | [Tools](/tools/) |
| **Execution** | Task execution and sandboxing | [Exec](/capabilities/exec/) |
| **Browser** | Web automation and interaction | [Browser](/capabilities/browser/) |
| **Memory** | Context and session management | [Memory](/concepts/memory/) |
| **Cron** | Scheduled task automation | [Cron Jobs](/automation/cron-jobs/) |

---

## Pro vs Open Source Capabilities

| Capability | Open Source | Pro |
|:-----------|:------------|:----|
| Multi-Channel Gateway | Available | Available |
| Single Agent | Available | Available |
| Multi-Worker Parallel | - | Available |
| Advanced Security Gates | Basic | Full |
| Workflow Canvas | - | Available |
| VDID Identity | - | Available |

See [Pro Tier Strategy](/pro-tier/) for complete comparison.

---

## Related Documentation

- [Tools Reference](/tools/) - Detailed tool documentation
- [Channel Setup](/channels/) - Messaging platform configuration
- [Gateway Architecture](/gateway/) - System architecture details
- [Security Guide](/security/) - Security configuration

---

*Note: Capabilities are implemented through a combination of core system code and extensions. See individual capability pages for implementation details.*
