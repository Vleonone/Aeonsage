---
summary: "CLI reference for `aeonsage agents` (list/add/delete/set identity)"
read_when:
  - You want multiple isolated agents (workspaces + routing + auth)
---

# `aeonsage agents`

Manage isolated agents (workspaces + auth + routing).

Related:
- Multi-agent routing: [Multi-Agent Routing](/concepts/multi-agent)
- Agent workspace: [Agent workspace](/concepts/agent-workspace)

## Examples

```bash
aeonsage agents list
aeonsage agents add work --workspace ~/aeonsage-work
aeonsage agents set-identity --workspace ~/aeonsage --from-identity
aeonsage agents set-identity --agent main --avatar avatars/aeonsage.png
aeonsage agents delete work
```

## Identity files

Each agent workspace can include an `IDENTITY.md` at the workspace root:
- Example path: `~/aeonsage/IDENTITY.md`
- `set-identity --from-identity` reads from the workspace root (or an explicit `--identity-file`)

Avatar paths resolve relative to the workspace root.

## Set identity

`set-identity` writes fields into `agents.list[].identity`:
- `name`
- `theme`
- `emoji`
- `avatar` (workspace-relative path, http(s) URL, or data URI)

Load from `IDENTITY.md`:

```bash
aeonsage agents set-identity --workspace ~/aeonsage --from-identity
```

Override fields explicitly:

```bash
aeonsage agents set-identity --agent main --name "AeonSage" --emoji "🌌" --avatar avatars/aeonsage.png
```

Config sample:

```json5
{
  agents: {
    list: [
      {
        id: "main",
        identity: {
          name: "AeonSage",
          theme: "cognitive os",
          emoji: "🌌",
          avatar: "avatars/aeonsage.png"
        }
      }
    ]
  }
}
```


