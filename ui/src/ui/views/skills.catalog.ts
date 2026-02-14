import { html, nothing } from "lit";

import { clampText } from "../format";
import type { SkillStatusEntry, SkillStatusReport } from "../types";
import type { SkillMessageMap } from "../controllers/skills";
import { PERSONAS, SKILL_CATEGORIES, ICONS, categorizeSkill, type Persona, type SkillCategory } from "./skills.personas";
import { t, getCurrentLanguage } from "../i18n";

export type SkillsCatalogProps = {
  loading: boolean;
  report: SkillStatusReport | null;
  error: string | null;
  filter: string;
  selectedCategory: string | null;
  selectedPersona: string | null;
  activePersona: Persona | null;  // Currently applied persona
  edits: Record<string, string>;
  busyKey: string | null;
  messages: SkillMessageMap;
  viewMode: 'grid' | 'list';
  onFilterChange: (next: string) => void;
  onCategorySelect: (categoryId: string | null) => void;
  onPersonaSelect: (personaId: string | null) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onRefresh: () => void;
  onToggle: (skillKey: string, enabled: boolean) => void;
  onEdit: (skillKey: string, value: string) => void;
  onSaveKey: (skillKey: string) => void;
  onInstall: (skillKey: string, name: string, installId: string) => void;
  onApplyPersona: (persona: Persona) => void;
  onClearPersona: () => void;  // Clear active persona
};

/** Categorized skills structure */
interface CategorizedSkills {
  category: SkillCategory;
  skills: SkillStatusEntry[];
}

/** Group skills by category */
function groupByCategory(skills: SkillStatusEntry[]): CategorizedSkills[] {
  const groups: Map<string, SkillStatusEntry[]> = new Map();

  for (const skill of skills) {
    const categoryId = categorizeSkill({ name: skill.name, description: skill.description });
    if (!groups.has(categoryId)) {
      groups.set(categoryId, []);
    }
    groups.get(categoryId)!.push(skill);
  }

  return SKILL_CATEGORIES
    .map(cat => ({ category: cat, skills: groups.get(cat.id) || [] }))
    .filter(group => group.skills.length > 0);
}

/** Render the skills catalog with categories and personas */
export function renderSkillsCatalog(props: SkillsCatalogProps) {
  const skills = props.report?.skills ?? [];
  const filter = props.filter.trim().toLowerCase();

  let filtered = skills;

  if (filter) {
    filtered = filtered.filter((skill) =>
      [skill.name, skill.description, skill.source]
        .join(" ")
        .toLowerCase()
        .includes(filter),
    );
  }

  if (props.selectedCategory) {
    filtered = filtered.filter((skill) =>
      categorizeSkill({ name: skill.name, description: skill.description }) === props.selectedCategory
    );
  }

  const categorizedSkills = groupByCategory(filtered);

  const categoryCounts: Record<string, number> = {};
  for (const skill of skills) {
    const catId = categorizeSkill({ name: skill.name, description: skill.description });
    categoryCounts[catId] = (categoryCounts[catId] || 0) + 1;
  }

  return html`
    <style>
      .catalog-container {
        display: flex;
        gap: 20px;
      }
      .catalog-sidebar {
        width: 220px;
        flex-shrink: 0;
      }
      .catalog-main {
        flex: 1;
        min-width: 0;
      }
      .persona-card {
        padding: 12px;
        border-radius: 10px;
        background: transparent;
        border: 1px solid var(--accent-subtle);
        cursor: pointer;
        transition: all 0.2s ease;
        margin-bottom: 8px;
      }
      .persona-card:hover {
        border-color: var(--accent-glow);
      }
      .persona-card.selected {
        background: transparent;
        border-color: var(--accent, #6366f1);
        box-shadow: 0 0 12px var(--accent-subtle);
      }
      .persona-header {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
      }
      .persona-icon {
        width: 20px;
        height: 20px;
        opacity: 0.8;
        color: var(--accent, #6366f1);
      }
      .persona-icon svg {
        width: 100%;
        height: 100%;
      }
      .persona-desc {
        font-size: 0.8rem;
        opacity: 0.6;
        margin-top: 6px;
        line-height: 1.4;
      }
      .persona-traits {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: 8px;
      }
      .trait-chip {
        font-size: 0.65rem;
        padding: 2px 6px;
        border-radius: 4px;
        background: transparent;
        border: 1px solid var(--accent-subtle);
        color: var(--accent, #6366f1);
      }
      .category-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }
      .category-tab {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 8px;
        background: transparent;
        border: 1px solid var(--accent-subtle);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.85rem;
        color: inherit;
      }
      .category-tab:hover {
        border-color: var(--accent-glow);
        color: var(--accent, #6366f1);
      }
      .category-tab.active {
        background: transparent;
        border-color: var(--accent, #6366f1);
        color: var(--accent, #6366f1);
        box-shadow: 0 0 8px var(--accent-subtle);
      }
      .category-tab.special-hub {
         border-color: var(--accent, #6366f1);
         color: var(--accent, #6366f1);
         background: var(--accent-subtle);
      }
      .category-tab.special-hub:hover {
         background: var(--accent-glow);
         box-shadow: 0 0 10px var(--accent-glow);
      }

      .category-tab svg {
        width: 14px;
        height: 14px;
      }
      .category-count {
        font-size: 0.7rem;
        opacity: 0.6;
        background: rgba(0,0,0,0.2);
        padding: 2px 5px;
        border-radius: 6px;
      }
      .skill-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 12px;
      }
      .skill-card {
        padding: 14px;
        border-radius: 10px;
        background: var(--card-bg, rgba(255,255,255,0.05));
        border: 1px solid var(--border-color, rgba(255,255,255,0.1));
        transition: all 0.2s ease;
      }
      .skill-card:hover {
        border-color: var(--accent);
        transform: translateY(-1px);
      }
      .skill-card.disabled {
        opacity: 0.5;
      }
      .skill-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .skill-name {
        font-weight: 600;
        font-size: 0.95rem;
      }
      .skill-status {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--ok);
        flex-shrink: 0;
      }
      .skill-status.blocked {
        background: var(--warn);
      }
      .skill-status.disabled {
        background: var(--muted);
      }
      .skill-desc {
        font-size: 0.8rem;
        opacity: 0.6;
        margin-top: 6px;
        line-height: 1.4;
      }
      .skill-actions {
        display: flex;
        gap: 6px;
        margin-top: 10px;
      }
      .skill-actions .btn {
        font-size: 0.75rem;
        padding: 4px 10px;
      }
      .category-section {
        margin-bottom: 28px;
      }
      .category-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.1));
      }
      .category-icon {
        width: 22px;
        height: 22px;
        opacity: 0.7;
      }
      .category-icon svg {
        width: 100%;
        height: 100%;
      }
      .category-name {
        font-size: 1.1rem;
        font-weight: 600;
      }
      .category-desc {
        font-size: 0.8rem;
        opacity: 0.5;
        margin-left: auto;
      }
      .view-toggle {
        display: flex;
        gap: 2px;
        background: transparent;
        border: 1px solid var(--accent-subtle);
        padding: 3px;
        border-radius: 6px;
      }
      .view-btn {
        padding: 5px 10px;
        border-radius: 4px;
        border: none;
        background: transparent;
        cursor: pointer;
        opacity: 0.5;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        color: inherit;
      }
      .view-btn svg {
        width: 14px;
        height: 14px;
      }
      .view-btn:hover {
        opacity: 0.7;
        color: var(--accent, #6366f1);
      }
      .view-btn.active {
        background: transparent;
        border: 1px solid var(--accent, #6366f1);
        opacity: 1;
        color: var(--accent, #6366f1);
      }
      .section-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        opacity: 0.5;
        margin-bottom: 12px;
      }
      .section-title svg {
        width: 14px;
        height: 14px;
      }
    </style>
    
    <section class="card">
      <div class="row" style="justify-content: space-between; margin-bottom: 16px;">
        <div>
          <div class="card-title">Skill Catalog</div>
          <div class="card-sub">Browse by category or select a persona preset</div>
        </div>
        <div class="row" style="gap: 10px;">
          <div class="view-toggle">
            <button 
              class="view-btn ${props.viewMode === 'grid' ? 'active' : ''}"
              @click=${() => props.onViewModeChange('grid')}
              title="Grid view"
            >${ICONS.grid}</button>
            <button 
              class="view-btn ${props.viewMode === 'list' ? 'active' : ''}"
              @click=${() => props.onViewModeChange('list')}
              title="List view"
            >${ICONS.list}</button>
          </div>
          <button class="btn" ?disabled=${props.loading} @click=${props.onRefresh}>
            ${props.loading ? "Loading…" : html`<span class="row" style="gap:6px;">${ICONS.refresh} Refresh</span>`}
          </button>
        </div>
      </div>

      <div class="catalog-container">
        <!-- Sidebar: Personas -->
        <div class="catalog-sidebar">
          <div class="section-title">${ICONS.user} Personas</div>
          ${PERSONAS.map(persona => renderPersonaCard(persona, props))}
        </div>
        
        <!-- Main: Skills -->
        <div class="catalog-main">
          <!-- Search -->
          <div class="filters" style="margin-bottom: 14px;">
            <label class="field" style="flex: 1;">
              <span>Search</span>
              <input
                .value=${props.filter}
                @input=${(e: Event) =>
      props.onFilterChange((e.target as HTMLInputElement).value)}
                placeholder="Search skills by name or description..."
              />
            </label>
          </div>
          
          <!-- Category Tabs -->
          <div class="category-tabs">
            <div
              class="category-tab ${!props.selectedCategory ? 'active' : ''}"
              @click=${() => props.onCategorySelect(null)}
            >
              <span>All</span>
              <span class="category-count">${skills.length}</span>
            </div>
             <!-- SKILL HUB PROMOTIONAL TAB -->
            <div 
              class="category-tab special-hub" 
              title="Browse 1700+ Community Skills"
              @click=${() => window.open('https://hub.aeonsage.org', '_blank')}
              style="cursor: pointer;"
            >
              ${ICONS.globe}
              <span>Skill Hub</span>
              <span class="category-count" style="background: var(--accent); color: white;">1700+</span>
            </div>

            ${SKILL_CATEGORIES.filter(cat => categoryCounts[cat.id]).map(cat => html`
              <div
                class="category-tab ${props.selectedCategory === cat.id ? 'active' : ''}"
                @click=${() => props.onCategorySelect(cat.id)}
              >
                ${cat.icon}
                <span>${cat.name}</span>
                <span class="category-count">${categoryCounts[cat.id] || 0}</span>
              </div>
            `)}
          </div>

          ${props.error
      ? html`<div class="callout danger">${props.error}</div>`
      : nothing}

          ${filtered.length === 0
      ? html`<div class="muted" style="text-align: center; padding: 40px;">No skills found matching your criteria.</div>`
      : props.selectedCategory
        ? html`
                  <div class="skill-grid">
                    ${filtered.map(skill => renderSkillCard(skill, props))}
                  </div>
                `
        : categorizedSkills.map(group => html`
                  <div class="category-section">
                    <div class="category-header">
                      <span class="category-icon">${group.category.icon}</span>
                      <span class="category-name">${group.category.name}</span>
                      <span class="category-desc">${group.skills.length} skills</span>
                    </div>
                    <div class="skill-grid">
                      ${group.skills.map(skill => renderSkillCard(skill, props))}
                    </div>
                  </div>
                `)
    }
        </div>
      </div>
    </section>
  `;
}

/** Render a persona card */
function renderPersonaCard(persona: Persona, props: SkillsCatalogProps) {
  const isSelected = props.selectedPersona === persona.id;
  const isActive = props.activePersona?.id === persona.id;
  const skillCount = persona.skills?.length || 0;

  return html`
    <div 
      class="persona-card ${isSelected ? 'selected' : ''} ${isActive ? 'active' : ''}"
      @click=${() => props.onPersonaSelect(isSelected ? null : persona.id)}
    >
      <div class="persona-header">
        <span class="persona-icon">${persona.icon}</span>
        <span>${persona.name}</span>
        ${isActive ? html`<span style="margin-left: auto; font-size: 0.65rem; padding: 2px 6px; background: var(--accent, #6366f1); color: #000; border-radius: 4px;">ACTIVE</span>` : nothing}
      </div>
      <div class="persona-desc">${persona.description}</div>
      <div class="persona-traits">
        ${persona.traits.map(trait => html`
          <span class="trait-chip">${trait}</span>
        `)}
      </div>
      
      <!-- Always show skill count and Apply/Clear button for better UX -->
      <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--accent-subtle);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 0.75rem; opacity: 0.6;">${skillCount} skills included</span>
          ${isSelected ? html`<span style="font-size: 0.7rem; color: var(--accent, #6366f1);">✓ Selected</span>` : nothing}
        </div>
        ${isActive ? html`
          <!-- Clear Active Persona Button -->
          <button 
            class="btn" 
            style="width: 100%; font-size: 0.8rem; padding: 8px; display: flex; align-items: center; justify-content: center; gap: 6px;
                   background: transparent; border: 1px solid var(--danger, #ff6b6b); color: var(--danger, #ff6b6b);"
            @click=${(e: Event) => {
        e.stopPropagation();
        props.onClearPersona();
      }}
          >
            ${ICONS.x}
            Clear Active Persona
          </button>
        ` : html`
          <!-- Apply Persona Button -->
          <button 
            class="btn ${isSelected ? 'primary' : ''}" 
            style="width: 100%; font-size: 0.8rem; padding: 8px; display: flex; align-items: center; justify-content: center; gap: 6px;
                   ${isSelected ? 'background: var(--accent, #6366f1); color: #000; border-color: var(--accent, #6366f1);' : ''}"
            @click=${(e: Event) => {
        e.stopPropagation();
        if (!isSelected) {
          props.onPersonaSelect(persona.id);
        }
        props.onApplyPersona(persona);
      }}
          >
            ${ICONS.check}
            ${isSelected ? 'Apply & Configure Bot' : 'Select & Apply'}
          </button>
        `}
      </div>
    </div>
  `;
}

/** Render a skill card */
function renderSkillCard(skill: SkillStatusEntry, props: SkillsCatalogProps) {
  const busy = props.busyKey === skill.skillKey;
  const message = props.messages[skill.skillKey] ?? null;
  const statusClass = skill.disabled ? 'disabled' : !skill.eligible ? 'blocked' : '';

  // Detect OS restrictions
  const isWindows = skill.requirements?.os?.includes('windows');
  const isMac = skill.requirements?.os?.includes('macos');
  const isLinux = skill.requirements?.os?.includes('linux');
  const osRestricted = isWindows || isMac || isLinux;

  return html`
    <div class="skill-card ${skill.disabled ? 'disabled' : ''}">
      <div class="skill-header">
        <div class="skill-name">${skill.name}</div>
        <div class="skill-status ${statusClass}" title="${skill.eligible ? 'Active' : skill.disabled ? 'Disabled' : 'Blocked'}"></div>
      </div>
      <div class="skill-desc">${clampText(skill.description, 80)}</div>
      
      <div class="row" style="justify-content: space-between; align-items: center; margin-top: 6px;">
        <div class="chip-row">
          <span class="chip">${skill.source}</span>
        </div>
        
        <!-- OS Compatibility Icons -->
        ${osRestricted ? html`
          <div class="os-icons" style="display: flex; gap: 4px; opacity: 0.7;" title="System Requirements">
            ${isWindows ? html`<span title="Windows Only">🪟</span>` : nothing}
            ${isMac ? html`<span title="macOS Only">🍎</span>` : nothing}
            ${isLinux ? html`<span title="Linux Only">🐧</span>` : nothing}
          </div>
        ` : nothing}
      </div>

      <div class="skill-actions">
        <button
          class="btn"
          ?disabled=${busy}
          @click=${() => props.onToggle(skill.skillKey, skill.disabled)}
        >
          ${skill.disabled ? "Enable" : "Disable"}
        </button>
        ${skill.install.length > 0 && skill.missing.bins.length > 0 ? html`
          <button
            class="btn"
            ?disabled=${busy}
            @click=${() => props.onInstall(skill.skillKey, skill.name, skill.install[0].id)}
          >
            ${busy ? "..." : skill.install[0].label}
          </button>
        ` : nothing}
      </div>
      ${message
      ? html`<div class="muted" style="margin-top: 6px; font-size: 0.75rem; color: ${message.kind === "error" ? "var(--danger)" : "var(--ok)"
        };">${message.message}</div>`
      : nothing}
    </div>
  `;
}
