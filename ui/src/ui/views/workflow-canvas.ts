/**
 * Workflow Canvas View
 * SVG-based visualization of multi-agent workflow tree.
 */

import { html, nothing } from "lit";
import type { WorkflowTree, WorkflowNode, WorkflowState } from "../controllers/workflow";
import { calculateCanvasLayout } from "../controllers/workflow";
import { t, getCurrentLanguage, type Language } from "../i18n";

/** Canvas view props */
export interface WorkflowCanvasProps {
  state: WorkflowState;
  onRefresh: () => void;
  onSelectNode: (nodeId: string | null) => void;
  onStopNode: (runId: string) => void;
}

/** Status colors */
const STATUS_COLORS: Record<string, string> = {
  running: "#22c55e",
  completed: "#3b82f6",
  error: "#ef4444",
  pending: "#f59e0b",
  idle: "#6b7280",
};

/** Track UI session start time for uptime display (not Gateway start time) */
const uiSessionStartTime = Date.now();

/** Pixel-art animated icon CSS (lightweight) */
const PIXEL_ICON_CSS = `
  @keyframes pixel-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @keyframes pixel-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }
  @keyframes pixel-scan {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
  }
  .pix-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    image-rendering: pixelated;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
  }
  .pix-icon.running { animation: pixel-blink 1s infinite; }
  .pix-icon.browsing { animation: pixel-bounce 0.6s infinite; color: #3b82f6; }
  .pix-icon.searching { animation: pixel-blink 0.8s infinite; color: #f59e0b; }
  .pix-icon.coding { color: #22c55e; }
  .pix-icon.thinking { animation: pixel-blink 1.5s infinite; color: #a855f7; }
  .pix-icon.waiting { opacity: 0.5; color: #6b7280; }
  
  /* Professional Dot Grid Canvas Background — uses CSS tokens */
  .canvas-dot-grid {
    background-color: var(--bg-accent, #0d0d0f);
    background-image: radial-gradient(circle, var(--accent-subtle, rgba(99,102,241,0.15)) 1px, transparent 1px);
    background-size: 20px 20px;
    background-position: 10px 10px;
  }
  .canvas-dot-grid-dense {
    background-color: var(--bg-accent, #0d0d0f);
    background-image:
      radial-gradient(circle, var(--accent-subtle, rgba(99,102,241,0.12)) 1px, transparent 1px),
      radial-gradient(circle, var(--accent-subtle, rgba(99,102,241,0.06)) 1px, transparent 1px);
    background-size: 20px 20px, 100px 100px;
    background-position: 0 0, 0 0;
  }
  .canvas-area {
    background-color: var(--bg-accent, #0a0a0c);
    background-image:
      radial-gradient(circle at center, var(--accent-subtle, rgba(99,102,241,0.08)) 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    position: relative;
  }
  .canvas-area::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, var(--accent-subtle, rgba(99,102,241,0.02)) 100%);
    pointer-events: none;
  }
`;

/** Action to pixel icon mapping */
const ACTION_ICONS: Record<string, string> = {
  browsing: "🌐",
  searching: "🔍",
  coding: "💻",
  thinking: "🧠",
  writing: "✍️",
  reading: "📖",
  downloading: "📥",
  uploading: "📤",
  waiting: "⏳",
  completed: "✅",
  error: "❌",
  running: "⚡",
};

/** Token Stats Sidebar */
type TokenStats = {
  totalTokens: number;
  inputTokens: number | null;  // null = API doesn't provide breakdown
  outputTokens: number | null; // null = API doesn't provide breakdown
  sessions: number;
  completedTasks: number;
  runtime: string;
};

function renderTokenStatsSidebar(stats: TokenStats, activeNodes: any[], lang: Language) {
  const texts = t(lang);
  const isActive = activeNodes.length > 0;
  const dotColor = isActive ? 'var(--ok, #22c55e)' : 'var(--text-muted, #6b7280)';
  const dateLocale = lang === 'zh-CN' ? 'zh-CN' : 'en-US';
  return html`
    <div style="
      border-left: 1px solid var(--border-subtle);
      background: var(--bg-sidebar);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      display: flex;
      flex-direction: column;
      min-height: 450px;
    ">
      <!-- Section Header -->
      <div style="
        padding: 16px;
        font-size: 13px;
        font-weight: 600;
        color: var(--text-muted);
        letter-spacing: 0.02em;
      ">
        ${texts.workflowCanvas.statsOverview}
      </div>

      <!-- Stats Cards -->
      <div style="padding: 0 12px 16px; display: flex; flex-direction: column; gap: 10px;">

        <!-- Token Card - Large -->
        <div style="
          background: var(--accent-subtle);
          border-radius: 16px;
          padding: 16px;
          border: 1px solid var(--accent-subtle);
        ">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px; font-weight: 500;">${texts.workflowCanvas.tokenUsage}</div>
              <div style="font-size: 28px; font-weight: 700; color: var(--accent-purple, #a855f7); letter-spacing: -0.02em;">${formatNumber(stats.totalTokens)}</div>
            </div>
            <div style="
              width: 44px; height: 44px;
              background: var(--accent-subtle);
              border-radius: 12px;
              display: flex; align-items: center; justify-content: center;
              font-size: 20px;
            ">📊</div>
          </div>
          <div style="display: flex; gap: 16px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
            <div style="flex: 1;">
              <div style="font-size: 10px; color: var(--text-muted);">${texts.workflowCanvas.input}</div>
              <div style="font-size: 14px; font-weight: 600; color: var(--accent-blue, #3b82f6);">${stats.inputTokens !== null ? formatNumber(stats.inputTokens) : 'N/A'}</div>
            </div>
            <div style="flex: 1;">
              <div style="font-size: 10px; color: var(--text-muted);">${texts.workflowCanvas.output}</div>
              <div style="font-size: 14px; font-weight: 600; color: var(--accent-teal, #10b981);">${stats.outputTokens !== null ? formatNumber(stats.outputTokens) : 'N/A'}</div>
            </div>
          </div>
        </div>

        <!-- Stats Row -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <!-- Sessions -->
          <div style="
            background: var(--ok-subtle, rgba(34,197,94,0.1));
            border-radius: 14px;
            padding: 14px;
            border: 1px solid var(--ok-subtle, rgba(34,197,94,0.15));
          ">
            <div style="font-size: 10px; color: var(--text-muted); font-weight: 500;">${texts.workflowCanvas.sessions}</div>
            <div style="font-size: 22px; font-weight: 700; color: var(--ok, #22c55e); margin-top: 4px;">${stats.sessions}</div>
          </div>

          <!-- Completed -->
          <div style="
            background: var(--accent-2-subtle, rgba(99,102,241,0.1));
            border-radius: 14px;
            padding: 14px;
            border: 1px solid var(--accent-2-subtle, rgba(99,102,241,0.15));
          ">
            <div style="font-size: 10px; color: var(--text-muted); font-weight: 500;">${texts.workflowCanvas.completed}</div>
            <div style="font-size: 22px; font-weight: 700; color: var(--accent-blue, #3b82f6); margin-top: 4px;">${stats.completedTasks}</div>
          </div>
        </div>

        <!-- Runtime -->
        <div style="
          background: var(--warn-subtle, rgba(245,158,11,0.1));
          border-radius: 14px;
          padding: 14px;
          border: 1px solid var(--warn-subtle, rgba(245,158,11,0.15));
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <div>
            <div style="font-size: 10px; color: var(--text-muted); font-weight: 500;">${texts.workflowCanvas.runtime}</div>
            <div style="font-size: 18px; font-weight: 700; color: var(--warn, #f59e0b); margin-top: 2px;">${stats.runtime}</div>
          </div>
          <div style="font-size: 20px;">⏱️</div>
        </div>

        <!-- Bot Diary Mini Calendar -->
        <div style="
          background: var(--card-transparent, rgba(255,255,255,0.04));
          border-radius: 14px;
          padding: 14px;
          border: 1px solid var(--border-subtle);
          margin-top: 10px;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 500;">📅 ${texts.workflowCanvas.botDiary}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${new Date().toLocaleDateString(dateLocale, { month: 'short', day: 'numeric' })}</div>
          </div>

          <!-- Week Mini View -->
          <div style="display: flex; gap: 4px; margin-bottom: 12px;">
            ${texts.workflowCanvas.weekDays.map((d: string, i: number) => {
    const today = new Date().getDay();
    const isToday = i === today;
    return html`
                <div style="
                  flex: 1;
                  text-align: center;
                  padding: 6px 0;
                  border-radius: 8px;
                  font-size: 10px;
                  font-weight: ${isToday ? '600' : '400'};
                  color: ${isToday ? 'var(--primary-foreground, #000)' : 'var(--text-muted)'};
                  background: ${isToday ? 'var(--accent)' : 'transparent'};
                ">${d}</div>
              `;
  })}
          </div>

          <!-- Emotion Status -->
          <div style="
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            background: var(--card-transparent, rgba(255,255,255,0.03));
            border-radius: 10px;
          ">
            <div style="font-size: 24px;">😊</div>
            <div style="flex: 1;">
              <div style="font-size: 12px; font-weight: 500; color: var(--text);">${texts.workflowCanvas.statusGood}</div>
              <div style="font-size: 10px; color: var(--text-muted);">${texts.workflowCanvas.activeToday}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Activity Section -->
      <div style="flex: 1; display: flex; flex-direction: column; border-top: 1px solid var(--border-subtle);">
        <div style="
          padding: 14px 16px 10px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
        ">
          <span style="color: ${dotColor};">●</span> ${texts.workflowCanvas.liveActivity}
        </div>

        <div style="flex: 1; overflow-y: auto; padding: 0 12px 12px;">
          ${activeNodes.length === 0 ? html`
            <div style="
              text-align: center;
              padding: 32px 16px;
              color: var(--text-muted);
              font-size: 13px;
            ">
              <div style="font-size: 32px; margin-bottom: 8px; opacity: 0.5;">💤</div>
              ${texts.workflowCanvas.noActiveAgents}
            </div>
          ` : html`
            ${activeNodes.map((node: any) => html`
              <div style="
                background: var(--card-transparent);
                border-radius: 12px;
                padding: 12px;
                margin-bottom: 8px;
              ">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                  <div style="
                    width: 8px; height: 8px;
                    background: var(--ok, #22c55e);
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                  "></div>
                  <span style="font-size: 13px; font-weight: 600; color: var(--text);">${node.label || 'Agent'}</span>
                </div>
                <div style="font-size: 11px; color: var(--text-muted); padding-left: 16px;">
                  ${node.currentAction || node.status}
                </div>
              </div>
            `)}
          `}
        </div>
      </div>
    </div>
  `;
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

/** Render the workflow canvas */
export function renderWorkflowCanvas(props: WorkflowCanvasProps) {
  const { state, onRefresh, onSelectNode, onStopNode } = props;
  const lang = getCurrentLanguage();
  const texts = t(lang);

  if (state.loading) {
    return html`
      <div class="workflow-canvas-loading" style="display: flex; align-items: center; justify-content: center; height: 400px; color: var(--text-secondary);">
        <span>Loading workflow...</span>
      </div>
    `;
  }

  if (state.error) {
    return html`
      <div class="workflow-canvas-error" style="display: flex; align-items: center; justify-content: center; height: 400px; color: var(--color-error);">
        <span>${state.error}</span>
        <button @click=${onRefresh} style="margin-left: 12px; padding: 6px 12px; background: var(--bg-tertiary); border: none; border-radius: 6px; color: var(--text-primary); cursor: pointer;">
          Retry
        </button>
      </div>
    `;
  }

  const tree = state.tree;
  const budget = state.budget;

  // Calculate UI session runtime (not Gateway uptime - we don't have that data)
  const uptimeMs = Date.now() - uiSessionStartTime;
  const uptimeMins = Math.floor(uptimeMs / 60000);
  const uptimeHrs = Math.floor(uptimeMins / 60);
  const runtimeStr = uptimeHrs > 0
    ? `${uptimeHrs}h ${uptimeMins % 60}m`
    : `${uptimeMins}m`;

  // Token/Usage statistics from budget (real data from Gateway API)
  // NOTE: inputTokens/outputTokens are null because API only provides total
  const stats: TokenStats = {
    totalTokens: budget?.currentTokenUsage ?? 0,
    inputTokens: null,  // API doesn't provide input/output breakdown
    outputTokens: null, // API doesn't provide input/output breakdown
    sessions: budget?.spawnCount ?? 0,
    completedTasks: Math.max(0, (budget?.spawnCount ?? 0) - (budget?.runningCount ?? 0)),
    runtime: runtimeStr,
  };

  // Empty state - still show full layout with canvas area
  if (!tree) {
    return html`
      <style>${PIXEL_ICON_CSS}</style>
      <div class="workflow-canvas" style="position: relative; background: var(--bg-secondary); border-radius: 12px; overflow: hidden; display: grid; grid-template-columns: 1fr 280px; min-height: 450px;">
        
        <!-- Main Canvas Area -->
        <div style="display: flex; flex-direction: column;">
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid var(--border-color);">
            <h3 style="margin: 0; font-size: 14px; font-weight: 500; color: var(--text-primary);">
              ${texts.workflowCanvas.title}
              <span style="margin-left: 8px; font-size: 12px; color: var(--text-secondary);">
                0 ${texts.workflowCanvas.nodes}
              </span>
            </h3>
            <button @click=${onRefresh} style="padding: 6px 12px; background: var(--bg-tertiary); border: none; border-radius: 6px; color: var(--text-primary); cursor: pointer; font-size: 12px;">
              ↻ ${texts.workflowCanvas.refresh}
            </button>
          </div>

          <!-- Empty Canvas Area -->
          <div class="canvas-area" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px;">
            <svg viewBox="0 0 120 120" width="80" height="80" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5" style="opacity: 0.5;">
              <circle cx="60" cy="40" r="16"/>
              <circle cx="30" cy="85" r="12"/>
              <circle cx="90" cy="85" r="12"/>
              <line x1="60" y1="56" x2="35" y2="73" stroke-dasharray="4 2"/>
              <line x1="60" y1="56" x2="85" y2="73" stroke-dasharray="4 2"/>
            </svg>
            <p style="margin-top: 16px; font-size: 14px; color: var(--text-secondary);">${texts.workflowCanvas.waitingForWorkflow}</p>
            <p style="margin-top: 4px; font-size: 12px; color: var(--text-tertiary);">${texts.workflowCanvas.startFromChat}</p>
          </div>
        </div>

        <!-- Token Stats Sidebar -->
        ${renderTokenStatsSidebar(stats, [], lang)}
      </div>
    `;
  }


  const positions = calculateCanvasLayout(tree);

  // Collect all running nodes for activity feed
  const allNodes = [...tree.root.children, ...Object.values(tree.childMap).flat()];
  const activeNodes = allNodes.filter(n => n.status === "running");

  return html`
    <style>${PIXEL_ICON_CSS}</style>
    <div class="workflow-canvas" style="position: relative; background: var(--bg-secondary); border-radius: 12px; overflow: hidden; display: grid; grid-template-columns: 1fr 260px;">
      
      <!-- Main Canvas Area -->
      <div style="display: flex; flex-direction: column;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid var(--border-color);">
          <h3 style="margin: 0; font-size: 14px; font-weight: 500; color: var(--text-primary);">
            Workflow Canvas
            <span style="margin-left: 8px; font-size: 12px; color: var(--text-secondary);">
              ${tree.totalNodes} nodes
            </span>
          </h3>
          <button @click=${onRefresh} style="padding: 6px 12px; background: var(--bg-tertiary); border: none; border-radius: 6px; color: var(--text-primary); cursor: pointer; font-size: 12px;">
            ↻ Refresh
          </button>
        </div>

        <!-- SVG Canvas -->
        <svg viewBox="0 0 800 400" style="width: 100%; height: 350px;">
          <!-- Connection lines -->
          ${renderConnections(tree, positions)}
          
          <!-- Root node -->
          ${renderRootNode(tree.root, positions, onSelectNode)}
          
          <!-- Child nodes -->
          ${tree.root.children.map(child => renderChildNode(child, positions, state.selectedNode, onSelectNode, onStopNode))}
          
          <!-- Grandchild nodes -->
          ${Object.values(tree.childMap).flat().map(gc => renderChildNode(gc, positions, state.selectedNode, onSelectNode, onStopNode))}
        </svg>

        <!-- Selected node details -->
        ${state.selectedNode ? renderNodeDetails(tree, state.selectedNode, onSelectNode, onStopNode) : nothing}
      </div>

      <!-- Token Stats Sidebar -->
      ${renderTokenStatsSidebar(stats, activeNodes, lang)}
    </div>
  `;
}

/** Render connection lines between nodes */
function renderConnections(tree: WorkflowTree, positions: Map<string, { x: number; y: number }>) {
  const lines: ReturnType<typeof html>[] = [];
  const rootPos = positions.get(tree.root.sessionKey);
  if (!rootPos) return lines;

  // Root to children
  for (const child of tree.root.children) {
    const childPos = positions.get(child.runId);
    if (childPos) {
      lines.push(html`
        <line 
          x1="${rootPos.x}" y1="${rootPos.y + 30}" 
          x2="${childPos.x}" y2="${childPos.y - 25}"
          stroke="var(--border-color)" stroke-width="2" stroke-dasharray="4,4"
        />
      `);

      // Child to grandchildren
      const grandChildren = tree.childMap[child.childSessionKey] ?? [];
      for (const gc of grandChildren) {
        const gcPos = positions.get(gc.runId);
        if (gcPos) {
          lines.push(html`
            <line 
              x1="${childPos.x}" y1="${childPos.y + 25}" 
              x2="${gcPos.x}" y2="${gcPos.y - 25}"
              stroke="var(--border-color)" stroke-width="1.5" stroke-dasharray="3,3"
            />
          `);
        }
      }
    }
  }

  return lines;
}

/** Render root (CEO) node */
function renderRootNode(
  root: WorkflowTree["root"],
  positions: Map<string, { x: number; y: number }>,
  onSelect: (id: string | null) => void,
) {
  const pos = positions.get(root.sessionKey);
  if (!pos) return nothing;

  return html`
    <g transform="translate(${pos.x - 50}, ${pos.y - 25})" 
       style="cursor: pointer;" 
       @click=${() => onSelect(root.sessionKey)}>
      <rect width="100" height="50" rx="8" fill="var(--color-accent)" opacity="0.9"/>
      <text x="50" y="22" text-anchor="middle" fill="white" font-size="11" font-weight="600">
        ${root.label}
      </text>
      <text x="50" y="38" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="9">
        ${root.status}
      </text>
      <circle cx="90" cy="10" r="6" fill="${STATUS_COLORS[root.status] ?? '#6b7280'}"/>
    </g>
  `;
}

/** Render child/subagent node */
function renderChildNode(
  node: WorkflowNode,
  positions: Map<string, { x: number; y: number }>,
  selectedId: string | null,
  onSelect: (id: string | null) => void,
  onStop: (id: string) => void,
) {
  const pos = positions.get(node.runId);
  if (!pos) return nothing;

  const isSelected = selectedId === node.runId;
  const color = STATUS_COLORS[node.status] ?? "#6b7280";
  const label = node.label || node.task.slice(0, 20) + (node.task.length > 20 ? "..." : "");

  return html`
    <g transform="translate(${pos.x - 45}, ${pos.y - 22})" 
       style="cursor: pointer;" 
       @click=${() => onSelect(node.runId)}>
      <rect 
        width="90" height="44" rx="6" 
        fill="${isSelected ? 'var(--color-accent)' : 'var(--bg-tertiary)'}" 
        stroke="${color}" stroke-width="${isSelected ? 2 : 1}"
      />
      <text x="45" y="18" text-anchor="middle" fill="var(--text-primary)" font-size="10" font-weight="500">
        ${label}
      </text>
      <text x="45" y="32" text-anchor="middle" fill="var(--text-secondary)" font-size="8">
        ${node.status}
      </text>
      <circle cx="80" cy="8" r="5" fill="${color}"/>
    </g>
  `;
}

/** Render selected node details panel */
function renderNodeDetails(
  tree: WorkflowTree,
  selectedId: string,
  onSelect: (id: string | null) => void,
  onStop: (id: string) => void,
) {
  const allNodes = [...tree.root.children, ...Object.values(tree.childMap).flat()];
  const node = allNodes.find(n => n.runId === selectedId);

  if (!node) {
    // Selected root
    return html`
      <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 12px 16px; background: var(--bg-primary); border-top: 1px solid var(--border-color);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 12px; color: var(--text-primary); font-weight: 500;">CEO Bot (Main Session)</span>
          <button @click=${() => onSelect(null)} style="padding: 4px 8px; background: none; border: none; color: var(--text-secondary); cursor: pointer;">✕</button>
        </div>
      </div>
    `;
  }

  return html`
    <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 12px 16px; background: var(--bg-primary); border-top: 1px solid var(--border-color);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div style="flex: 1;">
          <div style="font-size: 12px; color: var(--text-primary); font-weight: 500; margin-bottom: 4px;">
            ${node.label || "Sub-Agent"}
          </div>
          <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 4px;">
            Task: ${node.task}
          </div>
          <div style="font-size: 10px; color: var(--text-tertiary);">
            Status: <span style="color: ${STATUS_COLORS[node.status]}">${node.status}</span>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          ${node.status === "running" ? html`
            <button @click=${() => onStop(node.runId)} style="padding: 4px 8px; background: var(--color-error); border: none; border-radius: 4px; color: white; cursor: pointer; font-size: 11px;">
              Stop
            </button>
          ` : nothing}
          <button @click=${() => onSelect(null)} style="padding: 4px 8px; background: none; border: none; color: var(--text-secondary); cursor: pointer;">✕</button>
        </div>
      </div>
    </div>
  `;
}
