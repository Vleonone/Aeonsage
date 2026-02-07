# Contributing to the AeonSage OS Kernel

Thank you for your interest in contributing to **AeonSage Sovereign Intelligence OS**.
This project operates under strict engineering standards to ensure the stability, security, and determinism of the kernel.

> **Before you start**: This is not a hobbyist chatbot project. It is an operating system with safety-critical components (VDID, Active Defense). All contributions are subject to rigorous review.

---

## 1. Governance & DCO

We enforce the **Developer Certificate of Origin (DCO)** on all contributions. By contributing to this project, you certify that you have the right to submit your code under the MIT License.

*   Every commit must be signed off: `git commit -s -m "feat: add memory compaction"`
*   Your `user.name` and `user.email` must match your GitHub identity.
*   Anonymous contributions to kernel-space code are **rejected**.

## 2. Development Workflow

We follow a modified **Git Flow**:

1.  **Fork** the repository.
2.  **Branch** from `main`:
    *   Features: `feat/your-feature-name`
    *   Fixes: `fix/issue-number`
    *   Docs: `docs/update-security-policy`
3.  **Commit** using [Conventional Commits](https://www.conventionalcommits.org/):
    *   `feat: add discord slash command support`
    *   `fix(kernel): resolve memory leak in cognitive router`
4.  **Test** locally: `npm run test` (All tests must pass).
5.  **Push** and open a **Pull Request (PR)** against `main`.

## 3. Kernel Constraints (Important)

If you are modifying `src/kernel/`, `src/security/`, or `src/identity/`:

*   **No External Calls**: The kernel core must remain deterministic. Do not introduce unchecked API calls.
*   **Zero-Trust**: Assume all input is potentially malicious (prompt injection).
*   **Performance**: The routing loop must execute in `<50ms` overhead.

## 4. Code Style

We use `ESLint` + `Prettier` with strict rules.
*   **TypeScript**: Explicit types required (`noImplicitAny`).
*   **Comments**: Public methods must have JSDoc explanation.
*   **Async**: Always handle Promise rejections.

```bash
# Verify style before pushing
npm run lint
```

## 5. Security Disclosure

**DO NOT** open public issues for security vulnerabilities.
If you find a bypass in the Active Defense layer or a VDID spoofing vector, please refer to [SECURITY.md](SECURITY.md).

---

## 6. Community & Communication
*   **Discussion Board**: [GitHub Discussions](https://github.com/velonone/Aeonsage/discussions)
*   **Enterprise Support**: [pro.aeonsage.org](https://pro.aeonsage.org)

**Copyright © 2026 VelonLabs.**
