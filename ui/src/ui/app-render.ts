import { html, nothing } from "lit";

import type { AppViewState } from "./app-view-state";
import { parseAgentSessionKey } from "../../../src/routing/session-key.js";
import {
  TAB_GROUPS_META,
  iconForTab,
  pathForTab,
  subtitleForTab,
  titleForTab,
  type Tab,
} from "./navigation";
import { icons } from "./icons";
import { renderChat } from "./views/chat";
import { renderDashboard } from "./views/dashboard";
import { renderConnect } from "./views/connect";
import { renderIntelligence } from "./views/intelligence";
import { renderSystem } from "./views/system";
import { renderSecurity } from "./views/security";
import { renderIde, DEFAULT_IDE_STATE } from "./views/ide";
import { renderExecApprovalPrompt } from "./views/exec-approval";
import { renderUserManual } from "./views/user-manual";
import { renderMarketplace } from "./views/marketplace";
import { renderWorkflowCanvas } from "./views/workflow-canvas";

import {
  approveDevicePairing,
  loadDevices,
  rejectDevicePairing,
  revokeDeviceToken,
  rotateDeviceToken,
} from "./controllers/devices";
import { renderChatControls, renderTab, renderThemeToggle, renderLanguageToggle } from "./app-render.helpers";
import "./components/squid-mascot";
import { t } from "./i18n";
import { loadChannels } from "./controllers/channels";
import { loadPresence } from "./controllers/presence";
import { deleteSession, loadSessions, patchSession } from "./controllers/sessions";
import {
  installSkill,
  loadSkills,
  saveSkillApiKey,
  updateSkillEdit,
  updateSkillEnabled,
  type SkillMessage,
} from "./controllers/skills";
import { loadNodes } from "./controllers/nodes";
import { loadChatHistory } from "./controllers/chat";
import {
  applyConfig,
  loadConfig,
  loadConfigSchema,
  runUpdate,
  saveConfig,
  updateConfigFormValue,
  removeConfigFormValue,
} from "./controllers/config";
import {
  loadExecApprovals,
  removeExecApprovalsFormValue,
  saveExecApprovals,
  updateExecApprovalsFormValue,
} from "./controllers/exec-approvals";
import { loadCronRuns, loadCronStatus, toggleCronJob, runCronJob, removeCronJob, addCronJob } from "./controllers/cron";
import { loadDebug, callDebugMethod } from "./controllers/debug";
import { loadLogs } from "./controllers/logs";
import {
  loadSecurityStatus,
  activateKillSwitch,
  toggleGate,
  DEFAULT_SECURITY_STATE
} from "./controllers/security";
import { loadOverview } from "./app-settings";
import { loadTtsStatus } from "./controllers/tts"; // Ensure these are imported if used
import { loadUsageCost } from "./controllers/usage";
import {
  createWorkflowState,
  loadWorkflowTree,
  selectNode,
  stopSubagent,
} from "./controllers/workflow";

const AVATAR_DATA_RE = /^data:/i;
const AVATAR_HTTP_RE = /^https?:\/\//i;

function resolveAssistantAvatarUrl(state: AppViewState): string | undefined {
  const list = state.agentsList?.agents ?? [];
  const parsed = parseAgentSessionKey(state.sessionKey);
  const agentId =
    parsed?.agentId ??
    state.agentsList?.defaultId ??
    "main";
  const agent = list.find((entry) => entry.id === agentId);
  const identity = agent?.identity;
  const candidate = identity?.avatarUrl ?? identity?.avatar;
  if (!candidate) return undefined;
  if (AVATAR_DATA_RE.test(candidate) || AVATAR_HTTP_RE.test(candidate)) return candidate;
  return identity?.avatarUrl;
}

export function renderApp(state: AppViewState) {
  const presenceCount = state.presenceEntries.length;
  const sessionsCount = state.sessionsResult?.count ?? null;
  const cronNext = state.cronStatus?.nextWakeAtMs ?? null;
  const chatDisabledReason = state.connected ? null : "Disconnected from gateway.";
  const isChat = state.tab === "chat";
  const chatFocus = isChat && (state.settings.chatFocusMode || state.onboarding);
  const showThinking = state.onboarding ? false : state.settings.chatShowThinking;
  const assistantAvatarUrl = resolveAssistantAvatarUrl(state);
  const chatAvatarUrl = state.chatAvatarUrl ?? assistantAvatarUrl ?? null;
  const texts = t(state.language);

  // SENSEI: Define the consolidated tabs for rendering if TAB_GROUPS doesn't reflect it yet.
  // Ideally navigation.ts should be updated, but for now we render broadly based on state.tab

  return html`
    <div class="shell ${isChat ? "shell--chat" : ""} ${chatFocus ? "shell--chat-focus" : ""} ${state.settings.navCollapsed ? "shell--nav-collapsed" : ""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${() =>
      state.applySettings({
        ...state.settings,
        navCollapsed: !state.settings.navCollapsed,
      })}
            title="${state.settings.navCollapsed ? "Expand sidebar" : "Collapse sidebar"}"
            aria-label="${state.settings.navCollapsed ? "Expand sidebar" : "Collapse sidebar"}"
          >
            <span class="nav-collapse-toggle__icon">${icons.menu}</span>
          </button>
          <div class="brand">
            <img src="/aeonsage-logo02.svg" alt="AeonSage Logo" class="brand-logo" />
            <div class="brand-text">
              <div class="brand-title">AEONSAGE</div>
            </div>
          </div>
        </div>
        <div class="topbar-status">
          <div class="pill">
            <span class="statusDot ${state.connected ? "ok" : ""}"></span>
            <div class="status-text">
              <span class="status-label">${texts.topbar.health}</span>
              <span class="status-value">${state.connected ? texts.topbar.online : texts.topbar.offline}</span>
            </div>
          </div>
          ${renderLanguageToggle(state)}
          ${renderThemeToggle(state)}
        </div>
      </header>
      <aside class="nav ${state.settings.navCollapsed ? "nav--collapsed" : ""}">
        ${TAB_GROUPS_META.map((group) => {
        const label = (texts.nav as any)[group.labelKey] || group.labelKey;
        const isGroupCollapsed = state.settings.navGroupsCollapsed[label] ?? false;
        const hasActiveTab = group.tabs.some((tab: Tab) => tab === state.tab);
        return html`
            <div class="nav-group ${isGroupCollapsed && !hasActiveTab ? "nav-group--collapsed" : ""}">
              <button
                class="nav-label"
                @click=${() => {
            const next = { ...state.settings.navGroupsCollapsed };
            next[label] = !isGroupCollapsed;
            state.applySettings({
              ...state.settings,
              navGroupsCollapsed: next,
            });
          }}
                aria-expanded=${!isGroupCollapsed}
              >
                <span class="nav-label__text">${label}</span>
                <span class="nav-label__chevron">${isGroupCollapsed ? "+" : "−"}</span>
              </button>
              <div class="nav-group__items">
                ${group.tabs.map((tab: Tab) => renderTab(state, tab))}
              </div>
            </div>
          `;
      })}
        <div class="nav-group nav-group--links">
          <div class="nav-label nav-label--static">
            <span class="nav-label__text">${texts.nav.resources}</span>
          </div>
          <div class="nav-group__items">
            <a
              class="nav-item ${state.tab === 'manual' ? 'nav-item--active' : ''}"
              @click=${(e: Event) => {
      e.preventDefault();
      state.setTab("manual");
    }}
              href="/manual"
              title="${texts.nav.docs}"
            >
              <span class="nav-item__icon" aria-hidden="true">${icons.book}</span>
              <span class="nav-item__text">User Manual</span>
            </a>
          </div>
        </div>
        <!-- AEONPET moved to topbar -->
      </aside>
      <main class="content ${isChat ? "content--chat" : ""} ${state.tab === "dashboard" ? "silk-mesh-bg" : ""} security-guard ${!state.connected ? 'security-guard--locked' : ''}">
        ${!state.connected ? html`<div class="security-lock-overlay">${icons.lock} PROTECTED</div>` : ''}
        <section class="content-header">
          <div>
            <div class="page-title">${titleForTab(state.tab, state.language)}</div>
            <div class="page-sub">${subtitleForTab(state.tab, state.language)}</div>
          </div>
          <div class="page-meta">
            ${state.lastError
      ? html`<div class="pill danger">${state.lastError}</div>`
      : nothing}
            ${isChat ? renderChatControls(state) : nothing}
          </div>
        </section>

        ${/* Setup Wizard removed - connection status shown in topbar */nothing}

        ${state.tab === "dashboard"
      ? renderDashboard({
        subTab: state.dashboardSubTab,
        onSubTabChange: (tab) => state.dashboardSubTab = tab,
        overview: {
          connected: state.connected,
          hello: state.hello,
          settings: state.settings,
          password: state.password,
          lastError: state.lastError,
          presenceCount,
          sessionsCount,
          cronEnabled: state.cronStatus?.enabled ?? null,
          cronNext,
          lastChannelsRefresh: state.channelsLastSuccess,
          language: state.language,
          vdid: state.vdidStatus ?? DEFAULT_SECURITY_STATE.vdid,
          onSettingsChange: (next) => state.applySettings(next),
          onPasswordChange: (next) => (state.password = next),
          onSessionKeyChange: (next) => {
            state.sessionKey = next;
            state.chatMessage = "";
            state.resetToolStream();
            state.applySettings({
              ...state.settings,
              sessionKey: next,
              lastActiveSessionKey: next,
            });
            void state.loadAssistantIdentity();
            void loadChatHistory(state);
            // void refreshChatAvatar(state); REMOVED
          },
          onConnect: () => state.connect(),
          onRefresh: () => loadOverview(state),
          onInitializeVDID: () => {
            // Trigger Setup Wizard for VDID initialization
            state.onboarding = true;
            state.requestUpdate();
          },
        },
        usage: state.usageState || { history: [], loading: false, error: null }, // Fallback if state not ready
        instances: {
          loading: state.presenceLoading,
          entries: state.presenceEntries,
          lastError: state.presenceError,
          statusMessage: state.presenceStatus,
          onRefresh: () => loadPresence(state),
        },
        infrastructure: {
          loading: state.infrastructureState?.loading ?? false,
          localGateway: state.infrastructureState?.localGateway ?? {
            connected: state.connected,
            url: state.settings.gatewayUrl || 'ws://localhost:18789',
            uptime: undefined,
          },
          remoteNodes: state.infrastructureState?.remoteNodes ?? [],
          tools: state.infrastructureState?.tools ?? [],
          lastRefresh: state.infrastructureState?.lastRefresh ?? null,
          onRefresh: async () => {
            const { loadInfrastructureStatus } = await import("./controllers/infrastructure.js");
            await loadInfrastructureStatus(state);
          },
          onConnectNode: async (nodeId: string) => {
            const { connectRemoteNode } = await import("./controllers/infrastructure.js");
            await connectRemoteNode(state, nodeId);
          },
          onDisconnectNode: async (nodeId: string) => {
            const { disconnectRemoteNode } = await import("./controllers/infrastructure.js");
            await disconnectRemoteNode(state, nodeId);
          },
          onConnectRemote: async (url: string) => {
            if (state.client && state.connected) {
              try {
                const res = await state.client.request("node.connect", { url });
                // @ts-ignore
                if (res.ok) {
                  const { loadInfrastructureStatus } = await import("./controllers/infrastructure.js");
                  await loadInfrastructureStatus(state);
                } else {
                  // @ts-ignore
                  state.lastError = res.error?.message || "Connection failed";
                  state.requestUpdate();
                  setTimeout(() => { state.lastError = null; state.requestUpdate(); }, 5000);
                }
              } catch (err: any) {
                state.lastError = err.message || "Connection error";
                state.requestUpdate();
              }
            }
          },

        }
      })
      : nothing}

        ${state.tab === "connect"
      ? renderConnect({
        subTab: state.connectSubTab,
        onSubTabChange: (tab) => state.connectSubTab = tab,
        channels: {
          connected: state.connected,
          loading: state.channelsLoading,
          snapshot: state.channelsSnapshot,
          lastError: state.channelsError,
          lastSuccessAt: state.channelsLastSuccess,
          whatsappMessage: state.whatsappLoginMessage,
          whatsappQrDataUrl: state.whatsappLoginQrDataUrl,
          whatsappConnected: state.whatsappLoginConnected,
          whatsappBusy: state.whatsappBusy,
          configSchema: state.configSchema,
          configSchemaLoading: state.configSchemaLoading,
          configForm: state.configForm,
          configUiHints: state.configUiHints,
          configSaving: state.configSaving,
          configFormDirty: state.configFormDirty,
          nostrProfileFormState: state.nostrProfileFormState,
          nostrProfileAccountId: state.nostrProfileAccountId,
          onRefresh: (probe) => loadChannels(state, probe),
          onWhatsAppStart: (force) => state.handleWhatsAppStart(force),
          onWhatsAppWait: () => state.handleWhatsAppWait(),
          onWhatsAppLogout: () => state.handleWhatsAppLogout(),
          onConfigPatch: (path, value) => updateConfigFormValue(state, path, value),
          onConfigSave: () => state.handleChannelConfigSave(),
          onConfigReload: () => state.handleChannelConfigReload(),
          onNostrProfileEdit: (accountId, profile) =>
            state.handleNostrProfileEdit(accountId, profile),
          onNostrProfileCancel: () => state.handleNostrProfileCancel(),
          onNostrProfileFieldChange: (field, value) =>
            state.handleNostrProfileFieldChange(field, value),
          onNostrProfileSave: () => state.handleNostrProfileSave(),
          onNostrProfileImport: () => state.handleNostrProfileImport(),
          onNostrProfileToggleAdvanced: () => state.handleNostrProfileToggleAdvanced(),
        },
        tts: state,
      })
      : nothing}

        ${state.tab === "intelligence"
      ? renderIntelligence({
        subTab: state.intelligenceSubTab,
        onSubTabChange: (tab) => state.intelligenceSubTab = tab,
        skills: {
          loading: state.skillsLoading,
          report: state.skillsReport,
          error: state.skillsError,
          filter: state.skillsFilter,
          selectedCategory: (state as any).skillsSelectedCategory ?? null,
          selectedPersona: (state as any).skillsSelectedPersona ?? null,
          viewMode: (state as any).skillsViewMode ?? 'grid',
          activePersona: (state as any).skillsActivePersona ?? null,
          edits: state.skillEdits,
          messages: state.skillMessages,
          busyKey: state.skillsBusyKey,
          onFilterChange: (next: string) => (state.skillsFilter = next),
          onCategorySelect: (categoryId: string | null) => ((state as any).skillsSelectedCategory = categoryId),
          onPersonaSelect: (personaId: string | null) => ((state as any).skillsSelectedPersona = personaId),
          onViewModeChange: (mode: 'grid' | 'list') => ((state as any).skillsViewMode = mode),
          onClearPersona: () => {
            (state as any).skillsActivePersona = null;
            (state as any).skillsSelectedPersona = null;
          },
          onRefresh: () => loadSkills(state, { clearMessages: true }),
          onToggle: (key: string, enabled: boolean) => updateSkillEnabled(state, key, enabled),
          onEdit: (key: string, value: string) => updateSkillEdit(state, key, value),
          onSaveKey: (key: string) => saveSkillApiKey(state, key),
          onInstall: (skillKey: string, name: string, installId: string) =>
            installSkill(state, skillKey, name, installId),
          onApplyPersona: async (persona: any) => {
            // Apply persona: enable associated skills and set as active
            let enabledCount = 0;
            if (persona?.skills) {
              for (const skillKey of persona.skills) {
                try {
                  await updateSkillEnabled(state, skillKey, true);
                  enabledCount++;
                } catch { /* Continue with other skills */ }
              }
            }
            // Update session with persona info
            if (state.client && state.connected && persona?.id) {
              try {
                await state.client.request("sessions.patch", {
                  key: state.sessionKey,
                  persona: persona.id,
                  systemPromptHint: persona.systemPromptHint
                });
              } catch { /* Silent fail for optional feature */ }
            }
            // Show feedback to user
            (state as any).toastMessage = `✅ Applied "${persona.name}" - ${enabledCount} skills enabled`;
            (state as any).toastVisible = true;
            setTimeout(() => { (state as any).toastVisible = false; }, 3000);
            // Set active persona
            (state as any).skillsActivePersona = persona;
            // Refresh skills to show updated state
            loadSkills(state, { clearMessages: false });
          },
        },
        sessions: {
          loading: state.sessionsLoading,
          result: state.sessionsResult,
          error: state.sessionsError,
          activeMinutes: state.sessionsFilterActive,
          limit: state.sessionsFilterLimit,
          includeGlobal: state.sessionsIncludeGlobal,
          includeUnknown: state.sessionsIncludeUnknown,
          basePath: state.basePath,
          onFiltersChange: (next) => {
            state.sessionsFilterActive = next.activeMinutes;
            state.sessionsFilterLimit = next.limit;
            state.sessionsIncludeGlobal = next.includeGlobal;
            state.sessionsIncludeUnknown = next.includeUnknown;
          },
          onRefresh: () => loadSessions(state),
          onPatch: (key, patch) => patchSession(state, key, patch),
          onDelete: (key) => deleteSession(state, key),
        },
        nodes: {
          loading: state.nodesLoading,
          nodes: state.nodes,
          devicesLoading: state.devicesLoading,
          devicesError: state.devicesError,
          devicesList: state.devicesList,
          configForm: state.configForm ?? (state.configSnapshot?.config as Record<string, unknown> | null),
          configLoading: state.configLoading,
          configSaving: state.configSaving,
          configDirty: state.configFormDirty,
          configFormMode: state.configFormMode,
          execApprovalsLoading: state.execApprovalsLoading,
          execApprovalsSaving: state.execApprovalsSaving,
          execApprovalsDirty: state.execApprovalsDirty,
          execApprovalsSnapshot: state.execApprovalsSnapshot,
          execApprovalsForm: state.execApprovalsForm,
          execApprovalsSelectedAgent: state.execApprovalsSelectedAgent,
          execApprovalsTarget: state.execApprovalsTarget,
          execApprovalsTargetNodeId: state.execApprovalsTargetNodeId,
          onRefresh: () => loadNodes(state),
          onDevicesRefresh: () => loadDevices(state),
          onDeviceApprove: (requestId) => approveDevicePairing(state, requestId),
          onDeviceReject: (requestId) => rejectDevicePairing(state, requestId),
          onDeviceRotate: (deviceId, role, scopes) =>
            rotateDeviceToken(state, { deviceId, role, scopes }),
          onDeviceRevoke: (deviceId, role) =>
            revokeDeviceToken(state, { deviceId, role }),
          onLoadConfig: () => loadConfig(state),
          onLoadExecApprovals: () => {
            const target =
              state.execApprovalsTarget === "node" && state.execApprovalsTargetNodeId
                ? { kind: "node" as const, nodeId: state.execApprovalsTargetNodeId }
                : { kind: "gateway" as const };
            return loadExecApprovals(state, target);
          },
          onBindDefault: (nodeId) => {
            if (nodeId) {
              updateConfigFormValue(state, ["tools", "exec", "node"], nodeId);
            } else {
              removeConfigFormValue(state, ["tools", "exec", "node"]);
            }
          },
          onBindAgent: (agentIndex, nodeId) => {
            const basePath = ["agents", "list", agentIndex, "tools", "exec", "node"];
            if (nodeId) {
              updateConfigFormValue(state, basePath, nodeId);
            } else {
              removeConfigFormValue(state, basePath);
            }
          },
          onSaveBindings: () => saveConfig(state),
          onExecApprovalsTargetChange: (kind, nodeId) => {
            state.execApprovalsTarget = kind;
            state.execApprovalsTargetNodeId = nodeId;
            state.execApprovalsSnapshot = null;
            state.execApprovalsForm = null;
            state.execApprovalsDirty = false;
            state.execApprovalsSelectedAgent = null;
          },
          onExecApprovalsSelectAgent: (agentId) => {
            state.execApprovalsSelectedAgent = agentId;
          },
          onExecApprovalsPatch: (path, value) =>
            updateExecApprovalsFormValue(state, path, value),
          onExecApprovalsRemove: (path) =>
            removeExecApprovalsFormValue(state, path),
          onSaveExecApprovals: () => {
            const target =
              state.execApprovalsTarget === "node" && state.execApprovalsTargetNodeId
                ? { kind: "node" as const, nodeId: state.execApprovalsTargetNodeId }
                : { kind: "gateway" as const };
            return saveExecApprovals(state, target);
          },
        },
        market: {
          skillsLoading: state.skillsLoading,
          skillsReport: state.skillsReport,
          marketplaceSkills: (state as any).marketplaceSkills || [],
          marketplaceLoading: (state as any).marketplaceLoading || false,
          marketplaceError: (state as any).marketplaceError || null,
          marketplaceTotalCount: (state as any).marketplaceTotalCount || 0,
          searchQuery: (state as any).marketplaceQuery || "",
          selectedCategory: (state as any).selectedCategory || "all",
          onInstall: (skillKey: string) => {
            // Simple install handler
            installSkill(state, skillKey, skillKey, skillKey);
          },
          onRefreshLocal: () => loadSkills(state, { clearMessages: true }),
          onRefreshRemote: async () => {
            const { loadMarketplaceSkills } = await import("./controllers/marketplace.js");
            await loadMarketplaceSkills(state as any);
          },
          onSearch: async (query: string) => {
            (state as any).marketplaceQuery = query;
            const { loadMarketplaceSkills } = await import("./controllers/marketplace.js");
            await loadMarketplaceSkills(state as any, { query });
          },
          onCategoryChange: (category: string) => {
            (state as any).selectedCategory = category;
          },
        },
      })
      : nothing}


        ${state.tab === "workflow"
      ? renderWorkflowCanvas({
          state: state.workflowState || createWorkflowState(),
          onRefresh: async () => {
            if (!state.client || !state.connected) return;
            const wfState = state.workflowState || createWorkflowState();
            await loadWorkflowTree(state.client, wfState);
            state.workflowState = wfState;
            state.requestUpdate();
          },
          onSelectNode: (nodeId: string | null) => {
            const wfState = state.workflowState || createWorkflowState();
            selectNode(wfState, nodeId);
            state.workflowState = wfState;
            state.requestUpdate();
          },
          onStopNode: async (runId: string) => {
            if (!state.client || !state.connected) return;
            const wfState = state.workflowState || createWorkflowState();
            const stopped = await stopSubagent(state.client, wfState, runId);
            if (stopped) {
              state.workflowState = wfState;
              state.requestUpdate();
            }
          },
        })
      : nothing}

        ${state.tab === "system"
      ? renderSystem({
        subTab: state.systemSubTab,
        onSubTabChange: (tab) => {
          state.systemSubTab = tab;
          // Trigger data loading based on subtab
          if (tab === "config") {
            void loadConfigSchema(state).then(() => loadConfig(state));
          } else if (tab === "logs") {
            void loadLogs(state, { reset: true });
          } else if (tab === "debug") {
            void loadDebug(state);
          } else if (tab === "cron") {
            void loadCronStatus(state);
          }
        },
        config: {
          raw: state.configRaw,
          originalRaw: state.configRawOriginal,
          valid: state.configValid,
          issues: state.configIssues,
          loading: state.configLoading,
          saving: state.configSaving,
          applying: state.configApplying,
          updating: state.updateRunning,
          connected: state.connected,
          schema: state.configSchema,
          schemaLoading: state.configSchemaLoading,
          uiHints: state.configUiHints,
          formMode: state.configFormMode,
          formValue: state.configForm,
          originalValue: state.configFormOriginal,
          searchQuery: state.configSearchQuery,
          activeSection: state.configActiveSection,
          activeSubsection: state.configActiveSubsection,
          onRawChange: (next) => {
            state.configRaw = next;
          },
          onFormModeChange: (mode) => (state.configFormMode = mode),
          onFormPatch: (path, value) => updateConfigFormValue(state, path, value),
          onSearchChange: (query) => (state.configSearchQuery = query),
          onSectionChange: (section) => {
            state.configActiveSection = section;
            state.configActiveSubsection = null;
          },
          onSubsectionChange: (section) => (state.configActiveSubsection = section),
          onReload: () => loadConfig(state),
          onSave: () => saveConfig(state),
          onApply: () => applyConfig(state),
          onUpdate: () => runUpdate(state),
        },
        logs: {
          loading: state.logsLoading,
          error: state.logsError,
          file: state.logsFile,
          entries: state.logsEntries,
          filterText: state.logsFilterText,
          levelFilters: state.logsLevelFilters,
          autoFollow: state.logsAutoFollow,
          truncated: state.logsTruncated,
          onFilterTextChange: (next) => (state.logsFilterText = next),
          onLevelToggle: (level, enabled) => {
            state.logsLevelFilters = { ...state.logsLevelFilters, [level]: enabled };
          },
          onToggleAutoFollow: (next) => (state.logsAutoFollow = next),
          onRefresh: () => loadLogs(state, { reset: true }),
          onExport: (lines, label) => state.exportLogs(lines, label),
          onScroll: (event) => state.handleLogsScroll(event),
        },
        debug: {
          loading: state.debugLoading,
          status: state.debugStatus,
          health: state.debugHealth,
          models: state.debugModels,
          heartbeat: state.debugHeartbeat,
          eventLog: state.eventLog,
          callMethod: state.debugCallMethod,
          callParams: state.debugCallParams,
          callResult: state.debugCallResult,
          callError: state.debugCallError,
          onCallMethodChange: (next) => (state.debugCallMethod = next),
          onCallParamsChange: (next) => (state.debugCallParams = next),
          onRefresh: () => loadDebug(state),
          onCall: () => callDebugMethod(state),
        },
        cron: {
          loading: state.cronLoading,
          status: state.cronStatus,
          jobs: state.cronJobs,
          error: state.cronError,
          busy: state.cronBusy,
          form: state.cronForm,
          channels: state.channelsSnapshot?.channelMeta?.length
            ? state.channelsSnapshot.channelMeta.map((entry) => entry.id)
            : state.channelsSnapshot?.channelOrder ?? [],
          channelLabels: state.channelsSnapshot?.channelLabels ?? {},
          channelMeta: state.channelsSnapshot?.channelMeta ?? [],
          runsJobId: state.cronRunsJobId,
          runs: state.cronRuns,
          onFormChange: (patch) => (state.cronForm = { ...state.cronForm, ...patch }),
          onRefresh: () => state.loadCron(),
          onAdd: () => addCronJob(state),
          onToggle: (job, enabled) => toggleCronJob(state, job, enabled),
          onRun: (job) => runCronJob(state, job),
          onRemove: (job) => removeCronJob(state, job),
          onLoadRuns: (jobId) => loadCronRuns(state, jobId),
        }
      })
      : nothing}

        ${state.tab === "security"
      ? renderSecurity({
        loading: (state as any).securityLoading ?? false,
        error: (state as any).securityError ?? null,
        killSwitch: (state as any).killSwitch ?? DEFAULT_SECURITY_STATE.killSwitch,
        gates: (state as any).securityGates ?? [],
        vdid: (state as any).vdidStatus ?? DEFAULT_SECURITY_STATE.vdid,
        onRefresh: () => loadSecurityStatus(state),
        onActivateKillSwitch: (reason) => activateKillSwitch(state, reason),
        onToggleGate: (gateId, enabled) => toggleGate(state, gateId, enabled),
      })
      : nothing}

        ${state.tab === "chat"
      ? renderChat({
        sessionKey: state.sessionKey,
        onSessionKeyChange: (next) => {
          state.sessionKey = next;
          state.chatMessage = "";
          state.chatAttachments = [];
          state.chatStream = null;
          state.chatStreamStartedAt = null;
          state.chatRunId = null;
          state.chatQueue = [];
          state.resetToolStream();
          state.resetChatScroll();
          state.applySettings({
            ...state.settings,
            sessionKey: next,
            lastActiveSessionKey: next,
          });
          void state.loadAssistantIdentity();
          void loadChatHistory(state);
        },
        thinkingLevel: state.chatThinkingLevel,
        showThinking,
        loading: state.chatLoading,
        sending: state.chatSending,
        compactionStatus: state.compactionStatus,
        assistantAvatarUrl: chatAvatarUrl,
        messages: state.chatMessages,
        toolMessages: state.chatToolMessages,
        stream: state.chatStream,
        streamStartedAt: state.chatStreamStartedAt,
        draft: state.chatMessage,
        queue: state.chatQueue,
        connected: state.connected,
        canSend: state.connected,
        disabledReason: chatDisabledReason,
        error: state.lastError,
        sessions: state.sessionsResult,
        focusMode: chatFocus,
        onRefresh: () => {
          state.resetToolStream();
          return Promise.all([loadChatHistory(state), state.loadAssistantIdentity()]);
        },
        onToggleFocusMode: () => {
          if (state.onboarding) return;
          state.applySettings({
            ...state.settings,
            chatFocusMode: !state.settings.chatFocusMode,
          });
        },
        onChatScroll: (event) => state.handleChatScroll(event),
        onDraftChange: (next) => (state.chatMessage = next),
        attachments: state.chatAttachments,
        onAttachmentsChange: (next) => (state.chatAttachments = next),
        onSend: () => state.handleSendChat(),
        canAbort: Boolean(state.chatRunId),
        onAbort: () => void state.handleAbortChat(),
        onQueueRemove: (id) => state.removeQueuedMessage(id),
        onNewSession: () =>
          state.handleSendChat("/new", { restoreDraft: true }),
        // Sidebar props for tool output viewing
        sidebarOpen: state.sidebarOpen,
        sidebarContent: state.sidebarContent,
        sidebarError: state.sidebarError,
        splitRatio: state.splitRatio,
        onOpenSidebar: (content: string) => state.handleOpenSidebar(content),
        onCloseSidebar: () => state.handleCloseSidebar(),
        onSplitRatioChange: (ratio: number) => state.handleSplitRatioChange(ratio),
        assistantName: state.assistantName,
        assistantAvatar: state.assistantAvatar,
      })
      : nothing}



      ${state.tab === "market"
      ? (() => {
        // Lazy load marketplace data if not already loaded
        const mpState = (state as any);
        if (!mpState.marketplaceSkills && !mpState.marketplaceLoading) {
          import("./controllers/marketplace.js").then(({ loadMarketplaceSkills, initMarketplaceState }) => {
            const init = initMarketplaceState();
            Object.assign(state, init);
            loadMarketplaceSkills(state as any);
          });
        }
        return renderMarketplace({
          skillsLoading: state.skillsLoading,
          skillsReport: state.skillsReport,
          marketplaceSkills: mpState.marketplaceSkills || [],
          marketplaceLoading: mpState.marketplaceLoading || false,
          marketplaceError: mpState.marketplaceError || null,
          marketplaceTotalCount: mpState.marketplaceTotalCount || 0,
          searchQuery: mpState.marketplaceQuery || "",
          selectedCategory: mpState.selectedCategory || "all",
          onInstall: (key: string) => {
            // Trigger actual skill installation
            installSkill(state, key, "Market Skill", "latest");
          },
          onRefreshLocal: () => loadSkills(state, { clearMessages: true }),
          onRefreshRemote: async () => {
            const { loadMarketplaceSkills } = await import("./controllers/marketplace.js");
            await loadMarketplaceSkills(state as any);
          },
          onSearch: async (query: string) => {
            mpState.marketplaceQuery = query;
            const { loadMarketplaceSkills } = await import("./controllers/marketplace.js");
            await loadMarketplaceSkills(state as any, { query });
          },
          onCategoryChange: (category: string) => {
            mpState.selectedCategory = category;
            // Re-render will apply client-side filter
          },
        });
      })()
      : nothing}

      ${state.tab === "manual"
      ? renderUserManual({
        activeSection: (state as any).manualActiveSection,
        onSectionChange: (id) => (state as any).manualActiveSection = id,
      })
      : nothing}

      </main>
      ${renderExecApprovalPrompt(state)}
    </div>
  `;
}
