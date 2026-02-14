import { html } from "lit";

import type { GatewayHelloOk } from "../gateway";
import { formatAgo, formatDurationMs } from "../format";
import { formatNextRun } from "../presenter";
import type { UiSettings } from "../storage";
import { t, getCurrentLanguage, type Language } from "../i18n";
import type { VDIDStatus } from "../controllers/security";
import { icons } from "../icons";

export type OverviewProps = {
  connected: boolean;
  hello: GatewayHelloOk | null;
  settings: UiSettings;
  password: string;
  lastError: string | null;
  presenceCount: number;
  sessionsCount: number | null;
  cronEnabled: boolean | null;
  cronNext: number | null;
  lastChannelsRefresh: number | null;
  language?: Language;  // SENSEI: 添加语言参数
  vdid: VDIDStatus;
  onSettingsChange: (next: UiSettings) => void;
  onPasswordChange: (next: string) => void;
  onSessionKeyChange: (next: string) => void;
  onConnect: () => void;
  onRefresh: () => void;
  onInitializeVDID: () => void;
};

const vdidLogo = html`
<svg class="vdid-logo" width="100%" height="100%" viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="vdid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#aaaaaa;stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Main D -->
  <path fill="url(#vdid-grad)" fill-rule="evenodd" d="M 68.683594 188.945312 L 68.683594 97.234375 L 111.6875 97.234375 L 111.6875 53.894531 L 218.578125 53.894531 C 236.003906 53.894531 253.132812 56.726562 269.339844 63.210938 C 284.5 69.265625 298.101562 77.945312 309.652344 89.492188 C 321.234375 101.078125 329.949219 114.785156 336.09375 129.949219 C 342.753906 146.402344 345.589844 163.882812 345.589844 181.59375 C 345.589844 199.574219 342.667969 217.230469 336.113281 234.023438 C 330.019531 249.679688 321.339844 263.9375 309.757812 276.160156 C 298.316406 288.203125 284.75 297.5 269.515625 304.195312 C 253.34375 311.28125 236.164062 314.433594 218.558594 314.433594 L 68.683594 314.433594 L 68.683594 218.222656 L 92.0625 218.222656 L 92.0625 188.964844 L 68.683594 188.964844 Z M 124.121094 109.667969 L 124.121094 144.117188 L 94.082031 144.117188 L 94.082031 173.375 L 124.136719 173.375 L 124.136719 258.640625 L 218.59375 258.640625 C 228.40625 258.640625 237.972656 256.921875 247.003906 253.007812 C 255.523438 249.308594 263.121094 244.171875 269.585938 237.492188 C 276.195312 230.675781 281.046875 222.652344 284.464844 213.8125 C 288.203125 204.140625 289.851562 193.976562 289.851562 183.632812 C 289.851562 173.359375 288.21875 163.246094 284.464844 153.644531 C 281.046875 144.914062 276.195312 137.015625 269.605469 130.320312 C 263.140625 123.75 255.558594 118.71875 247.058594 115.140625 C 237.988281 111.316406 228.40625 109.648438 218.59375 109.648438 L 124.121094 109.648438 Z"/>
  <!-- Inner square -->
  <rect x="122" y="144" width="29" height="29" fill="url(#vdid-grad)"/>
  <!-- Dispersing blocks -->
  <rect class="block-1" x="52.9" y="38.4" width="43.3" height="43.3" fill="url(#vdid-grad)"/>
  <rect class="block-2" x="7" y="116.2" width="36.8" height="36.8" fill="url(#vdid-grad)"/>
  <rect class="block-3" x="27.1" y="188.9" width="29.3" height="29.3" fill="url(#vdid-grad)"/>
  <rect class="block-4" x="19.1" y="82.4" width="15.2" height="15.2" fill="url(#vdid-grad)"/>
  <rect class="block-5" x="6.3" y="43.9" width="15.2" height="15.2" fill="url(#vdid-grad)"/>
</svg>`;

export function renderOverview(props: OverviewProps) {
  const lang = props.language || getCurrentLanguage();
  const texts = t(lang);

  function renderChainIcon(chain?: string) {
    const key = (chain ?? "").toLowerCase();
    if (key === "eth" || key === "ethereum") {
      return html`<img src="/web3icons/eth.svg" alt="ETH" />`;
    }
    if (key === "sol" || key === "solana") {
      return html`<img src="/web3icons/solana.svg" alt="SOL" />`;
    }
    if (key === "base") {
      return html`<span class="badge">BASE</span>`;
    }
    return html`<span class="badge">${(chain ?? "?").toUpperCase()}</span>`;
  }

  function formatBalance(wallet: { balance?: string; balanceStatus?: string; currency?: string }) {
    if (wallet.balanceStatus === "error") return texts.overview.balanceError;
    if (wallet.balanceStatus === "unavailable" || !wallet.balance) return texts.overview.balanceUnavailable;
    return `${wallet.balance} ${wallet.currency ?? ""}`.trim();
  }

  const snapshot = props.hello?.snapshot as
    | { uptimeMs?: number; policy?: { tickIntervalMs?: number } }
    | undefined;
  const uptime = snapshot?.uptimeMs ? formatDurationMs(snapshot.uptimeMs) : "n/a";
  const tick = snapshot?.policy?.tickIntervalMs
    ? `${snapshot.policy.tickIntervalMs}ms`
    : "n/a";

  // SENSEI: 机器人状态映射
  const systemStatus = props.connected ? "READY" : "ERROR";
  const networkStatus = props.connected ? "CONNECTED" : "DISCONNECTED";
  const robotStatus = props.connected ? "ACTIVE" : "OFFLINE";

  const authHint = (() => {
    if (props.connected || !props.lastError) return null;
    const lower = props.lastError.toLowerCase();
    const authFailed = lower.includes("unauthorized") || lower.includes("connect failed");
    if (!authFailed) return null;
    const hasToken = Boolean(props.settings.token.trim());
    const hasPassword = Boolean(props.password.trim());
    if (!hasToken && !hasPassword) {
      return html`
        <div class="muted" style="margin-top: 8px;">
          ${texts.overview.authHint}
          <div style="margin-top: 6px;">
            <span class="muted-strong">${texts.overview.authHintSub}</span><br/>
            <span class="mono">aeonsage dashboard --no-open</span> → tokenized URL<br />
            <span class="mono">aeonsage doctor --generate-gateway-token</span> → set token
          </div>
          <div style="margin-top: 6px;">
            <a
              class="session-link"
              href="https://docs.aeonsage.org/web/dashboard"
              target="_blank"
              rel="noreferrer"
              title="${texts.overview.docsAuth}"
              >${texts.overview.docsAuth}</a
            >
          </div>
        </div>
      `;
    }
    return html`
      <div class="muted" style="margin-top: 8px;">
        ${texts.overview.authFailed}
        <div style="margin-top: 6px;">
          <a
            class="session-link"
            href="https://docs.aeonsage.org/web/dashboard"
            target="_blank"
            rel="noreferrer"
            title="${texts.overview.docsAuth}"
            >${texts.overview.docsAuth}</a
          >
        </div>
      </div>
    `;
  })();
  const insecureContextHint = (() => {
    if (props.connected || !props.lastError) return null;
    const isSecureContext = typeof window !== "undefined" ? window.isSecureContext : true;
    if (isSecureContext !== false) return null;
    const lower = props.lastError.toLowerCase();
    if (!lower.includes("secure context") && !lower.includes("device identity required")) {
      return null;
    }
    return html`
      <div class="muted" style="margin-top: 8px;">
        ${texts.overview.insecureHint}
        <div style="margin-top: 6px;">
          ${texts.overview.insecureHintSub}
        </div>
        <div style="margin-top: 6px;">
          <a
            class="session-link"
            href="https://docs.aeonsage.org/gateway/tailscale"
            target="_blank"
            rel="noreferrer"
            title="${texts.overview.docsTailscale}"
            >${texts.overview.docsTailscale}</a
          >
          <span class="muted"> · </span>
          <a
            class="session-link"
            href="https://docs.aeonsage.org/web/control-ui#insecure-http"
            target="_blank"
            rel="noreferrer"
            title="${texts.overview.docsInsecure}"
            >${texts.overview.docsInsecure}</a
          >
        </div>
      </div>
    `;
  })();

  return html`
    <!-- SENSEI: VDID & Identity Section -->
    <section class="identity-section" style="margin-bottom: 20px;">
        <div class="card glass-card vdid-overview-card">
            ${props.vdid && props.vdid.did ? html`
                <div class="vdid-content active">
                    <div class="vdid-visual">
                        <div class="vdid-avatar">
                            ${vdidLogo}
                        </div>
                        <div class="vdid-status-badge ${props.vdid.registered ? 'registered' : 'pending'}">
                            ${props.vdid.registered ? 'VERIFIED' : 'PENDING'}
                        </div>
                    </div>
                    <div class="vdid-details">
                        <div class="vdid-header">
                            <span class="vdid-label">Sovereign Identity</span>
                            <span class="vdid-network badge">${props.vdid.network || 'Unknown'}</span>
                        </div>
                        <div class="vdid-id mono">${props.vdid.did}</div>
                        <div class="vdid-meta-row" style="display: flex; gap: 12px; margin-top: 4px; font-size: 12px;">
                             <span class="vdid-score" title="Verification Score: ${props.vdid.vscoreTotal || 0}">
                                ${icons.barChart} Score: <strong>${props.vdid.vscoreTotal || 0}</strong>
                             </span>
                             <span class="vdid-level muted">
                                ${props.vdid.vscoreLevel || 'Unranked'}
                             </span>
                        </div>
                        <div class="vdid-wallet muted" style="margin-top: 6px;">
                            ${icons.creditCard} ${props.vdid.walletConnected ? texts.overview.walletsActive : texts.overview.walletsMissing}
                        </div>
                        ${props.vdid.wallets?.length ? html`
                          <div class="vdid-wallets">
                            ${props.vdid.wallets.map((wallet) => html`
                              <div class="vdid-wallet-row">
                                <div class="vdid-wallet-chain">
                                  ${renderChainIcon(wallet.chain)}
                                  <span>${wallet.currency ?? wallet.chain.toUpperCase()}</span>
                                </div>
                                <div class="vdid-wallet-address mono">${wallet.address}</div>
                                <div class="vdid-wallet-balance">
                                  ${formatBalance(wallet)}
                                </div>
                              </div>
                            `)}
                          </div>
                        ` : html`
                          <div class="vdid-wallets empty">${texts.overview.walletsMissing}</div>
                        `}
                    </div>
                </div>
            ` : html`
                <div class="vdid-placeholder-container">
                    <div class="vdid-placeholder-visual">
                        <div class="holo-chip"></div>
                        <div class="holo-scanline"></div>
                        <div class="vdid-placeholder-logo">${vdidLogo}</div>
                        <div class="holo-user">${icons.fingerprint}</div>
                    </div>
                    <div class="vdid-placeholder-info">
                        <div class="placeholder-title">Identity Not Established</div>
                        <div class="placeholder-desc muted">Initialize your Sovereign Digital Identity (VDID) to unlock advanced agent autonomy and wallet features.</div>
                    </div>
                    <div class="vdid-placeholder-action">
                        <button class="btn btn--sm primary" @click=${props.onInitializeVDID} title="Start Sovereign Identity Setup">
                            Initialize DID
                        </button>
                    </div>
                </div>
            `}
        </div>
        <style>
            .vdid-overview-card {
                padding: 0;
                overflow: hidden;
                position: relative;
                min-height: 120px;
                display: flex;
            }
            /* Active State */
            .vdid-content {
                display: flex;
                align-items: center;
                gap: 24px;
                padding: 24px;
                width: 100%;
                background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%);
            }
            .vdid-visual {
                position: relative;
            }
            .vdid-avatar {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                background: rgba(255,255,255,0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: var(--accent);
                border: 2px solid rgba(255,255,255,0.1);
            }
            .vdid-status-badge {
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 10px;
                padding: 2px 6px;
                border-radius: 4px;
                font-weight: bold;
                background: var(--bg-subtle);
                color: var(--text-muted);
                white-space: nowrap;
            }
            .vdid-status-badge.registered {
                background: var(--accent);
                color: var(--primary-foreground);
            }
            .vdid-details {
                flex: 1;
            }
            .vdid-header {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 4px;
            }
            .vdid-label {
                font-size: 12px;
                color: var(--text-muted);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            .vdid-network {
                font-size: 10px;
                padding: 1px 4px;
                border-radius: 3px;
                background: rgba(255,255,255,0.1);
            }
            .vdid-id {
                font-size: 16px;
                font-weight: 500;
                color: var(--text-main);
                margin-bottom: 4px;
            }
            .vdid-wallet {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 12px;
            }
            .vdid-wallets {
                margin-top: 10px;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .vdid-wallets.empty {
                font-size: 12px;
                color: var(--muted);
            }
            .vdid-wallet-row {
                display: grid;
                grid-template-columns: 120px 1fr 120px;
                gap: 10px;
                align-items: center;
                padding: 6px 8px;
                border-radius: 8px;
                background: var(--card-transparent);
                border: 1px solid var(--border-subtle);
                font-size: 12px;
            }
            .vdid-wallet-chain {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 600;
            }
            .vdid-wallet-chain img {
                width: 18px;
                height: 18px;
            }
            .vdid-wallet-address {
                font-size: 11px;
                color: var(--muted);
                word-break: break-all;
            }
            .vdid-wallet-balance {
                text-align: right;
                font-weight: 600;
            }

            /* Placeholder/Empty State */
            .vdid-placeholder-container {
                display: flex;
                align-items: center;
                width: 100%;
                padding: 0;
            }
            .vdid-placeholder-visual {
                width: 140px;
                align-self: stretch;
                background: linear-gradient(135deg, var(--accent-subtle) 0%, var(--bg-accent) 100%);
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                border-right: 1px solid rgba(255,255,255,0.05);
            }
            .vdid-placeholder-logo {
                width: 64px;
                height: 64px;
                display: grid;
                place-items: center;
                opacity: 0.75;
                filter: drop-shadow(0 0 8px var(--accent-glow));
                position: absolute;
            }
            .vdid-placeholder-logo .vdid-logo {
                width: 100%;
                height: 100%;
            }
            .holo-user {
                font-size: 32px;
                opacity: 0.3;
                filter: drop-shadow(0 0 5px var(--accent));
            }
            .holo-chip {
                position: absolute;
                top: 12px;
                left: 12px;
                width: 20px;
                height: 14px;
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 2px;
            }
            .holo-scanline {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: var(--accent-subtle);
                animation: scan 3s infinite linear;
            }
            @keyframes scan {
                0% { top: 0%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
            }
            .vdid-placeholder-info {
                flex: 1;
                padding: 0 24px;
            }
            .placeholder-title {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 4px;
            }
            .placeholder-desc {
                font-size: 13px;
                line-height: 1.4;
                max-width: 400px;
            }
            .vdid-placeholder-action {
                padding-right: 24px;
            }

  .vdid-logo {
    cursor: pointer;
  }
  .vdid-logo .block-1 {
    transition: all 0.35s ease-out;
  }
  .vdid-logo .block-2 {
    transition: all 0.4s ease-out;
  }
  .vdid-logo .block-3 {
    transition: all 0.3s ease-out;
  }
  .vdid-logo .block-4 {
    transition: all 0.38s ease-out;
  }
  .vdid-logo .block-5 {
    transition: all 0.45s ease-out;
  }
  .vdid-logo:hover .block-1 {
    transform: translate(-8px, -6px);
    opacity: 0.7;
  }
  .vdid-logo:hover .block-2 {
    transform: translate(-10px, 0px);
    opacity: 0.5;
  }
  .vdid-logo:hover .block-3 {
    transform: translate(-6px, 4px);
    opacity: 0.6;
  }
  .vdid-logo:hover .block-4 {
    transform: translate(-5px, -3px);
    opacity: 0.5;
  }
  .vdid-logo:hover .block-5 {
    transform: translate(-7px, -5px);
    opacity: 0.4;
  }
        </style>
    </section>

    <!-- SENSEI: 实时状态监控面板 -->
    <section class="realtime-monitor">

      <div class="monitor-grid">
      <div class="monitor-card glass-card">
          <div class="monitor-label">${texts.overview.systemLoad}</div>
          <div class="monitor-value ${props.connected ? 'ok' : 'muted'}">
            ${props.connected ? '35%' : '--'}
          </div>
        </div>
        <div class="monitor-card glass-card">
          <div class="monitor-label">${texts.overview.messageThroughput}</div>
          <div class="monitor-value ${props.connected ? 'accent' : 'muted'}">
            ${props.connected ? '142' : '--'}<span class="monitor-unit">${texts.overview.perMinute}</span>
          </div>
        </div>
        <div class="monitor-card glass-card">
          <div class="monitor-label">${texts.overview.responseLatency}</div>
          <div class="monitor-value ${props.connected ? 'ok' : 'muted'}">
            ${props.connected ? '120' : '--'}<span class="monitor-unit">${texts.overview.milliseconds}</span>
          </div>
        </div>
        <div class="monitor-card glass-card">
          <div class="monitor-label">${texts.overview.hotChannel}</div>
          <div class="monitor-value ${props.connected ? 'accent' : 'muted'}">
            ${props.connected ? 'Telegram' : '--'}
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-2">
      <div class="card glass-card glass-card--static">
        <div class="card-title">${texts.overview.gatewayAccess}</div>
        <div class="card-sub">${texts.overview.gatewayAccessSub}</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>${texts.overview.websocketUrl}</span>
            <input
              .value=${props.settings.gatewayUrl}
              @input=${(e: Event) => {
      const v = (e.target as HTMLInputElement).value;
      props.onSettingsChange({ ...props.settings, gatewayUrl: v });
    }}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          <label class="field">
            <span>${texts.overview.gatewayToken}</span>
            <input
              .value=${props.settings.token}
              @input=${(e: Event) => {
      const v = (e.target as HTMLInputElement).value;
      props.onSettingsChange({ ...props.settings, token: v });
    }}
              placeholder="AEONSAGE_GATEWAY_TOKEN"
            />
          </label>
          <label class="field">
            <span>${texts.overview.passwordNotStored}</span>
            <input
              type="password"
              .value=${props.password}
              @input=${(e: Event) => {
      const v = (e.target as HTMLInputElement).value;
      props.onPasswordChange(v);
    }}
              placeholder="system or shared password"
            />
          </label>
          <label class="field">
            <span>${texts.overview.defaultSessionKey}</span>
            <input
              .value=${props.settings.sessionKey}
              @input=${(e: Event) => {
      const v = (e.target as HTMLInputElement).value;
      props.onSessionKeyChange(v);
    }}
            />
          </label>
          <label class="field field--checkbox" style="flex-direction: row; align-items: center; gap: 8px;">
            <input
              type="checkbox"
              .checked=${props.settings.autoReconnect}
              @change=${(e: Event) => {
      const v = (e.target as HTMLInputElement).checked;
      props.onSettingsChange({ ...props.settings, autoReconnect: v });
    }}
            />
            <span style="font-weight: normal;">Auto-Reconnect</span>
            <span class="muted" style="font-size: 11px; margin-left: 4px;">${props.settings.autoReconnect ? '(enabled)' : '(disabled - manual connect only)'}</span>
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn btn-cta" @click=${() => props.onConnect()}>${texts.common.confirm}</button>
          <button class="btn btn-cta--secondary" @click=${() => props.onRefresh()}>${texts.common.refresh}</button>
          <span class="muted">${texts.overview.connectHint}</span>
        </div>
      </div>

      <div class="card glass-card glass-card--static">
        <div class="card-title">${texts.overview.snapshot}</div>
        <div class="card-sub">${texts.overview.snapshotSub}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${texts.overview.statusLabel}</div>
            <div class="stat-value ${props.connected ? "ok" : "warn"}">
              ${props.connected ? texts.status.connected : texts.status.disconnected}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">${texts.overview.uptime}</div>
            <div class="stat-value">${uptime}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${texts.overview.tickInterval}</div>
            <div class="stat-value">${tick}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${texts.overview.lastChannelRefresh}</div>
            <div class="stat-value">
              ${props.lastChannelsRefresh
      ? formatAgo(props.lastChannelsRefresh)
      : "n/a"}
            </div>
          </div>
        </div>
        ${props.lastError
      ? html`<div class="callout danger" style="margin-top: 14px;">
              <div>${props.lastError}</div>
              ${authHint ?? ""}
              ${insecureContextHint ?? ""}
            </div>`
      : html`<div class="callout" style="margin-top: 14px;">
              ${texts.overview.useChannels}
            </div>`}
      </div>
    </section>

    <section class="grid grid-cols-3" style="margin-top: 18px;">
      <div class="card stat-card">
        <div class="stat-label">${texts.overview.instances}</div>
        <div class="stat-value">${props.presenceCount}</div>
        <div class="muted">${texts.overview.presenceHint}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">${texts.overview.sessions}</div>
        <div class="stat-value">${props.sessionsCount ?? "n/a"}</div>
        <div class="muted">${texts.overview.sessionsHint}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">${texts.overview.cron}</div>
        <div class="stat-value">
          ${props.cronEnabled == null
      ? "n/a"
      : props.cronEnabled
        ? texts.overview.cronEnabled
        : texts.overview.cronDisabled}
        </div>
        <div class="muted">${texts.overview.nextWake}: ${formatNextRun(props.cronNext)}</div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">${texts.overview.notes}</div>
      <div class="card-sub">${texts.overview.notesSub}</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">${texts.overview.tailscaleServe}</div>
          <div class="muted">
            ${texts.overview.tailscaleServeSub}
          </div>
        </div>
        <div>
          <div class="note-title">${texts.overview.sessionHygiene}</div>
          <div class="muted">${texts.overview.sessionHygieneSub}</div>
        </div>
        <div>
          <div class="note-title">${texts.overview.cronReminders}</div>
          <div class="muted">${texts.overview.cronRemindersSub}</div>
        </div>
      </div>
    </section>
  `;
}
