# Immune System Architecture (v2026.2)

<div align="center">
  <img src="https://img.shields.io/badge/Security_Level-Defense_in_Depth-000000?style=flat-square" alt="Security Level">
  <img src="https://img.shields.io/badge/Encryption-Quantum_Safe_Ready-gray?style=flat-square" alt="Encryption">
</div>

## 1.0 The Security Axiom

**Security is not a feature; it is the substrate.**
In the AeonSage paradigm, we assume the environment is hostile. The system is architected with a **Default-Deny** posture.

## 2.0 Identity Layer: Verifiable Decentralized Identity (VDID)

Traditional "API Key" architectures are fundamentally flawed for autonomous agents. AeonSage implements **VDID** as the sole mechanism for agent identification.

| Attribute | Specification |
| :--- | :--- |
| **Standard** | W3C Decentralized Identifiers (`did:vdid`) |
| **Key Algorithm** | Ed25519 (High-performance signatures) |
| **Rotation** | Ephemeral keys generated per session |
| **Verification** | Cryptographic signature required for every RPC call |

### 2.1 The Signature Chain
Every action taken by an agent—from a database read to a Telegram message—is signed. This creates an **Immutable Forensic Ledger**, allowing administrators to audit the entire cognitive chain of thought.

## 3.0 Administrative Override: The God Key

The **God Key Protocol** is a failsafe mechanism designed for absolute control.

*   **Mechanism**: A 256-bit entropy key held only by the system owner.
*   **Vector**: Dedicated WebSocket Control Channel (Priority 0).
*   **Payload**: Signed JWT (JSON Web Token) containing `KILL_SIGNAL`.
*   **Effect**: 
    1.  Immediate termination of the Agent Runtime Process.
    2.  Flushing of short-term memory (RAM).
    3.  Revocation of all active network sockets.

> **Note**: The God Key bypasses all other ACLs. It is the physics of the AeonSage universe.

## 4.0 Sandboxing & Isolation

### 4.1 Process Isolation
Agents execute within isolated Node.js `vm` contexts. They do not have direct access to:
*   `process.env` (Environment Variables)
*   `fs` (Filesystem, except whitelisted directories)
*   `child_process` (Shell execution)

### 4.2 Safety Gates
Permissions are granted via explicit **Capability Grants** in the `manifest.json`.

```json
{
  "capabilities": {
    "filesystem": ["read:/data/public"],
    "network": ["connect:api.openai.com"]
  }
}
```

## 5.0 Air-Gap Sovereignty

For high-security deployments, AeonSage supports **Full Air-Gap Mode**.
*   **Inference**: Local binding to Ollama (Llama 3, Mistral).
*   **Vector Store**: Local ChromaDB instance.
*   **Telemetry**: Zero outbound requests. The system makes no "phone home" calls.

---

**Security Contact**: `security@aeonsage.org` (PGP Key Available on Request)
