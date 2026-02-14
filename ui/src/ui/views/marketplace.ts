
import { html, nothing } from "lit";
import { icon, type IconName } from "../icons.js";
import type { SkillStatusEntry, SkillStatusReport } from "../types.js";
import { formatAgo } from "../format.js";
import type { MarketplaceSkill } from "../controllers/marketplace.js";
import { t, getCurrentLanguage } from "../i18n.js";

export type MarketplaceProps = {
  // Local skills (installed)
  skillsLoading: boolean;
  skillsReport: SkillStatusReport | null;
  // Remote marketplace skills
  marketplaceSkills: MarketplaceSkill[];
  marketplaceLoading: boolean;
  marketplaceError: string | null;
  marketplaceTotalCount: number;
  // Search and filter state
  searchQuery: string;
  selectedCategory: string;
  // Callbacks
  onInstall: (skillKey: string) => void;
  onRefreshLocal: () => void;
  onRefreshRemote: () => void;
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
};

// Mock data for initial render or fallback
const MOCK_SKILLS: SkillStatusEntry[] = [
  {
    skillKey: "browser-pro",
    name: "Web Browser Pro",
    description: "Advanced headless browsing with Javascript execution, anti-detection, and session persistence.",
    source: "official",
    version: "2.1.0",
    disabled: true, // "Install"
    requirements: { os: ["linux", "win32"] }
  } as any,
  {
    skillKey: "python-exec",
    name: "Python Executor",
    description: "Sandboxed Python environment for data analysis, math, and charting.",
    source: "official",
    version: "1.4.2",
    disabled: false, // "Installed"
  } as any,
  {
    skillKey: "crypto-ticker",
    name: "Crypto Ticker",
    description: "Real-time price feeds from 50+ exchanges via unified WebSocket API.",
    source: "community",
    version: "0.9.5",
    disabled: true,
  } as any
];

export function renderMarketplace(props: MarketplaceProps) {
  const texts = t(getCurrentLanguage());

  // Local installed skills (from gateway)
  const installedSkills = props.skillsReport?.skills || [];
  const installedKeys = new Set(installedSkills.map(s => s.skillKey));

  // Remote marketplace skills (from AeonSkills API)
  const remoteSkills = props.marketplaceSkills || [];

  // Combine: remote skills with install status
  const displaySkills: any[] = remoteSkills.length > 0
    ? remoteSkills.map(rs => ({
      skillKey: rs.name || rs.repoPath || "",
      name: rs.displayName || rs.name || "Unknown",
      description: rs.description || "",
      source: rs.category || "community",
      version: "",
      author: rs.author || "",
      url: rs.url,
      tags: rs.tags || [],
      disabled: !installedKeys.has(rs.name),
      isInstalled: installedKeys.has(rs.name),
      sourceTrust: rs.sources?.[0]?.trust || "community",
    }))
    : []; // No fallback - show empty state when API unavailable

  const isLoading = props.skillsLoading || props.marketplaceLoading;
  const error = props.marketplaceError;

  // Functional category definitions with i18n
  const FUNCTIONAL_CATEGORIES = [
    { id: "all", label: texts.marketplace.categories.all, icon: "grid" },
    { id: "coding", label: texts.marketplace.categories.coding, icon: "code", keywords: ["code", "dev", "git", "python", "javascript", "typescript", "ide", "github"] },
    { id: "ai", label: texts.marketplace.categories.ai, icon: "brain", keywords: ["ai", "llm", "gpt", "claude", "openai", "agent", "ml", "model"] },
    { id: "video", label: texts.marketplace.categories.video, icon: "video", keywords: ["video", "youtube", "tiktok", "stream", "record", "ffmpeg"] },
    { id: "marketing", label: texts.marketplace.categories.marketing, icon: "megaphone", keywords: ["marketing", "seo", "social", "ads", "analytics", "campaign"] },
    { id: "finance", label: texts.marketplace.categories.finance, icon: "dollar", keywords: ["crypto", "trading", "finance", "stock", "price", "wallet", "defi"] },
    { id: "media", label: texts.marketplace.categories.media, icon: "image", keywords: ["image", "audio", "photo", "music", "tts", "voice"] },
    { id: "productivity", label: texts.marketplace.categories.productivity, icon: "calendar", keywords: ["email", "calendar", "task", "notion", "slack", "discord"] },
    { id: "research", label: texts.marketplace.categories.research, icon: "search", keywords: ["search", "research", "browse", "scrape", "web"] },
  ];

  // Apply category filter
  const category = props.selectedCategory || "all";
  let mainList: any[] = displaySkills;

  if (category !== "all") {
    const catDef = FUNCTIONAL_CATEGORIES.find(c => c.id === category);
    if (catDef?.keywords) {
      mainList = displaySkills.filter(s => {
        const text = `${s.name} ${s.description} ${(s as any).tags?.join(" ") || ""}`.toLowerCase();
        return catDef.keywords.some((kw: string) => text.includes(kw));
      });
    }
  }


  return html`
    <style>
      .market-container {
        height: 100%;
        overflow-y: auto;
        background: var(--bg);
        color: var(--text);
        font-family: var(--font-body);
        padding: 0;
      }

      /* Hero Section - With Mascot Decoration */
      .market-hero {
        position: relative;
        padding: 48px 60px;
        background: linear-gradient(180deg, var(--bg-subtle) 0%, var(--bg) 100%);
        border-bottom: 1px solid var(--border);
        margin-bottom: 32px;
        overflow: hidden;
      }
      .market-hero::before {
        content: "";
        position: absolute;
        right: 60px;
        top: 50%;
        transform: translateY(-50%);
        width: 180px;
        height: 180px;
        background-image: url("/high-fidelity-squid.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        opacity: 0.15;
        z-index: 1;
      }
      .market-hero::after {
        content: "SAFE";
        position: absolute;
        right: 100px;
        top: 20px;
        padding: 6px 16px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1px;
        color: var(--ok, #22c55e);
        background: var(--ok-subtle);
        border: 1px solid var(--ok-muted);
        border-radius: 6px;
        z-index: 3;
      }
      .market-hero-content {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
      }
      .market-title {
        font-family: var(--font-display);
        font-size: 36px;
        font-weight: 700;
        margin: 0 0 16px 0;
        background: linear-gradient(135deg, var(--text) 0%, var(--muted-foreground) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: -0.02em;
      }
      .market-subtitle {
        font-size: 16px;
        color: var(--muted-foreground);
        max-width: 600px;
        line-height: 1.6;
        margin-bottom: 24px;
      }
      
      .market-stats {
        display: flex;
        gap: 24px;
      }
      .stat-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        background: var(--bg-hover);
        border: 1px solid var(--border);
        border-radius: 20px;
        font-size: 13px;
        color: var(--text);
      }
      .stat-badge svg {
        width: 14px;
        height: 14px;
        color: var(--accent);
      }

      /* Sections */
      .market-section {
        max-width: 1200px;
        margin: 0 auto 48px auto;
        padding: 0 60px;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }
      .section-title {
        font-size: 20px;
        font-weight: 600;
        color: var(--text);
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .section-title svg {
        color: var(--accent);
      }

      /* Grid */
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
      }

      /* Card - Glass/Premium Style */
      .skill-card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
      }
      .skill-card:hover {
        transform: translateY(-4px);
        border-color: var(--accent-subtle, var(--accent-glow));
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
      }
      
      /* Card Header */
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
      }
      .skill-icon-box {
        width: 48px;
        height: 48px;
        background: var(--bg-hover);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text);
        border: 1px solid var(--border-subtle);
      }
      .skill-icon-box svg {
        width: 24px;
        height: 24px;
        stroke-width: 1.5;
      }
      
      .skill-tag {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 4px 8px;
        border-radius: 6px;
        background: var(--bg-subtle);
        color: var(--muted-foreground);
        border: 1px solid var(--border-subtle);
      }
      .skill-tag.official {
        background: var(--accent-subtle);
        color: var(--accent);
        border-color: var(--accent-subtle);
      }

      /* Card Content */
      .skill-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
        color: var(--text);
      }
      .skill-desc {
        font-size: 14px;
        color: var(--muted-foreground);
        line-height: 1.5;
        margin-bottom: 24px;
        flex-grow: 1; /* Pushes footer down */
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      /* Card Footer */
      .skill-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 16px;
        border-top: 1px solid var(--border-subtle);
      }
      .skill-meta {
        font-size: 12px;
        color: var(--muted-foreground);
        display: flex;
        gap: 8px;
      }
      
      /* Buttons */
      .btn-install {
        background: var(--bg-hover);
        border: 1px solid var(--border);
        color: var(--text);
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }
      .btn-install:hover {
        background: var(--text);
        color: var(--bg);
        border-color: var(--text);
      }
      .btn-installed {
        background: transparent;
        color: var(--ok, #6366f1);
        border: 1px solid var(--accent-subtle);
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: default;
      }
      .btn-installed svg {
        width: 14px;
        height: 14px;
      }

      /* Search & Filter Bar */
      .market-toolbar {
        max-width: 1200px;
        margin: 0 auto 24px auto;
        padding: 0 60px;
        display: flex;
        gap: 16px;
        align-items: center;
        flex-wrap: wrap;
      }
      .search-box {
        flex: 1;
        min-width: 280px;
        position: relative;
      }
      .search-box input {
        width: 100%;
        padding: 12px 16px 12px 44px;
        background: var(--bg-hover);
        border: 1px solid var(--border);
        border-radius: 10px;
        font-size: 14px;
        color: var(--text);
        outline: none;
        transition: border-color 0.2s;
      }
      .search-box input:focus {
        border-color: var(--accent);
      }
      .search-box input::placeholder {
        color: var(--muted-foreground);
      }
      .search-box svg {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        color: var(--muted-foreground);
      }
      
      /* Category Tabs */
      .category-tabs {
        display: flex;
        gap: 8px;
      }
      .category-tab {
        padding: 8px 16px;
        background: var(--bg-hover);
        border: 1px solid var(--border);
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        color: var(--muted-foreground);
        cursor: pointer;
        transition: all 0.2s;
      }
      .category-tab:hover {
        border-color: var(--text);
        color: var(--text);
      }
      .category-tab.active {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--bg);
      }

      /* Loading & Error States */
      .market-loading, .market-error, .market-empty {
        text-align: center;
        padding: 48px;
        color: var(--muted-foreground);
      }
      .market-error {
        color: var(--error, #ff6b6b);
      }
      .market-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        opacity: 0.7;
      }
      .market-empty svg {
        width: 48px;
        height: 48px;
        opacity: 0.5;
      }

    </style>

    <div class="market-container">
      
      <!-- Hero -->
      <div class="market-hero">
        <div class="market-hero-content">
          <h1 class="market-title">${texts.marketplace.title}</h1>
          <p class="market-subtitle">
            ${texts.marketplace.subtitle}
          </p>
          <div class="market-stats">
             <div class="stat-badge">${icon("box")} <span>${props.marketplaceLoading ? "..." : (props.marketplaceTotalCount || displaySkills.length || 0)} ${texts.marketplace.skillCount}</span></div>
             <div class="stat-badge">${icon("package")} <span>${props.skillsReport?.skills?.length || 0} ${texts.marketplace.installed}</span></div>
             <div class="stat-badge">${icon("zap")} <span>${props.marketplaceError ? texts.marketplace.offline : texts.marketplace.online}</span></div>
          </div>
        </div>
      </div>

      <!-- Search & Filter Toolbar -->
      <div class="market-toolbar">
        <div class="search-box">
          ${icon("search")}
          <input 
            type="text" 
            placeholder="Search skills by name, tag, or description..." 
            .value=${props.searchQuery || ""}
            @input=${(e: InputEvent) => props.onSearch((e.target as HTMLInputElement).value)}
          />
        </div>
        <div class="category-tabs">
          ${FUNCTIONAL_CATEGORIES.map(cat => html`
            <button 
              class="category-tab ${props.selectedCategory === cat.id ? 'active' : ''}"
              @click=${() => props.onCategoryChange(cat.id)}
            >
              ${cat.label}
            </button>
          `)}
        </div>
      </div>

      <!-- Skills Grid -->
      <div class="market-section">
        <div class="section-header">
          <div class="section-title">${icon("star")} ${props.selectedCategory === "all" ? "Featured Skills" : props.selectedCategory.charAt(0).toUpperCase() + props.selectedCategory.slice(1) + " Skills"}</div>
        </div>
        
        ${isLoading ? html`<div class="market-loading">${texts.common.loading}</div>` : ""}
        ${error ? html`<div class="market-error">${error}</div>` : ""}
        
        ${!isLoading && !error && mainList.length === 0 ? html`
          <div class="market-empty">
            ${icon("package")}
            <span>${texts.emptyStates.noSkills}</span>
          </div>
        ` : html`
          <div class="skills-grid">
             ${mainList.map(skill => renderSkillCard(skill, props))}
          </div>
        `}
      </div>

    </div>
  `;
}

function renderSkillCard(skill: any, props: MarketplaceProps) {
  // Determine if installed (logic: disabled = true means NOT installed/active in this context based on previous code)
  // Wait, previous code: skill.disabled ? Install : Installed.
  // This implies disabled=true -> Show Install. So 'disabled' meant 'not enabled/installed'.
  // Let's stick to that logic, or simplify. 
  // Update: If we assume standard meaning, disabled means "installed but disabled". NOT installed usually means record doesn't exist in local config.
  // But if `skillsReport` returns ALL market skills, it needs a flag for 'installed'.
  // I will check `skill.disabled` again.
  // Hypothetically, if property is `disabled`, it means it IS installed.
  // If `skillsReport` only lists INSTALLED skills, then Marketplace should perform a search query to a remote server.
  // But `app-render.ts` passed `skillsReport` which implies LOCAL status.
  // If Marketplace is browsing REMOTE skills, `skillsReport` is not the right source unless it contains catalog.
  // Given `features/marketplace` usually fetches from remote, let's assume `skills` list here is the CATALOG.
  // And `disabled` might be a misnomer or I'm misinterpreting `app-render` logic.
  // Let's assume: If `skill` is in the list, we show it.
  // I'll stick to the visual behavior of previous code: disabled -> Install button. !disabled -> Installed.

  const isInstalled = !skill.disabled;
  const isOfficial = skill.source === 'official' || skill.source === 'core';

  // Choose icon based on functionality or name (simple heuristics for better visuals)
  let skillIcon = "box";
  const nameLower = skill.name.toLowerCase();

  if (nameLower.includes("browser")) skillIcon = "globe";
  else if (nameLower.includes("python") || nameLower.includes("code")) skillIcon = "terminal";
  else if (nameLower.includes("crypto") || nameLower.includes("finance")) skillIcon = "bar-chart";
  else if (nameLower.includes("telegram") || nameLower.includes("chat")) skillIcon = "messageSquare";

  return html`
    <div class="skill-card">
      <div class="card-header">
        <div class="skill-icon-box">
          ${icon(skillIcon as IconName)}
        </div>
        <div class="skill-tag ${isOfficial ? 'official' : ''}">
          ${skill.source || 'Community'}
        </div>
      </div>
      
      <div class="skill-title">${skill.name}</div>
      <div class="skill-desc">${skill.description}</div>
      
      <div class="skill-footer">
        <div class="skill-meta">
           <span>v${skill.version || '1.0.0'}</span>
           ${skill.requirements?.os ? html`• <span>${skill.requirements.os[0]}</span>` : nothing}
        </div>
        
        ${!isInstalled
      ? html`<button class="btn-install" @click=${() => props.onInstall(skill.skillKey)}>Install</button>`
      : html`<div class="btn-installed">${icon("check")} Installed</div>`
    }
      </div>
    </div>
  `;
}
