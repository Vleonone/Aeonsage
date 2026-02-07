# VDID Integration Guide

## Overview

This guide covers integrating AeonSage with VDID (Verifiable Decentralized Identity) for sovereign bot identity management.

---

## Quick Setup

AeonSage integration with VDID requires three components:

### 1. API Credentials

Issued by VDID administrator:

```env
VDID_API_KEY=vdid_xxxxxxxxxxxx
VDID_SECRET_KEY=xxxxxxxxxxxxxxxx
```

> ⚠️ `secretKey` is displayed only once. Store it securely.

### 2. Base URL

```env
VDID_BASE_URL=https://api.vdid.io
```

### 3. Configure AeonSage

```bash
# Method 1: Environment variables
export VDID_API_KEY=vdid_xxxxxxxxxxxx
export VDID_SECRET_KEY=xxxxxxxxxxxxxxxx
export VDID_BASE_URL=https://api.vdid.io

# Method 2: Using configuration command
pnpm aeonsage vdid configure
```

---

## HMAC Signature Algorithm

All Internal API requests require HMAC-SHA256 signatures:

```typescript
// 1. Derive HMAC Key
const hmacKey = crypto.createHash("sha256").update(secretKey).digest("hex");

// 2. Construct signature message
const timestamp = Math.floor(Date.now() / 1000).toString();
const message = `${METHOD}${PATH}${timestamp}${BODY}`;

// 3. Generate signature
const signature = crypto.createHmac("sha256", hmacKey).update(message).digest("hex");

// 4. Add request headers
headers = {
  "Content-Type": "application/json",
  "X-API-Key": keyId,
  "X-Timestamp": timestamp,
  "X-Signature": signature
};
```

---

## API Endpoints

### Bot Identity Registration

```http
POST /api/internal/identity/register
Scope: write:identity
```

**Request:**
```json
{
  "serviceName": "AeonSage",
  "network": "base"
}
```

**Response:**
```json
{
  "success": true,
  "identity": {
    "vid": "VID-XXXX-XXXX-XXXX",
    "did": "did:vdid:base:a1b2c3d4e5f67890a1b2c3d4e5f67890",
    "serviceName": "AeonSage",
    "network": "base",
    "status": "active",
    "vscoreTotal": 20,
    "vscoreLevel": "Unverified",
    "registeredAt": "2026-02-01T12:00:00Z"
  },
  "didDocument": {
    "@context": ["https://www.w3.org/ns/did/v1"],
    "id": "did:vdid:base:a1b2c3d4...",
    "controller": "did:vdid:base:a1b2c3d4...",
    "verificationMethod": [{
      "id": "did:vdid:base:...#key-1",
      "type": "EcdsaSecp256k1VerificationKey2019",
      "controller": "did:vdid:base:..."
    }],
    "authentication": ["did:vdid:base:...#key-1"],
    "created": "2026-02-01T12:00:00Z",
    "updated": "2026-02-01T12:00:00Z"
  }
}
```

---

### Query Self Identity

```http
GET /api/internal/identity/me
Scope: read:identity
```

**Response:**
```json
{
  "vid": "VID-XXXX-XXXX-XXXX",
  "did": "did:vdid:base:a1b2c3d4...",
  "serviceName": "AeonSage",
  "network": "base",
  "status": "active",
  "vscoreTotal": 45,
  "vscoreLevel": "Verified",
  "registeredAt": "2026-02-01T12:00:00Z"
}
```

---

### Query User

```http
GET /api/internal/users/:vid
Scope: read:users
```

---

### Query V-Score

```http
GET /api/internal/users/:vid/vscore
Scope: read:vscore
```

**Response:**
```json
{
  "vid": "VID-XXXX-XXXX-XXXX",
  "score": 45,
  "components": {
    "verification": 10,
    "activity": 8,
    "holdings": 5,
    "age": 7
  },
  "updatedAt": "2026-02-01T12:00:00Z"
}
```

---

### Eligibility Check

```http
POST /api/internal/eligibility/check
Scope: read:eligibility
```

**Request:**
```json
{
  "vid": "VID-XXXX-XXXX-XXXX",
  "requirement": "premium"
}
```

---

### Public DID Resolution

```http
GET /api/v1/identifiers/:did
No authentication required
```

---

## Error Codes

| Code | Message | Description |
|:-----|:--------|:------------|
| 401 | Invalid signature | HMAC signature error |
| 401 | Timestamp expired | Timestamp exceeds 60 seconds |
| 401 | Invalid API key | API Key invalid or revoked |
| 403 | Insufficient scope | Missing required scope |
| 404 | Identity not found | DID/VID does not exist |
| 409 | Identity already registered | Duplicate registration |
| 429 | Rate limit exceeded | Request rate too high |

---

## Configuration File Locations

```
~/.aeonsage/
├── .vdid_config          # VDID API configuration (encrypted)
├── identity.json         # Bot identity information
├── .keys/                # Private key storage
└── BIRTH_CERTIFICATE.md  # Birth certificate
```

---

## Testing Connection

```bash
# Verify configuration is correct
pnpm aeonsage identity show

# If VDID is configured, will display:
# DID: did:vdid:base:xxx
# Status: registered

# If not configured or failed, will display:
# DID: {{PENDING:base}} or local:xxx
```

---

## Contact

- VDID Documentation: https://docs.vdid.io
- API Status: https://status.vdid.io
- Technical Support: support@vdid.io

---

*Sovereign Bot Identity — AeonSage × VDID.IO*
