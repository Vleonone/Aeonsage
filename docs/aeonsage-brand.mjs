/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  AeonSage Brand System v2.0                                   ║
 * ║  Complete CLI branding with 🦑 Squid imagery & boot sequence  ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════
// Color Palette
// ═══════════════════════════════════════════════════════════════

const palette = {
  // Brand colors
  brand: {
    primary: '\x1b[38;5;141m',    // 主紫色
    secondary: '\x1b[38;5;147m',  // 亮紫
    accent: '\x1b[38;5;216m',     // 橙金
    glow: '\x1b[38;5;223m',       // 暖光
  },
  // Galaxy colors
  galaxy: {
    core: '\x1b[38;5;223m',       // 银河核心
    arm1: '\x1b[38;5;216m',
    arm2: '\x1b[38;5;209m',
    arm3: '\x1b[38;5;202m',
    edge: '\x1b[38;5;166m',
  },
  // Utility
  ui: {
    dim: '\x1b[38;5;240m',
    dimmer: '\x1b[38;5;236m',
    text: '\x1b[38;5;252m',
    star: '\x1b[38;5;255m',
    starDim: '\x1b[38;5;250m',
  },
  // Status
  status: {
    success: '\x1b[38;5;120m',
    warn: '\x1b[38;5;228m',
    error: '\x1b[38;5;203m',
    info: '\x1b[38;5;117m',
  },
  // Effects
  bold: '\x1b[1m',
  reset: '\x1b[0m',
};

const p = palette;

// ═══════════════════════════════════════════════════════════════
// ASCII Art Assets
// ═══════════════════════════════════════════════════════════════

const art = {
  // 品牌Logo - 🦑 可爱鱿鱼
  logo: `
${p.brand.primary}       ▄███████▄${p.reset}
${p.brand.primary}      ██${p.reset}${p.ui.star} ●   ● ${p.reset}${p.brand.primary}██${p.reset}
${p.brand.primary}      ██${p.reset}${p.ui.dim}   ◕   ${p.reset}${p.brand.primary}██${p.reset}
${p.brand.primary}       ███████${p.reset}
${p.brand.primary}       ██ ██ ██${p.reset}
${p.brand.primary}       █  █  █${p.reset}`,

  // 详细宇航员 - 仰望星空姿态
  astronaut: `
${p.ui.dimmer}                                    ${p.galaxy.core}.  ${p.galaxy.arm1}*${p.reset}
${p.ui.dimmer}                              ${p.galaxy.arm2}. ${p.galaxy.core}* ${p.galaxy.arm1}.  ${p.galaxy.arm2}*${p.reset}
${p.ui.dimmer}                         ${p.galaxy.arm3}*${p.reset}  ${p.galaxy.core}. ${p.galaxy.arm1}·${p.reset}    ${p.galaxy.arm2}.${p.reset}
${p.ui.dim}                           ╭───╮${p.reset}
${p.ui.dim}                          ╱${p.brand.secondary}     ${p.ui.dim}╲${p.reset}
${p.ui.dim}                         │${p.brand.secondary} ${p.galaxy.core}◠${p.brand.secondary} ${p.galaxy.core}◠${p.brand.secondary} ${p.ui.dim}│${p.reset}
${p.ui.dim}                         │${p.brand.primary}  ▽  ${p.ui.dim}│${p.reset}
${p.ui.dim}                          ╲${p.brand.secondary}▁▁▁${p.ui.dim}╱${p.reset}
${p.ui.dim}                        ╭──${p.brand.primary}█████${p.ui.dim}──╮${p.reset}
${p.ui.dim}                       ╱${p.brand.primary}  █████  ${p.ui.dim}╲${p.reset}
${p.ui.dim}                      │${p.brand.primary}   █${p.ui.dim}┼${p.brand.primary}█   ${p.ui.dim}│${p.reset}
${p.ui.dim}                      │${p.brand.primary}  ╱   ╲  ${p.ui.dim}│${p.reset}
${p.ui.dim}                      │${p.brand.primary} ╱     ╲ ${p.ui.dim}│${p.reset}
${p.ui.dim}                     ╱${p.brand.primary} █       █ ${p.ui.dim}╲${p.reset}
${p.ui.dim}                    ╱${p.brand.primary}  █       █  ${p.ui.dim}╲${p.reset}
${p.ui.dimmer}    ░░░░░░░░░░░░░░░░${p.brand.secondary}███${p.ui.dimmer}░░░░░░░${p.brand.secondary}███${p.ui.dimmer}░░░░░░░░░░░░░░░░░${p.reset}`,

  // 简约宇航员剪影
  astronautSilhouette: `
${p.ui.dim}                           ▄███▄${p.reset}
${p.ui.dim}                          ███████${p.reset}
${p.ui.dim}                          ███████${p.reset}
${p.ui.dim}                           █████${p.reset}
${p.ui.dim}                          ▄█████▄${p.reset}
${p.ui.dim}                         ██${p.brand.primary}█████${p.ui.dim}██${p.reset}
${p.ui.dim}                         ██${p.brand.primary}█${p.ui.dim}█${p.brand.primary}█${p.ui.dim}██${p.reset}
${p.ui.dim}                         ██${p.brand.primary}█ █${p.ui.dim}██${p.reset}
${p.ui.dim}                        ▄██   ██▄${p.reset}
${p.ui.dim}                       ███     ███${p.reset}`,

  // 品牌文字 - 大号
  wordmarkLarge: `
${p.brand.primary}█████${p.brand.secondary}╗ ${p.brand.primary}███████${p.brand.secondary}╗ ${p.brand.primary}██████${p.brand.secondary}╗ ${p.brand.primary}███${p.brand.secondary}╗   ${p.brand.primary}██${p.brand.secondary}╗${p.brand.primary}███████${p.brand.secondary}╗ ${p.brand.primary}█████${p.brand.secondary}╗  ${p.brand.primary}██████${p.brand.secondary}╗ ${p.brand.primary}███████${p.brand.secondary}╗${p.reset}
${p.brand.primary}██${p.brand.secondary}╔══${p.brand.primary}██${p.brand.secondary}╗${p.brand.primary}██${p.brand.secondary}╔════╝${p.brand.primary}██${p.brand.secondary}╔═══${p.brand.primary}██${p.brand.secondary}╗${p.brand.primary}████${p.brand.secondary}╗  ${p.brand.primary}██${p.brand.secondary}║${p.brand.primary}██${p.brand.secondary}╔════╝${p.brand.primary}██${p.brand.secondary}╔══${p.brand.primary}██${p.brand.secondary}╗${p.brand.primary}██${p.brand.secondary}╔════╝ ${p.brand.primary}██${p.brand.secondary}╔════╝${p.reset}
${p.brand.primary}█████${p.brand.secondary}██║${p.brand.primary}█████${p.brand.secondary}╗  ${p.brand.primary}██${p.brand.secondary}║   ${p.brand.primary}██${p.brand.secondary}║${p.brand.primary}██${p.brand.secondary}╔${p.brand.primary}██${p.brand.secondary}╗ ${p.brand.primary}██${p.brand.secondary}║${p.brand.primary}███████${p.brand.secondary}╗${p.brand.primary}█████${p.brand.secondary}██║${p.brand.primary}██${p.brand.secondary}║  ${p.brand.primary}███${p.brand.secondary}╗${p.brand.primary}█████${p.brand.secondary}╗${p.reset}
${p.brand.primary}██${p.brand.secondary}╔══${p.brand.primary}██${p.brand.secondary}║${p.brand.primary}██${p.brand.secondary}╔══╝  ${p.brand.primary}██${p.brand.secondary}║   ${p.brand.primary}██${p.brand.secondary}║${p.brand.primary}██${p.brand.secondary}║╚${p.brand.primary}██${p.brand.secondary}╗${p.brand.primary}██${p.brand.secondary}║${p.brand.secondary}╚════${p.brand.primary}██${p.brand.secondary}║${p.brand.primary}██${p.brand.secondary}╔══${p.brand.primary}██${p.brand.secondary}║${p.brand.primary}██${p.brand.secondary}║   ${p.brand.primary}██${p.brand.secondary}║${p.brand.primary}██${p.brand.secondary}╔══╝${p.reset}
${p.brand.primary}██${p.brand.secondary}║  ${p.brand.primary}██${p.brand.secondary}║${p.brand.primary}███████${p.brand.secondary}╗╚${p.brand.primary}██████${p.brand.secondary}╔╝${p.brand.primary}██${p.brand.secondary}║ ╚${p.brand.primary}████${p.brand.secondary}║${p.brand.primary}███████${p.brand.secondary}║${p.brand.primary}██${p.brand.secondary}║  ${p.brand.primary}██${p.brand.secondary}║╚${p.brand.primary}██████${p.brand.secondary}╔╝${p.brand.primary}███████${p.brand.secondary}╗${p.reset}
${p.brand.secondary}╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝${p.reset}`,

  // 品牌文字 - 小号
  wordmarkSmall: `${p.brand.primary}${p.bold}◈ AeonSage${p.reset}`,
};

// ═══════════════════════════════════════════════════════════════
// Animation Utilities
// ═══════════════════════════════════════════════════════════════

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function typewriter(text, speed = 30) {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(speed);
  }
  console.log();
}

async function progressBar(label, duration = 1000, width = 30) {
  const steps = 20;
  const stepTime = duration / steps;

  for (let i = 0; i <= steps; i++) {
    const filled = Math.floor((i / steps) * width);
    const empty = width - filled;
    const percent = Math.floor((i / steps) * 100);
    const bar = `${p.brand.primary}${'█'.repeat(filled)}${p.ui.dimmer}${'░'.repeat(empty)}${p.reset}`;
    process.stdout.write(`\r  ${p.ui.dim}${label}${p.reset} ${bar} ${p.ui.dim}${percent.toString().padStart(3)}%${p.reset}`);
    await sleep(stepTime);
  }
  console.log();
}

function generateStars(width, height, density = 0.03) {
  const lines = [];
  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      const r = Math.random();
      if (r < density * 0.3) line += `${p.ui.star}*${p.reset}`;
      else if (r < density * 0.6) line += `${p.ui.starDim}·${p.reset}`;
      else if (r < density) line += `${p.ui.dim}.${p.reset}`;
      else line += ' ';
    }
    lines.push(line);
  }
  return lines;
}

function generateGalaxy(width, density = 0.4) {
  let line = '';
  const colors = [p.galaxy.core, p.galaxy.arm1, p.galaxy.arm2, p.galaxy.arm3, p.galaxy.edge];
  const chars = ['░', '▒', '▓', '█', '*', '·', '✦', '✧'];

  for (let i = 0; i < width; i++) {
    const pos = i / width;
    // 银河在中右位置，弧形分布
    const inGalaxy = pos > 0.25 && pos < 0.85 && Math.random() < density * Math.sin(pos * Math.PI);

    if (inGalaxy) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      line += `${color}${char}${p.reset}`;
    } else if (Math.random() < 0.03) {
      line += `${p.ui.starDim}·${p.reset}`;
    } else {
      line += ' ';
    }
  }
  return line;
}

// ═══════════════════════════════════════════════════════════════
// Boot Sequence Themes
// ═══════════════════════════════════════════════════════════════

const themes = {
  // 银河主题 - 完整的宇航员与星空
  galaxy: async (options) => {
    const { version, tagline } = options;
    const w = 80;

    console.log();
    console.log(`${p.ui.dim}┌${'─'.repeat(w - 2)}┐${p.reset}`);

    // 星空顶部
    for (let i = 0; i < 2; i++) {
      const stars = generateStars(w - 4, 1, 0.04)[0];
      console.log(`${p.ui.dim}│${p.reset} ${stars} ${p.ui.dim}│${p.reset}`);
    }

    // 银河带
    for (let i = 0; i < 3; i++) {
      const galaxy = generateGalaxy(w - 4, 0.3 + i * 0.15);
      console.log(`${p.ui.dim}│${p.reset} ${galaxy} ${p.ui.dim}│${p.reset}`);
    }

    // ASCII标题
    const titleLines = art.wordmarkLarge.split('\n').filter(l => l.trim());
    for (const line of titleLines) {
      console.log(`${p.ui.dim}│${p.reset} ${line}  ${p.ui.dim}│${p.reset}`);
    }

    // 银河过渡
    for (let i = 2; i >= 0; i--) {
      const galaxy = generateGalaxy(w - 4, 0.15 + i * 0.1);
      console.log(`${p.ui.dim}│${p.reset} ${galaxy} ${p.ui.dim}│${p.reset}`);
    }

    // 宇航员剪影
    console.log(`${p.ui.dim}│${p.reset}${' '.repeat(32)}${p.ui.dim}▄███▄${p.reset}${' '.repeat(39)}${p.ui.dim}│${p.reset}`);
    console.log(`${p.ui.dim}│${p.reset}${' '.repeat(31)}${p.ui.dim}███████${p.reset}${' '.repeat(38)}${p.ui.dim}│${p.reset}`);
    console.log(`${p.ui.dim}│${p.reset}${' '.repeat(32)}${p.ui.dim}█████${p.reset}${' '.repeat(39)}${p.ui.dim}│${p.reset}`);
    console.log(`${p.ui.dim}│${p.reset}${' '.repeat(31)}${p.ui.dim}███${p.brand.primary}█${p.ui.dim}███${p.reset}${' '.repeat(38)}${p.ui.dim}│${p.reset}`);
    console.log(`${p.ui.dim}│${p.reset}${' '.repeat(31)}${p.ui.dim}██${p.brand.primary}█ █${p.ui.dim}██${p.reset}${' '.repeat(38)}${p.ui.dim}│${p.reset}`);
    console.log(`${p.ui.dim}│${p.reset}${' '.repeat(30)}${p.ui.dim}██${p.brand.primary}█${p.reset}   ${p.brand.primary}█${p.ui.dim}██${p.reset}${' '.repeat(37)}${p.ui.dim}│${p.reset}`);
    console.log(`${p.ui.dim}│${p.reset}  ${p.ui.dimmer}${'░'.repeat(28)}${p.reset}${p.ui.dim}███   ███${p.reset}${p.ui.dimmer}${'░'.repeat(34)}${p.reset}  ${p.ui.dim}│${p.reset}`);

    // 分隔线
    console.log(`${p.ui.dim}├${'─'.repeat(w - 2)}┤${p.reset}`);

    // 版本信息行
    const infoLine = `  ${p.brand.secondary}◈${p.reset} ${p.brand.primary}${p.bold}AeonSage${p.reset} ${p.ui.dim}${version}${p.reset} ${p.ui.dim}${'─'.repeat(20)}${p.reset} ${p.status.warn}// ${tagline}${p.reset}`;
    console.log(`${p.ui.dim}│${p.reset}${infoLine}  ${p.ui.dim}│${p.reset}`);

    console.log(`${p.ui.dim}└${'─'.repeat(w - 2)}┘${p.reset}`);
    console.log();
  },

  // 极简主题 - 只有Logo和文字
  minimal: async (options) => {
    const { version, tagline } = options;

    console.log();
    console.log(art.logo);
    console.log();
    console.log(`  ${p.brand.primary}${p.bold}AeonSage${p.reset} ${p.ui.dim}${version}${p.reset}`);
    console.log(`  ${p.ui.dim}${tagline}${p.reset}`);
    console.log();
  },

  // 启动序列主题 - 带动画的系统启动
  boot: async (options) => {
    const { version, tagline } = options;

    console.log();
    console.log(`${p.ui.dim}╔════════════════════════════════════════════════════════════════════╗${p.reset}`);
    console.log(`${p.ui.dim}║${p.reset}  ${p.brand.secondary}◈${p.reset} ${p.brand.primary}${p.bold}AEONSAGE SYSTEM${p.reset} ${p.ui.dim}v${version}${p.reset}${' '.repeat(42)}${p.ui.dim}║${p.reset}`);
    console.log(`${p.ui.dim}╚════════════════════════════════════════════════════════════════════╝${p.reset}`);
    console.log();

    await typewriter(`  ${p.ui.dim}Initializing neural pathways...${p.reset}`, 20);
    await progressBar('CORE    ', 600, 25);

    await typewriter(`  ${p.ui.dim}Loading knowledge matrices...${p.reset}`, 20);
    await progressBar('MEMORY  ', 400, 25);

    await typewriter(`  ${p.ui.dim}Establishing consciousness link...${p.reset}`, 20);
    await progressBar('CONNECT ', 500, 25);

    console.log();

    // ASCII标题显示
    const titleLines = art.wordmarkLarge.split('\n').filter(l => l.trim());
    for (const line of titleLines) {
      console.log(`  ${line}`);
      await sleep(50);
    }

    console.log();
    console.log(`  ${p.status.success}●${p.reset} ${p.ui.text}System Online${p.reset} ${p.ui.dim}─────────────────${p.reset} ${p.status.warn}// ${tagline}${p.reset}`);
    console.log();
  },

  // 赛博朋克主题
  cyber: async (options) => {
    const { version, tagline } = options;
    const w = 80;

    const glitch = (text) => {
      const glitchChars = ['█', '▓', '▒', '░', '┃', '╋'];
      return text.split('').map(c =>
        Math.random() < 0.05 ? `${p.status.error}${glitchChars[Math.floor(Math.random() * glitchChars.length)]}${p.reset}` : c
      ).join('');
    };

    console.log();
    console.log(`${p.status.error}▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓${p.reset}`);
    console.log(`${p.status.error}▓${p.reset}${' '.repeat(78)}${p.status.error}▓${p.reset}`);

    const titleLines = art.wordmarkLarge.split('\n').filter(l => l.trim());
    for (const line of titleLines) {
      console.log(`${p.status.error}▓${p.reset} ${glitch(line)}  ${p.status.error}▓${p.reset}`);
    }

    console.log(`${p.status.error}▓${p.reset}${' '.repeat(78)}${p.status.error}▓${p.reset}`);
    console.log(`${p.status.error}▓${p.reset}  ${p.status.info}[SYS]${p.reset} ${p.ui.text}NEURAL_LINK::ACTIVE${p.reset}    ${p.status.warn}[MEM]${p.reset} ${p.ui.text}∞${p.reset}    ${p.status.success}[NET]${p.reset} ${p.ui.text}QUANTUM_MESH${p.reset}         ${p.status.error}▓${p.reset}`);
    console.log(`${p.status.error}▓${p.reset}${' '.repeat(78)}${p.status.error}▓${p.reset}`);
    console.log(`${p.status.error}▓${p.reset}  ${p.brand.secondary}◈${p.reset} ${p.brand.primary}${p.bold}AeonSage${p.reset} ${p.ui.dim}${version}${p.reset} ${p.ui.dimmer}│${p.reset} ${p.status.warn}${tagline}${p.reset}${' '.repeat(22)}${p.status.error}▓${p.reset}`);
    console.log(`${p.status.error}▓${p.reset}${' '.repeat(78)}${p.status.error}▓${p.reset}`);
    console.log(`${p.status.error}▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓${p.reset}`);
    console.log();
  },
};

// ═══════════════════════════════════════════════════════════════
// Main API
// ═══════════════════════════════════════════════════════════════

async function printBanner(options = {}) {
  const {
    version = '2026.1.26',
    tagline = 'Think different. Actually think.',
    theme = 'galaxy',  // 'galaxy' | 'minimal' | 'boot' | 'cyber'
    animate = true,
  } = options;

  const themeFunc = themes[theme];
  if (themeFunc) {
    await themeFunc({ version, tagline, animate });
  } else {
    await themes.galaxy({ version, tagline, animate });
  }
}

function log(tag, message, type = 'info') {
  const now = new Date();
  const time = `${p.ui.dim}${now.toTimeString().slice(0, 8)}${p.reset}`;
  const tagColor = p.status[type] || p.status.info;
  console.log(`${time} ${tagColor}[${tag}]${p.reset} ${message}`);
}

// 快捷方式
const banner = {
  galaxy: (opts) => printBanner({ ...opts, theme: 'galaxy' }),
  minimal: (opts) => printBanner({ ...opts, theme: 'minimal' }),
  boot: (opts) => printBanner({ ...opts, theme: 'boot' }),
  cyber: (opts) => printBanner({ ...opts, theme: 'cyber' }),
};

export { printBanner, banner, log, art, palette, themes };
export default printBanner;

// ═══════════════════════════════════════════════════════════════
// Demo - 直接运行展示所有主题
// ═══════════════════════════════════════════════════════════════

if (import.meta.url === `file://${process.argv[1]}`) {
  const demo = async () => {
    const theme = process.argv[2] || 'galaxy';

    if (theme === 'all') {
      console.log(`\n${p.ui.dim}━━━ Theme: GALAXY ━━━${p.reset}`);
      await banner.galaxy();

      console.log(`\n${p.ui.dim}━━━ Theme: MINIMAL ━━━${p.reset}`);
      await banner.minimal();

      console.log(`\n${p.ui.dim}━━━ Theme: BOOT ━━━${p.reset}`);
      await banner.boot();

      console.log(`\n${p.ui.dim}━━━ Theme: CYBER ━━━${p.reset}`);
      await banner.cyber();
    } else {
      await printBanner({ theme });
    }

    log('gateway', 'listening on ws://127.0.0.1:18789', 'info');
    log('heartbeat', 'started', 'success');
    log('telegram', 'provider @Aeon_Sage_Bot ready', 'info');
  };

  demo();
}
