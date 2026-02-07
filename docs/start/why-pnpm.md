---
summary: "Why AeonSage chose pnpm as the package manager"
read_when:
  - You want to understand the technical reasoning
  - You're considering npm vs yarn vs pnpm
---

# Why Use pnpm?

## One-Sentence Summary

> **pnpm makes dependency installation faster, more space-efficient, and more reliable.**

---

## Three Core Advantages

### 1. Lightning Fast Installation

| Package Manager | Installation Speed | Mechanism |
|-----------------|-------------------|-----------|
| npm | Slow | Copy files to node_modules |
| yarn | Medium | Cache + parallel download |
| **pnpm** | **Fastest** | **Global store + hard links** |

**pnpm's secret**:
- All packages downloaded once, stored in global store (`~/.pnpm-store`)
- `node_modules` in projects are just **hard links**, no extra space used
- Installation = creating links, extremely fast

```
Traditional approach:
  ProjectA/lodash  ← copy →  lodash on disk
  ProjectB/lodash  ← copy →  lodash on disk  (duplicate storage!)

pnpm approach:
  ProjectA/lodash  ← hard link →  ~/.pnpm-store/lodash
  ProjectB/lodash  ← hard link →  ~/.pnpm-store/lodash  (zero duplication!)
```

---

### 2. Disk Space Savings

**Real-world comparison** (10 projects, each using React + TypeScript):

| Package Manager | Total Space Used |
|-----------------|------------------|
| npm | ~2.5 GB |
| yarn | ~2.2 GB |
| **pnpm** | **~300 MB** |

**Space-saving principle**:
- Same version stored only once
- 100 projects using the same lodash, only one lodash on disk

---

### 3. Strict Dependency Management

**npm/yarn problem**:
```
Your project depends on A@1.0
A depends on B@2.0
But your node_modules may have B@3.0 (brought in by other packages)
→ Program crashes mysteriously
```

**pnpm solution**:
```
node_modules/
├── A/                    ← Your direct dependency
│   └── node_modules/
│       └── B@2.0/        ← A's dependency, strictly isolated
└── .pnpm/
    └── B@3.0/            ← Other packages' dependency, won't leak
```

**Benefits**:
- No "phantom dependencies"
- Each package can only access its declared dependencies
- More reliable, fewer bugs

---

## Why AeonSage Chose pnpm?

### Reason 1: Monorepo Support

AeonSage is a monorepo (multi-package repository):
```
aeonsage/
├── src/              # Core gateway
├── ui/               # Control UI
├── apps/macos/       # macOS app
├── apps/ios/         # iOS app
├── apps/android/     # Android app
├── extensions/       # Plugins
└── packages/         # Shared packages
```

**pnpm workspace** perfectly supports this structure:
- Unified dependency management
- Local linking between packages
- Efficient disk usage

### Reason 2: Locked Version Consistency

`pnpm-lock.yaml` is more reliable than `package-lock.json`:
- Stricter locking
- Better cross-platform consistency
- Fewer merge conflicts

### Reason 3: corepack Integration

Node.js 16.10+ includes **corepack**, which can automatically manage pnpm versions:

```bash
# Project specifies pnpm version
"packageManager": "pnpm@10.23.0"

# Developers automatically use correct version
corepack enable
corepack prepare pnpm@10.23.0 --activate
```

**Benefits**:
- All developers use same pnpm version
- No strange issues from version differences
- CI/CD also stays consistent

---

## Comparison Summary

| Feature | npm | yarn | pnpm |
|---------|-----|------|------|
| Installation Speed | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Disk Usage | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Dependency Isolation | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Monorepo | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Strict Mode | ❌ | ❌ | ✅ |

---

## Common Commands Comparison

| Operation | npm | yarn | pnpm |
|-----------|-----|------|------|
| Install dependencies | `npm install` | `yarn` | `pnpm install` |
| Add dependency | `npm install pkg` | `yarn add pkg` | `pnpm add pkg` |
| Add dev dependency | `npm install -D pkg` | `yarn add -D pkg` | `pnpm add -D pkg` |
| Run script | `npm run dev` | `yarn dev` | `pnpm dev` |
| Remove dependency | `npm uninstall pkg` | `yarn remove pkg` | `pnpm remove pkg` |

---

## Further Reading

- [pnpm Official Documentation](https://pnpm.io/)
- [corepack Introduction](https://nodejs.org/api/corepack.html)
- [Why pnpm is Faster](https://pnpm.io/motivation)

---

**In one word: pnpm is the best choice for modern Node.js projects.**
