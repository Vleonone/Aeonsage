# Safety Controls Guide

## Overview

AeonSage implements multi-layered safety controls ensuring bots operate within authorized boundaries.

---

## Core Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Bot Lifecycle                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. First Boot (Bot Birth)                                      │
│  └── Generate identity, wallet, DID                             │
│  └── Display authorization agreement                            │
│  └── User signs + sets God Key                                  │
│                                                                 │
│  2. Daily Operation                                             │
│  └── Low-risk operations → Auto-execute                         │
│  └── Medium-risk operations → PIN confirmation                  │
│  └── High-risk operations → Wait for authorization              │
│                                                                 │
│  3. Resource Requests                                           │
│  └── Bot explains need → User approves → Execute                │
│                                                                 │
│  4. Emergency Situations                                        │
│  └── Kill Switch → Immediate stop                               │
│  └── God Key → Wake/Reset                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Bot Birth Process

### First Startup

```
┌─────────────────────────────────────────────────────────────────┐
│  Bot Birth Ceremony                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Generating...                                                  │
│  ✓ Bot ID: aeon-3f8a7b2c1d4e5f60                               │
│  ✓ DID: did:vdid:base:abc123def456789012345678901234ab         │
│  ✓ Wallets: 0x3f8a... (ETH), 7Xb2... (SOL)                     │
│                                                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                 │
│  Authorization Agreement                                        │
│                                                                 │
│  You are about to activate an AeonSage Bot. Please read and    │
│  agree to the following terms:                                  │
│                                                                 │
│  1. Bot acts within your authorized scope                       │
│  2. High-risk operations require your confirmation              │
│  3. You can use Kill Switch to stop the Bot at any time         │
│  4. God Key is the ultimate safety measure                      │
│                                                                 │
│  [Read Full Agreement]                                          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Set God Key (minimum 16 characters):                    │   │
│  │ [________________________________]                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [✓ I have read and agree] [Activate Bot]                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Operation Authorization

### Risk Levels and Verification

| Risk Level | Example Operations | Verification Method |
|:-----------|:-------------------|:--------------------|
| **LOW** | Read files, search | No verification |
| **MEDIUM** | Write files, execute commands | PIN confirmation |
| **HIGH** | Delete files, call external APIs | Voice/TOTP |
| **CRITICAL** | Wallet transfers, sensitive data | Biometric + password |

### Example: Bot Requests Command Execution

```
┌─────────────────────────────────────────────────────────────────┐
│  Safety Gate - Operation Authorization Request                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Bot requests to execute the following operation:               │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Operation: shell.exec                                   │   │
│  │ Command: npm install lodash                             │   │
│  │ Risk: MEDIUM                                            │   │
│  │ Reason: Install dependencies for data processing        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Enter PIN to confirm:                                          │
│  [____]                                                         │
│                                                                 │
│  [Approve] [Reject] [View Details]                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2.5 Heuristic Sentinel

AeonSage introduces the **L3 Content Inspection Layer** that performs deep scanning of operations before submission to the Safety Gate.

### How It Works

The Sentinel engine uses heuristic algorithms and pattern signatures to scan commands and file content, identifying potentially malicious patterns.

- **Scan Targets**: Shell commands, file write content, script parameters
- **Threat Levels**:
  - `CRITICAL`: Fatal threats (e.g., `rm -rf /`, Fork Bomb, disk wipe) → **Mandatory block/red alert**
  - `HIGH`: High-risk operations (e.g., reverse shell, data exfiltration) → **Strong warning**
  - `MEDIUM/LOW`: Suspicious patterns → **User notification**

### Block Example

When Sentinel detects a high-risk command (e.g., attempting to delete root directory), the UI displays a red alert:

```
┌─────────────────────────────────────────────────────────────────┐
  ⛔ CRITICAL THREAT DETECTED
  Pattern: Recursive Root Deletion
  Snippet: rm -rf /
└─────────────────────────────────────────────────────────────────┘
```

> **Note**: Sentinel's decision priority is higher than standard Safety Gate configurations. Even if "File Deletion" is set to auto-approve, Sentinel will force a block if malicious patterns are detected.

---

## 3. Resource Request Process

### Bot Resource Request

```
┌─────────────────────────────────────────────────────────────────┐
│  Resource Request                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Bot requests the following resources:                          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Type: funds                                             │   │
│  │ Amount: 50 USDT                                         │   │
│  │ Purpose: Purchase API credits for data analysis         │   │
│  │ Expected Result: Complete market analysis report        │   │
│  │ Risk Assessment: Low risk, API consumption only         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Authorization Level:                                           │
│  ○ Restricted - Approval required for each use                  │
│  ● Full Authorization - "50 allocated for discretionary use"   │
│                                                                 │
│  [Approve] [Reject] [Modify Amount]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Emergency Controls

### Kill Switch

```
┌─────────────────────────────────────────────────────────────────┐
│  KILL SWITCH - Emergency Stop                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Activation Methods:                                            │
│  • CLI: aeonsage kill                                           │
│  • UI: Click red KILL button                                    │
│  • File: Create ~/.aeonsage/KILL                                │
│                                                                 │
│  Effects:                                                       │
│  • Immediately stop all Bot activities                          │
│  • Cancel all pending tasks                                     │
│  • Send notification                                            │
│                                                                 │
│  Recovery:                                                      │
│  • CLI: aeonsage resume (requires God Key)                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### God Key Operations

```
┌─────────────────────────────────────────────────────────────────┐
│  GOD KEY - Ultimate Control                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Available Operations:                                          │
│  • kill_all  - Stop all Bots                                    │
│  • reset     - Reset to initial state                           │
│  • wake      - Wake unresponsive Bot                            │
│  • lockdown  - Full system lockdown                             │
│  • unlock    - Release lockdown                                 │
│                                                                 │
│  ⚠️ God Key is the last resort. Keep it secure.                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Priority Hierarchy

```
God Key (Highest) > Kill Switch > Authorization > Safety Gate > Default
```

**Core Principles**:
- **Orders are absolute**: Once authorized, Bot must execute
- **No action without authorization**: Operations beyond scope are rejected
- **User supremacy**: User can stop or control Bot at any time

---

## Configuration Files

All configurations are stored in `~/.aeonsage/` directory:

| File | Description |
|:-----|:------------|
| `identity.json` | Bot identity information |
| `.godkey` | God Key hash (hidden) |
| `.system_key` | System encryption key (hidden) |
| `safety_gates.json` | Gate configuration |
| `accounts.json` | Account pool |
| `resource_grants.json` | Resource authorizations |

---

*Last updated: 2026-02-06*
