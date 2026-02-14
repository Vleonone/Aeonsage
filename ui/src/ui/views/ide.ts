/**
 * IDE View - Colab-Style Notebook Interface
 *
 * Features:
 * - Code cells with syntax highlighting
 * - Output areas for each cell
 * - Markdown/text cells for documentation
 * - AI assistant integration
 * - Run buttons per cell
 */

import { html, nothing } from "lit";
import type { TemplateResult } from "lit";
import { icons } from "../icons.js";

// Cell types
export type CellType = "code" | "markdown" | "output";

export interface NotebookCell {
    id: string;
    type: CellType;
    content: string;
    output?: string;
    outputType?: "text" | "error" | "html";
    language?: string;
    running?: boolean;
    collapsed?: boolean;
}

export interface IdeState {
    // Notebook
    cells: NotebookCell[];
    activeCellId: string | null;

    // Terminal (collapsed by default)
    terminalLines: { type: string; content: string; timestamp: string }[];
    terminalInput: string;
    terminalCollapsed: boolean;

    // AI Chat sidebar
    chatMessages: { role: "user" | "assistant"; content: string }[];
    chatInput: string;
    chatLoading: boolean;
    chatVisible: boolean;

    // Settings
    theme: "dark" | "light";
    fontSize: number;
    settingsOpen: boolean;

    // Compat fields (for existing interface)
    files: unknown[];
    filesLoading: boolean;
    filesError: string | null;
    selectedFile: string | null;
    editorContent: string;
    editorPath: string | null;
    editorDirty: boolean;
    editorLanguage: string;
    sidebarWidth: number;
    chatWidth: number;
    terminalHeight: number;
    terminalHistory: string[];
    terminalHistoryIndex: number;
    terminalBusy: boolean;
}

export const DEFAULT_IDE_STATE: IdeState = {
    cells: [
        {
            id: "cell-1",
            type: "markdown",
            content: "# AeonSage Notebook\n\nWelcome to the AeonSage Web IDE. This is a Colab-style notebook interface.\n\n- Click **+ Code** to add a code cell\n- Click **+ Text** to add a markdown cell\n- Press **Shift+Enter** to run a cell",
        },
        {
            id: "cell-2",
            type: "code",
            content: "// Example: Hello World\nconsole.log('Hello from AeonSage!');\n\n// You can run Python, JavaScript, or shell commands\n// The output will appear below this cell",
            language: "javascript",
        },
        {
            id: "cell-3",
            type: "code",
            content: "# Python example (requires Python runtime)\nimport datetime\nprint(f'Current time: {datetime.datetime.now()}')",
            language: "python",
        },
    ],
    activeCellId: "cell-2",
    terminalLines: [],
    terminalInput: "",
    terminalCollapsed: true,
    chatMessages: [
        { role: "assistant", content: "Hi! I'm your AI coding assistant. Ask me anything about your code or let me help you write new cells." },
    ],
    chatInput: "",
    chatLoading: false,
    chatVisible: true,
    theme: "dark",
    fontSize: 14,
    settingsOpen: false,
    // Compat
    files: [],
    filesLoading: false,
    filesError: null,
    selectedFile: null,
    editorContent: "",
    editorPath: null,
    editorDirty: false,
    editorLanguage: "plaintext",
    sidebarWidth: 250,
    chatWidth: 320,
    terminalHeight: 200,
    terminalHistory: [],
    terminalHistoryIndex: -1,
    terminalBusy: false,
};

export interface IdeCallbacks {
    onFileSelect: (path: string) => void;
    onFileSave: () => void;
    onEditorChange: (content: string) => void;
    onTerminalInput: (cmd: string) => void;
    onTerminalInputChange: (value: string) => void;
    onTerminalKeyDown: (e: KeyboardEvent) => void;
    onChatSend: () => void;
    onChatInputChange: (value: string) => void;
    onSettingsToggle: () => void;
    onThemeToggle: () => void;
    onTerminalToggle: () => void;
    onRefreshFiles: () => void;
    // New notebook callbacks
    onCellRun?: (cellId: string) => void;
    onCellChange?: (cellId: string, content: string) => void;
    onCellAdd?: (type: CellType, afterId?: string) => void;
    onCellDelete?: (cellId: string) => void;
    onCellSelect?: (cellId: string) => void;
}

function generateId() {
    return `cell-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function renderCell(cell: NotebookCell, isActive: boolean, callbacks: IdeCallbacks): TemplateResult {
    const cellClass = `notebook-cell ${cell.type} ${isActive ? "active" : ""} ${cell.running ? "running" : ""}`;

    return html`
        <div class="${cellClass}" data-cell-id="${cell.id}">
            <div class="cell-toolbar">
                <div class="cell-type-badge">${cell.type === "code" ? (cell.language || "code") : "text"}</div>
                <div class="cell-actions">
                    ${cell.type === "code" ? html`
                        <button class="cell-btn run" @click=${() => callbacks.onCellRun?.(cell.id)} ?disabled=${cell.running}>
                            ${cell.running ? icons.loader : icons.play}
                        </button>
                    ` : nothing}
                    <button class="cell-btn delete" @click=${() => callbacks.onCellDelete?.(cell.id)}>
                        ${icons.trash2}
                    </button>
                </div>
            </div>
            
            <div class="cell-content" @click=${() => callbacks.onCellSelect?.(cell.id)}>
                ${cell.type === "markdown" && !isActive
            ? html`<div class="markdown-preview">${cell.content}</div>`
            : html`
                        <textarea
                            class="cell-editor"
                            .value=${cell.content}
                            @input=${(e: Event) => callbacks.onCellChange?.(cell.id, (e.target as HTMLTextAreaElement).value)}
                            @keydown=${(e: KeyboardEvent) => {
                    if (e.key === "Enter" && e.shiftKey) {
                        e.preventDefault();
                        callbacks.onCellRun?.(cell.id);
                    }
                }}
                            placeholder="${cell.type === "code" ? "# Enter code here..." : "Enter markdown text..."}"
                            rows=${Math.max(3, cell.content.split("\n").length)}
                        ></textarea>
                    `
        }
            </div>
            
            ${cell.output ? html`
                <div class="cell-output ${cell.outputType || "text"}">
                    <pre>${cell.output}</pre>
                </div>
            ` : nothing}
        </div>
    `;
}

export function renderIde(state: IdeState, callbacks: IdeCallbacks): TemplateResult {
    return html`
        <style>
            .ide-notebook {
                display: flex;
                height: calc(100vh - 120px);
                background: var(--panel);
                border-radius: 12px;
                overflow: hidden;
            }
            
            /* Main notebook area */
            .notebook-main {
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .notebook-toolbar {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px 16px;
                background: var(--ok-subtle);
                border-bottom: 1px solid var(--accent-subtle);
            }
            
            .toolbar-btn {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 8px 14px;
                background: transparent;
                border: 1px solid var(--accent-glow);
                border-radius: 6px;
                color: var(--ok);
                font-size: 0.85rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .toolbar-btn:hover {
                background: var(--ok-subtle);
                border-color: var(--ok);
            }
            
            .toolbar-btn svg {
                width: 16px;
                height: 16px;
            }
            
            .notebook-cells {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
            }
            
            /* Cell styles */
            .notebook-cell {
                margin-bottom: 16px;
                border: 1px solid var(--border);
                border-radius: 8px;
                background: var(--panel);
                overflow: hidden;
            }
            
            .notebook-cell.active {
                border-color: var(--accent-glow);
                box-shadow: 0 0 0 1px var(--accent-subtle);
            }
            
            .notebook-cell.running {
                border-color: var(--warn-muted);
            }
            
            .cell-toolbar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 6px 12px;
                background: var(--card-transparent);
                border-bottom: 1px solid var(--border-subtle);
            }
            
            .cell-type-badge {
                font-size: 0.7rem;
                padding: 2px 8px;
                border-radius: 4px;
                background: var(--border);
                color: var(--text-muted);
                text-transform: uppercase;
            }
            
            .cell-actions {
                display: flex;
                gap: 4px;
            }
            
            .cell-btn {
                padding: 4px 8px;
                background: transparent;
                border: 1px solid transparent;
                border-radius: 4px;
                color: var(--text-muted);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .cell-btn:hover {
                color: var(--ok);
                border-color: var(--accent-glow);
            }
            
            .cell-btn.run:hover {
                color: var(--ok);
            }
            
            .cell-btn.delete:hover {
                color: var(--danger);
                border-color: var(--danger-subtle);
            }
            
            .cell-btn svg {
                width: 14px;
                height: 14px;
            }
            
            .cell-content {
                padding: 12px;
            }
            
            .cell-editor {
                width: 100%;
                background: transparent;
                border: none;
                outline: none;
                color: var(--text);
                font-family: 'JetBrains Mono', 'Fira Code', monospace;
                font-size: ${state.fontSize}px;
                line-height: 1.6;
                resize: none;
            }
            
            .markdown-preview {
                color: var(--text);
                line-height: 1.6;
                white-space: pre-wrap;
            }
            
            .cell-output {
                padding: 12px;
                border-top: 1px solid var(--border-subtle);
                background: var(--panel);
            }
            
            .cell-output pre {
                margin: 0;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.85rem;
                color: var(--text);
                white-space: pre-wrap;
            }
            
            .cell-output.error pre {
                color: var(--danger);
            }
            
            /* AI Chat sidebar */
            .chat-sidebar {
                width: ${state.chatWidth}px;
                display: flex;
                flex-direction: column;
                border-left: 1px solid var(--accent-subtle);
                background: var(--panel-strong);
            }
            
            .chat-header {
                padding: 12px 16px;
                border-bottom: 1px solid var(--accent-subtle);
                font-weight: 600;
                color: var(--ok);
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
            }
            
            .chat-message {
                position: relative;
                margin-bottom: 12px;
                padding: 10px 14px;
                border-radius: 8px;
                font-size: 0.9rem;
                line-height: 1.5;
            }
            
            .chat-message.user {
                background: var(--warn-subtle);
                border: 1px solid var(--warn-subtle);
                color: var(--warn);
                margin-left: 20px;
            }
            
            .chat-message.assistant {
                background: var(--ok-subtle);
                border: 1px solid var(--accent-subtle);
                color: var(--text);
                margin-right: 20px;
            }

            .chat-message.streaming {
                border-color: transparent;
            }

            .chat-message.streaming::before {
                content: "";
                position: absolute;
                inset: -2px;
                padding: 1px;
                border-radius: inherit;
                background: conic-gradient(from 0deg, transparent 0deg, transparent 220deg, var(--accent, rgba(99,102,241,0.65)) 260deg, var(--accent-subtle) 320deg, transparent 360deg);
                -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                animation: chat-sweep 1.6s linear infinite;
                opacity: 0.9;
                pointer-events: none;
            }

            .chat-message.fade-in::after {
                content: "";
                position: absolute;
                inset: -1px;
                padding: 1px;
                border-radius: inherit;
                background: conic-gradient(from 0deg, transparent 0deg, transparent 240deg, var(--accent-glow) 280deg, rgba(34, 197, 94, 0) 340deg, transparent 360deg);
                -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                animation: chat-arrival 1.1s ease-out 1;
                opacity: 0.6;
                pointer-events: none;
            }

            @keyframes chat-sweep {
                to { transform: rotate(360deg); }
            }

            @keyframes chat-arrival {
                0% { transform: rotate(0deg); opacity: 0.7; }
                100% { transform: rotate(360deg); opacity: 0; }
            }
            
            .chat-input-area {
                padding: 12px;
                border-top: 1px solid var(--accent-subtle);
            }
            
            .chat-input-row {
                display: flex;
                gap: 8px;
            }
            
            .chat-input {
                flex: 1;
                padding: 10px 14px;
                background: var(--panel);
                border: 1px solid var(--accent-glow);
                border-radius: 8px;
                color: var(--text);
                font-size: 0.9rem;
                outline: none;
            }
            
            .chat-input:focus {
                border-color: var(--ok);
            }
            
            .chat-send-btn {
                padding: 10px 16px;
                background: var(--accent-subtle);
                border: 1px solid var(--ok);
                border-radius: 8px;
                color: var(--ok);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .chat-send-btn:hover {
                background: var(--accent-glow);
            }
            
            .chat-send-btn svg {
                width: 16px;
                height: 16px;
            }
        </style>

        <div class="ide-notebook">
            <div class="notebook-main">
                <div class="notebook-toolbar">
                    <button class="toolbar-btn" @click=${() => callbacks.onCellAdd?.("code")}>
                        ${icons.plus} Code
                    </button>
                    <button class="toolbar-btn" @click=${() => callbacks.onCellAdd?.("markdown")}>
                        ${icons.fileText} Text
                    </button>
                    <div style="flex: 1;"></div>
                    <button class="toolbar-btn" @click=${callbacks.onTerminalToggle}>
                        ${icons.terminal} Terminal
                    </button>
                    <button class="toolbar-btn" @click=${callbacks.onSettingsToggle}>
                        ${icons.settings}
                    </button>
                </div>
                
                <div class="notebook-cells">
                    ${state.cells.map(cell =>
        renderCell(cell, cell.id === state.activeCellId, callbacks)
    )}
                    
                    ${state.cells.length === 0 ? html`
                        <div class="empty-state" style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                            <div style="font-size: 48px; margin-bottom: 16px;">${icons.code}</div>
                            <div style="font-size: 1.1rem; margin-bottom: 8px;">No cells yet</div>
                            <div style="font-size: 0.9rem;">Click "+ Code" or "+ Text" to add your first cell</div>
                        </div>
                    ` : nothing}
                </div>
            </div>
            
            ${state.chatVisible ? html`
                <div class="chat-sidebar">
                    <div class="chat-header">
                        ${icons.messageSquare} AI Assistant
                    </div>
                    <div class="chat-messages">
                        ${state.chatMessages.map(msg => html`
                            <div class="chat-message ${msg.role} fade-in">${msg.content}</div>
                        `)}
                        ${state.chatLoading ? html`
                            <div class="chat-message assistant streaming">${icons.loader} Thinking...</div>
                        ` : nothing}
                    </div>
                    <div class="chat-input-area">
                        <div class="chat-input-row">
                            <input
                                type="text"
                                class="chat-input"
                                placeholder="Ask AI for help..."
                                .value=${state.chatInput}
                                @input=${(e: Event) => callbacks.onChatInputChange((e.target as HTMLInputElement).value)}
                                @keydown=${(e: KeyboardEvent) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    callbacks.onChatSend();
                }
            }}
                            />
                            <button class="chat-send-btn" @click=${callbacks.onChatSend}>
                                ${icons.send}
                            </button>
                        </div>
                    </div>
                </div>
            ` : nothing}
        </div>
    `;
}
