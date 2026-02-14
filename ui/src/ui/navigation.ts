import type { IconName } from "./icons.js";
import { t, type Language } from "./i18n.js";

// Consolidated Tab Groups with Translation Keys
// Order: Chat (default) → Workflow (visual workbench) → Dashboard → ...
export const TAB_GROUPS_META = [
  { labelKey: "chat", tabs: ["chat"] },
  { labelKey: "workflow", tabs: ["workflow"] },
  { labelKey: "dashboard", tabs: ["dashboard"] },
  { labelKey: "connect", tabs: ["connect"] },
  { labelKey: "intelligence", tabs: ["intelligence"] },
  { labelKey: "security", tabs: ["security"] },
  { labelKey: "system", tabs: ["system"] },
] as const;

export type Tab =
  | "dashboard"
  | "connect"
  | "intelligence"
  | "workflow"
  | "security"
  | "system"
  | "chat"
  | "manual"
  | "market";

const TAB_PATHS: Record<Tab, string> = {
  dashboard: "/dashboard",
  connect: "/connect",
  intelligence: "/intelligence",
  workflow: "/workflow",
  security: "/security",
  system: "/system",
  chat: "/chat",
  manual: "/manual",
  market: "/market",
};

const PATH_TO_TAB = new Map(
  Object.entries(TAB_PATHS).map(([tab, path]) => [path, tab as Tab]),
);

export function normalizeBasePath(basePath: string): string {
  if (!basePath) return "";
  let base = basePath.trim();
  if (!base.startsWith("/")) base = `/${base}`;
  if (base === "/") return "";
  if (base.endsWith("/")) base = base.slice(0, -1);
  return base;
}

export function normalizePath(path: string): string {
  if (!path) return "/";
  let normalized = path.trim();
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

export function pathForTab(tab: Tab, basePath = ""): string {
  const base = normalizeBasePath(basePath);
  const path = TAB_PATHS[tab];
  return base ? `${base}${path}` : path;
}

export function tabFromPath(pathname: string, basePath = ""): Tab | null {
  const base = normalizeBasePath(basePath);
  let path = pathname || "/";
  if (base) {
    if (path === base) {
      path = "/";
    } else if (path.startsWith(`${base}/`)) {
      path = path.slice(base.length);
    }
  }
  let normalized = normalizePath(path).toLowerCase();

  if (normalized.endsWith("/index.html")) normalized = "/";
  if (normalized === "/") return "dashboard";

  // Backward compatibility redirects
  if (normalized === ("/overview")) return "dashboard";
  if (normalized === ("/usage")) return "dashboard";
  if (normalized === ("/instances")) return "dashboard";

  if (normalized === ("/channels")) return "connect";
  if (normalized === ("/tts")) return "connect";

  if (normalized === ("/skills")) return "intelligence";
  if (normalized === ("/sessions")) return "intelligence";
  if (normalized === ("/nodes")) return "intelligence";

  if (normalized === ("/workflow")) return "workflow";

  if (normalized === ("/config")) return "system";
  if (normalized === ("/logs")) return "system";
  if (normalized === ("/debug")) return "system";
  if (normalized === ("/cron")) return "system";
  if (normalized === ("/manual")) return "manual";
  if (normalized === ("/market")) return "market";

  return PATH_TO_TAB.get(normalized) ?? null;
}

export function inferBasePathFromPathname(pathname: string): string {
  let normalized = normalizePath(pathname);
  if (normalized.endsWith("/index.html")) {
    normalized = normalizePath(normalized.slice(0, -"/index.html".length));
  }
  if (normalized === "/") return "";
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return "";
  for (let i = 0; i < segments.length; i++) {
    const candidate = `/${segments.slice(i).join("/")}`.toLowerCase();
    if (PATH_TO_TAB.has(candidate)) {
      const prefix = segments.slice(0, i);
      return prefix.length ? `/${prefix.join("/")}` : "";
    }
  }
  return `/${segments.join("/")}`;
}

export function iconForTab(tab: Tab): IconName {
  switch (tab) {
    case "dashboard":
      return "barChart";
    case "connect":
      return "link";
    case "intelligence":
      return "zap";
    case "workflow":
      return "activity";
    case "security":
      return "shield";
    case "system":
      return "settings";
    case "chat":
      return "messageSquare";
    case "manual":
      return "book";
    case "market":
      return "globe";
    default:
      return "folder";
  }
}

export function titleForTab(tab: Tab, language: Language = 'en-US') {
  const texts = t(language);
  switch (tab) {
    case "dashboard":
      return texts.nav.dashboard;
    case "connect":
      return texts.nav.connect;
    case "intelligence":
      return texts.nav.intelligence;
    case "workflow":
      return texts.nav.workflow;
    case "security":
      return texts.nav.security ?? "Security";
    case "system":
      return texts.nav.system;
    case "chat":
      return texts.nav.chat;
    case "manual":
      return "User Manual";
    case "market":
      return "Skill Market";
    default:
      return "AeonSage";
  }
}

export function subtitleForTab(tab: Tab, language: Language = 'en-US') {
  const texts = t(language);
  switch (tab) {
    case "dashboard":
      return texts.pageSubtitles.overview;
    case "connect":
      return texts.pageSubtitles.channels;
    case "intelligence":
      return texts.pageSubtitles.skills;
    case "workflow":
      return texts.pageSubtitles.workflow;
    case "security":
      return texts.pageSubtitles.security ?? "Kill Switch, Gates, VDID";
    case "system":
      return texts.pageSubtitles.config;
    case "chat":
      return texts.pageSubtitles.chat;
    case "manual":
      return "Guide & Documentation";
    case "market":
      return "Global Intelligence Network";
    default:
      return "";
  }
}
