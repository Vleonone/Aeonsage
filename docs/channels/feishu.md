---
summary: "Feishu (Lark) Messaging API plugin setup, config, and usage"
read_when:
  - You want to connect AeonSage to Feishu/Lark
  - You need Feishu webhook + credential setup
  - You want Feishu-specific message options
---

# Feishu (Lark) Plugin

Feishu (China) / Lark (International) connects to AeonSage via the Feishu Open Platform API. The plugin
runs as a webhook receiver on the gateway and uses your App ID + App Secret for
authentication.

Status: supported via plugin. Direct messages, group chats, text, rich text (post),
interactive cards, and images are supported.

## Plugin Required

Install the Feishu plugin:

```bash
aeonsage plugins install @aeonsage/feishu
```

Local checkout (when running from a git repo):

```bash
aeonsage plugins install ./extensions/feishu
```

## Setup

1) Create a Feishu Open Platform app:
   - Enterprise apps: https://open.feishu.cn/app (China)
   - Lark apps: https://open.larksuite.com/app (International)

2) Configure **Event Subscriptions** in your app:
   - Enable event subscriptions
   - Set the webhook URL (Request URL) to your gateway endpoint:

```
https://gateway-host/feishu/webhook
```

3) Copy your **App ID** and **App Secret** from the app credentials page.

4) Add the following **Scopes** (permissions):
   - `im:message` - Send and receive messages
   - `im:message.group_at_msg` - Receive @mentions in groups
   - `contact:user.employee_id:readonly` - Read user info

5) Subscribe to **Events**:
   - `im.message.receive_v1` - Receive messages

## Configure

Minimal config:

```json5
{
  channels: {
    feishu: {
      enabled: true,
      appId: "cli_xxxxxxxxxxxxxxxx",
      appSecret: "YOUR_APP_SECRET",
      dmPolicy: "pairing"
    }
  }
}
```

Environment variables (default account only):

- `FEISHU_APP_ID`
- `FEISHU_APP_SECRET`
- `FEISHU_VERIFICATION_TOKEN` (optional, for event verification)
- `FEISHU_ENCRYPT_KEY` (optional, for encrypted events)

Token/secret files:

```json5
{
  channels: {
    feishu: {
      appIdFile: "/path/to/feishu-app-id.txt",
      appSecretFile: "/path/to/feishu-secret.txt"
    }
  }
}
```

Multiple accounts:

```json5
{
  channels: {
    feishu: {
      accounts: {
        marketing: {
          appId: "cli_xxxxxxx",
          appSecret: "...",
          webhookPath: "/feishu/marketing"
        },
        support: {
          appId: "cli_yyyyyyy",
          appSecret: "...",
          webhookPath: "/feishu/support"
        }
      }
    }
  }
}
```

## Access Control

Direct messages default to pairing mode. Unknown senders receive a pairing code
and their messages are ignored until approved.

```bash
aeonsage pairing list feishu
aeonsage pairing approve feishu <CODE>
```

Allowlists and policies:

- `channels.feishu.dmPolicy`: `pairing | allowlist | open | disabled`
- `channels.feishu.allowFrom`: allowlisted Feishu user IDs for DMs
- `channels.feishu.groupPolicy`: `allowlist | open | disabled`
- `channels.feishu.groupAllowFrom`: allowlisted Feishu user IDs for groups

Feishu user IDs look like:
- Open ID: `ou_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- User ID: `xxxxxxxx` (employee ID format)
- Union ID: `on_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Message Behavior

- Text is chunked at 30000 characters (Feishu limit).
- Markdown is converted to Feishu rich text (post) format.
- Code blocks are preserved in rich text messages.
- Streaming responses use loading indicators while the agent works.
- Media downloads are capped by `channels.feishu.mediaMaxMb` (default 20).

## Rich Messages (Interactive Cards)

Use `channelData.feishu` to send interactive message cards:

```json5
{
  text: "Here's your status",
  channelData: {
    feishu: {
      card: {
        header: {
          title: {
            tag: "plain_text",
            content: "Status Report"
          },
          template: "blue"
        },
        elements: [
          {
            tag: "div",
            text: {
              tag: "lark_md",
              content: "**System**: Online ✅"
            }
          },
          {
            tag: "action",
            actions: [
              {
                tag: "button",
                text: { tag: "plain_text", content: "Refresh" },
                type: "primary",
                value: { action: "refresh" }
              }
            ]
          }
        ]
      }
    }
  }
}
```

## Webhook Verification

Feishu sends a verification challenge on first setup. The gateway automatically
handles this. If using encrypted events:

```json5
{
  channels: {
    feishu: {
      encryptKey: "YOUR_ENCRYPT_KEY",
      verificationToken: "YOUR_VERIFICATION_TOKEN"
    }
  }
}
```

## Troubleshooting

- **Webhook verification fails:** ensure the URL is HTTPS and publicly accessible.
  Check that `verificationToken` matches the Feishu console.

- **No inbound events:** confirm the app has `im.message.receive_v1` event subscription
  enabled and the webhook path matches `channels.feishu.webhookPath`.

- **Permission denied:** add required scopes in the Feishu Open Platform console
  and publish the app version.

- **Message send fails:** ensure the bot has been added to the chat/group and has
  the `im:message` scope.

- **Media upload errors:** raise `channels.feishu.mediaMaxMb` if media exceeds
  the default limit.

## China vs International

- **Feishu**: China region - https://open.feishu.cn
- **Lark**: International region - https://open.larksuite.com

The plugin auto-detects the region based on your App ID. You can also explicitly
set:

```json5
{
  channels: {
    feishu: {
      region: "cn" // or "intl" for Lark
    }
  }
}
```
