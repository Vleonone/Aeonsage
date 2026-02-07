---
summary: "Uninstall AeonSage completely (CLI, service, state, workspace)"
read_when:
  - You want to remove AeonSage from a machine
  - The gateway service is still running after uninstall
---

# Uninstall

Two paths:
- **Easy path** if `aeonsage` is still installed.
- **Manual service removal** if the CLI is gone but the service is still running.

## Easy path (CLI still installed)

Recommended: use the built-in uninstaller:

```bash
aeonsage uninstall
```

Non-interactive (automation / npx):

```bash
aeonsage uninstall --all --yes --non-interactive
npx -y aeonsage uninstall --all --yes --non-interactive
```

Manual steps (same result):

1) Stop the gateway service:

```bash
aeonsage gateway stop
```

2) Uninstall the gateway service (launchd/systemd/schtasks):

```bash
aeonsage gateway uninstall
```

3) Delete state + config:

```bash
rm -rf "${AEONSAGE_STATE_DIR:-$HOME/.aeonsage}"
```

If you set `AEONSAGE_CONFIG_PATH` to a custom location outside the state dir, delete that file too.

4) Delete your workspace (optional, removes agent files):

```bash
rm -rf ~/aeonsage
```

5) Remove the CLI install (pick the one you used):

```bash
npm rm -g aeonsage
pnpm remove -g aeonsage
bun remove -g aeonsage
```

6) If you installed the macOS app:

```bash
rm -rf /Applications/AeonSage.app
```

Notes:
- If you used profiles (`--profile` / `AEONSAGE_PROFILE`), repeat step 3 for each state dir (defaults are `~/.aeonsage-<profile>`).
- In remote mode, the state dir lives on the **gateway host**, so run steps 1-4 there too.

## Manual service removal (CLI not installed)

Use this if the gateway service keeps running but `aeonsage` is missing.

### macOS (launchd)

Default label is `com.aeonsage.gateway` (or `com.aeonsage.<profile>`):

```bash
launchctl bootout gui/$UID/com.aeonsage.gateway
rm -f ~/Library/LaunchAgents/com.aeonsage.gateway.plist
```

If you used a profile, replace the label and plist name with `com.aeonsage.<profile>`.

### Linux (systemd user unit)

Default unit name is `aeonsage-gateway.service` (or `aeonsage-gateway-<profile>.service`):

```bash
systemctl --user disable --now aeonsage-gateway.service
rm -f ~/.config/systemd/user/aeonsage-gateway.service
systemctl --user daemon-reload
```

### Windows (Scheduled Task)

Default task name is `AeonSage Gateway` (or `AeonSage Gateway (<profile>)`).
The task script lives under your state dir.

```powershell
schtasks /Delete /F /TN "AeonSage Gateway"
Remove-Item -Force "$env:USERPROFILE\.aeonsage\gateway.cmd"
```

If you used a profile, delete the matching task name and `~\.aeonsage-<profile>\gateway.cmd`.

## Normal install vs source checkout

### Normal install (install.sh / npm / pnpm / bun)

If you used `https://raw.githubusercontent.com/Vleonone/AeonSage-Silicon-Intelligence/main/scripts/quickstart.sh` or `install.ps1`, the CLI was installed with `npm install -g aeonsage@latest`.
Remove it with `npm rm -g aeonsage` (or `pnpm remove -g` / `bun remove -g` if you installed that way).

### Source checkout (git clone)

If you run from a repo checkout (`git clone` + `aeonsage ...` / `bun run aeonsage ...`):

1) Uninstall the gateway service **before** deleting the repo (use the easy path above or manual service removal).
2) Delete the repo directory.
3) Remove state + workspace as shown above.


