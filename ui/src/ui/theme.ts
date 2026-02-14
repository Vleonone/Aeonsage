export type ThemeMode = "system" | "light" | "dark" | "free" | "pro";
export type ResolvedTheme = "light" | "dark" | "free" | "pro";

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === "system") return getSystemTheme();
  return mode;
}

/** Whether the resolved theme uses a dark color scheme. */
export function isDarkTheme(resolved: ResolvedTheme): boolean {
  return resolved === "dark" || resolved === "pro";
}
