---
summary: "Frequently Asked Questions for New Users"
read_when:
  - You encounter installation or runtime issues
  - You want quick solutions to common errors
---

# Frequently Asked Questions (FAQ)

## macOS Common Issues

### Q: macOS Shows "Cannot Verify Developer" During Installation

**Cause:** macOS security settings blocking unsigned applications

**Solution:**
```bash
# Method 1: Right-click the application, select "Open"
# Method 2: System Settings -> Privacy & Security -> Allow
# Method 3: Command line to remove quarantine attribute
xattr -cr /Applications/AeonSage.app
```

### Q: Error "swift: command not found"

**Cause:** Xcode command line tools not installed

**Solution:**
```bash
# Install Xcode command line tools
xcode-select --install

# Or install full Xcode from App Store
# Then set path
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

### Q: macOS App Cannot Connect to Gateway

**Cause:** Network permissions or firewall blocking

**Solution:**
1. Check System Settings -> Privacy -> Local Network, allow AeonSage
2. Ensure Gateway is bound to LAN: `gateway.bind: "lan"`
3. Check firewall settings

### Q: pnpm install Permission Errors

**Cause:** macOS permissions or directory ownership issues

**Solution:**
```bash
# Use corepack instead of global installation
corepack enable
corepack prepare pnpm@10.23.0 --activate

# If node_modules has permission issues
rm -rf node_modules
pnpm install
```

---

## Installation Issues

### Q: `corepack: command not found`

**Cause:** Node.js version too old (< 16.10)

**Solution:**
```bash
# Check Node.js version
node -v  # Requires >= 22

# If version too low, upgrade Node.js
# macOS
brew install node@22

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Q: `pnpm: command not found` (corepack enabled)

**Cause:** corepack not properly activated

**Solution:**
```bash
# Reactivate
corepack prepare pnpm@10.23.0 --activate

# Verify
pnpm -v  # Should display 10.23.0
```

### Q: `pnpm install` Slow or Hanging

**Cause:** Network issues or first-time dependency download

**Solution:**
```bash
# Use alternative registry
pnpm config set registry https://registry.npmjs.org

# Reinstall
pnpm install
```

### Q: `EACCES: permission denied` (Linux/macOS)

**Cause:** npm global directory permission issues

**Solution:**
```bash
# Method 1: Change npm global directory to user directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Method 2: Use corepack (recommended)
corepack enable
corepack prepare pnpm@10.23.0 --activate
# corepack does not require sudo
```

---

## Runtime Issues

### Q: `aeonsage: command not found`

**Cause:** Not globally installed, or PATH incorrect

**Solution:**
```bash
# Method 1: Use pnpm to run
pnpm aeonsage onboard

# Method 2: Run from source
node dist/index.js onboard

# Method 3: Check PATH
echo $PATH
# Ensure it includes pnpm global bin directory
```

### Q: `Cannot find module 'xxx'`

**Cause:** Dependencies not properly installed

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
pnpm install

# If issues persist, clear pnpm cache
pnpm store prune
pnpm install
```

### Q: Gateway Starts but Cannot Access `http://127.0.0.1:18789`

**Cause:** Port occupied or Gateway not properly started

**Solution:**
```bash
# Check port usage
lsof -i :18789  # macOS/Linux
netstat -ano | findstr :18789  # Windows

# View Gateway logs
pnpm aeonsage gateway --verbose

# Check Gateway status
pnpm aeonsage health
```

### Q: `Error: Cannot find dist/index.js`

**Cause:** Project not built

**Solution:**
```bash
# Build project
pnpm build

# If build fails, check dependencies first
pnpm install
pnpm ui:build
pnpm build
```

---

## Docker Issues

### Q: Docker Build Fails

**Cause:** Docker not installed or not running

**Solution:**
```bash
# Check Docker
docker --version
docker ps

# If Docker Desktop not running, start it
# Then rebuild
docker build -t aeonsage:local .
```

### Q: `docker-compose: command not found`

**Cause:** Docker Compose plugin not installed

**Solution:**
```bash
# Newer Docker uses "docker compose" (no hyphen)
docker compose up -d

# Or install Docker Compose plugin
# https://docs.docker.com/compose/install/
```

---

## Mobile Issues

### Q: iOS App Cannot Connect to Gateway

**Cause:** Network issues or Gateway not properly configured

**Solution:**
1. Ensure phone and computer are on same WiFi
2. Check Gateway bind address:
   ```json
   // ~/.aeonsage/aeonsage.json
   {
     "gateway": {
       "bind": "lan"  // or "0.0.0.0"
     }
   }
   ```
3. Check firewall settings

### Q: Android App Shows "Cannot Discover Gateway"

**Cause:** mDNS/NSD blocked

**Solution:**
1. Manually enter Gateway IP and port
2. Ensure Android and Gateway are on same network
3. Check if router blocks mDNS

---

## Authentication Issues

### Q: `Invalid API key` or Authentication Failed

**Cause:** API key not properly configured

**Solution:**
```bash
# Method 1: Environment variable
export ANTHROPIC_API_KEY=your-key

# Method 2: Configuration file
pnpm aeonsage configure

# Method 3: Direct edit
# ~/.aeonsage/.env
ANTHROPIC_API_KEY=your-key
```

---

## Other Issues

### Q: How to Completely Reset AeonSage?

**Solution:**
```bash
# Run reset wizard
pnpm aeonsage onboard --reset

# Or manually delete configuration
rm -rf ~/.aeonsage
rm -rf ~/aeonsage

# Then re-run wizard
pnpm aeonsage onboard
```

### Q: How to View Logs?

**Solution:**
```bash
# Gateway logs
pnpm aeonsage logs

# Or view file directly
# macOS/Linux
cat /tmp/aeonsage/gateway.log

# Use doctor for diagnostics
pnpm aeonsage doctor
```

### Q: How to Update AeonSage?

**Solution:**
```bash
# Pull latest code
git pull

# Update dependencies
pnpm install

# Rebuild
pnpm ui:build
pnpm build

# Restart Gateway
pnpm aeonsage gateway restart
```

---

## Getting Help

If none of the above solutions resolve your issue:

1. **Check documentation**: [docs.aeonsage.org](https://docs.aeonsage.org)
2. **Run diagnostics**: `pnpm aeonsage doctor`
3. **View logs**: `pnpm aeonsage logs`
4. **Submit issue**: [GitHub Issues](https://github.com/Vleonone/aeonsage/issues)

---

**Tip**: Most issues can be resolved with these commands:
```bash
rm -rf node_modules
pnpm install
pnpm build
pnpm aeonsage doctor
```
