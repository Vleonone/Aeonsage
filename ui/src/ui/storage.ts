const KEY = "aeonsage.control.settings.v1";

import type { ThemeMode } from "./theme";

export type UiSettings = {
  gatewayUrl: string;
  token: string;
  sessionKey: string;
  lastActiveSessionKey: string;
  theme: ThemeMode;
  chatFocusMode: boolean;
  chatShowThinking: boolean;
  splitRatio: number; // Sidebar split ratio (0.4 to 0.7, default 0.6)
  navCollapsed: boolean; // Collapsible sidebar state
  navGroupsCollapsed: Record<string, boolean>; // Which nav groups are collapsed
  navWidth: number; // Main sidebar width in px (default 240)
  autoReconnect: boolean; // Whether to auto-reconnect on disconnect (default: false for security)
  dashboardSubTab?: "overview" | "usage" | "instances" | "infrastructure";
  connectSubTab?: "channels" | "voice";
  intelligenceSubTab?: "skills" | "sessions" | "nodes" | "market";
  systemSubTab?: "config" | "logs" | "debug" | "cron";
};

export function loadSettings(): UiSettings {
  const defaultUrl = (() => {
    const proto = location.protocol === "https:" ? "wss" : "ws";
    return `${proto}://${location.host}`;
  })();

  const defaults: UiSettings = {
    gatewayUrl: defaultUrl,
    token: "",
    sessionKey: "main",
    lastActiveSessionKey: "main",
    theme: "system",
    chatFocusMode: false,
    chatShowThinking: true,
    splitRatio: 0.6,
    navCollapsed: false,
    navGroupsCollapsed: {},
    navWidth: 240,
    autoReconnect: false, // Default to false for security - require explicit user action
    dashboardSubTab: "overview",
    connectSubTab: "channels",
    intelligenceSubTab: "skills",
    systemSubTab: "logs"
  };

  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<UiSettings>;
    return {
      gatewayUrl:
        typeof parsed.gatewayUrl === "string" && parsed.gatewayUrl.trim()
          ? parsed.gatewayUrl.trim()
          : defaults.gatewayUrl,
      token: typeof parsed.token === "string" ? parsed.token : defaults.token,
      sessionKey:
        typeof parsed.sessionKey === "string" && parsed.sessionKey.trim()
          ? parsed.sessionKey.trim()
          : defaults.sessionKey,
      lastActiveSessionKey:
        typeof parsed.lastActiveSessionKey === "string" &&
          parsed.lastActiveSessionKey.trim()
          ? parsed.lastActiveSessionKey.trim()
          : (typeof parsed.sessionKey === "string" &&
            parsed.sessionKey.trim()) ||
          defaults.lastActiveSessionKey,
      theme:
        parsed.theme === "light" ||
          parsed.theme === "dark" ||
          parsed.theme === "system" ||
          parsed.theme === "free" ||
          parsed.theme === "pro"
          ? parsed.theme
          : defaults.theme,
      chatFocusMode:
        typeof parsed.chatFocusMode === "boolean"
          ? parsed.chatFocusMode
          : defaults.chatFocusMode,
      chatShowThinking:
        typeof parsed.chatShowThinking === "boolean"
          ? parsed.chatShowThinking
          : defaults.chatShowThinking,
      splitRatio:
        typeof parsed.splitRatio === "number" &&
          parsed.splitRatio >= 0.4 &&
          parsed.splitRatio <= 0.7
          ? parsed.splitRatio
          : defaults.splitRatio,
      navCollapsed:
        typeof parsed.navCollapsed === "boolean"
          ? parsed.navCollapsed
          : defaults.navCollapsed,
      navGroupsCollapsed:
        typeof parsed.navGroupsCollapsed === "object" &&
          parsed.navGroupsCollapsed !== null
          ? parsed.navGroupsCollapsed
          : defaults.navGroupsCollapsed,
      navWidth:
        typeof parsed.navWidth === "number" &&
          parsed.navWidth >= 120 &&
          parsed.navWidth <= 480
          ? parsed.navWidth
          : defaults.navWidth,
      dashboardSubTab: parsed.dashboardSubTab || defaults.dashboardSubTab,
      connectSubTab: parsed.connectSubTab || defaults.connectSubTab,
      intelligenceSubTab: parsed.intelligenceSubTab || defaults.intelligenceSubTab,
      autoReconnect:
        typeof parsed.autoReconnect === "boolean"
          ? parsed.autoReconnect
          : defaults.autoReconnect,
      systemSubTab: parsed.systemSubTab || defaults.systemSubTab,
    };
  } catch {
    // Expected: localStorage may be empty, corrupted, or unavailable
    return defaults;
  }
}

export function saveSettings(next: UiSettings) {
  localStorage.setItem(KEY, JSON.stringify(next));
}
