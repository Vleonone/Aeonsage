/**
 * VDID Client Stub for Open Source Edition
 *
 * This file replaces the full proprietary implementation in open source builds.
 * It provides the same interface but with no-op or limited functionality.
 */

/** VDID client config (stub) */
export interface VDIDClientConfig {
  baseUrl: string;
  keyId: string;
  secretKey: string;
}

/** VDID user (stub) */
export interface VDIDUser {
  vid: string;
  did?: string;
  walletAddress?: string;
  email?: string;
  vscore?: number;
  createdAt: string;
}

/** V-Score (stub) */
export interface VScore {
  vid: string;
  score: number;
  components: {
    verification: number;
    activity: number;
    holdings: number;
    age: number;
  };
  updatedAt: string;
}

/** Eligibility result (stub) */
export interface EligibilityResult {
  eligible: boolean;
  reason?: string;
  requirements?: string[];
}

/** VDID API error (stub) */
export class VDIDAPIError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(`VDID API Error [${status}]: ${body}`);
    this.name = "VDIDAPIError";
    this.status = status;
    this.body = body;
  }
}

export class VDIDClient {
  constructor(_config?: VDIDClientConfig) {}

  async verify(_identity: unknown): Promise<{ valid: boolean; tier: string }> {
    return { valid: true, tier: "open-source" };
  }

  async sign(_data: string): Promise<string> {
    return "signature-stub";
  }

  async getPublicKey(): Promise<string> {
    return "public-key-stub";
  }

  async getUser(_vid: string): Promise<VDIDUser | null> {
    return null;
  }

  async resolveDID(_did: string): Promise<VDIDUser | null> {
    return null;
  }

  async registerIdentity(_data: unknown): Promise<unknown> {
    return null;
  }

  async checkActivationStatus(_vid: string): Promise<{ activated: boolean }> {
    return { activated: false };
  }

  async getMyIdentity(): Promise<{
    vid: string;
    did: string;
    serviceName: string;
    network: string;
    status: string;
    vscoreTotal: number;
    vscoreLevel: string;
    registeredAt: string;
  }> {
    return {
      vid: "",
      did: "",
      serviceName: "aeonsage-oss",
      network: "open-source",
      status: "inactive",
      vscoreTotal: 0,
      vscoreLevel: "none",
      registeredAt: new Date().toISOString(),
    };
  }

  async getVScore(_vid: string): Promise<VScore> {
    return {
      vid: "",
      score: 0,
      components: { verification: 0, activity: 0, holdings: 0, age: 0 },
      updatedAt: new Date().toISOString(),
    };
  }

  async updateVScore(
    _vid: string,
    _changes: { component: string; delta: number; reason: string },
  ): Promise<VScore> {
    return this.getVScore(_vid);
  }

  async checkEligibility(_vid: string, _requirement: string): Promise<EligibilityResult> {
    return { eligible: false, reason: "Open Source mode — VDID eligibility not available." };
  }
}

/** Save VDID config (no-op in OSS) */
export function saveVDIDConfig(_config: VDIDClientConfig): void {
  console.warn("[VDID] Config management is not available in Open Source mode.");
}

/** Load VDID config (returns null in OSS) */
export function loadVDIDConfig(): VDIDClientConfig | null {
  return null;
}

/** Create VDID client from config (returns null in OSS) */
export function createVDIDClient(): VDIDClient | null {
  return null;
}

/** Mask API key ID for logs */
export function maskKeyId(keyId: string): string {
  if (keyId.length < 10) return "****";
  return `${keyId.slice(0, 6)}****${keyId.slice(-4)}`;
}
