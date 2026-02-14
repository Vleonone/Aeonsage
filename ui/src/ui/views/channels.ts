import { html, nothing } from "lit";

import { formatAgo } from "../format";
import type {
  ChannelAccountSnapshot,
  ChannelUiMetaEntry,
  ChannelsStatusSnapshot,
  DiscordStatus,
  FeishuStatus,
  GoogleChatStatus,
  IMessageStatus,
  LineStatus,
  NostrProfile,
  NostrStatus,
  SignalStatus,
  SlackStatus,
  TelegramStatus,
  WhatsAppStatus,
} from "../types.js";
import { t, getCurrentLanguage } from "../i18n.js";
import type {
  ChannelKey,
  ChannelsChannelData,
  ChannelsProps,
} from "./channels.types";
import { channelEnabled, renderChannelAccountCount } from "./channels.shared";
import { renderChannelConfigSection } from "./channels.config";
import { renderDiscordCard } from "./channels.discord";
import { renderGoogleChatCard } from "./channels.googlechat";
import { renderIMessageCard } from "./channels.imessage";
import { renderNostrCard } from "./channels.nostr";
import { renderSignalCard } from "./channels.signal";
import { renderSlackCard } from "./channels.slack";
import { renderTelegramCard } from "./channels.telegram";
import { renderWhatsAppCard } from "./channels.whatsapp";
import { renderLineCard } from "./channels.line";
import { renderFeishuCard } from "./channels.feishu";
import { icons } from "../icons";

function renderAnalysisCard(props: ChannelsProps) {
  const lang = getCurrentLanguage();
  const texts = t(lang);

  // Aggregate stats from real data
  const accounts = props.snapshot?.channelAccounts || {};
  const channelOrder = props.snapshot?.channelOrder || [];
  let totalRunning = 0;
  let totalConnected = 0;
  let totalAccounts = 0;
  let earliestStart = Date.now();
  let latestActivity = 0;
  let totalErrors = 0;

  Object.values(accounts).flat().forEach(acc => {
    totalAccounts++;
    if (acc.running) totalRunning++;
    if (acc.connected) totalConnected++;
    if (acc.lastStartAt && acc.lastStartAt < earliestStart) earliestStart = acc.lastStartAt;
    if (acc.lastInboundAt && acc.lastInboundAt > latestActivity) latestActivity = acc.lastInboundAt;
    if (acc.lastError) totalErrors++;
  });

  // Calculate real metrics
  const uptimeMs = totalRunning > 0 ? Date.now() - earliestStart : 0;
  const uptimeHours = Math.floor(uptimeMs / (1000 * 60 * 60));
  const uptimeMins = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));
  const uptimeStr = uptimeHours > 0 ? `${uptimeHours}h ${uptimeMins}m` : `${uptimeMins}m`;

  const healthPercent = totalAccounts > 0 ? Math.round((totalConnected / totalAccounts) * 100) : 0;
  const activeChannels = channelOrder.filter(ch => {
    const accs = accounts[ch] || [];
    return accs.some(a => a.connected);
  }).length;
  const lastActivityAgo = latestActivity > 0 ? formatAgo(latestActivity) : "N/A";

  return html`
    <div class="card analysis-card stagger-1">
      <div class="analysis-header">
        <div class="analysis-title-group">
          <!-- SENSEI: Official Green Cartoon LOGO -->
          <img src="/aeonsage-logo02.svg" alt="Channel Analysis" class="analysis-icon system-logo-tint" />
          <div class="analysis-title">${texts.channels.analysis.title}</div>
          <div class="live-tag">LIVE TELEMETRY</div>
        </div>
        <!-- SENSEI: Use System Green for Status UI -->
        <div class="pill ${totalConnected > 0 ? 'ok' : ''}" style="${totalConnected > 0 ? 'color: var(--ok); border-color: var(--ok); background: var(--ok-subtle);' : ''}">
          <span class="statusDot" style="${totalConnected > 0 ? 'background-color: var(--ok); box-shadow: 0 0 8px var(--ok);' : ''}"></span>
          ${totalConnected > 0 ? 'ACTIVE' : 'STANDBY'}
        </div>
      </div>
      
      <div class="analysis-task">
        <div class="analysis-task__header">
          <div class="analysis-task__label">CHANNEL HEALTH</div>
          <div class="analysis-task__status" style="color: var(--ok);">${healthPercent}% CONNECTED</div>
        </div>
        <div class="progress-container">
          <div class="progress-bar" style="width: ${healthPercent}%; background: var(--ok); box-shadow: 0 0 10px var(--ok);"></div>
        </div>
      </div>

      <div class="analysis-vitals">
        <div class="vital-item">
          <div class="vital-label">CHANNELS</div>
          <div class="vital-value">${activeChannels}/${channelOrder.length}</div>
        </div>
        <div class="vital-item">
          <div class="vital-label">ACCOUNTS</div>
          <div class="vital-value">${totalAccounts}</div>
        </div>
        <div class="vital-item">
          <div class="vital-label">CONNECTED</div>
          <div class="vital-value">${totalConnected}</div>
        </div>
        <div class="vital-item">
          <div class="vital-label">RUNNING</div>
          <div class="vital-value">${totalRunning}</div>
        </div>
        <div class="vital-item">
          <div class="vital-label">ERRORS</div>
          <div class="vital-value">${totalErrors}</div>
        </div>
        <div class="vital-item">
          <div class="vital-label">LAST ACTIVITY</div>
          <div class="vital-value">${lastActivityAgo}</div>
        </div>
      </div>

      <div class="analysis-grid">
        <div class="analysis-item">
          <div class="analysis-label">${texts.channels.analysis.name}</div>
          <div class="analysis-value">AeonSage Gateway</div>
        </div>
        <div class="analysis-item">
          <div class="analysis-label">${texts.channels.analysis.status}</div>
          <div class="analysis-value">${totalConnected} CONNECTED / ${totalRunning} RUNNING</div>
        </div>
        <div class="analysis-item">
          <div class="analysis-label">${texts.channels.analysis.uptime}</div>
          <div class="analysis-value">${uptimeStr}</div>
        </div>
      </div>

      <div class="analysis-strengths">
        <div class="analysis-label">${texts.channels.analysis.strengths}</div>
        <div class="strengths-list">
          <div class="strength-item">
            <span class="strength-icon">${icons.checkCircle}</span>
            <span>Multi-Channel Gateway</span>
          </div>
          <div class="strength-item">
            <span class="strength-icon">${icons.checkCircle}</span>
            <span>Auto-Reconnect Enabled</span>
          </div>
          <div class="strength-item">
            <span class="strength-icon">${icons.checkCircle}</span>
            <span>Real-Time Monitoring</span>
          </div>
          <div class="strength-item">
            <span class="strength-icon">${icons.checkCircle}</span>
            <span>Unified Message Router</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderChannels(props: ChannelsProps) {
  const channels = props.snapshot?.channels as Record<string, unknown> | null;
  const whatsapp = (channels?.whatsapp ?? undefined) as
    | WhatsAppStatus
    | undefined;
  const telegram = (channels?.telegram ?? undefined) as
    | TelegramStatus
    | undefined;
  const line = (channels?.line ?? null) as LineStatus | null;
  const feishu = (channels?.feishu ?? null) as FeishuStatus | null;
  const discord = (channels?.discord ?? null) as DiscordStatus | null;
  const googlechat = (channels?.googlechat ?? null) as GoogleChatStatus | null;
  const slack = (channels?.slack ?? null) as SlackStatus | null;
  const signal = (channels?.signal ?? null) as SignalStatus | null;
  const imessage = (channels?.imessage ?? null) as IMessageStatus | null;
  const nostr = (channels?.nostr ?? null) as NostrStatus | null;
  const channelOrder = resolveChannelOrder(props.snapshot);
  const lang = getCurrentLanguage();
  const texts = t(lang);
  const orderedChannels = channelOrder
    .map((key, index) => ({
      key,
      enabled: channelEnabled(key, props),
      order: index,
    }))
    .sort((a, b) => {
      if (a.enabled !== b.enabled) return a.enabled ? -1 : 1;
      return a.order - b.order;
    });

  return html`
    ${renderAnalysisCard(props)}

    <div class="grid grid-cols-2">
      ${orderedChannels.map((channel) =>
    renderChannel(channel.key, props, {
      whatsapp,
      telegram,
      line,
      feishu,
      discord,
      googlechat,
      slack,
      signal,
      imessage,
      nostr,
      channelAccounts: props.snapshot?.channelAccounts ?? null,
    }),
  )}
    </div>

    <section class="card" style="margin-top: 18px;">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">${texts.channels.health}</div>
          <div class="card-sub">${texts.channels.healthSub}</div>
        </div>
        <div class="muted">${props.lastSuccessAt ? formatAgo(props.lastSuccessAt) : "n/a"}</div>
      </div>
      ${props.lastError
      ? html`<div class="callout danger" style="margin-top: 12px;">
            ${props.lastError}
          </div>`
      : nothing}
      <pre class="code-block" style="margin-top: 12px;">
${props.snapshot ? JSON.stringify(props.snapshot, null, 2) : texts.channels.noSnapshot}
      </pre>
    </section>
  `;
}

function resolveChannelOrder(snapshot: ChannelsStatusSnapshot | null): ChannelKey[] {
  if (snapshot?.channelMeta?.length) {
    return snapshot.channelMeta.map((entry) => entry.id) as ChannelKey[];
  }
  if (snapshot?.channelOrder?.length) {
    return snapshot.channelOrder;
  }
  return [
    "whatsapp",
    "telegram",
    "line",
    "feishu",
    "discord",
    "googlechat",
    "slack",
    "signal",
    "imessage",
    "nostr",
  ];
}

function renderChannel(
  key: ChannelKey,
  props: ChannelsProps,
  data: ChannelsChannelData,
) {
  const accountCountLabel = renderChannelAccountCount(
    key,
    data.channelAccounts,
  );
  switch (key) {
    case "whatsapp":
      return renderWhatsAppCard({
        props,
        whatsapp: data.whatsapp,
        accountCountLabel,
      });
    case "telegram":
      return renderTelegramCard({
        props,
        telegram: data.telegram,
        telegramAccounts: data.channelAccounts?.telegram ?? [],
        accountCountLabel,
      });
    case "line":
      return renderLineCard({
        props,
        line: data.line,
        lineAccounts: data.channelAccounts?.line ?? [],
        accountCountLabel,
      });
    case "feishu":
      return renderFeishuCard({
        props,
        feishu: data.feishu,
        feishuAccounts: data.channelAccounts?.feishu ?? [],
        accountCountLabel,
      });
    case "discord":
      return renderDiscordCard({
        props,
        discord: data.discord,
        accountCountLabel,
      });
    case "googlechat":
      return renderGoogleChatCard({
        props,
        googleChat: data.googlechat,
        accountCountLabel,
      });
    case "slack":
      return renderSlackCard({
        props,
        slack: data.slack,
        accountCountLabel,
      });
    case "signal":
      return renderSignalCard({
        props,
        signal: data.signal,
        accountCountLabel,
      });
    case "imessage":
      return renderIMessageCard({
        props,
        imessage: data.imessage,
        accountCountLabel,
      });
    case "nostr": {
      const nostrAccounts = data.channelAccounts?.nostr ?? [];
      const primaryAccount = nostrAccounts[0];
      const accountId = primaryAccount?.accountId ?? "default";
      const profile =
        (primaryAccount as { profile?: NostrProfile | null } | undefined)?.profile ?? null;
      const showForm =
        props.nostrProfileAccountId === accountId ? props.nostrProfileFormState : null;
      const profileFormCallbacks = showForm
        ? {
          onFieldChange: props.onNostrProfileFieldChange,
          onSave: props.onNostrProfileSave,
          onImport: props.onNostrProfileImport,
          onCancel: props.onNostrProfileCancel,
          onToggleAdvanced: props.onNostrProfileToggleAdvanced,
        }
        : null;
      return renderNostrCard({
        props,
        nostr: data.nostr,
        nostrAccounts,
        accountCountLabel,
        profileFormState: showForm,
        profileFormCallbacks,
        onEditProfile: () => props.onNostrProfileEdit(accountId, profile),
      });
    }
    default:
      return renderGenericChannelCard(key, props, data.channelAccounts ?? {});
  }
}

function renderGenericChannelCard(
  key: ChannelKey,
  props: ChannelsProps,
  channelAccounts: Record<string, ChannelAccountSnapshot[]>,
) {
  const label = resolveChannelLabel(props.snapshot, key);
  const status = props.snapshot?.channels?.[key] as Record<string, unknown> | undefined;
  const configured = typeof status?.configured === "boolean" ? status.configured : undefined;
  const running = typeof status?.running === "boolean" ? status.running : undefined;
  const connected = typeof status?.connected === "boolean" ? status.connected : undefined;
  const lastError = typeof status?.lastError === "string" ? status.lastError : undefined;
  const accounts = channelAccounts[key] ?? [];
  const accountCountLabel = renderChannelAccountCount(key, channelAccounts);
  const lang = getCurrentLanguage();
  const texts = t(lang);

  return html`
    <div class="card">
      <div class="card-title">${label}</div>
      <div class="card-sub">Channel status and configuration.</div>
      ${accountCountLabel}

      ${accounts.length > 0
      ? html`
            <div class="account-card-list">
              ${accounts.map((account) => renderGenericAccount(account))}
            </div>
          `
      : html`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">${texts.channels.common.configured}</span>
                <span>${configured == null ? "n/a" : configured ? texts.common.success : texts.common.error}</span>
              </div>
              <div>
                <span class="label">${texts.channels.common.running}</span>
                <span>${running == null ? "n/a" : running ? texts.common.success : texts.common.error}</span>
              </div>
              <div>
                <span class="label">${texts.channels.common.connected}</span>
                <span>${connected == null ? "n/a" : connected ? texts.common.success : texts.common.error}</span>
              </div>
            </div>
          `}

      ${lastError
      ? html`<div class="callout danger" style="margin-top: 12px;">
            ${lastError}
          </div>`
      : nothing}

      ${renderChannelConfigSection({ channelId: key, props })}
    </div>
  `;
}

function resolveChannelMetaMap(
  snapshot: ChannelsStatusSnapshot | null,
): Record<string, ChannelUiMetaEntry> {
  if (!snapshot?.channelMeta?.length) return {};
  return Object.fromEntries(snapshot.channelMeta.map((entry) => [entry.id, entry]));
}

function resolveChannelLabel(
  snapshot: ChannelsStatusSnapshot | null,
  key: string,
): string {
  const meta = resolveChannelMetaMap(snapshot)[key];
  return meta?.label ?? snapshot?.channelLabels?.[key] ?? key;
}

const RECENT_ACTIVITY_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes

function hasRecentActivity(account: ChannelAccountSnapshot): boolean {
  if (!account.lastInboundAt) return false;
  return Date.now() - account.lastInboundAt < RECENT_ACTIVITY_THRESHOLD_MS;
}

function deriveRunningStatus(account: ChannelAccountSnapshot): "Yes" | "No" | "Active" {
  if (account.running) return "Yes";
  // If we have recent inbound activity, the channel is effectively running
  if (hasRecentActivity(account)) return "Active";
  return "No";
}

function deriveConnectedStatus(account: ChannelAccountSnapshot): "Yes" | "No" | "Active" | "n/a" {
  if (account.connected === true) return "Yes";
  if (account.connected === false) return "No";
  // If connected is null/undefined but we have recent activity, show as active
  if (hasRecentActivity(account)) return "Active";
  return "n/a";
}

function renderGenericAccount(account: ChannelAccountSnapshot) {
  const runningStatus = deriveRunningStatus(account);
  const connectedStatus = deriveConnectedStatus(account);
  const lang = getCurrentLanguage();
  const texts = t(lang);

  return html`
    <div class="account-card">
      <div class="account-card-header">
        <div class="account-card-title">${account.name || account.accountId}</div>
        <div class="account-card-id">${account.accountId}</div>
      </div>
      <div class="status-list account-card-status">
        <div>
          <span class="label">${texts.channels.common.running}</span>
          <span>${runningStatus === "Yes" ? texts.common.success : runningStatus === "Active" ? texts.status.active : texts.common.error}</span>
        </div>
        <div>
          <span class="label">${texts.channels.common.configured}</span>
          <span>${account.configured ? texts.common.success : texts.common.error}</span>
        </div>
        <div>
          <span class="label">${texts.channels.common.connected}</span>
          <span>${connectedStatus === "Yes" ? texts.common.success : connectedStatus === "Active" ? texts.status.active : texts.common.error}</span>
        </div>
        <div>
          <span class="label">${texts.channels.common.lastInbound}</span>
          <span>${account.lastInboundAt ? formatAgo(account.lastInboundAt) : "n/a"}</span>
        </div>
        ${account.lastError
      ? html`
              <div class="account-card-error">
                ${account.lastError}
              </div>
            `
      : nothing}
      </div>
    </div>
  `;
}
