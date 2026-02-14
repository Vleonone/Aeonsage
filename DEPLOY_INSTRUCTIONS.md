# AeonSage 部署指南 (Deployment Guide)

> 完整的本地与服务器部署说明书  
> Last Updated: 2026-02-02

---

## 📋 目录

1. [快速开始](#快速开始)
2. [本地部署](#本地部署)
3. [服务器部署](#服务器部署)
4. [配置文件详解](#配置文件详解)
5. [常见问题排查](#常见问题排查)

---

## 快速开始

### 系统要求

| 组件 | 最低版本 |
|------|---------|
| Node.js | v22.x |
| pnpm | v9.x |
| 操作系统 | Windows 10+, Ubuntu 20.04+, macOS 12+ |

### 一键安装 (Linux/macOS)

```bash
curl -sSL https://aeonsage.org/install | bash
```

### 一键安装 (Windows PowerShell)

```powershell
irm https://aeonsage.org/install.ps1 | iex
```

---

## 本地部署

### 步骤 1: 克隆并安装依赖

```bash
git clone https://github.com/Vleonone/AeonsagePro.git
cd aeonsage
pnpm install
```

### 步骤 2: 配置 API Key

运行首次配置向导：

```bash
pnpm start auth
```

或手动配置 `~/.aeonsage/agents/main/agent/auth-profiles.json`:

```json
{
  "version": 1,
  "profiles": {
    "openrouter:default": {
      "type": "api_key",
      "provider": "openrouter",
      "key": "sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxx"
    }
  },
  "lastGood": {
    "openrouter": "openrouter:default"
  }
}
```

### 步骤 3: 配置主配置文件

创建或编辑 `~/.aeonsage/aeonsage.json`:

```json
{
  "meta": {
    "lastTouchedVersion": "2026.1.26"
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "openrouter/anthropic/claude-3.5-sonnet"
      }
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_TELEGRAM_BOT_TOKEN",
      "dmPolicy": "open",
      "allowFrom": ["*"]
    }
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "mode": "password",
      "password": "your-password"
    }
  }
}
```

### 步骤 4: 启动 Gateway

```bash
pnpm start gateway
```

---

## 服务器部署

> 以 BuyVM (Ubuntu 20.04) 为例

### 步骤 1: 服务器环境准备

```bash
# 安装 Node.js v22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 pnpm
npm install -g pnpm

# 安装 PM2 (进程管理)
npm install -g pm2
```

### 步骤 2: 部署代码

**方法 A: 使用部署包**

```bash
mkdir -p /opt/aeonsage && cd /opt/aeonsage
wget https://aeonsage.org/releases/AeonSage-V1.tar.gz
tar -xzf AeonSage-V1.tar.gz --strip-components=0
pnpm install --prod
```

**方法 B: 从源码构建**

```bash
git clone https://github.com/Vleonone/AeonsagePro.git /opt/aeonsage
cd /opt/aeonsage
pnpm install
pnpm run build
```

### 步骤 3: 配置认证

创建目录和配置文件：

```bash
mkdir -p ~/.aeonsage/agents/main/agent
```

创建 `~/.aeonsage/agents/main/agent/auth-profiles.json`:

```json
{
  "version": 1,
  "profiles": {
    "openrouter:default": {
      "type": "api_key",
      "provider": "openrouter",
      "key": "sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxx"
    }
  },
  "lastGood": {
    "openrouter": "openrouter:default"
  },
  "usageStats": {
    "openrouter:default": {
      "errorCount": 0,
      "lastUsed": 1770042600000
    }
  }
}
```

### 步骤 4: 配置主配置文件

创建 `~/.aeonsage/aeonsage.json`:

```json
{
  "meta": {
    "lastTouchedVersion": "2026.1.26"
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "openrouter/anthropic/claude-3.5-sonnet"
      }
    }
  },
  "channels": {
    "telegram": {
      "commands": { "native": true, "nativeSkills": true },
      "configWrites": true,
      "dmPolicy": "open",
      "botToken": "YOUR_TELEGRAM_BOT_TOKEN",
      "allowFrom": ["*"],
      "groupPolicy": "allowlist",
      "streamMode": "partial",
      "reactionLevel": "extensive"
    }
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "your-secure-gateway-token"
    }
  },
  "plugins": {
    "entries": {
      "telegram": { "enabled": true }
    }
  }
}
```

### 步骤 5: 使用 PM2 启动

```bash
cd /opt/aeonsage
pm2 start ecosystem.config.cjs

# 保存配置以便重启后自动恢复
pm2 save
pm2 startup
```

### 步骤 6: 验证运行状态

```bash
# 查看进程状态
pm2 list

# 查看日志
pm2 logs aeonsage-gateway --lines 20

# 验证模型和 Telegram 是否正常
pm2 logs aeonsage-gateway --lines 20 | grep -E "model|telegram"
```

**预期输出**:
```
[gateway] agent model: openrouter/anthropic/claude-3.5-sonnet
[telegram] [default] starting provider (@Your_Bot_Name)
```

---

## 配置文件详解

### 目录结构

```
~/.aeonsage/
├── aeonsage.json                    # 主配置文件
├── agents/
│   └── main/
│       └── agent/
│           └── auth-profiles.json   # API 认证配置
├── telegram/
│   └── update-offset-*.json         # Telegram 状态
└── credentials/                     # 其他凭证
```

### 关键配置项

| 配置路径 | 说明 |
|---------|------|
| `agents.defaults.model.primary` | 默认使用的 AI 模型 |
| `channels.telegram.botToken` | Telegram Bot Token |
| `channels.telegram.dmPolicy` | DM 策略: `open` / `allowlist` / `pairing` |
| `gateway.port` | Gateway 端口 (默认 18789) |
| `gateway.auth.mode` | 认证模式: `token` / `password` |

### 支持的模型格式

```
provider/model-name

示例:
- openrouter/anthropic/claude-3.5-sonnet
- anthropic/claude-opus-4-5
- openai/gpt-4
- google/gemini-pro
```

---

## 常见问题排查

### ❌ "No API key found for provider"

**原因**: `auth-profiles.json` 配置错误或缺失

**解决方案**:
```bash
# 检查文件是否存在
cat ~/.aeonsage/agents/main/agent/auth-profiles.json

# 确保格式正确，特别是:
# - "version": 1
# - "type": "api_key"
# - "key": "sk-or-v1-xxx" (注意是 "key" 不是 "apiKey")
```

### ❌ Telegram Bot 冲突 (HTTP 409)

**原因**: 本地和服务器同时使用同一个 Bot Token

**解决方案**:
```json
// 在本地配置中禁用 Telegram
{
  "channels": {
    "telegram": {
      "enabled": false
      // 移除 botToken
    }
  }
}
```

### ❌ Gateway 启动失败

**排查步骤**:
```bash
# 1. 检查 Node.js 版本
node --version  # 需要 v22+

# 2. 检查 dist 目录是否存在
ls dist/gateway/

# 3. 查看详细错误日志
pm2 logs aeonsage-gateway --err --lines 50
```

### ❌ 模型使用错误的 Provider

**原因**: 配置文件中 `agents.defaults.model.primary` 未正确设置

**解决方案**:
```bash
# 编辑 ~/.aeonsage/aeonsage.json
# 确保 model.primary 格式为 "provider/model-name"
```

---

## 🔧 运维命令速查

```bash
# 启动
pm2 start aeonsage-gateway

# 停止
pm2 stop aeonsage-gateway

# 重启
pm2 restart aeonsage-gateway

# 查看状态
pm2 list

# 查看日志
pm2 logs aeonsage-gateway --lines 50

# 保存配置
pm2 save

# 设置开机自启
pm2 startup
```

---

## 📞 技术支持

- **Telegram**: @Aeon_Sage_Bot
- **GitHub Issues**: [AeonSage-Silicon-Intelligence](https://github.com/Vleonone/AeonsagePro/issues)

---

*© 2026 Velonlabs - Sovereign Intelligence Ecosystem*
