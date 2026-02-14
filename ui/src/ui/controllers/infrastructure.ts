/**
 * Infrastructure Controller
 * Manages remote node status and human emulation tools state
 * Now with real RPC calls
 */

import type { AppViewState } from "../app-view-state.js";
import type { InfrastructureProps, RemoteNode, ToolStatus } from "../views/infrastructure.js";

export type InfrastructureState = {
    loading: boolean;
    error: string | null;
    localGateway: {
        connected: boolean;
        url: string;
        uptime?: string;
        version?: string;
        pid?: number;
    };
    remoteNodes: RemoteNode[];
    tools: ToolStatus[];
    lastRefresh: number | null;
};

export function createInfrastructureState(): InfrastructureState {
    return {
        loading: false,
        error: null,
        localGateway: {
            connected: false,
            url: "",
            uptime: undefined,
            version: undefined,
            pid: undefined,
        },
        remoteNodes: [],
        tools: [],
        lastRefresh: null,
    };
}

/**
 * Load infrastructure status from backend
 */
export async function loadInfrastructureStatus(state: AppViewState): Promise<void> {
    if (!state.infrastructureState) {
        state.infrastructureState = createInfrastructureState();
    }

    state.infrastructureState = {
        ...state.infrastructureState,
        loading: true,
        error: null,
    };

    try {
        if (!state.client || !state.connected) {
            throw new Error("Not connected to Gateway");
        }

        // Load gateway status
        const statusRes = await state.client.request("status", {}) as {
            uptime?: string;
            version?: string;
            pid?: number;
        } | null;

        // Load health info
        const healthRes = await state.client.request("health", {}) as {
            status?: string;
            memory?: { used: number; total: number };
            cpu?: number;
        } | null;

        // Load remote nodes
        const nodesRes = await state.client.request("node.list", {}) as {
            nodes?: Array<{
                id: string;
                name: string;
                host: string;
                port: number;
                status: "online" | "offline" | "connecting";
                uptime?: string;
                memory?: string;
                cpu?: string;
                version?: string;
                lastSeen?: number;
            }>;
        } | null;

        // Build tools list based on system capabilities
        const defaultTools: ToolStatus[] = [
            {
                name: "human_typing",
                label: "Human Typing",
                enabled: true,
                description: "Simulate natural human typing patterns with realistic delays",
            },
            {
                name: "human_mouse",
                label: "Human Mouse",
                enabled: true,
                description: "Bezier curve mouse movement with human-like acceleration",
            },
            {
                name: "human_browser",
                label: "Stealth Browser",
                enabled: true,
                description: "Puppeteer with stealth plugin for anti-detection",
            },
            {
                name: "captcha_solver",
                label: "CAPTCHA Solver",
                enabled: true,
                description: "Automated CAPTCHA solving via 2Captcha/CapSolver APIs",
            },
        ];

        state.infrastructureState = {
            ...state.infrastructureState,
            loading: false,
            error: null,
            localGateway: {
                connected: true,
                url: state.gatewayUrl || "ws://localhost:24678",
                uptime: statusRes?.uptime,
                version: statusRes?.version,
                pid: statusRes?.pid,
            },
            remoteNodes: nodesRes?.nodes || [],
            tools: defaultTools,
            lastRefresh: Date.now(),
        };
    } catch (err) {
        state.infrastructureState = {
            ...state.infrastructureState,
            loading: false,
            error: String(err),
            localGateway: {
                ...state.infrastructureState.localGateway,
                connected: false,
            },
        };
    }
}

/**
 * Connect to a remote node
 */
export async function connectRemoteNode(state: AppViewState, nodeId: string): Promise<void> {
    if (!state.client || !state.connected) return;

    try {
        await state.client.request("node.connect", { nodeId });
        // Refresh status after connecting
        await loadInfrastructureStatus(state);
    } catch (err) {
        if (state.infrastructureState) {
            state.infrastructureState = {
                ...state.infrastructureState,
                error: `Failed to connect: ${err}`,
            };
        }
    }
}

/**
 * Disconnect from a remote node
 */
export async function disconnectRemoteNode(state: AppViewState, nodeId: string): Promise<void> {
    if (!state.client || !state.connected) return;

    try {
        await state.client.request("node.disconnect", { nodeId });
        // Refresh status after disconnecting
        await loadInfrastructureStatus(state);
    } catch (err) {
        if (state.infrastructureState) {
            state.infrastructureState = {
                ...state.infrastructureState,
                error: `Failed to disconnect: ${err}`,
            };
        }
    }
}

export function updateInfrastructureFromGateway(
    state: InfrastructureState,
    connected: boolean,
    gatewayUrl: string,
    uptime?: string
): InfrastructureState {
    return {
        ...state,
        localGateway: {
            ...state.localGateway,
            connected,
            url: gatewayUrl,
            uptime,
        },
        lastRefresh: Date.now(),
    };
}

export function setInfrastructureLoading(
    state: InfrastructureState,
    loading: boolean
): InfrastructureState {
    return { ...state, loading };
}

export function updateRemoteNodeStatus(
    state: InfrastructureState,
    nodeId: string,
    status: RemoteNode["status"],
    updates?: Partial<RemoteNode>
): InfrastructureState {
    return {
        ...state,
        remoteNodes: state.remoteNodes.map((node) =>
            node.id === nodeId ? { ...node, status, ...updates } : node
        ),
    };
}

export function resolveInfrastructureProps(
    state: InfrastructureState,
    callbacks: {
        onRefresh: () => void;
        onConnectNode: (nodeId: string) => void;
        onDisconnectNode: (nodeId: string) => void;
        onConnectRemote: (url: string) => void;
    }
): InfrastructureProps {
    return {
        loading: state.loading,
        localGateway: state.localGateway,
        remoteNodes: state.remoteNodes,
        tools: state.tools,
        lastRefresh: state.lastRefresh,
        ...callbacks,
    };
}
