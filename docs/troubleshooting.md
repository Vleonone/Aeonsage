<div align="center">

<h1>Troubleshooting Guide</h1>
<p>Solutions for common issues and errors</p>

<p>
  <img src="https://img.shields.io/badge/issues-covered-50+-FF751F?style=flat-square" alt="Issues">
  <img src="https://img.shields.io/badge/diagnostic_tool-aeonsage_doctor-00C853?style=flat-square" alt="Diagnostic">
  <img src="https://img.shields.io/badge/support-Community_Pro-2088FF?style=flat-square" alt="Support">
</p>

</div>

---

## Quick Diagnostics

```bash
# Run comprehensive diagnostics
aeonsage doctor --verbose

# Check system status
aeonsage status --all

# View gateway logs
aeonsage gateway --verbose
```

---

## Common Issues

### Installation Issues

#### Command Not Found: `aeonsage: command not found`

**Cause:** CLI not added to PATH

**Solution:**
```bash
# macOS/Linux
export PATH="$HOME/.local/bin:$PATH"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Or reinstall
npm install -g aeonsage@latest
```

#### Node Version Too Old

**Solution:**
```bash
# Install Node 22 using nvm
nvm install 22
nvm use 22
node --version  # Should display v22.x.x
```

---

### Gateway Issues

#### Gateway Fails to Start

**Diagnostic Steps:**
```bash
# 1. Check port usage
lsof -i :18789

# 2. Check running processes
ps aux | grep aeonsage

# 3. View detailed logs
aeonsage gateway --verbose
```

**Solution:**
```bash
# Kill process using the port
kill -9 $(lsof -t -i:18789)

# Or use alternative port
aeonsage gateway --port 18890
```

#### EADDRINUSE: Address Already in Use

**Solution:**
```bash
# Find process using port
netstat -tlnp | grep 18789

# On macOS
lsof -i :18789

# Kill process
kill <PID>
```

---

### Authentication Issues

#### Model Is Not Allowed

**Cause:** Insufficient API key permissions or quota exceeded

**Solution:**
```bash
# Check authentication status
aeonsage models status

# Reconfigure
aeonsage configure --section auth
```

#### Invalid API Key

**Solution:**
```bash
# Reset key
aeonsage configure --section auth

# Verify
aeonsage models status
```

---

### Channel Issues

#### WhatsApp QR Scan No Response

**Solution:**
```bash
# Reset WhatsApp session
rm -rf ~/.aeonsage/channels/whatsapp
aeonsage channels login
```

#### Telegram Bot Not Responding

**Check:**
```bash
# Verify token
aeonsage status

# View logs
grep "telegram" ~/.aeonsage/logs/gateway.log
```

**Common Causes:**
- Incorrect bot token
- Bot not added to group
- Insufficient permissions

---

## Log Analysis

### Log Locations

```
~/.aeonsage/logs/
├── gateway.log      # Gateway main log
├── error.log        # Error log
└── access.log       # Access log
```

### Viewing Logs

```bash
# Real-time viewing
tail -f ~/.aeonsage/logs/gateway.log

# Search for errors
grep -i "error" ~/.aeonsage/logs/gateway.log

# Last 100 lines
tail -n 100 ~/.aeonsage/logs/gateway.log
```

---

## Reset and Cleanup

### Reset Configuration

```bash
# Backup first
cp -r ~/.aeonsage ~/.aeonsage.backup

# Reset
rm -rf ~/.aeonsage

# Reconfigure
aeonsage onboard
```

### Complete Uninstall

```bash
# Stop service
aeonsage gateway stop

# Uninstall CLI
npm uninstall -g aeonsage

# Remove data
rm -rf ~/.aeonsage
```

---

## Getting Help

### Community Support

- **GitHub Issues:** https://github.com/Vleonone/aeonsage/issues
- **Discord:** https://discord.gg/mJdz8F8hkj

### Submitting an Issue

Include the following information:

```bash
# Version
aeonsage --version

# System information
uname -a

# Diagnostic output
aeonsage doctor --verbose 2>&1 | tail -50

# Error logs (sanitized)
tail -n 50 ~/.aeonsage/logs/error.log
```

---

## Related Documentation

| Document | Description |
|:---------|:------------|
| [Installation Guide](./install.md) | Setup instructions |
| [Quick Start](./QUICKSTART.md) | 5-minute guide |
| [Security Configuration](./security.md) | Security settings |

---

<div align="center">

**[← Back to Documentation](./README.md)**

<p>
  <img src="https://img.shields.io/badge/Still_stuck?-Open_an_issue-2088FF?style=flat-square&logo=github" alt="GitHub">
  <img src="https://img.shields.io/badge/Or_chat-Discord-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord">
</p>

</div>
