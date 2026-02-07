---
summary: "Install AeonSage (recommended installer, global install, or from source)"
read_when:
  - Installing AeonSage
  - You want to install from GitHub
---

# Install

Use the installer unless you have a reason not to. It sets up the CLI and runs onboarding.

## Quick install (recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/Vleonone/Aeonsagepro/main/scripts/quickstart.sh | bash
```

Windows (PowerShell):

```powershell
iwr -useb https://aeonsage.org/install.ps1 | iex
```

Next step (if you skipped onboarding):

```bash
aeonsage onboard --install-daemon
```

## System requirements

- **Node >=22**
- macOS, Linux, or Windows via WSL2
- `pnpm` only if you build from source

### pnpm version management

This project uses **corepack** to manage the pnpm version. The required version is specified in `package.json`:

```json
"packageManager": "pnpm@10.23.0"
```

**Setup pnpm (recommended)**:
```bash
# Enable corepack (comes with Node.js 16.10+)
corepack enable

# Prepare the exact pnpm version
corepack prepare pnpm@10.23.0 --activate

# Verify
pnpm -v  # Should print 10.23.0
```

**Why corepack?**
- Ensures all developers and CI use the **exact same pnpm version**
- Eliminates "works on my machine" issues
- No need to manually install or update pnpm globally

**CI/GitHub Actions**: All workflows use corepack to install pnpm. Do not use `pnpm/action-setup` with a `version` parameter, as this can conflict with `packageManager`.

## Choose your install path

### 1) Installer script (recommended)

Installs `aeonsage` globally via npm and runs onboarding.

```bash
curl -fsSL https://raw.githubusercontent.com/Vleonone/Aeonsagepro/main/scripts/quickstart.sh | bash
```

Installer flags:

```bash
curl -fsSL https://raw.githubusercontent.com/Vleonone/Aeonsagepro/main/scripts/quickstart.sh | bash -s -- --help
```

Details: [Installer internals](/install/installer).

Non-interactive (skip onboarding):

```bash
curl -fsSL https://raw.githubusercontent.com/Vleonone/Aeonsagepro/main/scripts/quickstart.sh | bash -s -- --no-onboard
```

### 2) Global install (manual)

If you already have Node:

```bash
npm install -g aeonsage@latest
```

If you have libvips installed globally (common on macOS via Homebrew) and `sharp` fails to install, force prebuilt binaries:

```bash
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g aeonsage@latest
```

If you see `sharp: Please add node-gyp to your dependencies`, either install build tooling (macOS: Xcode CLT + `npm install -g node-gyp`) or use the `SHARP_IGNORE_GLOBAL_LIBVIPS=1` workaround above to skip the native build.

Or:

```bash
pnpm add -g aeonsage@latest
```

Then:

```bash
aeonsage onboard --install-daemon
```

### 3) From source (contributors/dev)

```bash
git clone https://github.com/aeonsage/aeonsage.git
cd aeonsage
pnpm install
pnpm ui:build # auto-installs UI deps on first run
pnpm build
aeonsage onboard --install-daemon
```

Tip: if you don’t have a global install yet, run repo commands via `pnpm aeonsage ...`.

### 4) Other install options

- Docker: [Docker](/install/docker)
- Nix: [Nix](/install/nix)
- Ansible: [Ansible](/install/ansible)
- Bun (CLI only): [Bun](/install/bun)

## After install

- Run onboarding: `aeonsage onboard --install-daemon`
- Quick check: `aeonsage doctor`
- Check gateway health: `aeonsage status` + `aeonsage health`
- Open the dashboard: `aeonsage dashboard`

## Install method: npm vs git (installer)

The installer supports two methods:

- `npm` (default): `npm install -g aeonsage@latest`
- `git`: clone/build from GitHub and run from a source checkout

### CLI flags

```bash
# Explicit npm
curl -fsSL https://raw.githubusercontent.com/Vleonone/Aeonsagepro/main/scripts/quickstart.sh | bash -s -- --install-method npm

# Install from GitHub (source checkout)
curl -fsSL https://raw.githubusercontent.com/Vleonone/Aeonsagepro/main/scripts/quickstart.sh | bash -s -- --install-method git
```

Common flags:

- `--install-method npm|git`
- `--git-dir <path>` (default: `~/aeonsage`)
- `--no-git-update` (skip `git pull` when using an existing checkout)
- `--no-prompt` (disable prompts; required in CI/automation)
- `--dry-run` (print what would happen; make no changes)
- `--no-onboard` (skip onboarding)

### Environment variables

Equivalent env vars (useful for automation):

- `AEONSAGE_INSTALL_METHOD=git|npm`
- `AEONSAGE_GIT_DIR=...`
- `AEONSAGE_GIT_UPDATE=0|1`
- `AEONSAGE_NO_PROMPT=1`
- `AEONSAGE_DRY_RUN=1`
- `AEONSAGE_NO_ONBOARD=1`
- `SHARP_IGNORE_GLOBAL_LIBVIPS=0|1` (default: `1`; avoids `sharp` building against system libvips)

## Troubleshooting: `aeonsage` not found (PATH)

Quick diagnosis:

```bash
node -v
npm -v
npm prefix -g
echo "$PATH"
```

If `$(npm prefix -g)/bin` (macOS/Linux) or `$(npm prefix -g)` (Windows) is **not** present inside `echo "$PATH"`, your shell can’t find global npm binaries (including `aeonsage`).

Fix: add it to your shell startup file (zsh: `~/.zshrc`, bash: `~/.bashrc`):

```bash
# macOS / Linux
export PATH="$(npm prefix -g)/bin:$PATH"
```

On Windows, add the output of `npm prefix -g` to your PATH.

Then open a new terminal (or `rehash` in zsh / `hash -r` in bash).

## Update / uninstall

- Updates: [Updating](/install/updating)
- Migrate to a new machine: [Migrating](/install/migrating)
- Uninstall: [Uninstall](/install/uninstall)

