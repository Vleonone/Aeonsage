# Sovereign Cognitive Kernel: Standard Operating Procedure

## 1.0 Overview
The **Sovereign Cognitive Kernel (SCK)** is the decision-making substrate of your AeonSage node. Unlike passive "chatbots", the SCK actively manages entropy and resource allocation.

## 2.0 Neural Uplink Initialization
To enable higher-order reasoning, you must establish a cryptographic handshake with a model provider.

1.  Navigate to **Sovereign Cognitive Kernel** (formerly Settings).
2.  Input your **Neural Uplink Token** (API Key).
3.  Click **Initialize Handshake**.
4.  Verify the **Kernel Status** indicator turns **ONLINE** (Green).

> **SECURITY NOTE**: Your token is encrypted at rest using AES-256-GCM. It never leaves your local machine except for the initial handshake request.

## 3.0 Cortex Matrix Configuration
The **Cortex Matrix** allows you to select the specific neural architecture for your tasks.

*   **Primary Cortex**: The default model for general reasoning (e.g., `anthropic/claude-3.5-sonnet`).
*   **Reflex Cortex**: A smaller, faster model for simple tasks (e.g., `meta-llama/llama-3-8b`).

## 4.0 System Introspection (Self-Query)
Your node possesses self-awareness capabilities. You can query its status directly in the terminal or chat interface.

### Supported Commands

| Command Trigger | Output | Purpose |
| :--- | :--- | :--- |
| `system status` | Diagnostic Table | View kernel version, memory usage, and runtime engine. |
| `what version is this` | Diagnostic Table | Identify the exact semantic version of the OS. |
| `kernel diagnostics` | Full Report | Detailed telemetry for debugging. |

### Example Output
```markdown
### SOVEREIGN KERNEL DIAGNOSTICS (v2026.2)
***
| PARAMETER | STATUS | SPECIFICATION |
| :--- | :--- | :--- |
| **KERNEL VERSION** | **STABLE** | `AeonSage v2026.2.0-rc1` |
| **RUNTIME ENGINE** | **ACTIVE** | `Node.js v22.11.0 (V8)` |
| **MEMORY INTEGRITY** | **VERIFIED** | `Heap: 142MB / Sys: 32768MB` |
```

---
**VelonLabs Research** · *Engineering Truth Doctrine*
