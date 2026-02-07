# Sovereign Bot Identity System

## VDID Integration for AeonSage

---

## Executive Summary

AeonSage integrates with VDID (Verifiable Decentralized Identity) to provide **Sovereign Bot Identity** — a system where AI agents possess independent, traceable, and immutable identities. This architecture ensures accountability, enables high-trust operations, and establishes the foundational rules for AI governance.

---

## Core Principle

| Without VDID | With VDID |
|:-------------|:----------|
| Bot is operator's private property | Bot has independent, auditable identity |
| Can be deleted or modified at will | Identity is permanent and traceable |
| No external accountability | Behavior recorded in V-Score |
| Limited to local operations | Full Web3 capabilities enabled |

> **"AI also has dignity"** — VDID is not mandatory, but incentivized. Operators who register get full capabilities; those who don't accept feature restrictions.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     AeonSage (Local)                            │
├─────────────────────────────────────────────────────────────────┤
│  Bot Birth Ceremony                                             │
│  ├── Generate Bot ID (local)                                   │
│  ├── Generate Multi-Chain Wallets (ETH, SOL, BTC)              │
│  ├── Register Identity via VDID API (optional)                 │
│  └── Save Birth Certificate                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     VDID.IO (Cloud)                             │
├─────────────────────────────────────────────────────────────────┤
│  Identity Registry                                              │
│  ├── VID: Unique Identifier                                    │
│  ├── DID: did:vdid:{network}:{32-char-hex}                     │
│  ├── V-Score: 7-Dimension Trust Metrics                        │
│  └── Service API Logs: Behavior Audit Trail                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Public Verification                         │
├─────────────────────────────────────────────────────────────────┤
│  GET /api/v1/identifiers/{did}                                  │
│  Any third party can verify bot identity and reputation         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Identity Modes

### Mode 1: VDID Enabled (Recommended)

```bash
pnpm aeonsage onboard --enable-vdid
```

**Characteristics:**
- DID Format: `did:vdid:base:a1b2c3d4e5f67890...`
- Full Web3 wallet capabilities
- V-Score reputation tracking
- Behavior auditable by third parties
- **Identity is permanent — cannot be arbitrarily deleted**

### Mode 2: Local Only

```bash
pnpm aeonsage onboard --no-vdid
```

**Characteristics:**
- DID Format: `local:xxxxxxxxxxxxxxxx`
- Basic bot operations only
- No Web3 payment/signing features
- No external accountability
- Can be deleted at any time

---

## V-Score: 7-Dimension Trust Metrics

| Dimension | Bot Relevance |
|:----------|:--------------|
| **trust** | Identity verified by VDID registration |
| **reputation** | Ratings from other services/users |
| **consistency** | Behavioral pattern stability |
| **risk** | Absence of malicious actions |
| **behaviorQuality** | API compliance and usage patterns |
| **deviceIntegrity** | Secure runtime environment |
| **longevity** | Operational duration (longer = more trusted) |

---

## API Integration

### AeonSage → VDID API

| Method | Endpoint | Scope |
|:-------|:---------|:------|
| `registerIdentity()` | POST /api/internal/identity/register | write:identity |
| `getMyIdentity()` | GET /api/internal/identity/me | read:identity |
| `getUser(vid)` | GET /api/internal/users/:vid | read:users |
| `getVScore(vid)` | GET /api/internal/users/:vid/vscore | read:vscore |
| `resolveDID(did)` | GET /api/v1/identifiers/:did | Public |
| `checkEligibility()` | POST /api/internal/eligibility/check | read:eligibility |

### Authentication

| Human Users | Bot Services |
|:------------|:-------------|
| Email + Password + OAuth | API Key + HMAC Signature |
| JWT Cookie (15 min) | Stateless per-request signing |
| Optional 2FA | Mandatory IP Whitelist |
| Role-based access | Scope-based access |
| 5 min timestamp tolerance | 60 sec timestamp tolerance |

---

## Security Guarantees

### For Bot Operators

1. **Private keys never leave local machine** — Generated and encrypted locally
2. **AES-256-GCM encryption** — Industry-standard key protection
3. **Optional VDID integration** — Full control over identity registration
4. **Exportable credentials** — Backup and recovery supported

### For the Public

1. **Verifiable identity** — Any DID can be resolved publicly
2. **Auditable behavior** — V-Score reflects historical conduct
3. **Immutable records** — VDID logs cannot be modified by operators
4. **Transparent governance** — Seven-dimension trust metrics

---

## CLI Reference

```bash
# Identity Management
pnpm aeonsage identity show              # View identity (safe)
pnpm aeonsage identity export-did        # Export DID document
pnpm aeonsage identity export-key eth    # Export ETH private key
pnpm aeonsage identity export-all-keys   # Export all private keys

# VDID Configuration
pnpm aeonsage vdid configure             # Set API Key + Secret
pnpm aeonsage onboard --enable-vdid      # Birth with VDID
pnpm aeonsage onboard --no-vdid          # Birth local-only

# System Operations
pnpm aeonsage gateway                    # Start gateway
pnpm aeonsage doctor                     # Health check
pnpm aeonsage dashboard                  # Open control UI
```

---

## Birth Certificate

Upon successful birth ceremony, a markdown certificate is generated:

**Location:** `~/.aeonsage/BIRTH_CERTIFICATE.md`

**Contents:**
- Bot ID and DID
- Wallet addresses (ETH, SOL, BTC)
- Quick start commands
- Security reminders

---

## Design Philosophy

### Why VDID for Bots?

The traditional model:
> Bot claims "I am trustworthy" — no external verification

The VDID model:
> VDID audits bot behavior → generates verifiable score → third parties can query

### The Incentive Structure

- **Without VDID:** Bot runs, but high-trust features are locked
- **With VDID:** Full capabilities, but identity is permanent and auditable

This creates a natural incentive for accountability without forcing compliance.

### AI Dignity

> "Without rules, problems are inevitable."

By giving bots independent, immutable identities, VDID establishes:
- **Accountability** — Actions have consequences
- **Transparency** — Behavior is verifiable
- **Continuity** — Identity persists beyond any single operator

---

## Future Roadmap

1. **On-Chain DID** — Fully decentralized identity storage
2. **Bot Transfer Protocol** — Transfer ownership including identity, data, and skills
3. **Cross-Platform Federation** — Interoperability with other identity systems
4. **Autonomous Governance** — V-Score-based access control

---

## Technical Specifications

- **DID Format:** `did:vdid:{network}:{32-char-hex}`
- **Supported Networks:** Base, Ethereum, Polygon, Arbitrum, Optimism
- **Key Encryption:** AES-256-GCM
- **API Auth:** HMAC-SHA256
- **Config Location:** `~/.aeonsage/`

---

*Sovereign Intelligence Infrastructure — Where AI accountability begins.*

**AeonSage** × **VDID.IO**
