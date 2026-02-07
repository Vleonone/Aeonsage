summary: "Gateway deployment scripts and update workflow"
read_when:
  - You are deploying AeonSage Gateway on a server
  - You need to update a running Gateway safely
---
# Gateway deployment

This page documents the repository deployment scripts and the intended update workflow.
Use these scripts for server installs where you manage the host directly (Linux or Windows).

## Linux (recommended for servers)

### `deploy.sh` (simple bootstrap)

`deploy.sh` is a small bootstrap helper that:
- Installs Node 22, pnpm, and pm2
- Clones or pulls the repo into `/opt/aeonsage`
- Runs `pnpm install` and `pnpm build`
- Starts or reloads the Gateway via pm2

Typical use:

```bash
bash deploy.sh
```

Notes:
- If the repo is private, use SSH or configure credentials before running the script.
- The script runs `git pull origin main` for updates.

### `scripts/deploy/install.sh` (structured installer)

This script performs a more structured install/update path and is the preferred
Linux deployment script when you want repeatability.

Key behaviors:
- Uses `git pull` when the repo already exists, otherwise clones it.
- Ensures pm2 is installed and used to start `dist/index.js` as `aeonsage-gateway`.

## Windows

### `scripts/deploy/install.ps1`

This PowerShell script provides a Windows deployment path using pm2:
- Installs or validates Node + pnpm
- Builds the project
- Starts the Gateway with pm2

Run from an elevated PowerShell session:

```powershell
PowerShell -ExecutionPolicy Bypass -File scripts\deploy\install.ps1
```

## Update workflow

1) Pull latest code:
```bash
git pull origin main
```

2) Rebuild:
```bash
pnpm install
pnpm build
```

3) Reload the Gateway:
```bash
pm2 reload aeonsage-gateway
```

## Post-deploy checks

```bash
aeonsage doctor
aeonsage channels status --probe
```

These commands validate config, channel connectivity, and common issues.
