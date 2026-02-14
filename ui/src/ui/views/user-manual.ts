
import { html, nothing } from "lit";
import { icon, type IconName } from "../icons.js";
import { getCurrentLanguage } from "../i18n.js";

type ManualSection = {
  id: string;
  title: string;
  titleEn: string;
  icon: IconName;
  content: (lang: 'zh-CN' | 'en-US') => any;
};

export type UserManualProps = {
  activeSection: string;
  onSectionChange: (id: string) => void;
};

const SECTIONS: ManualSection[] = [
  {
    id: "intro",
    title: "系统简介",
    titleEn: "System Intro",
    icon: "zap",
    content: (lang) => lang === 'zh-CN' ? html`
      <div class="manual-hero">
        <img src="/aeonsage-logo02.svg" class="manual-logo" alt="AeonSage Logo" />
        <div class="manual-hero-text">
            <h2>欢迎使用 AeonSage 智能体操作系统</h2>
            <p>AeonSage 是一个专为隐私保护、主权自治和高级 AI 编排而设计的下一代智能体操作系统 (Sovereign Intelligence OS)。</p>
        </div>
      </div>
      
      <div class="manual-grid">
        <div class="manual-card">
          <h3><span class="icon-box">${icon("check")}</span> 主权身份 (VDID)</h3>
          <p>每个智能体都拥有基于区块链密码学的可验证数字身份 (VDID)，确保其行为可追溯、不可篡改，并完全归您所有。</p>
        </div>
        <div class="manual-card">
          <h3><span class="icon-box">${icon("monitor")}</span> 边缘计算架构</h3>
          <p>核心逻辑在本地网关 ("Gateway") 运行，确保敏感数据（如私钥、对话记录）永远不会离开您的物理设备。</p>
        </div>
        <div class="manual-card">
          <h3><span class="icon-box">${icon("globe")}</span> 全渠道连接</h3>
          <p>通过统一的接口连接 WhatsApp, Telegram, Discord 等主流通讯平台，打破信息孤岛。</p>
        </div>
      </div>

      <h3>系统核心组件</h3>
      <ul class="manual-list">
        <li><strong>Cockpit (控制台):</strong> 您当前所见的管理界面，用于监控状态、配置技能和与智能体交互。</li>
        <li><strong>Gateway (网关):</strong> 运行在后台的系统心脏，负责 LLM 推理、工具调用和网络连接。</li>
        <li><strong>Skill Hub (技能中心):</strong> 拥有 1700+ 社区验证的技能市场，一键扩展智能体能力。</li>
      </ul>
    ` : html`
      <div class="manual-hero">
        <img src="/aeonsage-logo02.svg" class="manual-logo" alt="AeonSage Logo" />
        <div class="manual-hero-text">
            <h2>Welcome to AeonSage OS</h2>
            <p>AeonSage is a next-generation Sovereign Intelligence OS designed for privacy, autonomy, and advanced AI orchestration.</p>
        </div>
      </div>
      
      <div class="manual-grid">
        <div class="manual-card">
          <h3><span class="icon-box">${icon("check")}</span> Sovereign Identity (VDID)</h3>
          <p>Every agent possesses a verifiable digital identity (VDID) based on blockchain cryptography, ensuring traceability, immutability, and full ownership.</p>
        </div>
        <div class="manual-card">
          <h3><span class="icon-box">${icon("monitor")}</span> Edge Computing</h3>
          <p>Core logic runs on your local "Gateway", ensuring sensitive data (private keys, chat logs) never leaves your physical device.</p>
        </div>
        <div class="manual-card">
          <h3><span class="icon-box">${icon("globe")}</span> Omni-channel</h3>
          <p>Connect via WhatsApp, Telegram, Discord, and more through a unified interface, breaking information silos.</p>
        </div>
      </div>

      <h3>Core Components</h3>
      <ul class="manual-list">
        <li><strong>Cockpit:</strong> The management interface you are viewing, used for monitoring, configuration, and interaction.</li>
        <li><strong>Gateway:</strong> The system heart running in the background, handling LLM inference, tool execution, and networking.</li>
        <li><strong>Skill Hub:</strong> A marketplace with 1700+ community-verified skills to expand agent capabilities in one click.</li>
      </ul>
    `
  },
  {
    id: "dashboard",
    title: "仪表盘与监控",
    titleEn: "Dashboard & Monitoring",
    icon: "monitor",
    content: (lang) => lang === 'zh-CN' ? html`
      <h2>仪表盘 (Dashboard)</h2>
      <p>仪表盘是系统的指挥中心，提供实时的系统健康状态、资源使用情况和核心指标监控。</p>

      <div class="manual-section-block">
        <h3>主要模块</h3>
        <ul class="manual-list">
          <li><strong>VDID 身份状态:</strong> 显示当前激活的主体身份。如果未初始化，您将看到 "Initialize DID" 的提示。</li>
          <li><strong>系统遥测 (Telemetry):</strong> 实时显示 CPU、内存占用以及网关的连接延迟。</li>
          <li><strong>安全通过 (Safety Gates):</strong>
            <p class="muted">这是 AeonSage 的核心安全机制。当智能体尝试执行敏感操作（如文件读写、执行 Shell 命令、转账）时，必须通过安全闸门的检查。您可以设置为 "Ask" (询问)、"Allow" (允许) 或 "Block" (拦截)。</p>
          </li>
        </ul>
      </div>

      <div class="callout tip">
        <strong>提示:</strong> 建议始终开启 "Kill Switch" (紧急停止) 功能，以便在智能体出现异常行为时物理切断其所有对外连接。
      </div>
    ` : html`
      <h2>Dashboard</h2>
      <p>The dashboard is the system's command center, providing real-time health status, resource usage, and core metrics monitoring.</p>

      <div class="manual-section-block">
        <h3>Key Modules</h3>
        <ul class="manual-list">
          <li><strong>VDID Status:</strong> Shows the currently active identity. If not initialized, you will see an "Initialize DID" prompt.</li>
          <li><strong>Telemetry:</strong> Real-time display of CPU, memory usage, and gateway connection latency.</li>
          <li><strong>Safety Gates:</strong>
            <p class="muted">AeonSage's core security mechanism. When an agent attempts sensitive operations (file I/O, Shell execution, transactions), it must pass the safety gate. You can set it to "Ask", "Allow", or "Block".</p>
          </li>
        </ul>
      </div>

      <div class="callout tip">
        <strong>Tip:</strong> It is recommended to always enable the "Kill Switch" to physically cut off all external connections if an agent behaves abnormally.
      </div>
    `
  },
  {
    id: "channels",
    title: "频道连接",
    titleEn: "Connect Channels",
    icon: "messageSquare",
    content: (lang) => lang === 'zh-CN' ? html`
      <h2>通讯频道 (Connect)</h2>
      <p>AeonSage 支持多渠道并发连接，让您的智能体能够同时在多个平台上响应。支持 WhatsApp, Telegram, Slack, Discord 等。</p>

      <h3>配置指南</h3>
      <div class="manual-steps">
        <div class="step-item">
          <div class="step-num">1</div>
          <div class="step-content">
            <h4>选择频道</h4>
            <p>在左侧菜单选择 "Connect" 进入频道管理页面。</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div class="step-content">
            <h4>添加账号</h4>
            <p>点击对应平台的 "Add Account" 按钮。例如 Telegram 需要输入 Bot Token。</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div class="step-content">
            <h4>验证连接</h4>
            <p>保存配置后，观察状态指示灯。绿色表示 "Connected" (已连接)，红色表示连接失败。</p>
          </div>
        </div>
      </div>
      
      <div class="callout warning">
        <strong>注意:</strong> 部分平台（如 WhatsApp）可能需要扫码登录，请保持手机在手边。
      </div>
    ` : html`
      <h2>Channels (Connect)</h2>
      <p>AeonSage supports concurrent multi-channel connections, allowing your agent to respond across multiple platforms simultaneously. Supports WhatsApp, Telegram, Slack, Discord, and more.</p>

      <h3>Configuration Guide</h3>
      <div class="manual-steps">
        <div class="step-item">
          <div class="step-num">1</div>
          <div class="step-content">
            <h4>Select Channel</h4>
            <p>Select "Connect" from the left menu to enter the channel management page.</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div class="step-content">
            <h4>Add Account</h4>
            <p>Click "Add Account" for the respective platform. For example, Telegram requires a Bot Token.</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div class="step-content">
            <h4>Verify Connection</h4>
            <p>After saving, observe the status light. Green indicates "Connected", red indicates failure.</p>
          </div>
        </div>
      </div>
      
      <div class="callout warning">
        <strong>Note:</strong> Some platforms (like WhatsApp) may require QR code scanning. Keep your phone nearby.
      </div>
    `
  },
  {
    id: "intelligence",
    title: "智能与技能",
    titleEn: "Intelligence & Skills",
    icon: "box", // Using 'box' as requested in previous context if it exists, otherwise fallback to generic
    content: (lang) => lang === 'zh-CN' ? html`
      <h2>智能体能力 (Intelligence)</h2>
      <p>智能体不仅仅是聊天机器人，它们通过 "Skills" (技能) 获得与现实世界交互的能力。</p>

      <h3>Skill Hub (技能中心)</h3>
      <p>访问技能中心，您可以浏览并安装各类能力：</p>
      <div class="manual-grid">
        <div class="manual-card">
          <h4>Web Browsing</h4>
          <p>赋予智能体浏览实时网页、搜索信息的能力。</p>
        </div>
        <div class="manual-card">
          <h4>Coding</h4>
          <p>允许智能体编写并执行 Python/JS 代码来解决复杂数学或数据处理问题。</p>
        </div>
        <div class="manual-card">
          <h4>Blockchain</h4>
          <p>集成链上交互能力，支持查询余额、发送交易等操作。</p>
        </div>
      </div>
    ` : html`
      <h2>Agent Intelligence</h2>
      <p>Agents are more than just chatbots; they gain the ability to interact with the real world through "Skills".</p>

      <h3>Skill Hub</h3>
      <p>Visit the Skill Hub to browse and install various capabilities:</p>
      <div class="manual-grid">
        <div class="manual-card">
          <h4>Web Browsing</h4>
          <p>Empowers agents to browse real-time web pages and search for information.</p>
        </div>
        <div class="manual-card">
          <h4>Coding</h4>
          <p>Allows agents to write and execute Python/JS code to solve complex math or data processing problems.</p>
        </div>
        <div class="manual-card">
          <h4>Blockchain</h4>
          <p>Integrates on-chain interaction capabilities, supporting balance queries, transaction sending, etc.</p>
        </div>
      </div>
    `
  },
  {
    id: "troubleshooting",
    title: "故障排除",
    titleEn: "Troubleshooting",
    icon: "bug", // Using 'bug' or 'alertTriangle'
    content: (lang) => lang === 'zh-CN' ? html`
      <h2>常见问题排查</h2>
      
      <details class="manual-faq" open>
        <summary>Gateway 连接失败 (Connection Failed)</summary>
        <p>1. 检查本地服务是否启动：请在终端运行 <code>pnpm start:gateway</code>。<br>
           2. 检查端口占用：确保 18789 端口未被其他程序占用。<br>
           3. 查看日志：进入 "System > Logs" 查看具体错误信息。</p>
      </details>

      <details class="manual-faq">
        <summary>智能体拒绝执行操作</summary>
        <p>这通常是因为触犯了安全规则。请检查 "Safety Gates" 设置，确认是否拦截了 Shell Execution 或 File Access 权限。</p>
      </details>

      <details class="manual-faq">
        <summary>Telegram 机器人无响应</summary>
        <p>请确认 Bot Token 是否正确，以及是否在 Telegram 的 BotFather 中关闭了 "Group Privacy" 模式（如果在群组中使用）。</p>
      </details>
    ` : html`
      <h2>Common Troubleshooting</h2>
      
      <details class="manual-faq" open>
        <summary>Gateway Connection Failed</summary>
        <p>1. Check if local service is running: Run <code>pnpm start:gateway</code> in terminal.<br>
           2. Check port: Ensure port 18789 is not occupied.<br>
           3. Check logs: Go to "System > Logs" for specific error details.</p>
      </details>

      <details class="manual-faq">
        <summary>Agent Refuses Operation</summary>
        <p>This is usually due to safety rules. Check "Safety Gates" settings to confirm if Shell Execution or File Access is blocked.</p>
      </details>

      <details class="manual-faq">
        <summary>Telegram Bot Unresponsive</summary>
        <p>Verify the Bot Token is correct and that "Group Privacy" mode is disabled in BotFather (if using in groups).</p>
      </details>
    `
  }
];

export function renderUserManual(props: UserManualProps) {
  const lang = getCurrentLanguage();
  const activeContent = SECTIONS.find(s => s.id === props.activeSection) || SECTIONS[0];
  const isZh = lang === 'zh-CN';

  return html`
    <style>
      .manual-container {
        display: flex;
        height: 100%;
        gap: 0;
        color: var(--text);
        font-family: var(--font-body);
        background: var(--bg);
        overflow: hidden;
      }
      .manual-sidebar {
        width: 260px;
        flex-shrink: 0;
        background: var(--panel);
        border-right: 1px solid var(--border);
        padding: 24px 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow-y: auto;
      }
      .manual-content {
        flex: 1;
        overflow-y: auto;
        padding: 40px 60px;
        max-width: 1000px;
        margin: 0 auto;
        /* Correction from original file: fixed typo bg-aaccen -> bg-accent if intended, but let's keep it transparent/inherited or correct it */
        /* background: var(--bg); */
      }
      
      .manual-nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--muted-foreground);
        font-size: 14px;
        font-weight: 500;
        border: 1px solid transparent;
      }
      .manual-nav-item:hover {
        background: var(--bg-hover);
        color: var(--text);
      }
      .manual-nav-item.active {
        background: var(--accent-subtle, rgba(59, 130, 246, 0.1));
        color: var(--accent);
        border-color: var(--accent-subtle, rgba(59, 130, 246, 0.1));
        font-weight: 600;
      }
      /* Ensure icons in nav have consistent size */
      .manual-nav-item .nav-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
      }
      .manual-nav-item svg {
        width: 18px;
        height: 18px;
        opacity: 0.8;
      }
      .manual-nav-item.active svg {
        opacity: 1;
      }

      /* Hero Section */
      .manual-hero {
        display: flex;
        align-items: center;
        gap: 24px;
        margin-bottom: 40px;
        padding-bottom: 30px;
        border-bottom: 1px solid var(--border);
      }
      .manual-logo {
        width: 80px;
        height: 80px;
        object-fit: contain;
      }
      .manual-hero-text h2 {
        font-size: 28px;
        margin: 0 0 12px 0;
        color: var(--text);
      }
      .manual-hero-text p {
        font-size: 16px;
        line-height: 1.6;
        color: var(--muted-foreground);
        margin: 0;
        max-width: 600px;
      }

      /* Typography */
      h2 {
        font-size: 24px;
        margin: 0 0 24px 0;
        color: var(--text);
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      h3 {
        font-size: 18px;
        margin: 32px 0 16px 0;
        color: var(--text);
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      h4 {
        font-size: 16px;
        margin: 0 0 8px 0;
        color: var(--text);
        font-weight: 600;
      }
      p {
        line-height: 1.7;
        margin-bottom: 16px;
        color: var(--muted-foreground);
        font-size: 15px;
      }

      /* Cards & Grids */
      .manual-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        margin: 24px 0;
      }
      .manual-card {
        background: var(--card);
        border: 1px solid var(--border);
        padding: 24px;
        border-radius: 12px;
        transition: transform 0.2s, border-color 0.2s;
      }
      .manual-card:hover {
        border-color: var(--border-hover);
        transform: translateY(-2px);
      }
      .manual-card h3 {
        margin-top: 0;
        font-size: 16px;
      }
      .manual-card p {
        font-size: 14px;
        margin-bottom: 0;
      }
      .icon-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: var(--bg-hover);
        border-radius: 8px;
        color: var(--accent);
      }
      .icon-box svg {
         width: 18px;
         height: 18px;
      }

      /* Lists */
      .manual-list {
        padding-left: 20px;
        margin-bottom: 24px;
        color: var(--muted-foreground);
      }
      .manual-list li {
        margin-bottom: 10px;
        padding-left: 8px;
      }
      .manual-list strong {
        color: var(--text);
        font-weight: 600;
      }

      /* Steps */
      .manual-steps {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin: 24px 0;
      }
      .step-item {
        display: flex;
        gap: 16px;
        padding: 20px;
        background: var(--bg-subtle);
        border-radius: 12px;
        border: 1px solid var(--border-subtle);
      }
      .step-num {
        width: 32px;
        height: 32px;
        background: var(--accent);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        flex-shrink: 0;
      }
      .step-content h4 {
        margin-top: 4px;
      }
      .step-content p {
        margin-bottom: 0;
        font-size: 14px;
      }

      /* Callouts */
      .callout {
        padding: 16px 20px;
        border-radius: 8px;
        margin: 24px 0;
        border-left: 4px solid var(--accent);
        background: var(--bg-subtle);
        font-size: 14px;
      }
      .callout.tip {
        border-color: var(--ok);
        background: var(--ok-subtle);
      }
      .callout.warning {
        border-color: var(--warn);
        background: var(--warn-subtle);
      }
      .callout strong {
        color: var(--text);
        margin-right: 8px;
      }
      .muted {
        color: var(--muted-foreground);
        font-size: 0.9em;
        margin-top: 4px;
      }

      /* FAQ */
      .manual-faq {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 12px;
        margin-bottom: 12px;
        overflow: hidden;
      }
      .manual-faq summary {
        padding: 16px 20px;
        cursor: pointer;
        font-weight: 600;
        color: var(--text);
        background: var(--bg-subtle);
        transition: background 0.2s;
        display: flex;
        align-items: center;
        list-style: none; /* Hide default triangle */
      }
      /* Custom triangle if needed, or rely on browser default if ok */
      .manual-faq summary::-webkit-details-marker {
        display: none; 
      }
      .manual-faq summary:hover {
        background: var(--bg-hover);
      }
      .manual-faq p {
        padding: 16px 20px;
        margin: 0;
        border-top: 1px solid var(--border-subtle);
        background: var(--card);
        color: var(--muted-foreground);
      }

      /* Animations */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.4s ease-out;
      }
    </style>

    <div class="manual-container">
      <nav class="manual-sidebar">
        ${SECTIONS.map(section => html`
          <div 
            class="manual-nav-item ${section.id === props.activeSection ? 'active' : ''}"
            @click=${() => props.onSectionChange(section.id)}
          >
            <!-- Wrapper to help with sizing -->
            <div class="nav-icon-wrapper">
              ${icon(section.icon)}
            </div>
            <span>${isZh ? section.title : section.titleEn}</span>
          </div>
        `)}
      </nav>

      <main class="manual-content animate-fade-in">
        ${activeContent.content(lang)}
      </main>
    </div>
  `;
}
