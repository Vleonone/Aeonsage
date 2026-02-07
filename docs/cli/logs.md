---
summary: "CLI reference for `aeonsage logs` (tail gateway logs via RPC)"
read_when:
  - You need to tail Gateway logs remotely (without SSH)
  - You want JSON log lines for tooling
---

# `aeonsage logs`

Tail Gateway file logs over RPC (works in remote mode).

Related:
- Logging overview: [Logging](/logging)

## Examples

```bash
aeonsage logs
aeonsage logs --follow
aeonsage logs --json
aeonsage logs --limit 500
```


