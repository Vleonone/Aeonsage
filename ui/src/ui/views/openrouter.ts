/**
 * Sovereign Cognitive Kernel - Console View
 *
 * Provides a dedicated UI panel for:
 * - Neural Uplink Configuration (API Key)
 * - Cortex Matrix Visualization (Model Browser)
 * - Resource Consumption Telemetry (Usage)
 */

import { html, nothing } from "lit";
import { icons } from "../icons.js";
import { t, getCurrentLanguage } from "../i18n.js";

export interface OpenRouterModel {
    id: string;
    name: string;
    description?: string;
    pricing: {
        prompt: number;
        completion: number;
    };
    context_length: number;
    top_provider?: string;
}

export interface OpenRouterViewProps {
    loading: boolean;
    error: string | null;
    apiKey: string;
    apiKeyMasked: boolean;
    connected: boolean;
    models: OpenRouterModel[];
    modelsLoading: boolean;
    searchQuery: string;
    selectedModel: string | null;
    usage: {
        totalCost: number;
        totalRequests: number;
        periodStart: string;
    } | null;
    onApiKeyChange: (key: string) => void;
    onTestConnection: () => void;
    onSaveApiKey: () => void;
    onToggleMask: () => void;
    onSearchChange: (query: string) => void;
    onSelectModel: (modelId: string) => void;
    onSetDefaultModel: (modelId: string) => void;
    onRefreshModels: () => void;
}

export function renderOpenRouter(props: OpenRouterViewProps) {
    const {
        loading,
        error,
        apiKey,
        apiKeyMasked,
        connected,
        models,
        modelsLoading,
        searchQuery,
        selectedModel,
        usage,
    } = props;

    const lang = getCurrentLanguage();
    const texts = t(lang);

    const filteredModels = searchQuery
        ? models.filter(
            (m) =>
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : models;

    return html`
        <div class="openrouter-container sovereign-theme">
            ${error ? html`<div class="callout danger">${error}</div>` : nothing}

            <div class="openrouter-grid">
                <!-- Neural Uplink Configuration -->
                <div class="card openrouter-api-key">
                    <div class="card__header">
                        <div class="card__title">
                            ${icons.server} Sovereign Cognitive Kernel
                            ${connected
            ? html`<span class="kernel-status-badge online">● ONLINE</span>`
            : html`<span class="kernel-status-badge offline">○ OFFLINE</span>`}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="openrouter-api-key">Neural Uplink Token</label>
                        <div class="input-group">
                            <input
                                id="openrouter-api-key"
                                type="${apiKeyMasked ? "password" : "text"}"
                                class="form-input"
                                .value=${apiKey}
                                @input=${(e: Event) =>
            props.onApiKeyChange((e.target as HTMLInputElement).value)}
                                placeholder="sk-or-..."
                            />
                            <button class="btn btn--sm" @click=${props.onToggleMask}>
                                ${apiKeyMasked ? icons.eye : icons.eyeOff}
                            </button>
                        </div>
                        <small class="muted">
                            Establishing a secure cryptographic handshake with the Cognitive Substrate.
                        </small>
                    </div>

                    <div class="button-row">
                        <button
                            class="btn"
                            @click=${props.onSaveApiKey}
                            ?disabled=${loading || !apiKey}
                        >
                            ${icons.save} Initialize Handshake
                        </button>
                        <button
                            class="btn ${connected ? "btn--success" : ""}"
                            @click=${props.onTestConnection}
                            ?disabled=${loading || !apiKey}
                        >
                            ${loading
            ? html`<span class="spinner"></span>`
            : connected
                ? icons.checkCircle
                : icons.link}
                            ${connected ? "Uplink Secure" : "Verify Uplink"}
                        </button>
                    </div>
                </div>

                <!-- Resource Consumption -->
                <div class="card openrouter-usage">
                    <div class="card__header">
                        <div class="card__title">${icons.activity} Resource Telemetry</div>
                    </div>

                    ${usage
            ? html`
                              <div class="stats-grid">
                                  <div class="stat-item">
                                      <div class="stat-value">$${usage.totalCost.toFixed(4)}</div>
                                      <div class="stat-label">Cognitive Cost</div>
                                  </div>
                                  <div class="stat-item">
                                      <div class="stat-value">${usage.totalRequests}</div>
                                      <div class="stat-label">Synaptic Events</div>
                                  </div>
                                  <div class="stat-item">
                                      <div class="stat-value">${usage.periodStart}</div>
                                      <div class="stat-label">Epoch Start</div>
                                  </div>
                              </div>
                          `
            : html`
                              <div class="empty-state">
                                  <div class="empty-state__text">
                                      Uplink Required for Telemetry
                                  </div>
                              </div>
                          `}
                </div>
            </div>

            <!-- Cortex Matrix -->
            <div class="card openrouter-models">
                <div class="card__header">
                    <div class="card__title">${icons.layers} Cortex Matrix</div>
                    <div class="header-actions">
                        <input
                            type="text"
                            class="form-input form-input--sm"
                            placeholder="Filter Cortex Node..."
                            .value=${searchQuery}
                            @input=${(e: Event) =>
            props.onSearchChange((e.target as HTMLInputElement).value)}
                        />
                        <button
                            class="btn btn--sm"
                            @click=${props.onRefreshModels}
                            ?disabled=${modelsLoading}
                        >
                            ${modelsLoading ? html`<span class="spinner"></span>` : icons.refreshCw}
                        </button>
                    </div>
                </div>

                <div class="models-list">
                    ${filteredModels.length === 0
            ? html`
                              <div class="empty-state">
                                  <div class="empty-state__text">
                                      ${modelsLoading
                    ? "Scanning Cognitive Matrix..."
                    : searchQuery
                        ? "No Cortex Node found."
                        : "Connect Uplink to populate Matrix."}
                                  </div>
                              </div>
                          `
            : filteredModels.slice(0, 50).map(
                (model) => html`
                                  <div
                                      class="model-item ${selectedModel === model.id
                        ? "selected"
                        : ""}"
                                      @click=${() => props.onSelectModel(model.id)}
                                  >
                                      <div class="model-info">
                                          <div class="model-name">${model.name}</div>
                                          <div class="model-id muted">${model.id}</div>
                                          ${model.description
                        ? html`<div class="model-desc muted">
                                                    ${model.description.slice(0, 100)}...
                                                </div>`
                        : nothing}
                                      </div>
                                      <div class="model-meta">
                                          <div class="model-context">
                                              ${(model.context_length / 1000).toFixed(0)}K Context
                                          </div>
                                          <div class="model-pricing">
                                              $${model.pricing.prompt.toFixed(4)}/1K
                                          </div>
                                      </div>
                                      <button
                                          class="btn btn--sm"
                                          @click=${(e: Event) => {
                        e.stopPropagation();
                        props.onSetDefaultModel(model.id);
                    }}
                                      >
                                          Set Primary Cortex
                                      </button>
                                  </div>
                              `
            )}
                </div>
            </div>
        </div>
        <style>
          .sovereign-theme .card__title { font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; font-size: 0.8em; opacity: 0.8; }
          .kernel-status-badge { margin-left: auto; font-size: 0.75em; font-family: monospace; }
          .kernel-status-badge.online { color: var(--ok); text-shadow: 0 0 10px var(--ok-subtle); }
          .kernel-status-badge.offline { color: var(--text-muted); }
        </style>
    `;
}

