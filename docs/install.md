# Deployment Protocol (v2026.2)

<div align="center">
  <img src="https://img.shields.io/badge/Status-Stable-000000?style=flat-square" alt="Status">
  <img src="https://img.shields.io/badge/Clearance-Public-gray?style=flat-square" alt="Clearance">
</div>

## 1.0 Infrastructure Prerequisite

AeonSage is a **high-concurrency cognitive runtime**. To ensure deterministic execution, the host environment must meet the following specifications.

| Component | Specification | Rationale |
| :--- | :--- | :--- |
| **Runtime Engine** | Node.js ≥ 22.0.0 (V8) | Required for advanced async context tracking. |
| **Package Manager** | pnpm ≥ 10.x | Strict dependency isolation and lockfile integrity. |
| **Memory** | 4GB RAM (Minimum) | Support for local vector stores (ChromaDB). |
| **Storage** | 10GB SSD | Low-latency I/O for vector retrieval. |
| **Network** | Egress: 443 (HTTPS) | Connectivity to LLM providers (if not fully air-gapped). |

## 2.0 Initialization Sequence

The installation process is designed to be **atomic** and **reproducible**.

### 2.1 Repository Cloning & Verification
We recommend cloning directly from the source to ensure cryptographic integrity of the git history.

```bash
# 1. Clone the Sovereign Repository
git clone https://github.com/Vleonone/Aeonsagepro.git

# 2. Enter the Cognitive Workspace
cd Aeonsagepro
```

### 2.2 Dependency Hydration
AeonSage utilizes a monolithic repository structure powered by `pnpm` workspaces.

```bash
# 3. Enable Corepack (Node.js strict version manager)
corepack enable

# 4. Hydrate Dependencies (Frozen Lockfile)
pnpm install --frozen-lockfile
```

### 2.3 Compilation
The TypeScript codebase must be transpiled to a high-performance JavaScript runtime artifact.

```bash
# 5. Compile Source Code
pnpm build
```

## 3.0 Activation (Zero-Trust Handshake)

Before the system accepts cognitive loads, it must be initialized with a local identity.

```bash
# 6. Asset Genesis (Interactive)
pnpm aeonsage onboard
```

The `onboard` process performs the following cryptographic assertions:
1.  Generates a local `did:vdid` identity.
2.  Establishes the "God Key" for administrative override.
3.  Initializes the secure storage enclave.

## 4.0 Runtime execution

```bash
# 7. Ignite Gateway
pnpm aeonsage gateway
```

**System Status**: The Gateway will bind to `127.0.0.1:18789` by default. This local binding is a security feature, preventing accidental exposure to the public internet.

---

## 5.0 Docker Deployment (Containerized Isolation)

For institutional environments requiring strict strict process isolation.

```bash
docker run -d \
  --name aeonsage-runtime \
  -p 18789:18789 \
  -v $(pwd)/data:/app/data \
  aeonsage/gateway:latest
```
