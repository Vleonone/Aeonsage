# AeonSage Desktop UI 设计规范
**Figma Design Specification v1.0**

> 🎨 **公开设计系统文档**
> 
> 本文档展示 AeonSage Desktop 的完整 UI 设计系统，包括颜色、字体、组件库等规范。  
> 我们欢迎设计师和开发者参考此文档，并在社区讨论中提出 UX 改进建议。  
> 设计规范会持续迭代优化，以提供最佳用户体验。

---

## 目录
1. [设计系统 (Design Tokens)](#一设计系统-design-tokens)
2. [组件库 (Component Library)](#二组件库-component-library)
3. [Skills 商店页面](#三skills-商店页面)
4. [下载区域组件](#四下载区域组件)
5. [多 Agent Tab 组件](#五多-agent-tab-组件)
6. [响应式布局](#六响应式布局)
7. [交互动效](#七交互动效)
8. [设计交付清单](#八设计交付清单)

---

## 一、设计系统 (Design Tokens)

### 1.1 颜色系统 (基于 shadcn/ui + Tailwind)

#### 品牌色 (Brand Colors)
```css
/* 主品牌色 - 基于 AeonSage Logo 的深蓝/紫色调 */
--brand-primary: #5B4FFF;           /* 主紫色 (Logo 主色) */
--brand-primary-hover: #4A3FE8;     /* Hover 状态 */
--brand-primary-active: #3930D1;    /* Active 状态 */
--brand-secondary: #00D4FF;         /* 辅助蓝色 (Logo 辅助色) */
--brand-accent: #7C3AED;            /* 强调色 (紫色梯度) */
```

#### 语义色 (Semantic Colors)
```css
/* Light Mode (默认) */
--background: hsl(0, 0%, 100%);             /* #FFFFFF - 主背景 */
--foreground: hsl(222.2, 84%, 4.9%);        /* #020817 - 主文字 */

--card: hsl(0, 0%, 100%);                   /* 卡片背景 */
--card-foreground: hsl(222.2, 84%, 4.9%);   /* 卡片文字 */

--popover: hsl(0, 0%, 100%);                /* 弹窗背景 */
--popover-foreground: hsl(222.2, 84%, 4.9%);

--primary: hsl(250, 100%, 66%);             /* #5B4FFF - 主按钮 */
--primary-foreground: hsl(0, 0%, 100%);     /* 主按钮文字 */

--secondary: hsl(210, 40%, 96.1%);          /* #F1F5F9 - 次要按钮 */
--secondary-foreground: hsl(222.2, 47.4%, 11.2%);

--muted: hsl(210, 40%, 96.1%);              /* 禁用/次要元素 */
--muted-foreground: hsl(215.4, 16.3%, 46.9%); /* #64748B - 次要文字 */

--accent: hsl(210, 40%, 96.1%);             /* 强调元素背景 */
--accent-foreground: hsl(222.2, 47.4%, 11.2%);

--destructive: hsl(0, 84.2%, 60.2%);        /* #EF4444 - 删除/错误 */
--destructive-foreground: hsl(0, 0%, 100%);

--border: hsl(214.3, 31.8%, 91.4%);         /* #E2E8F0 - 边框 */
--input: hsl(214.3, 31.8%, 91.4%);          /* 输入框边框 */
--ring: hsl(250, 100%, 66%);                /* 焦点环 */

/* Success / Warning / Info */
--success: hsl(142, 76%, 36%);              /* #10B981 - 成功 */
--warning: hsl(38, 92%, 50%);               /* #F59E0B - 警告 */
--info: hsl(199, 89%, 48%);                 /* #0EA5E9 - 信息 */
```

#### Dark Mode (深色模式)
```css
/* 保留 Tauri 原生窗口标题栏深色，内容区域浅色 */
/* 注：Desktop 版本建议采用 Light Mode 为主 */
/* Dark Mode 作为 Pro 功能提供（主题切换） */

--background: hsl(222.2, 84%, 4.9%);        /* #020817 */
--foreground: hsl(210, 40%, 98%);           /* #F8FAFC */

--card: hsl(222.2, 84%, 8%);                /* #0F172A */
--card-foreground: hsl(210, 40%, 98%);

--primary: hsl(250, 100%, 70%);             /* 亮紫色 (深色模式下) */
--primary-foreground: hsl(222.2, 84%, 4.9%);

--border: hsl(217.2, 32.6%, 17.5%);         /* #1E293B */
```

#### Skills 专用色 (Skill Card Colors)
```css
/* 每个 Skill 类别配色 */
--skill-image: hsl(280, 100%, 70%);         /* 🎨 Image Generator - 粉紫色 */
--skill-file: hsl(200, 100%, 60%);          /* 📁 File Explorer - 蓝色 */
--skill-code: hsl(142, 76%, 50%);           /* 💻 Code Executor - 绿色 */
--skill-office: hsl(38, 92%, 60%);          /* 📊 Office Auto - 橙色 */
--skill-video: hsl(0, 84%, 65%);            /* 🎬 Video Editor - 红色 */
--skill-web: hsl(199, 89%, 58%);            /* 🌐 Web Auto - 青色 */
--skill-db: hsl(271, 76%, 53%);             /* 🗄️ Database - 紫色 */
```

### 1.2 字体系统 (Typography)

#### 字体族 (Font Family)
```css
/* 英文 + 中文优雅组合 */
--font-sans: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
--font-mono: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
--font-display: 'Inter Display', 'PingFang SC', sans-serif;
```

#### 字阶 (Font Scale)
```css
/* 标题 */
--text-xs: 12px / 16px;          /* 小标签、备注 */
--text-sm: 14px / 20px;          /* 正文、按钮 */
--text-base: 16px / 24px;        /* 基础正文 */
--text-lg: 18px / 28px;          /* 小标题 */
--text-xl: 20px / 28px;          /* 二级标题 */
--text-2xl: 24px / 32px;         /* 一级标题 */
--text-3xl: 30px / 36px;         /* 页面标题 */

/* 字重 */
--font-normal: 400;              /* 正文 */
--font-medium: 500;              /* 强调文字 */
--font-semibold: 600;            /* 标题 */
--font-bold: 700;                /* 重要标题 */
```

#### 特殊用途字体规范
| 组件 | 字体 | 字号 | 字重 | 行高 |
|------|------|------|------|------|
| Skill 卡片标题 | Inter | 14px | 600 | 20px |
| Skill 卡片 "Skill" 标签 | Inter | 10px | 500 | 12px |
| 下载文件名 | Inter | 14px | 500 | 20px |
| 下载文件信息 | Inter | 12px | 400 | 16px |
| Tab 标签 | Inter | 14px | 500 | 20px |
| 按钮文字 | Inter | 14px | 500 | 20px |
| 输入框 | Inter | 14px | 400 | 20px |

### 1.3 间距系统 (Spacing)

#### 间距阶梯 (基于 4px 网格)
```css
--spacing-0: 0px;
--spacing-1: 4px;     /* 极小间距 */
--spacing-2: 8px;     /* 小间距 */
--spacing-3: 12px;    /* 中小间距 */
--spacing-4: 16px;    /* 常规间距 */
--spacing-5: 20px;
--spacing-6: 24px;    /* 大间距 */
--spacing-8: 32px;    /* 超大间距 */
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;   /* 页面级间距 */
```

#### 组件专用间距
```css
/* Skill Card */
--skill-card-padding: 12px;               /* 卡片内边距 */
--skill-card-gap: 16px;                   /* 卡片间距 */
--skill-card-grid-gap: 16px 16px;         /* 网格间距 */

/* Download Area */
--download-item-padding: 12px;            /* 下载项内边距 */
--download-item-gap: 8px;                 /* 下载项间距 */

/* Tabs */
--tab-padding: 8px 16px;                  /* Tab 内边距 */
--tab-gap: 4px;                           /* Tab 间距 */

/* Sidebar */
--sidebar-width: 240px;                   /* 侧边栏宽度 */
--sidebar-collapsed-width: 64px;          /* 折叠后宽度 */
--sidebar-padding: 16px;                  /* 侧边栏内边距 */
```

### 1.4 圆角 & 阴影 (Radius & Shadows)

#### 圆角
```css
--radius-sm: 4px;      /* 小元素 (Tag, Badge) */
--radius-md: 6px;      /* 常规元素 (Button, Input) */
--radius-lg: 8px;      /* 卡片 (Card) */
--radius-xl: 12px;     /* 弹窗 (Modal, Popover) */
--radius-2xl: 16px;    /* 大容器 */
--radius-full: 9999px; /* 圆形 (Avatar) */
```

#### 阴影
```css
/* Card Shadow */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
             0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
             0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
             0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Skill Card Hover Shadow (品牌色发光) */
--shadow-skill-hover: 0 8px 16px -4px rgba(91, 79, 255, 0.3),
                      0 4px 8px -2px rgba(91, 79, 255, 0.2);
```

### 1.5 动画 & 缓动 (Animation & Easing)

#### 缓动曲线
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);      /* 默认 */
--ease-in: cubic-bezier(0.4, 0, 1, 1);             /* 进入 */
--ease-out: cubic-bezier(0, 0, 0.2, 1);            /* 离开 */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);       /* 进出 */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.27, 1.55); /* 弹跳 */
```

#### 动画时长
```css
--duration-fast: 150ms;       /* 快速交互 (Hover, Click) */
--duration-normal: 250ms;     /* 常规动画 (Modal, Drawer) */
--duration-slow: 350ms;       /* 慢速动画 (Page Transition) */
```

---

## 二、组件库 (Component Library)

### 2.1 Button (按钮)

#### 变体 (Variants)
```
┌──────────────────────────────────────────────┐
│ Primary Button (主按钮)                      │
│ ┌──────────────────┐                         │
│ │  Install Skill   │  ← 16px padding-x       │
│ └──────────────────┘     8px padding-y       │
│ 背景: --primary (#5B4FFF)                    │
│ 文字: --primary-foreground (#FFFFFF)         │
│ 圆角: --radius-md (6px)                      │
│ 字体: Inter 14px / 500                       │
│                                              │
│ Secondary Button (次要按钮)                  │
│ ┌──────────────────┐                         │
│ │     Cancel       │                         │
│ └──────────────────┘                         │
│ 背景: --secondary (#F1F5F9)                  │
│ 文字: --secondary-foreground (#0F172A)       │
│                                              │
│ Ghost Button (幽灵按钮)                      │
│ ┌──────────────────┐                         │
│ │   Learn More →   │  ← 无背景，仅 hover 显示 │
│ └──────────────────┘                         │
│ 背景: transparent                            │
│ 文字: --muted-foreground (#64748B)           │
│ Hover: --accent (#F1F5F9)                    │
│                                              │
│ Icon Button (图标按钮)                       │
│ ┌────┐                                       │
│ │ ⬇️ │  ← 32x32px, 圆角 6px                  │
│ └────┘                                       │
└──────────────────────────────────────────────┘
```

#### 状态 (States)
| 状态 | 背景色 | 文字色 | 边框 | 阴影 |
|------|--------|--------|------|------|
| **Default** | `--primary` | `--primary-foreground` | - | - |
| **Hover** | `--primary-hover` | 同上 | - | `0 4px 8px rgba(91,79,255,0.2)` |
| **Active** | `--primary-active` | 同上 | - | `inset 0 2px 4px rgba(0,0,0,0.1)` |
| **Disabled** | `--muted` | `--muted-foreground` | - | - |
| **Loading** | `--primary` | 同上 | - | Spinner 动画 |

### 2.2 Input (输入框)

```
┌──────────────────────────────────────────────┐
│ Text Input                                   │
│ ┌──────────────────────────────────────────┐ │
│ │ 🔍 Search Skills...                      │ │  ← Icon + Placeholder
│ └──────────────────────────────────────────┘ │
│ 高度: 40px                                   │
│ 边框: 1px solid --border (#E2E8F0)          │
│ 圆角: --radius-md (6px)                      │
│ Padding: 8px 12px                            │
│ 字体: Inter 14px / 400                       │
│                                              │
│ Focus 状态:                                  │
│ 边框: 2px solid --ring (#5B4FFF)            │
│ 阴影: 0 0 0 3px rgba(91,79,255,0.1)          │
└──────────────────────────────────────────────┘
```

### 2.3 Card (卡片)

#### Skill Card (Skills 商店卡片)
```
┌─────────────────┐
│   120x140px     │
├─────────────────┤
│      🎨         │  ← 64x64 Icon (emoji 或 SVG)
│                 │     margin-top: 12px
│   Image Gen     │  ← 14px / 600 标题 (最多 2 行)
│                 │
│     Skill       │  ← 10px / 500 灰色小字
│  ────────────   │     margin-top: 8px
│  ✅ Installed   │  ← 状态标识 (12px / 500)
└─────────────────┘

CSS:
.skill-card {
  width: 120px;
  height: 140px;
  padding: 12px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg); /* 8px */
  transition: all 150ms ease-out;
  cursor: pointer;
}

.skill-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-skill-hover);
  transform: translateY(-2px);
}

.skill-card__icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 8px;
}

.skill-card__title {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  color: var(--foreground);
  max-height: 40px; /* 2 行 */
  overflow: hidden;
}

.skill-card__badge {
  font-size: 10px;
  font-weight: 500;
  color: var(--muted-foreground);
  text-align: center;
  margin-top: 4px;
}

.skill-card__status {
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  margin-top: 8px;
}
```

#### Download Item Card (下载卡片)
```
┌────────────────────────────────┐
│  产品策划案_v1.md               │  ← 14px / 500 文件名
│  ├ 3.2 KB · 2026-02-12 14:32   │  ← 12px / 400 次要信息
│  └ [⬇️ Download]                │  ← 按钮
└────────────────────────────────┘

CSS:
.download-item {
  padding: 12px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md); /* 6px */
  margin-bottom: 8px;
}

.download-item:hover {
  background: var(--accent); /* #F1F5F9 */
}

.download-item__name {
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground);
  margin-bottom: 4px;
}

.download-item__meta {
  font-size: 12px;
  color: var(--muted-foreground);
  display: flex;
  gap: 8px;
}

.download-item__button {
  margin-top: 8px;
  width: 100%;
}
```

### 2.4 Tab (标签页)

```
┌─────────────────────────────────────────────┐
│ [💬 General] [🎨 Image] [+ New]             │
└─────────────────────────────────────────────┘
     ↑ Active      ↑ Inactive  ↑ Add Button

CSS:
.tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border);
}

.tab {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 150ms;
}

.tab--active {
  background: var(--background);
  border-color: var(--border);
  border-bottom-color: var(--background); /* 消除下边框 */
  color: var(--primary);
}

.tab--inactive {
  color: var(--muted-foreground);
}

.tab--inactive:hover {
  background: var(--accent);
  color: var(--foreground);
}
```

### 2.5 Modal (弹窗)

#### Skill 详情弹窗
```
┌───────────────────────────────────┐
│  🎨 Image Generator           [X] │  ← Header
├───────────────────────────────────┤
│                                   │
│  AI 图片生成工具                   │  ← Description
│  支持 Stable Diffusion 本地推理    │
│  Pro 用户可使用 DALL-E 3 API       │
│                                   │
│  权限需求:                         │  ← Permissions
│  • 网络访问 (调用 API)             │
│  • 文件写入 (保存图片)             │
│                                   │
├───────────────────────────────────┤
│  [取消]  [一键安装并启动对话 →]    │  ← Footer
└───────────────────────────────────┘

尺寸: 480px 宽度
圆角: --radius-xl (12px)
阴影: --shadow-xl
背景: var(--popover)
遮罩: rgba(0, 0, 0, 0.5)
```

---

## 三、Skills 商店页面

### 3.1 整体布局

```
┌──────────────────────────────────────────────────────┐
│  AeonSage Desktop - Skills                  [_][□][X] │ ← 窗口标题栏 (32px)
├──────┬───────────────────────────────────────────────┤
│      │  Skills 商店                                   │ ← 页面标题 (24px / 600)
│  64  │                                                │
│  px  │  [ 🔍 Search Skills... ]    [Installed | All] │ ← 搜索框 + 筛选 (40px)
│      │                                                │
│  [C] │  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  │
│  [W] │  │  🎨   │  │  📁   │  │  💻   │  │  📊   │  │ ← Skill 卡片网格
│ ▶[S] │  │ Image │  │ File  │  │ Code  │  │Office │  │   Grid: 4 列
│  [U] │  │  Gen  │  │Explore│  │ Exec  │  │ Auto  │  │   Gap: 16px
│      │  │       │  │       │  │       │  │       │  │
│      │  │ Skill │  │ Skill │  │ Skill │  │ Skill │  │
│  --- │  │ ✅     │  │ ✅     │  │       │  │ 🔒Pro │  │
│ (Pro)│  └───────┘  └───────┘  └───────┘  └───────┘  │
│  [F] │                                                │
│  [W] │  ┌───────┐  ┌───────┐  ┌───────┐             │
│      │  │  🎬   │  │  🌐   │  │  🗄️   │             │
│      │  │ Video │  │  Web  │  │  DB   │             │
│      │  │ Edit  │  │ Auto  │  │Client │             │
│      │  │       │  │       │  │       │             │
│      │  │ Skill │  │ Skill │  │ Skill │             │
│      │  │ 🔒Pro │  │ ✅     │  │ ✅     │             │
│      │  └───────┘  └───────┘  └───────┘             │
│      │                                                │
│      │  点击图标 → 查看详情 → 一键安装 → 进入对话框使用  │ ← 帮助文字
└──────┴───────────────────────────────────────────────┘

尺寸参数:
- 左侧边栏: 64px (折叠状态) / 240px (展开状态)
- 内容区顶部间距: 24px
- 搜索框宽度: 300px (左) + 筛选按钮 (右)
- Skill 卡片网格: repeat(auto-fill, minmax(120px, 1fr))
- 网格间距: 16px (horizontal) 24px (vertical)
```

### 3.2 搜索 & 筛选栏

```
┌──────────────────────────────────────────────────────┐
│  [ 🔍 Search Skills... ]           [Installed | All] │
│    ↑ 300px Input                   ↑ Segmented Control
│                                    ├─ Installed (已装)
│                                    └─ All (全部)
└──────────────────────────────────────────────────────┘

Segmented Control CSS:
.segmented-control {
  display: inline-flex;
  background: var(--muted);
  padding: 2px;
  border-radius: var(--radius-md);
  gap: 2px;
}

.segmented-control__item {
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  border-radius: calc(var(--radius-md) - 2px);
  cursor: pointer;
}

.segmented-control__item--active {
  background: var(--background);
  color: var(--primary);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

### 3.3 Skill 卡片状态

#### 未安装 (Default)
```
┌─────────────────┐
│      🎨         │
│   Image Gen     │
│                 │
│     Skill       │
│  ────────────   │
│                 │  ← 空状态，显示 Install 按钮（hover 时）
└─────────────────┘
```

#### 已安装 (Installed)
```
┌─────────────────┐
│      🎨         │
│   Image Gen     │
│                 │
│     Skill       │
│  ────────────   │
│  ✅ Installed   │  ← 绿色勾选图标 + 文字
└─────────────────┘
```

#### Pro 限定 (Pro Only)
```
┌─────────────────┐
│      📊         │
│  Office Auto    │
│                 │
│     Skill       │
│  ────────────   │
│  🔒 Pro Only    │  ← 锁图标 + 文字（点击跳转升级页面）
└─────────────────┘
```

### 3.4 空状态 (Empty State)

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│                       🔍                             │  ← Icon (48px)
│                                                      │
│              No skills found                         │  ← 18px / 600
│                                                      │
│    Try searching with different keywords or         │  ← 14px / 400
│           install your first skill below.           │
│                                                      │
│            [Browse All Skills →]                     │  ← Primary Button
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 四、下载区域组件

### 4.1 整体布局 (右侧面板)

```
┌────────────────────────────────┐
│ 📥 Downloads                    │  ← 标题 (16px / 600)
├────────────────────────────────┤
│                                 │
│  产品策划案_v1.md               │  ← 文件名 (14px / 500)
│  ├ 3.2 KB · 2026-02-12 14:32   │  ← 元信息 (12px / 400)
│  └ [⬇️ Download]                │  ← 下载按钮
│                                 │
│  产品策划案_v1.pdf              │
│  ├ 45.7 KB · 2026-02-12 14:32  │
│  └ [⬇️ Download]                │
│                                 │
│  产品策划案_v1.docx             │  ← 我们独有格式
│  ├ 38.1 KB · 2026-02-12 14:32  │
│  └ [⬇️ Download]                │
│                                 │
│  ─────────────────────────────  │  ← 分隔线
│                                 │
│  [Download All (Zip)]           │  ← Secondary Button
│  [🗑️ Clear All]                 │  ← Ghost Button (红色)
└────────────────────────────────┘

尺寸参数:
- 面板宽度: 280px (固定)
- 内边距: 16px
- 下载项间距: 12px
- 按钮高度: 36px
```

### 4.2 下载项详细设计

```
┌────────────────────────────────┐
│  产品策划案_v1.md               │  ← 文件名 (14px / 500)
│  ├ 3.2 KB · 2026-02-12 14:32   │  ← 元信息行
│  │  ↑ 文件大小  ↑ 生成时间       │
│  └ [⬇️ Download]                │  ← 下载按钮 (32px height)
└────────────────────────────────┘

元信息格式:
- 文件大小: 使用 KB/MB 单位，保留 1 位小数
- 时间格式: YYYY-MM-DD HH:MM
- 分隔符: 使用 "·" (中点)

文件类型图标:
.md   → 📄 (灰色)
.pdf  → 📕 (红色)
.docx → 📘 (蓝色)
```

### 4.3 状态变化

#### Hover 状态
```css
.download-item:hover {
  background: var(--accent); /* #F1F5F9 */
  cursor: pointer;
}

.download-item:hover .download-button {
  background: var(--primary);
  color: var(--primary-foreground);
}
```

#### 下载中 (Loading)
```
┌────────────────────────────────┐
│  产品策划案_v1.md               │
│  ├ 3.2 KB · 2026-02-12 14:32   │
│  └ [⏳ Downloading... 45%]      │  ← 进度条 + 百分比
└────────────────────────────────┘
```

#### 下载完成 (Success)
```
┌────────────────────────────────┐
│  产品策划案_v1.md               │
│  ├ 3.2 KB · 2026-02-12 14:32   │
│  └ [✅ Downloaded]              │  ← 1.5秒后恢复默认状态
└────────────────────────────────┘
```

### 4.4 空状态

```
┌────────────────────────────────┐
│ 📥 Downloads                    │
├────────────────────────────────┤
│                                 │
│         📭                      │  ← 空图标 (32px)
│                                 │
│    No downloads yet             │  ← 14px / 500
│                                 │
│  Documents will appear here     │  ← 12px / 400
│  after you export them          │
│                                 │
└────────────────────────────────┘
```

---

## 五、多 Agent Tab 组件

### 5.1 Tab 栏布局

```
┌─────────────────────────────────────────────────────┐
│ [💬 General] [🎨 Image] [+ New]                     │
│     ↑ Active    ↑ Inactive  ↑ Add Button            │
└─────────────────────────────────────────────────────┘

尺寸参数:
- Tab 高度: 40px
- Tab 内边距: 8px 16px
- Tab 间距: 4px
- 最大宽度: 180px (文字过长时截断 + "...")
- 关闭按钮: 16x16 (仅 hover 时显示)
```

### 5.2 Tab 样式详解

#### Active Tab (激活状态)
```css
.tab--active {
  background: var(--background);        /* #FFFFFF */
  color: var(--primary);                /* #5B4FFF */
  border: 1px solid var(--border);      /* #E2E8F0 */
  border-bottom-color: transparent;     /* 消除下边框，与内容区融合 */
  font-weight: 600;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.05);
}
```

#### Inactive Tab (未激活状态)
```css
.tab--inactive {
  background: transparent;
  color: var(--muted-foreground);       /* #64748B */
  border: 1px solid transparent;
}

.tab--inactive:hover {
  background: var(--accent);            /* #F1F5F9 */
  color: var(--foreground);             /* #020817 */
}
```

#### 关闭按钮 (Close Button)
```
┌──────────────────┐
│ 💬 General  [X]  │  ← X 按钮仅 hover 时显示
└──────────────────┘

CSS:
.tab__close {
  opacity: 0;
  margin-left: 8px;
  transition: opacity 150ms;
}

.tab:hover .tab__close {
  opacity: 1;
}

.tab__close:hover {
  color: var(--destructive);            /* #EF4444 */
}
```

### 5.3 Add Tab 按钮

```
┌──────┐
│ + New │  ← 特殊样式
└──────┘

CSS:
.tab--add {
  background: var(--muted);             /* #F1F5F9 */
  color: var(--muted-foreground);       /* #64748B */
  border: 1px dashed var(--border);     /* 虚线边框 */
}

.tab--add:hover {
  background: var(--primary);           /* #5B4FFF */
  color: var(--primary-foreground);     /* #FFFFFF */
  border-style: solid;
}
```

### 5.4 Tab 下拉菜单 (超过 8 个 Tab 时)

```
┌─────────────────────────────────────────────────────┐
│ [💬 Gen] [🎨 Img] [💻 Code] ... [More ▼]            │
│                                    ↑ 下拉菜单触发器  │
└─────────────────────────────────────────────────────┘
                                    ↓
                      ┌──────────────────┐
                      │ 🌐 Web Auto      │
                      │ 🗄️ Database      │
                      │ 📊 Office        │
                      └──────────────────┘
```

---

## 六、响应式布局

### 6.1 Desktop 断点

```
最小窗口尺寸: 1024x768
推荐尺寸: 1280x800 / 1440x900 / 1920x1080

断点:
- Small Desktop:  1024px - 1279px (侧边栏折叠)
- Medium Desktop: 1280px - 1439px (侧边栏展开, 4列网格)
- Large Desktop:  1440px - 1919px (侧边栏展开, 5列网格)
- XL Desktop:     1920px+          (侧边栏展开, 6列网格)
```

### 6.2 Skills 商店网格自适应

```css
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px 16px;
  padding: 24px;
}

/* Small Desktop: 强制 4 列 */
@media (max-width: 1279px) {
  .skills-grid {
    grid-template-columns: repeat(4, 120px);
  }
}

/* Large Desktop: 5 列 */
@media (min-width: 1440px) and (max-width: 1919px) {
  .skills-grid {
    grid-template-columns: repeat(5, 120px);
  }
}

/* XL Desktop: 6 列 */
@media (min-width: 1920px) {
  .skills-grid {
    grid-template-columns: repeat(6, 120px);
  }
}
```

### 6.3 侧边栏折叠规则

```
窗口宽度 < 1280px:
- 侧边栏自动折叠至 64px
- 仅显示图标，隐藏文字
- Hover 时显示 Tooltip

窗口宽度 >= 1280px:
- 侧边栏展开至 240px
- 显示图标 + 文字
```

---

## 七、交互动效

### 7.1 Skill 卡片 Hover 动画

```css
.skill-card {
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.skill-card:hover {
  transform: translateY(-2px);          /* 向上移动 2px */
  box-shadow: 0 8px 16px -4px rgba(91, 79, 255, 0.3);
  border-color: var(--primary);
}

/* 图标缩放动画 */
.skill-card:hover .skill-card__icon {
  transform: scale(1.1);
  transition: transform 200ms cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

### 7.2 Modal 打开/关闭动画

```css
/* 打开动画 */
@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal {
  animation: modal-enter 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* 关闭动画 */
@keyframes modal-exit {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
}

.modal--closing {
  animation: modal-exit 200ms cubic-bezier(0.4, 0, 1, 1);
}
```

### 7.3 下载按钮涟漪效果 (Ripple)

```css
.download-button {
  position: relative;
  overflow: hidden;
}

.download-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.download-button:active::after {
  width: 200px;
  height: 200px;
}
```

### 7.4 Tab 切换动画

```css
/* 内容区滑动进入 */
@keyframes tab-content-enter {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.tab-content {
  animation: tab-content-enter 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 八、设计交付清单

### 8.1 Figma 文件结构

```
📁 AeonSage Desktop UI Design
├─ 🎨 Cover (封面页)
│  └─ 项目概述 + 设计系统预览
│
├─ 📚 Design System (设计系统)
│  ├─ Colors (颜色面板)
│  ├─ Typography (字体规范)
│  ├─ Spacing (间距阶梯)
│  ├─ Shadows (阴影样式)
│  └─ Icons (图标库)
│
├─ 🧩 Components (组件库)
│  ├─ Buttons (所有变体)
│  ├─ Inputs (输入框 + 搜索框)
│  ├─ Cards (Skill Card + Download Item)
│  ├─ Tabs (Tab 所有状态)
│  ├─ Modal (弹窗模板)
│  └─ Empty States (空状态)
│
├─ 📄 Pages (页面设计)
│  ├─ Skills Store (Skills 商店页)
│  │  ├─ Default State (默认状态)
│  │  ├─ Hover State (悬停状态)
│  │  ├─ Modal Open (弹窗打开)
│  │  └─ Empty State (空状态)
│  │
│  ├─ Chat Page (对话页面)
│  │  ├─ Multi-Agent Tabs (多 Tab)
│  │  ├─ Download Area (下载区域)
│  │  └─ Responsive (响应式)
│  │
│  └─ Workflow Canvas (工作流画布)
│     └─ 待后续设计
│
└─ 🎬 Prototypes (交互原型)
   ├─ Skill Install Flow (安装流程)
   ├─ Download Flow (下载流程)
   └─ Tab Switch Flow (Tab 切换)
```

### 8.2 必须交付的 Figma Assets

#### 组件库 (Components)
- [x] Button (Primary/Secondary/Ghost/Icon) - 所有状态
- [x] Input (Default/Focus/Error/Disabled)
- [x] Skill Card (Default/Hover/Installed/Pro)
- [x] Download Item (Default/Hover/Loading/Success)
- [x] Tab (Active/Inactive/Hover/Add)
- [x] Modal (Header/Body/Footer)

#### 页面 (Pages)
- [x] Skills 商店页 (Default/Hover/Modal/Empty)
- [x] Chat 页面 + 下载区域
- [x] 多 Agent Tab 示例

#### 设计规范 (Specs)
- [x] 颜色面板 (Color Palette)
- [x] 字体规范 (Typography Scale)
- [x] 间距系统 (Spacing System)
- [x] 阴影样式 (Shadow Styles)

#### 交互原型 (Prototypes)
- [ ] Skill 安装流程 (点击卡片 → 弹窗 → 安装 → 跳转 Chat)
- [ ] 文档下载流程 (生成 → 显示下载区 → 点击下载)
- [ ] Tab 切换动画 (点击 Tab → 内容滑动)

### 8.3 导出规范

#### 图标导出 (Icons)
- 格式: SVG
- 尺寸: 24x24 (Default), 48x48 (Skill Icon)
- 命名: `icon-[name].svg` (如 `icon-download.svg`)

#### 组件导出 (Components)
- 格式: Figma Component (使用 Auto Layout)
- 变体: 使用 Variants 功能组织状态
- 命名: `Component/Variant/State` (如 `Button/Primary/Hover`)

#### 设计 Token 导出
- 使用 Figma Tokens 插件
- 导出 JSON 文件 → 转换为 CSS Variables
- 文件路径: `src/design-tokens/tokens.json`

---

## 附录

### A. Figma 插件推荐

| 插件名 | 用途 |
|-------|------|
| **Iconify** | 图标库 (Material Icons, Lucide, etc.) |
| **Lorem Ipsum** | 占位文本生成 |
| **Contrast** | 颜色对比度检查 (WCAG AA/AAA) |
| **Figma Tokens** | Design Tokens 管理 |
| **Auto Layout** | 自动布局工具 |
| **Unsplash** | 占位图片 |

### B. 设计资源

- **shadcn/ui**: https://ui.shadcn.com (组件参考)
- **Tailwind CSS**: https://tailwindcss.com/docs (颜色系统)
- **Radix UI**: https://www.radix-ui.com (无障碍规范)
- **Inter Font**: https://rsms.me/inter (主字体下载)
- **Lucide Icons**: https://lucide.dev (图标库)

### C. 颜色对比度检查表

| 组合 | 对比度 | WCAG 等级 | 用途 |
|------|-------|----------|------|
| `#020817` on `#FFFFFF` | 18.5:1 | AAA | 正文 |
| `#5B4FFF` on `#FFFFFF` | 5.8:1 | AA | 按钮 |
| `#64748B` on `#FFFFFF` | 4.6:1 | AA | 次要文字 |
| `#FFFFFF` on `#5B4FFF` | 5.8:1 | AA | 按钮文字 |

所有文字组合必须满足 **WCAG AA 级别** (对比度 ≥ 4.5:1)

---

**文档版本**: v1.0
**创建日期**: 2026-02-12
**工具**: Figma Desktop / Web
**兼容性**: Tauri v2 + React 19 + shadcn/ui
**负责人**: VelonLabs Design Team
