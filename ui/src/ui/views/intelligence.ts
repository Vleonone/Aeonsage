import { html } from "lit";
import { type SkillsCatalogProps, renderSkillsCatalog } from "./skills.catalog.js";
import { type SessionsProps, renderSessions } from "./sessions.js";
import { type NodesProps, renderNodes } from "./nodes.js";
import { renderMarketplace, type MarketplaceProps } from "./marketplace.js";
import { t, getCurrentLanguage } from "../i18n.js";

export type IntelligenceSubTab = "skills" | "sessions" | "nodes" | "market";

export type IntelligenceProps = {
  skills: SkillsCatalogProps;
  sessions: SessionsProps;
  nodes: NodesProps;
  market?: MarketplaceProps;
  subTab: IntelligenceSubTab;
  onSubTabChange: (tab: IntelligenceSubTab) => void;
};

export function renderIntelligence(props: IntelligenceProps) {
  const lang = getCurrentLanguage();
  const texts = t(lang);

  return html`
    <div class="intelligence-container dashboard-bg">
      
      <div class="sub-nav glass-floating">
        <button 
          class="sub-nav-item ${props.subTab === 'skills' ? 'active' : ''}"
          @click=${() => props.onSubTabChange('skills')}
        >
          ${texts.nav.skills}
        </button>
        <button 
          class="sub-nav-item ${props.subTab === 'sessions' ? 'active' : ''}"
          @click=${() => props.onSubTabChange('sessions')}
        >
          ${texts.nav.sessions}
        </button>
        <button
          class="sub-nav-item ${props.subTab === 'nodes' ? 'active' : ''}"
          @click=${() => props.onSubTabChange('nodes')}
        >
          ${texts.nav.nodes}
        </button>
        <button
          class="sub-nav-item ${props.subTab === 'market' ? 'active' : ''}"
          @click=${() => props.onSubTabChange('market')}
        >
          ${texts.marketplace?.title || 'Skill Market'}
        </button>
      </div>

      <div class="intelligence-content" style="margin-top: 20px;">
        ${props.subTab === 'skills' ? renderSkillsCatalog(props.skills) : ''}
        ${props.subTab === 'sessions' ? renderSessions(props.sessions) : ''}
        ${props.subTab === 'nodes' ? renderNodes(props.nodes) : ''}
        ${props.subTab === 'market' && props.market ? renderMarketplace(props.market) : ''}
      </div>
    </div>
  `;
}

