---
summary: "Why use corepack for package manager version management"
read_when:
  - You want to understand what corepack is
  - You're wondering why this extra step is needed
---

# Why Use corepack?

## One-Sentence Summary

> **corepack ensures everyone uses the same package manager version, eliminating "version mismatch" nightmares.**

---

## The Pain Without corepack

### Scenario 1: Developer A and B Conflict

```bash
# Developer A (using pnpm 8.x)
pnpm install
# Generates pnpm-lock.yaml v6

# Developer B (using pnpm 9.x)
pnpm install
# Generates pnpm-lock.yaml v7, different format!
# → Git conflicts!
```

### Scenario 2: CI and Local Inconsistency

```bash
# Local development (pnpm 10.23.0)
pnpm install  # Works normally

# CI environment (pnpm 10.24.0, latest)
pnpm install  # Lock file format changes!
# → CI fails!
```

### Scenario 3: New Team Member Onboarding

```bash
# New team member
npm install -g pnpm  # Installs latest 10.30.0
pnpm install         # Lock file incompatible!
# → Project won't run!
```

---

## The corepack Solution

### How It Works

```json
// package.json
{
  "packageManager": "pnpm@10.23.0"
}
```

**corepack will**:
1. Read the `packageManager` field
2. Automatically download and use the specified version
3. Regardless of globally installed versions, use the project-specified version

### Real-World Results

```bash
# Developer A
corepack enable
corepack prepare pnpm@10.23.0 --activate
pnpm -v  # 10.23.0 ✅

# Developer B
corepack enable
corepack prepare pnpm@10.23.0 --activate
pnpm -v  # 10.23.0 ✅

# CI environment
corepack enable
corepack prepare pnpm@10.23.0 --activate
pnpm -v  # 10.23.0 ✅

# Everyone uses the same version!
```

---

## Three Key Advantages of corepack

### 1. Version Consistency

| Scenario | Without corepack | With corepack |
|----------|------------------|---------------|
| Between developers | May use different versions | Forces same version |
| Local vs CI | May be inconsistent | Completely consistent |
| Today vs tomorrow | May auto-upgrade | Locked to specified version |

### 2. Zero Configuration

**Traditional approach**:
```bash
# Install specific pnpm version
npm install -g pnpm@10.23.0

# If another version already installed?
# Need to uninstall first, then install — complicated!
```

**corepack approach**:
```bash
corepack enable
corepack prepare pnpm@10.23.0 --activate
# Done! No need to uninstall other versions
```

### 3. Project-Level Isolation

**Global installation problem**:
```bash
# Project A needs pnpm 9.x
# Project B needs pnpm 10.x
# Global can only install one, what to do?
```

**corepack solution**:
```bash
# Project A
cd project-a
pnpm -v  # 9.x (specified by packageManager)

# Project B
cd project-b
pnpm -v  # 10.x (specified by packageManager)

# Each project uses its own version!
```

---

## Using corepack in AeonSage

### Project Configuration

```json
// package.json
{
  "name": "aeonsage",
  "version": "2026.1.26",
  "packageManager": "pnpm@10.23.0"
}
```

### Developer Setup

```bash
# Step 1: Enable corepack
corepack enable

# Step 2: Install project-specified pnpm version
corepack prepare pnpm@10.23.0 --activate

# Step 3: Verify
pnpm -v  # Should display 10.23.0

# Step 4: Install dependencies
pnpm install
```

### CI/CD Setup

```yaml
# .github/workflows/ci.yml
- name: Setup pnpm (corepack)
  run: |
    corepack enable
    corepack prepare pnpm@10.23.0 --activate
    pnpm -v
```

---

## FAQ

### Q: Is corepack included with Node.js?

**A**: Yes! Node.js 16.10+ includes corepack, no additional installation needed.

```bash
node -v  # Ensure >= 16.10
corepack -v  # Should display version
```

### Q: What if I already have pnpm installed globally?

**A**: No problem, corepack will override the current shell's pnpm with the project-specified version.

```bash
# Global pnpm is 9.x
pnpm -v  # 9.5.0

# Enable corepack
corepack enable
corepack prepare pnpm@10.23.0 --activate

# Now using project-specified version
pnpm -v  # 10.23.0
```

### Q: How to update pnpm version?

**A**: Modify `package.json`, then re-prepare:

```json
{
  "packageManager": "pnpm@10.25.0"
}
```

```bash
corepack prepare pnpm@10.25.0 --activate
```

### Q: Can corepack be disabled?

**A**: Yes, but not recommended:

```bash
corepack disable
```

---

## Comparison: With/Without corepack

| Issue | Without corepack | With corepack |
|-------|------------------|---------------|
| Lock file conflicts | 😫 Often occurs | 😊 Never happens |
| CI failures | 😫 Version inconsistency | 😊 Completely consistent |
| New member onboarding | 😫 Manual version alignment | 😊 Automatic correct version |
| Multi-project management | 😫 Version chaos | 😊 Each project independent |

---

## One-Sentence Summary

> **corepack = Package Manager Version Manager**
> 
> It ensures everyone and every environment uses the same pnpm version, eliminating problems caused by version inconsistencies.

---

## Further Reading

- [Node.js corepack Documentation](https://nodejs.org/api/corepack.html)
- [corepack Introduction](https://github.com/nodejs/corepack)
