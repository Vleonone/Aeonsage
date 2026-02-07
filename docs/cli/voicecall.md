---
summary: "CLI reference for `aeonsage voicecall` (voice-call plugin command surface)"
read_when:
  - You use the voice-call plugin and want the CLI entry points
  - You want quick examples for `voicecall call|continue|status|tail|expose`
---

# `aeonsage voicecall`

`voicecall` is a plugin-provided command. It only appears if the voice-call plugin is installed and enabled.

Primary doc:
- Voice-call plugin: [Voice Call](/plugins/voice-call)

## Common commands

```bash
aeonsage voicecall status --call-id <id>
aeonsage voicecall call --to "+15555550123" --message "Hello" --mode notify
aeonsage voicecall continue --call-id <id> --message "Any questions?"
aeonsage voicecall end --call-id <id>
```

## Exposing webhooks (Tailscale)

```bash
aeonsage voicecall expose --mode serve
aeonsage voicecall expose --mode funnel
aeonsage voicecall unexpose
```

Security note: only expose the webhook endpoint to networks you trust. Prefer Tailscale Serve over Funnel when possible.


