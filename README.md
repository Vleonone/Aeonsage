<div align="center">
  <a href="https://aeonsage.org">
    <img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/AeonSage_letter_logo.svg" alt="AEONSAGE" width="480" loading="eager">
  </a>

  <br><br>

  **The Sovereign Intelligence Operating System**<br>
  Identity-first. Self-hosted. Deterministic.

  <br>

  [![Release](https://img.shields.io/badge/RELEASE-v2026.2-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/velonone/Aeonsage/releases)
  [![OSS](https://img.shields.io/badge/OSS-Aeonsage-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/velonone/Aeonsage)
  [![License](https://img.shields.io/badge/LICENSE-Non--Commercial-000000?style=for-the-badge&logo=gitbook&logoColor=white)](./LICENSE)
  [![Docs](https://img.shields.io/badge/DOCS-aeonsage.org-000000?style=for-the-badge&logo=readme&logoColor=white)](https://aeonsage.org/docs)
  [![Language](https://img.shields.io/badge/LANG-中文-000000?style=for-the-badge&logo=google-translate&logoColor=white)](./README_ZH.md)

</div>

---

> **Your AI. Your hardware. Your rules.**
>
> AeonSage is a self-hosted AI agent operating system that puts identity and privacy at the kernel level. Unlike cloud-dependent chatbots, AeonSage runs entirely on your hardware — your data never leaves your machine.

---

## Contents

- [Architecture](#architecture)
- [Connectivity](#connectivity-matrix)
- [Desktop Client](#desktop-client)
- [Quick Start](#quick-start)
- [Editions](#editions)
- [Tech Stack](#tech-stack)
- [Ecosystem](#ecosystem-partners)
- [License](#license--legal)

---

## Architecture

AeonSage implements a strict **Kernel-Ring Architecture** with 58+ modules across 6 layers.

```
                         AeonSage Gateway
  ┌──────────┬──────────┬──────────┬──────────┬─────────────┐
  │  Ring 0  │  Ring 1  │  Ring 2  │  Ring 3  │   Ring 4    │
  │  Kernel  │  Router  │  Skills  │ Channels │  Interface  │
  ├──────────┼──────────┼──────────┼──────────┼─────────────┤
  │ Identity │ Multi-LLM│ 54+ Tools│ 30+ Plat │ Cockpit UI  │
  │ State    │ Tiered   │ MCP SDK  │ Protocol │ Desktop App │
  │ Security │ Fallback │ Plugin   │ Bridges  │ WebSocket   │
  └──────────┴──────────┴──────────┴──────────┴─────────────┘
                         107 RPC Methods
```

### Sovereign Transformation

Every user intent is treated as a verifiable transaction — signed, routed, executed, and logged.

```mermaid
graph LR
    subgraph "Legacy (Entropy)"
        Raw[Stochastic LLM]
        Leak[Context Leak]
        Cost[Unbounded Cost]
        Raw --> Leak
        Raw --> Cost
    end

    Transaction((Sovereign<br>Kernel))

    subgraph "AeonSage (Order)"
        VDID[Verified ID]
        Route[Cognitive Router]
        Audit[Immutable Log]
    end

    Raw --> Transaction
    Transaction --> VDID
    Transaction --> Route
    Route --> Audit

    style Transaction fill:#000,stroke:#fff,stroke-width:2px,color:#fff
    style VDID fill:#10B981,stroke:#333,color:#000
    style Route fill:#0066FF,stroke:#333,color:#fff
```

### Core Capabilities

| Layer | Component | Description |
| :--- | :--- | :--- |
| **Ring 0** | Sovereign Kernel | Deterministic state machine, VDID identity, active defense wall, audit logger |
| **Ring 1** | Cognitive Router | Multi-LLM routing (local/cloud), tiered complexity analysis, provider fallback cascade |
| **Ring 2** | Skill Extensions | 54+ built-in skills, MCP protocol support, Plugin SDK for custom extensions |
| **Ring 3** | Channel Bridges | 30+ native protocol bridges — WhatsApp, Telegram, Discord, Slack, Signal, Email & more |
| **Ring 4** | Interface Layer | Lit 3 Cockpit UI, Tauri v2 Desktop Client, 107 WebSocket RPC methods |

---

## Connectivity Matrix

Native protocol bridges — no third-party automation required.

| Protocol | Implementation | Capabilities | Status |
| :--- | :--- | :--- | :---: |
| **WhatsApp** | Baileys (wacli) | Multi-device, Media, Voice Notes | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **Telegram** | MTProto / Bot API | Secret Chats, Channels, Admin Ops | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **Discord** | WebSocket Gateway | Voice, Slash Commands, Roles | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **Slack** | Enterprise Grid | Threads, File Analysis, App Home | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **Signal** | libsignal | E2EE Messaging | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **Email** | SMTP / IMAP | Parsing, Drafting, Attachments | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **LINE** | Messaging API | Rich Menus, Flex Messages | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **Matrix** | matrix-js-sdk | Federation, E2EE Rooms | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |

> **30+ channels** supported in total. See the full list in the [documentation](https://aeonsage.org/docs).

---

## Desktop Client

The AeonSage Desktop App is built with **Tauri v2** (Rust) + **React 19** — delivering a native experience at ~10 MB (vs ~150 MB for Electron).

- **Agent Visualization** — Real-time execution flow, tool calls, and reasoning traces
- **Visual Workflows** — Drag-and-drop multi-agent workflow builder
- **BYOK** — Bring Your Own Key, use any model provider with your own API keys
- **Secure Gateway** — Tauri Sidecar manages the Node.js gateway process
- **Cross-Platform** — Windows, macOS, Linux

---

## Quick Start

### System Requirements
- **OS**: Windows 11 / macOS 13+ / Linux Kernel 5.15+
- **Runtime**: Node.js v22.0.0+ (Active LTS)

### Portable (Windows)
1. Download **[AeonSage_OSS.zip](https://github.com/velonone/Aeonsage/releases/latest/download/AeonSage_OSS.zip)**
2. Extract and run `AeonSage.bat`

### Developer Install
```bash
# Clone the repository
git clone https://github.com/velonone/Aeonsage.git
cd Aeonsage

# Install dependencies
pnpm install

# Initialize configuration
pnpm run init

# Launch the gateway
pnpm start
```

The Cockpit UI will be available at `http://localhost:18789`.

---

## Editions

| | Free (OSS) | Pro | Enterprise |
| :--- | :---: | :---: | :---: |
| **Price** | $0 | $59/mo | Custom |
| **Deployment** | Self-hosted | Self-hosted + Cloud | Private Cloud |
| **Cognitive Engine** | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |
| **Multi-LLM Router** | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |
| **All Channels** | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |
| **Visual Workflows** | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |
| **BYOK** | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |
| **Cockpit UI** | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |
| **Desktop Client** | ![4](https://img.shields.io/badge/4_Pages-E8832A?style=flat-square) | ![6](https://img.shields.io/badge/6_Pages-2ea44f?style=flat-square) | ![Full](https://img.shields.io/badge/Full-2ea44f?style=flat-square) |
| **Max Workers** | ![1](https://img.shields.io/badge/1-E8832A?style=flat-square) | ![3](https://img.shields.io/badge/3-2ea44f?style=flat-square) | ![Unlimited](https://img.shields.io/badge/Unlimited-2ea44f?style=flat-square) |
| **CloudRelay** | ![No](https://img.shields.io/badge/Pro-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |
| **Finance Dashboard** | ![No](https://img.shields.io/badge/Pro-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |
| **VDID Identity** | ![No](https://img.shields.io/badge/Pro-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |
| **Custom Themes** | ![No](https://img.shields.io/badge/Pro-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |
| **Security Dashboard** | ![No](https://img.shields.io/badge/Enterprise-7B5EA7?style=flat-square) | ![No](https://img.shields.io/badge/Enterprise-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |
| **Team Management** | ![No](https://img.shields.io/badge/Enterprise-7B5EA7?style=flat-square) | ![No](https://img.shields.io/badge/Enterprise-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |
| **Audit & Compliance** | ![No](https://img.shields.io/badge/Enterprise-7B5EA7?style=flat-square) | ![No](https://img.shields.io/badge/Enterprise-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/Included-2ea44f?style=flat-square) |

> **Free edition is fully functional for local AI.** Pro unlocks cloud features and multi-agent workers.

---

## Tech Stack

| Component | Technology |
| :--- | :--- |
| Runtime | Node.js 22+ (ESM) |
| Language | TypeScript 5.x |
| Backend | Hono + Express + WebSocket |
| Cockpit UI | Lit 3.3 + Vite 7 |
| Desktop | Tauri v2 (Rust) + React 19 |
| Auth | Social Login (Telegram / Google / GitHub) + VDID |
| Database | PostgreSQL + SQLite (local) |
| AI | Local (Ollama) + Cloud (OpenRouter, Anthropic, OpenAI, Google) |

---

## Ecosystem Partners

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://vdid.org"><img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/vdid-logo.svg" alt="VDID" width="100"></a><br>
      <br><b>Identity Layer</b><br>VDID Network
    </td>
    <td align="center" width="50%">
      <a href="https://velonlabs.com"><img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/velonlabs-logo.png" alt="VelonLabs" width="120"></a><br>
      <br><b>Research & Engineering</b><br>VelonLabs
    </td>
  </tr>
</table>

---

## License & Legal

**AeonSage Community Edition** is distributed under the **MIT License** with a trademark addendum.

> **Trademark Notice**: The "AeonSage" name, logo, and the "VDID" verification network are proprietary assets of VelonLabs. Commercial derivatives utilizing the AeonSage brand require an explicit enterprise license. The source code is open — the brand is not.

---

<div align="center">

  <img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/AeonSage_letter_logo.svg" alt="AeonSage" width="200">

  <br><br>

  **Engineered by [VelonLabs](https://velonlabs.com) & The AeonSage Core Team**

  <br>

  [![Website](https://img.shields.io/badge/Website-aeonsage.org-000000?style=flat-square&logo=safari&logoColor=white)](https://aeonsage.org)
  [![Telegram](https://img.shields.io/badge/Community-Telegram-000000?style=flat-square&logo=telegram&logoColor=white)](https://t.me/aeonsage)
  [![Twitter](https://img.shields.io/badge/Follow-@AeonSage-000000?style=flat-square&logo=x&logoColor=white)](https://x.com/AeonSage)

  <br>

  <sub>Copyright &copy; 2025-2026 VelonLabs. All rights reserved.</sub>

</div>
