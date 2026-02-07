<div align="center">
  <a href="https://aeonsage.org">
    <img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/aeonsage_Banner.svg" alt="AEONSAGE OS" width="100%" loading="eager">
  </a>
  <br>
  
  [![Version](https://img.shields.io/badge/Release-v2026.1.30-0066FF?style=for-the-badge&labelColor=1a1a1a)](https://github.com/velonone/Aeonsage/releases)
  [![OpenSage](https://img.shields.io/badge/OpenSage-Core_Repo-10B981?style=for-the-badge&labelColor=1a1a1a&logo=github)](https://github.com/velonone/Opensage)
  [![Build](https://img.shields.io/badge/Build-Passing-2EA44F?style=for-the-badge&labelColor=1a1a1a)](https://github.com/velonone/Aeonsage/actions)
  [![Docs](https://img.shields.io/badge/Docs-Official-orange?style=for-the-badge&labelColor=1a1a1a)](https://docs.aeonsage.org)

  <br>
  <p style="font-size: 1.1em; max-width: 800px; margin: auto; padding-top: 20px; color: #666;">
    <b>The Deterministic Sovereign Intelligence Operating System</b><br>
    Start your sovereign journey: <a href="https://aeonsage.org">Official Site</a> • <a href="https://pro.aeonsage.org">Enterprise</a>
  </p>
</div>

<hr style="border: 0; outline: none; height: 1px; background: linear-gradient(to right, transparent, #30363d, transparent); margin: 40px 0;">

## The Sovereign Manifesto

> **"Identity first. Intelligence second. Tooling third."**

In the current landscape of stochastic AI agents, **identity is an afterthought**. Models hallucinate, leak context, and operate without accountability.

**AeonSage** reverses this paradigm. It is an Operating System where **Identity (VDID)** is the kernel-level primitive. Before any cognitive routing occurs, the origin, intent, and permissions of the request are verified against a sovereign ledger.

This is not a chatbot. It is a **Deterministic Runtime Environment** for verified autonomous agency.

---

## Architecture Design

AeonSage implements a strict **Kernel-Ring Architecture**, enforcing separation between the cognitive core and external I/O.

### 1. The Sovereign Kernel (Ring 0)
The absolute core of the system.
*   **Determinsitic State Machine**: Manages the agent's lifecycle, memory context, and permission boundaries.
*   **Active Defense Wall**: A heuristic security layer that intercepts prompt injection and jailbreak attempts before they reach the model.
*   **Audit Logger**: Immutable recording of every high-stakes decision.

### 2. The Cognitive Router (Ring 1)
A multi-modal inference engine that abstracts underlying LLMs.
*   **Cost-Aware Routing**: Dispatches complex logic to SOTA models and routine chatter to local/fast models.
*   **Tool Binding**: Determines which Ring 2 tools are required for the current intent.

### 3. Capability Extensions (Ring 2)
The I/O layer that interacts with the messy digital world.
*   **Connectivity**: Native bridges to WhatsApp, Telegram, Discord, Slack.
*   **Skills**: Executable modules for GitHub Ops, Web Research, Media Control.

---

## 4. Connectivity Matrix

The OS provides native protocol bridges, eliminating the need for third-party automation services (like Zapier).

| Protocol | Implementation | Capabilities | Status |
| :--- | :--- | :--- | :---: |
| **WhatsApp** | `wacli` (Baileys) | Multi-device, Media, Voice Notes | ✅ |
| **Telegram** | `MTProto` / Bot API | Secret Chats, Channels, Admin Ops | ✅ |
| **Discord** | WebSocket Gateway | Voice Channels, Slash Commands, Roles | ✅ |
| **Slack** | Enterprise Grid | Threads, File Analysis, App Home | ✅ |
| **Signal** | `libsignal` | E2EE Messaging | ✅ |
| **Email** | SMTP / IMAP | Parsing, Drafting, Attachments | ✅ |

---

## 5. Deployment

### System Requirements
*   **OS**: Windows 11 / macOS 13+ / Linux Kernel 5.15+
*   **Runtime**: Node.js v22.0.0+ (Active LTS)

### Quick Start (Portable)
For Windows users, we provide a zero-dependency portable release.
1.  Download **[AeonSage_OSS.zip](https://github.com/velonone/Aeonsage/releases/latest/download/AeonSage_OSS.zip)**.
2.  Extract the archive.
3.  Run `AeonSage.bat`.

### Developer Install
```bash
# Global installation via NPM
npm install -g aeonsage

# Initialize configuration wizard
aeonsage init

# Launch the kernel
aeonsage start
```

---

## 6. Official Resources

Documentation is structured for system operators and kernel developers.

*   [**Installation Guide**](./docs/install.md)
*   [**Security Policy**](./docs/security.md)
*   [**Kernel Reference**](./docs/sovereign-kernel.md)
*   [**Plugin Development**](./docs/plugin.md)

---

## 7. Ecosystem Partners

Collaborating to build the Sovereign Web.

<table>
  <tr>
    <td align="center" width="25%">
      <a href="https://vdid.org"><img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/logos/vdid-logo.svg" alt="VDID" width="80"></a><br>
      <br><b>Identity Layer</b>
    </td>
    <td align="center" width="25%">
      <img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/AESE.png" alt="Kernel" width="80"><br>
      <br><b>Cognitive Kernel</b>
    </td>
    <td align="center" width="25%">
      <img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/AeonSage_Wisdom_2026_v4.png" alt="Research" width="100"><br>
      <br><b>Research Lab</b>
    </td>
    <td align="center" width="25%">
      <a href="https://velonlabs.com"><img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/velonlabs-logo.png" alt="VelonLabs" width="100"></a><br>
      <br><b>System Engineering</b>
    </td>
  </tr>
</table>

---

## License & Legal

**AeonSage Community Edition** is distributed under the **MIT License**.

> **Non-Commercial Use Only**: Although the source code is open, the "AeonSage" trademark and the "VDID" verification network are proprietary technologies of VelonLabs. Commercial derivatives utilizing the AEONSAGE brand require an explicit enterprise license.

<div align="center">
  <br>
  <b>Engineered with Precision by</b><br>
  <h3>VelonLabs & The AeonSage Core Team</h3>
  <br>
  <img src="https://img.shields.io/badge/Status-Active_Development-blue?style=flat-square" alt="Status">
</div>
