---
summary: "CLI reference for `aeonsage security` (audit and fix common security footguns)"
read_when:
  - You want to run a quick security audit on config/state
  - You want to apply safe "fix�?suggestions (chmod, tighten defaults)
---

# `aeonsage security`

Security tools (audit + optional fixes).

Related:
- Security guide: [Security](/gateway/security)

## Audit

```bash
aeonsage security audit
aeonsage security audit --deep
aeonsage security audit --fix
```

The audit warns when multiple DM senders share the main session and recommends `session.dmScope="per-channel-peer"` for shared inboxes.
It also warns when small models (`<=300B`) are used without sandboxing and with web/browser tools enabled.

