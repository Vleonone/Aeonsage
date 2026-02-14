<div align="center">
  <a href="https://aeonsage.org">
    <img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/AeonSage_letter_logo.svg" alt="AEONSAGE" width="480" loading="eager">
  </a>

  <br><br>

  **主权级智能操作系统**<br>
  身份优先 · 本地部署 · 确定性运行

  <br>

  [![Release](https://img.shields.io/badge/RELEASE-v2026.2-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/velonone/Aeonsage/releases)
  [![Core](https://img.shields.io/badge/CORE-Aeonsage_OSS-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/velonone/Aeonsage)
  [![License](https://img.shields.io/badge/LICENSE-Non--Commercial-000000?style=for-the-badge&logo=gitbook&logoColor=white)](./LICENSE)
  [![Docs](https://img.shields.io/badge/DOCS-aeonsage.org-000000?style=for-the-badge&logo=readme&logoColor=white)](https://aeonsage.org/docs)
  [![Language](https://img.shields.io/badge/LANG-English-000000?style=for-the-badge&logo=google-translate&logoColor=white)](./README.md)

</div>

---

> **你的 AI，你的硬件，你的规则。**
>
> AeonSage 是一个本地部署的 AI 智能体操作系统，将身份与隐私置于内核层。与依赖云端的聊天机器人不同，AeonSage 完全运行在你的硬件上 —— 你的数据永远不会离开你的设备。

---

## 目录

- [系统架构](#系统架构)
- [连接矩阵](#连接矩阵)
- [桌面客户端](#桌面客户端)
- [快速开始](#快速开始)
- [版本对比](#版本对比)
- [技术栈](#技术栈)
- [生态合作伙伴](#生态合作伙伴)
- [许可与法律声明](#许可与法律声明)

---

## 系统架构

AeonSage 采用严格的**内核环 (Kernel-Ring) 架构**，包含 58+ 模块，横跨 6 个层级。

```
                         AeonSage Gateway
  ┌──────────┬──────────┬──────────┬──────────┬─────────────┐
  │  Ring 0  │  Ring 1  │  Ring 2  │  Ring 3  │   Ring 4    │
  │  内核层  │  路由层  │  技能层  │  通道层  │   界面层    │
  ├──────────┼──────────┼──────────┼──────────┼─────────────┤
  │ 主权身份 │ 多模型   │ 54+ 工具 │ 30+ 平台 │ Cockpit UI  │
  │ 状态机   │ 分级路由 │ MCP SDK  │ 协议桥接 │ 桌面客户端  │
  │ 安全防御 │ 故障回退 │ 插件系统 │ 原生协议 │ WebSocket   │
  └──────────┴──────────┴──────────┴──────────┴─────────────┘
                         107 个 RPC 方法
```

### 主权转换

每一个用户意图都被视为一笔可验证的交易 —— 签名、路由、执行、记录。

```mermaid
graph LR
    subgraph "传统模式 (无序熵增)"
        Raw[随机概率 LLM]
        Leak[上下文泄露]
        Cost[不可控成本]
        Raw --> Leak
        Raw --> Cost
    end

    Transaction((主权内核<br>Sovereign))

    subgraph "AeonSage (确定性有序)"
        VDID[验证身份]
        Route[认知路由]
        Audit[不可篡改日志]
    end

    Raw --> Transaction
    Transaction --> VDID
    Transaction --> Route
    Route --> Audit

    style Transaction fill:#000,stroke:#fff,stroke-width:2px,color:#fff
    style VDID fill:#10B981,stroke:#333,color:#000
    style Route fill:#0066FF,stroke:#333,color:#fff
```

### 核心能力

| 层级 | 组件 | 描述 |
| :--- | :--- | :--- |
| **Ring 0** | 主权内核 | 确定性状态机、VDID 身份验证、主动防御墙、审计记录器 |
| **Ring 1** | 认知路由 | 多 LLM 路由（本地/云端）、分级复杂度分析、提供商级联回退 |
| **Ring 2** | 技能扩展 | 54+ 内置技能、MCP 协议支持、自定义插件 SDK |
| **Ring 3** | 通道桥接 | 30+ 原生协议桥接 — WhatsApp、Telegram、Discord、Slack、Signal、Email 等 |
| **Ring 4** | 界面层 | Lit 3 控制台 UI、Tauri v2 桌面客户端、107 个 WebSocket RPC 方法 |

---

## 连接矩阵

原生协议级桥接，无需第三方自动化服务。

| 协议 | 实现方式 | 核心能力 | 状态 |
| :--- | :--- | :--- | :---: |
| **WhatsApp** | Baileys (wacli) | 多设备登录、媒体收发、语音笔记 | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **Telegram** | MTProto / Bot API | 私密聊天、频道管理、群组管理 | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **Discord** | WebSocket Gateway | 语音频道、Slash 指令、角色映射 | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **Slack** | Enterprise Grid | 线程支持、文件分析、App Home | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **Signal** | libsignal | 端到端加密 (E2EE) 通信 | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **Email** | SMTP / IMAP | 邮件解析、草稿撰写、附件处理 | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **LINE** | Messaging API | Rich Menus、Flex Messages | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |
| **Matrix** | matrix-js-sdk | 联邦协议、E2EE 房间 | ![Active](https://img.shields.io/badge/Active-2ea44f?style=flat-square) |

> 总计支持 **30+ 通道**。完整列表请参阅[文档](https://aeonsage.org/docs)。

---

## 桌面客户端

AeonSage 桌面应用基于 **Tauri v2** (Rust) + **React 19** 构建 —— 原生体验，仅 ~10 MB（Electron 需 ~150 MB）。

- **Agent 可视化** — 实时执行流程、工具调用与推理链路展示
- **可视化工作流** — 拖拽式多 Agent 工作流构建器
- **BYOK** — 自带密钥，使用你自己的 API 密钥接入任意模型
- **安全网关** — Tauri Sidecar 管理 Node.js 网关进程
- **跨平台** — Windows、macOS、Linux

---

## 快速开始

### 系统要求
- **OS**: Windows 11 / macOS 13+ / Linux Kernel 5.15+
- **运行时**: Node.js v22.0.0+ (Active LTS)

### 便携版 (Windows)
1. 下载 **[AeonSage_OSS.zip](https://github.com/velonone/Aeonsage/releases/latest/download/AeonSage_OSS.zip)**
2. 解压后运行 `AeonSage.bat`

### 开发者安装
```bash
# 克隆仓库
git clone https://github.com/velonone/Aeonsage.git
cd Aeonsage

# 安装依赖
pnpm install

# 初始化配置
pnpm run init

# 启动网关
pnpm start
```

控制台 UI 将在 `http://localhost:18789` 可用。

---

## 版本对比

| | 免费版 (OSS) | 专业版 | 企业版 |
| :--- | :---: | :---: | :---: |
| **价格** | $0 | $59/月 | 定制 |
| **部署** | 本地自托管 | 本地 + 云端 | 私有云 |
| **认知引擎** | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |
| **多模型路由** | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |
| **全部通道** | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |
| **可视化工作流** | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |
| **BYOK（自带密钥）** | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |
| **控制台 UI** | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |
| **桌面客户端** | ![4](https://img.shields.io/badge/4_页面-E8832A?style=flat-square) | ![6](https://img.shields.io/badge/6_页面-2ea44f?style=flat-square) | ![Full](https://img.shields.io/badge/完整-2ea44f?style=flat-square) |
| **最大 Worker 数** | ![1](https://img.shields.io/badge/1-E8832A?style=flat-square) | ![3](https://img.shields.io/badge/3-2ea44f?style=flat-square) | ![Unlimited](https://img.shields.io/badge/无限-2ea44f?style=flat-square) |
| **CloudRelay** | ![No](https://img.shields.io/badge/仅专业版-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |
| **金融仪表盘** | ![No](https://img.shields.io/badge/仅专业版-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |
| **VDID 身份** | ![No](https://img.shields.io/badge/仅专业版-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |
| **自定义主题** | ![No](https://img.shields.io/badge/仅专业版-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |
| **安全仪表盘** | ![No](https://img.shields.io/badge/仅企业版-7B5EA7?style=flat-square) | ![No](https://img.shields.io/badge/仅企业版-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |
| **团队管理** | ![No](https://img.shields.io/badge/仅企业版-7B5EA7?style=flat-square) | ![No](https://img.shields.io/badge/仅企业版-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |
| **审计与合规** | ![No](https://img.shields.io/badge/仅企业版-7B5EA7?style=flat-square) | ![No](https://img.shields.io/badge/仅企业版-7B5EA7?style=flat-square) | ![Yes](https://img.shields.io/badge/包含-2ea44f?style=flat-square) |

> **免费版对本地 AI 完全可用。** 专业版解锁云端功能与多 Agent Worker。

---

## 技术栈

| 组件 | 技术 |
| :--- | :--- |
| 运行时 | Node.js 22+ (ESM) |
| 语言 | TypeScript 5.x |
| 后端 | Hono + Express + WebSocket |
| 控制台 UI | Lit 3.3 + Vite 7 |
| 桌面客户端 | Tauri v2 (Rust) + React 19 |
| 认证 | 社交登录 (Telegram / Google / GitHub) + VDID |
| 数据库 | PostgreSQL + SQLite (本地) |
| AI | 本地 (Ollama) + 云端 (OpenRouter, Anthropic, OpenAI, Google) |

---

## 生态合作伙伴

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://vdid.org"><img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/vdid-logo.svg" alt="VDID" width="100"></a><br>
      <br><b>身份层</b><br>VDID Network
    </td>
    <td align="center" width="50%">
      <a href="https://velonlabs.com"><img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/velonlabs-logo.png" alt="VelonLabs" width="120"></a><br>
      <br><b>研究与工程</b><br>VelonLabs
    </td>
  </tr>
</table>

---

## 许可与法律声明

**AeonSage 社区版** 采用 **MIT 许可证** 分发，附带商标条款。

> **商标声明**: "AeonSage" 名称、Logo 以及 "VDID" 验证网络是 VelonLabs 的专有资产。任何利用 AeonSage 品牌进行的商业衍生行为均需获得明确的企业授权。代码是开源的 —— 品牌不是。

---

<div align="center">

  <img src="https://raw.githubusercontent.com/Vleonone/Aeonsage/main/assets/AeonSage_letter_logo.svg" alt="AeonSage" width="200">

  <br><br>

  **由 [VelonLabs](https://velonlabs.com) 与 AeonSage 核心团队精心打造**

  <br>

  [![Website](https://img.shields.io/badge/官网-aeonsage.org-000000?style=flat-square&logo=safari&logoColor=white)](https://aeonsage.org)
  [![Telegram](https://img.shields.io/badge/社区-Telegram-000000?style=flat-square&logo=telegram&logoColor=white)](https://t.me/aeonsage)
  [![Twitter](https://img.shields.io/badge/关注-@AeonSage-000000?style=flat-square&logo=x&logoColor=white)](https://x.com/AeonSage)

  <br>

  <sub>Copyright &copy; 2025-2026 VelonLabs. All rights reserved.</sub>

</div>
