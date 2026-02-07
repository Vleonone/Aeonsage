# Security Policy

AeonSage is a sovereign operating system that handles sensitive identity and cognitive data. Security is our absolute priority.
We adhere to a **Defense in Depth** strategy, layering kernel isolation, identity verification, and active behavioral monitoring.

---

## Supported Versions

Only the latest stable kernel release receives active security patches.

| Version | Supported | Kernel Status |
| :--- | :---: | :--- |
| **v2026.1.x** | ✅ | **Active Support (LTS)** |
| v2025.x | ❌ | End of Life |
| v2024.x | ❌ | Deprecated |

---

## Reporting a Vulnerability

**Do not open public GitHub issues for security vulnerabilities.**

If you discover a potential security issue, please email **security@velonlabs.com** with the subject `[SECURITY] - Vulnerability Disclosure`.
We will acknowledge receipt within 24 hours and provide an estimated timeline for triage.

### In Scope
*   **VDID Spoofing**: Bypassing identity verification layers.
*   **Kernel Escape**: Breaking out of the cognitive sandbox (RCE).
*   **Prompt Injection**: System prompt override leading to privileged action execution.
*   **Data Leakage**: Unauthorized access to Vector Memory or Session Logs.
*   **Gateway Bypass**: Circumventing the Remote Access authentication.

### Out of Scope
*   Social engineering of the model (LLM hallucinations).
*   Attacks requiring physical access to the host machine.
*   Denial of Service (DoS) attacks on self-hosted instances.

---

## Active Defense Architecture
AeonSage employs an **Active Defense** kernel module that monitors:
1.  **Heuristic Analysis**: Detecting patterns of jailbreak attempts in real-time.
2.  **Role Enforcement**: Ensuring Guest users cannot invoke Admin skills.
3.  **Audit Logging**: Immutable recording of all security-critical events.

---

**PGP Key for Encrypted Communication**
Fingerprint: `AEO1 9928 CS00 2026 KEY1`
(Public key available at keys.openpgp.org)

**Copyright © 2026 VelonLabs.**
