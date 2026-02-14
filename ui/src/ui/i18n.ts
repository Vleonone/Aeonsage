/**
 * AeonSage Internationalization (i18n)
 * Supports English (en-US) and Chinese (zh-CN)
 */

export type Language = 'zh-CN' | 'en-US';

export interface I18nTexts {
  // 通用
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    refresh: string;
    search: string;
  };

  // 顶部栏
  topbar: {
    health: string;
    online: string;
    offline: string;
    theme: string;
    language: string;
  };

  // 导航
  nav: {
    overview: string;
    chat: string;
    channels: string;
    instances: string;
    sessions: string;
    cron: string;
    skills: string;
    nodes: string;
    config: string;
    logs: string;
    debug: string;
    resources: string;
    docs: string;
    usage: string;
    tts: string;
    // Consolidated Navigation Keys
    dashboard: string;
    connect: string;
    intelligence: string;
    workflow: string;
    security: string;
    system: string;
  };

  // 页面副标题
  pageSubtitles: {
    overview: string;
    chat: string;
    channels: string;
    instances: string;
    sessions: string;
    cron: string;
    skills: string;
    nodes: string;
    config: string;
    logs: string;
    debug: string;
    usage: string;
    tts: string;
    security: string;
    workflow: string;
  };

  // 安全 (Security)
  security: {
    title: string;
    killSwitchTitle: string;
    refresh: string;
    systemHalted: string;
    activatedAt: string;
    reason: string;
    systemOperational: string;
    operationalDesc: string;
    activateButton: string;
    activateWarning: string;
    resumeHint: string;
    vdidTitle: string;
  };

  // 概览页
  overview: {
    title: string;
    subtitle: string;
    connection: string;
    sessionKey: string;
    connect: string;
    connected: string;
    disconnected: string;
    stats: string;
    activeInstances: string;
    activeSessions: string;
    cronJobs: string;
    lastChannelRefresh: string;
    // SENSEI: 补充完整翻译
    gatewayAccess: string;
    gatewayAccessSub: string;
    websocketUrl: string;
    gatewayToken: string;
    password: string;
    passwordNotStored: string;
    defaultSessionKey: string;
    refresh: string;
    connectHint: string;
    snapshot: string;
    snapshotSub: string;
    statusLabel: string;
    uptime: string;
    tickInterval: string;
    instances: string;
    sessions: string;
    cron: string;
    cronEnabled: string;
    cronDisabled: string;
    nextWake: string;
    notes: string;
    notesSub: string;
    tailscaleServe: string;
    tailscaleServeSub: string;
    sessionHygiene: string;
    sessionHygieneSub: string;
    cronReminders: string;
    cronRemindersSub: string;
    // SENSEI: 实时监控面板
    realtimeMonitor: string;
    systemLoad: string;
    messageThroughput: string;
    responseLatency: string;
    hotChannel: string;
    perMinute: string;
    milliseconds: string;
    walletsActive: string;
    walletsMissing: string;
    balanceUnavailable: string;
    balanceError: string;
    authHint: string;
    authHintSub: string;
    authFailed: string;
    insecureHint: string;
    insecureHintSub: string;
    docsAuth: string;
    docsTailscale: string;
    docsInsecure: string;
    presenceHint: string;
    sessionsHint: string;
    useChannels: string;
  };

  // 聊天页
  chat: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    send: string;
    abort: string;
    thinking: string;
    processing: string;
    copyMarkdown: string;
    copied: string;
    // SENSEI: 补充聊天页完整翻译
    newSession: string;
    clearChat: string;
    focusMode: string;
    connecting: string;
    disconnected: string;
    compacting: string;
    compactComplete: string;
    attachmentAlt: string;
    removeAttachment: string;
    pasteImages: string;
    addMessage: string;
    shiftEnter: string;
  };

  // 频道
  channels: {
    title: string;
    subtitle: string;
    health: string;
    healthSub: string;
    noSnapshot: string;
    whatsapp: {
      title: string;
      subtitle: string;
      showQr: string;
      relink: string;
      waitScan: string;
      logout: string;
    };
    telegram: {
      title: string;
      subtitle: string;
      probe: string;
    };
    common: {
      configured: string;
      running: string;
      connected: string;
      linked: string;
      lastConnect: string;
      lastMessage: string;
      lastInbound: string;
      authAge: string;
      mode: string;
      lastStart: string;
      lastProbe: string;
    };
    analysis: {
      title: string;
      name: string;
      status: string;
      uptime: string;
      strengths: string;
      metrics: string;
    };
  };
  // 状态
  status: {
    ready: string;
    busy: string;
    error: string;
    active: string;
    inactive: string;
    enabled: string;
    disabled: string;
    online: string;
    offline: string;
    connected: string;
    disconnected: string;
    standby: string;
  };

  // 侧边栏机器人
  sidebar: {
    terminalTitle: string;
    battleMode: string;
    battleUnit: string;
    power: string;
    shield: string;
    statusLabel: string;
    userPrefix: string;
    sysPrefix: string;
    netPrefix: string;
  };

  // 用量
  usage: {
    title: string;
    totalTokens: string;
    totalCost: string;
    input: string;
    output: string;
    cost: string;
    model: string;
    provider: string;
    days7: string;
    days30: string;
    costEstimate: string;
    noData: string;
  };

  // TTS
  tts: {
    title: string;
    enable: string;
    disable: string;
    provider: string;
    voice: string;
    test: string;
    convert: string;
    play: string;
    stop: string;
    playing: string;
    error: string;
    autoMode: string;
    configureKeys: string;
  };

  // 引导向导
  wizard: {
    title: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    detecting: string;
    osDetected: string;
    envCheck: string;
    gatewayToken: string;
    tokenPlaceholder: string;
    tokenHint: string;
    assistantName: string;
    assistantPlaceholder: string;
    avatarSelection: string;
    densitySelection: string;
    minimalTech: string;
    fullCosmic: string;
    completeTitle: string;
    completeDesc: string;
    calibrationOnline: string;
    back: string;
    next: string;
    finish: string;
  };

  // OpenRouter
  openrouter: {
    title: string;
    apiConfiguration: string;
    apiKey: string;
    apiKeyPlaceholder: string;
    apiKeyHint: string;
    saveKey: string;
    testConnection: string;
    connected: string;
    usageStatistics: string;
    totalCost: string;
    requests: string;
    periodStart: string;
    connectToView: string;
    modelBrowser: string;
    searchModels: string;
    loadingModels: string;
    noModelsMatch: string;
    connectToLoad: string;
    setDefault: string;
    context: string;
  };

  // 配置页面 (Config)
  config: {
    // 区块名称
    sections: {
      environment: string;
      updates: string;
      agents: string;
      authentication: string;
      channels: string;
      messages: string;
      commands: string;
      hooks: string;
      skills: string;
      tools: string;
      gateway: string;
      wallet: string;
      setupWizard: string;
      meta: string;
      diagnostics: string;
      logging: string;
      browser: string;
    };
    // 按钮
    reload: string;
    save: string;
    apply: string;
    update: string;
    // 状态
    noChanges: string;
    unsavedChanges: string;
    loadingSchema: string;
    formMode: string;
    rawMode: string;
    viewPendingChanges: string;
    all: string;
  };

  // 节点页面 (Nodes)
  nodes: {
    execApprovals: string;
    execApprovalsSub: string;
    target: string;
    targetSub: string;
    loadApprovals: string;
    execNodeBinding: string;
    execNodeBindingSub: string;
    defaultBinding: string;
    defaultBindingSub: string;
    anyNode: string;
    useDefault: string;
    devices: string;
    devicesSub: string;
    paired: string;
    tokens: string;
    rotate: string;
    revoke: string;
    noNodesWithSync: string;
  };

  // 工作流画布 (Workflow Canvas)
  workflowCanvas: {
    title: string;
    refresh: string;
    liveActivity: string;
    noActiveAgents: string;
    nodes: string;
    // Stats sidebar
    statsOverview: string;
    tokenUsage: string;
    input: string;
    output: string;
    sessions: string;
    completed: string;
    runtime: string;
    waitingForWorkflow: string;
    startFromChat: string;
    // Bot Diary
    botDiary: string;
    statusGood: string;
    activeToday: string;
    weekDays: string[];
  };

  // 技能市场 (Skill Marketplace)
  marketplace: {
    title: string;
    subtitle: string;
    skillCount: string;
    installed: string;
    online: string;
    offline: string;
    searchPlaceholder: string;
    featuredSkills: string;
    categories: {
      all: string;
      coding: string;
      ai: string;
      video: string;
      marketing: string;
      finance: string;
      media: string;
      productivity: string;
      research: string;
    };
    safe: string;
  };

  // 安全门 (Safety Gates)  
  safetyGates: {
    title: string;
    defaultPolicies: string;
  };

  // 会话页面 (Sessions)
  sessions: {
    title: string;
    subtitle: string;
    activeWithin: string;
    limit: string;
    includeGlobal: string;
    includeUnknown: string;
    key: string;
    label: string;
    kind: string;
    updated: string;
    noSessions: string;
  };

  // 日志页面 (Logs)
  logs: {
    title: string;
    subtitle: string;
    filter: string;
    searchLogs: string;
    autoFollow: string;
    refresh: string;
    exportVisible: string;
    file: string;
    truncated: string;
  };

  // 调试页面 (Debug)
  debug: {
    snapshots: string;
    snapshotsSub: string;
    refresh: string;
    manualRpc: string;
    manualRpcSub: string;
    method: string;
    params: string;
    call: string;
    status: string;
    health: string;
  };

  // 人设页面 (Personas)
  personas: {
    skillsIncluded: string;
    clearActivePersona: string;
    selected: string;
    applyAndConfigure: string;
    active: string;
  };

  // 顶部导航补充 (Nav additions)
  navExtra: {
    workflow: string;
    skillMarket: string;
    sessions: string;
  };

  // 空状态提示 (Empty States)
  emptyStates: {
    upToDate: string;
    checkingUpdate: string;
    updateAvailable: string;
    noSkills: string;
    noChannels: string;
    noSessions: string;
    noLogs: string;
    noData: string;
    noCron: string;
    noInstances: string;
  };
}

export const translations: Record<Language, I18nTexts> = {
  'zh-CN': {
    common: {
      loading: '加载中...',
      error: '错误',
      success: '成功',
      cancel: '取消',
      confirm: '确认',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      refresh: '刷新',
      search: '搜索',
    },
    topbar: {
      health: '健康状态',
      online: '在线',
      offline: '离线',
      theme: '主题',
      language: '语言',
    },
    nav: {
      overview: '概览',
      chat: '对话',
      channels: '频道',
      instances: '实例',
      sessions: '会话',
      cron: '定时任务',
      skills: '技能',
      nodes: '节点',
      config: '配置',
      logs: '日志',
      debug: '调试',
      resources: '资源',
      docs: '文档',
      usage: '用量',
      tts: '语音',
      dashboard: '仪表盘',
      connect: '连接',
      intelligence: '智能',
      workflow: '工作流',
      security: '安全',
      system: '系统',
    },
    pageSubtitles: {
      overview: '网关状态、入口和快速健康检查',
      usage: '查看 Token 消耗和成本估算',
      tts: '配置语音合成（TTS）和试听',
      chat: '直接网关聊天会话，快速干预',
      channels: '管理频道和设置',
      instances: '已连接客户端和节点的状态信标',
      sessions: '检查活跃会话并调整会话默认值',
      cron: '安排唤醒和定期代理运行',
      skills: '管理技能可用性和 API 密钥注入',
      nodes: '配对设备、功能和命令暴露',
      config: '安全编辑 ~/.aeonsage/aeonsage.json',
      logs: '实时查看网关文件日志',
      debug: '网关快照、事件和手动 RPC 调用',
      security: 'Kill Switch、安全门、VDID 身份',
      workflow: 'Agent 可视化工作台、实时任务流',
    },
    overview: {
      title: '控制面板',
      subtitle: 'AeonSage 全能助手',
      connection: '连接状态',
      sessionKey: '会话密钥',
      connect: '连接',
      connected: '已连接',
      disconnected: '未连接',
      stats: '统计信息',
      activeInstances: '活跃实例',
      activeSessions: '活跃会话',
      cronJobs: '定时任务',
      lastChannelRefresh: '上次频道刷新',
      gatewayAccess: '网关访问',
      gatewayAccessSub: '仪表板连接位置及认证方式。',
      websocketUrl: 'WebSocket 地址',
      gatewayToken: '网关令牌',
      password: '密码',
      passwordNotStored: '密码（不存储）',
      defaultSessionKey: '默认会话密钥',
      refresh: '刷新',
      connectHint: '点击连接以应用连接更改。',
      snapshot: '快照',
      snapshotSub: '最新的网关握手信息。',
      statusLabel: '状态',
      uptime: '运行时间',
      tickInterval: '节拍间隔',
      instances: '实例',
      sessions: '会话',
      cron: '定时任务',
      cronEnabled: '已启用',
      cronDisabled: '已禁用',
      nextWake: '下次唤醒',
      notes: '备注',
      notesSub: '远程控制设置的快速提醒。',
      tailscaleServe: 'Tailscale serve',
      tailscaleServeSub: '优先使用 serve 模式将网关保持在本地环回，并使用 tailnet 认证。',
      sessionHygiene: '会话卫生',
      sessionHygieneSub: '使用 /new 或 sessions.patch 重置上下文。',
      cronReminders: '定时任务提醒',
      cronRemindersSub: '定期运行使用隔离会话。',
      realtimeMonitor: '实时监控',
      systemLoad: '系统负载',
      messageThroughput: '消息吞吐',
      responseLatency: '响应延迟',
      hotChannel: '热门频道',
      perMinute: '/min',
      milliseconds: 'ms',
      walletsActive: '钱包已激活',
      walletsMissing: 'VDID 初始化后会显示钱包。',
      balanceUnavailable: '余额不可用',
      balanceError: '余额错误',
      authHint: '此网关需要认证。请添加令牌或密码，然后点击连接。',
      authHintSub: '运行以下命令获取认证：',
      authFailed: '认证失败。请重新获取令牌或更新密码，然后重试。',
      insecureHint: '此页面通过 HTTP 访问，浏览器可能会阻止设备身份验证。建议使用 HTTPS (Tailscale Serve) 或在网关宿主机上打开 http://127.0.0.1:18789。',
      insecureHintSub: '若必须使用 HTTP，请在配置中设置 gateway.controlUi.allowInsecureAuth: true (仅限令牌)。',
      docsAuth: '文档：控制界面认证',
      docsTailscale: '文档：Tailscale Serve',
      docsInsecure: '文档：不安全 HTTP',
      presenceHint: '过去 5 分钟内的状态信标。',
      sessionsHint: '网关跟踪的最近会话密钥。',
      useChannels: '使用频道连接 WhatsApp, Telegram, Discord, Signal 或 iMessage。',
    },
    chat: {
      title: '智能对话',
      subtitle: '与 AeonSage 交流',
      inputPlaceholder: '输入消息...',
      send: '发送',
      abort: '停止',
      thinking: '思考中',
      processing: '处理中',
      copyMarkdown: '复制为 Markdown',
      copied: '已复制',
      newSession: '新对话',
      clearChat: '清空记录',
      focusMode: '专注模式',
      connecting: '连接中...',
      disconnected: '已断开',
      compacting: '压缩上下文中...',
      compactComplete: '上下文已压缩',
      attachmentAlt: '附件预览',
      removeAttachment: '移除附件',
      pasteImages: '粘贴图片',
      addMessage: '添加消息或粘贴更多图片...',
      shiftEnter: '↓回车发送，Shift+↓换行，粘贴图片',
    },
    channels: {
      title: '频道管理',
      subtitle: '管理你的通讯渠道',
      health: '频道健康度',
      healthSub: '来自网关的频道状态快照。',
      noSnapshot: '暂无快照数据。',
      whatsapp: {
        title: 'WhatsApp',
        subtitle: '链接 WhatsApp Web 并监控连接状态。',
        showQr: '显示二维码',
        relink: '重新链接',
        waitScan: '等待扫描',
        logout: '退出登录',
      },
      telegram: {
        title: 'Telegram',
        subtitle: '机器人状态和频道配置。',
        probe: '探测',
      },
      common: {
        configured: '已配置',
        running: '运行中',
        connected: '已连接',
        linked: '已链接',
        lastConnect: '上次连接',
        lastMessage: '上次消息',
        lastInbound: '上次收到',
        authAge: '认证有效期',
        mode: '模式',
        lastStart: '上次启动',
        lastProbe: '上次探测',
      },
      analysis: {
        title: 'TELEMETRY ANALYSIS',
        name: 'IDENTIFIER',
        status: 'VITALS',
        uptime: 'PERSISTENCE',
        strengths: 'OPERATIONAL CLUSTER',
        metrics: 'METRICS',
      },
    },
    status: {
      ready: '就绪',
      busy: '忙碌',
      error: '错误',
      active: '活跃',
      inactive: '不活跃',
      enabled: '已启用',
      disabled: '已禁用',
      online: '在线',
      offline: '离线',
      connected: '已连接',
      disconnected: '断开',
      standby: '待命',
    },
    sidebar: {
      terminalTitle: '>＿ AEONSAGE v2026',
      battleMode: '战斗模式',
      battleUnit: '战斗单元',
      power: '能量',
      shield: '护盾',
      statusLabel: '状态',
      userPrefix: '[用户]',
      sysPrefix: '[系统]',
      netPrefix: '[网络]',
    },
    usage: {
      title: '用量统计',
      totalTokens: '总 Token',
      totalCost: '总成本',
      input: '输入',
      output: '输出',
      cost: '成本',
      model: '模型',
      provider: '提供商',
      days7: '最近 7 天',
      days30: '最近 30 天',
      costEstimate: '成本估算',
      noData: '暂无用量数据',
    },
    tts: {
      title: '语音合成 (TTS)',
      enable: '启用 TTS',
      disable: '禁用 TTS',
      provider: '提供商',
      voice: '语音',
      test: '测试',
      convert: '转换',
      play: '播放',
      stop: '停止',
      playing: '播放中...',
      error: 'TTS 错误',
      autoMode: '自动模式',
      configureKeys: '请在 Config 中配置 API Key',
    },
    wizard: {
      title: '神经校准向导',
      step1Title: '大气诊断',
      step1Desc: '环境探测与系统健康检查。',
      step2Title: '网关校准',
      step2Desc: '配置你的认证令牌。',
      step3Title: '神经属性',
      step3Desc: '定义你的助手身份。',
      step4Title: '观测模式',
      step4Desc: '选择界面的视觉密度。',
      detecting: '正在探测环境...',
      osDetected: '检测到系统: ',
      envCheck: '内核状态: 稳定',
      gatewayToken: '网关令牌 (Token)',
      tokenPlaceholder: '输入你的认证令牌...',
      tokenHint: '可以运行 `aeonsage doctor --generate-gateway-token` 获取。',
      assistantName: '助手名称',
      assistantPlaceholder: '例如: AeonQuest',
      avatarSelection: '核心图像选择',
      densitySelection: '视觉密度',
      minimalTech: '极简技术 (IDE 风格)',
      fullCosmic: '全面宇宙 (沉浸风格)',
      completeTitle: '同步完成',
      completeDesc: '欢迎使用 AeonSage，所有核心系统已就绪。',
      calibrationOnline: '智能内核: 在线',
      back: '返回',
      next: '下一步',
      finish: '启动系统',
    },
    openrouter: {
      title: 'OpenRouter',
      apiConfiguration: 'API 配置',
      apiKey: 'OpenRouter API 密钥',
      apiKeyPlaceholder: 'sk-or-v1-...',
      apiKeyHint: '从 openrouter.ai/keys 获取您的 API 密钥',
      saveKey: '保存密钥',
      testConnection: '测试连接',
      connected: '已连接',
      usageStatistics: '使用统计',
      totalCost: '总成本',
      requests: '请求数',
      periodStart: '统计周期起始',
      connectToView: '连接后查看使用统计',
      modelBrowser: '模型浏览器',
      searchModels: '搜索模型...',
      loadingModels: '加载模型中...',
      noModelsMatch: '没有匹配的模型',
      connectToLoad: '连接后加载模型',
      setDefault: '设为默认',
      context: '上下文',
    },
    security: {
      title: '系统安全',
      killSwitchTitle: '紧急终止开关 (Kill Switch)',
      refresh: '刷新',
      systemHalted: '系统已 HALT',
      activatedAt: '触发时间',
      reason: '原因',
      systemOperational: '系统运行正常',
      operationalDesc: '所有 AI 操作均被允许',
      activateButton: '激活 KILL SWITCH',
      activateWarning: '⚠️ 这将强制停止所有 AI 操作。仅可通过 CLI 恢复。',
      resumeHint: '如需恢复，请使用 CLI 命令: aeonsage resume',
      vdidTitle: 'VDID 数字身份',
    },
    config: {
      sections: {
        environment: '环境',
        updates: '更新',
        agents: '代理',
        authentication: '认证',
        channels: '频道',
        messages: '消息',
        commands: '命令',
        hooks: '钩子',
        skills: '技能',
        tools: '工具',
        gateway: '网关',
        wallet: '钱包',
        setupWizard: '设置向导',
        meta: '元数据',
        diagnostics: '诊断',
        logging: '日志',
        browser: '浏览器',
      },
      reload: '重新加载',
      save: '保存',
      apply: '应用',
      update: '更新',
      noChanges: '无更改',
      unsavedChanges: '未保存的更改',
      loadingSchema: '加载配置结构...',
      formMode: '表单',
      rawMode: '原始',
      viewPendingChanges: '查看待处理的更改',
      all: '全部',
    },
    nodes: {
      execApprovals: '执行审批',
      execApprovalsSub: '执行审批策略: host+gateway/node',
      target: '目标',
      targetSub: '网关编辑本地审批; 节点编辑选定节点',
      loadApprovals: '加载审批',
      execNodeBinding: '执行节点绑定',
      execNodeBindingSub: '使用 exec: host+node 时将代理绑定到特定节点',
      defaultBinding: '默认绑定',
      defaultBindingSub: '当代理未覆盖节点绑定时使用',
      anyNode: '任意节点',
      useDefault: '使用默认',
      devices: '设备',
      devicesSub: '配对请求 + 角色令牌',
      paired: '已配对',
      tokens: '令牌',
      rotate: '轮换',
      revoke: '撤销',
      noNodesWithSync: '没有同步的节点',
    },
    workflowCanvas: {
      title: '工作流画布',
      refresh: '刷新',
      liveActivity: '实时活动',
      noActiveAgents: '暂无活跃代理',
      nodes: '节点',
      statsOverview: '统计概览',
      tokenUsage: 'TOKEN 消耗',
      input: '输入',
      output: '输出',
      sessions: '会话数',
      completed: '已完成',
      runtime: '运行时间',
      waitingForWorkflow: '等待工作流启动',
      startFromChat: '在 Chat 中发起任务后,节点将在此显示',
      botDiary: 'Bot 日记',
      statusGood: '状态良好',
      activeToday: '今日活跃',
      weekDays: ['日', '一', '二', '三', '四', '五', '六'],
    },
    marketplace: {
      title: '技能市场',
      subtitle: '连接您的代理到全球智能网络。发现、安装和管理社区验证的能力。',
      skillCount: '个技能',
      installed: '已安装',
      online: '在线',
      offline: '离线',
      searchPlaceholder: '按名称、标签或描述搜索技能...',
      featuredSkills: '精选技能',
      categories: {
        all: '全部',
        coding: '编程',
        ai: 'AI',
        video: '视频',
        marketing: '营销',
        finance: '金融',
        media: '媒体',
        productivity: '效率',
        research: '研究',
      },
      safe: '安全',
    },
    safetyGates: {
      title: '安全门',
      defaultPolicies: '系统默认安全策略已激活。没有可用的手动覆盖。',
    },
    sessions: {
      title: '会话',
      subtitle: '活跃会话密钥和每会话覆盖设置',
      activeWithin: '活跃时间 (分钟)',
      limit: '限制',
      includeGlobal: '包含全局',
      includeUnknown: '包含未知',
      key: '密钥',
      label: '标签',
      kind: '类型',
      updated: '更新时间',
      noSessions: '未找到会话',
    },
    logs: {
      title: '日志',
      subtitle: '网关文件日志 (JSONL)',
      filter: '筛选',
      searchLogs: '搜索日志',
      autoFollow: '自动跟踪',
      refresh: '刷新',
      exportVisible: '导出可见',
      file: '文件',
      truncated: '日志输出已截断; 显示最新片段',
    },
    debug: {
      snapshots: '快照',
      snapshotsSub: '状态、健康和心跳数据',
      refresh: '刷新',
      manualRpc: '手动 RPC',
      manualRpcSub: '使用 JSON 参数发送原始网关方法',
      method: '方法',
      params: '参数 (JSON)',
      call: '调用',
      status: '状态',
      health: '健康',
    },
    personas: {
      skillsIncluded: '个技能已包含',
      clearActivePersona: '清除当前人设',
      selected: '已选择',
      applyAndConfigure: '应用并配置',
      active: '激活',
    },
    navExtra: {
      workflow: '工作流',
      skillMarket: '技能市场',
      sessions: '会话',
    },
    emptyStates: {
      upToDate: '✓ 您已是最新版本',
      checkingUpdate: '正在检查更新...',
      updateAvailable: '有新版本可用',
      noSkills: '暂无可用技能包，请稍后再试',
      noChannels: '尚未配置任何频道',
      noSessions: '暂无活跃会话',
      noLogs: '暂无日志记录',
      noData: '暂无数据',
      noCron: '暂无定时任务',
      noInstances: '暂无连接实例',
    },
  },

  'en-US': {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      refresh: 'Refresh',
      search: 'Search',
    },
    topbar: {
      health: 'Health',
      online: 'Online',
      offline: 'Offline',
      theme: 'Theme',
      language: 'Language',
    },
    nav: {
      overview: 'Overview',
      chat: 'Chat',
      channels: 'Channels',
      instances: 'Instances',
      sessions: 'Sessions',
      cron: 'Cron Jobs',
      skills: 'Skills',
      nodes: 'Nodes',
      config: 'Config',
      logs: 'Logs',
      debug: 'Debug',
      resources: 'Resources',
      docs: 'Docs',
      usage: 'Usage',
      tts: 'Voice',
      dashboard: 'Dashboard',
      connect: 'Connect',
      intelligence: 'Intelligence',
      workflow: 'Workflow',
      security: 'Security',
      system: 'System',
    },
    pageSubtitles: {
      overview: 'Gateway status, entry points, and a fast health read.',
      usage: 'View token consumption and cost estimates.',
      tts: 'Configure Text-to-Speech (TTS) and testing.',
      chat: 'Direct gateway chat session for quick interventions.',
      channels: 'Manage channels and settings.',
      instances: 'Presence beacons from connected clients and nodes.',
      sessions: 'Inspect active sessions and adjust per-session defaults.',
      cron: 'Schedule wakeups and recurring agent runs.',
      skills: 'Manage skill availability and API key injection.',
      nodes: 'Paired devices, capabilities, and command exposure.',
      config: 'Edit ~/.aeonsage/aeonsage.json safely.',
      logs: 'Live tail of the gateway file logs.',
      debug: 'Gateway snapshots, events, and manual RPC calls.',
      security: 'Kill Switch, Safety Gates, VDID Identity',
      workflow: 'Agent visual workbench, live task flow',
    },
    overview: {
      title: 'Dashboard',
      subtitle: 'AeonSage Control Panel',
      connection: 'Connection',
      sessionKey: 'Session Key',
      connect: 'Connect',
      connected: 'Connected',
      disconnected: 'Disconnected',
      stats: 'Statistics',
      activeInstances: 'Active Instances',
      activeSessions: 'Active Sessions',
      cronJobs: 'Cron Jobs',
      lastChannelRefresh: 'Last Channel Refresh',
      gatewayAccess: 'Gateway Access',
      gatewayAccessSub: 'Where the dashboard connects and how it authenticates.',
      websocketUrl: 'WebSocket URL',
      gatewayToken: 'Gateway Token',
      password: 'Password',
      passwordNotStored: 'Password (not stored)',
      defaultSessionKey: 'Default Session Key',
      refresh: 'Refresh',
      connectHint: 'Click Connect to apply connection changes.',
      snapshot: 'Snapshot',
      snapshotSub: 'Latest gateway handshake information.',
      statusLabel: 'Status',
      uptime: 'Uptime',
      tickInterval: 'Tick Interval',
      instances: 'Instances',
      sessions: 'Sessions',
      cron: 'Cron',
      cronEnabled: 'Enabled',
      cronDisabled: 'Disabled',
      nextWake: 'Next wake',
      notes: 'Notes',
      notesSub: 'Quick reminders for remote control setups.',
      tailscaleServe: 'Tailscale serve',
      tailscaleServeSub: 'Prefer serve mode to keep the gateway on loopback with tailnet auth.',
      sessionHygiene: 'Session hygiene',
      sessionHygieneSub: 'Use /new or sessions.patch to reset context.',
      cronReminders: 'Cron reminders',
      cronRemindersSub: 'Use isolated sessions for recurring runs.',
      realtimeMonitor: 'Realtime Monitor',
      systemLoad: 'System Load',
      messageThroughput: 'Message Throughput',
      responseLatency: 'Response Latency',
      hotChannel: 'Hot Channel',
      perMinute: '/min',
      milliseconds: 'ms',
      walletsActive: 'Wallets Active',
      walletsMissing: 'Wallets will appear after VDID initialization.',
      balanceUnavailable: 'Balance unavailable',
      balanceError: 'Balance error',
      authHint: 'This gateway requires auth. Add a token or password, then click Connect.',
      authHintSub: 'Use these commands to get auth:',
      authFailed: 'Auth failed. Re-copy a tokenized URL or update the token, then click Connect.',
      insecureHint: 'This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open http://127.0.0.1:18789 on the gateway host.',
      insecureHintSub: 'If you must stay on HTTP, set gateway.controlUi.allowInsecureAuth: true (token-only).',
      docsAuth: 'Docs: Control UI auth',
      docsTailscale: 'Docs: Tailscale Serve',
      docsInsecure: 'Docs: Insecure HTTP',
      presenceHint: 'Presence beacons in the last 5 minutes.',
      sessionsHint: 'Recent session keys tracked by the gateway.',
      useChannels: 'Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage.',
    },
    chat: {
      title: 'AI Chat',
      subtitle: 'Talk with AeonSage',
      inputPlaceholder: 'Type a message...',
      send: 'Send',
      abort: 'Abort',
      thinking: 'Thinking',
      processing: 'Processing',
      copyMarkdown: 'Copy as Markdown',
      copied: 'Copied',
      newSession: 'New Session',
      clearChat: 'Clear Chat',
      focusMode: 'Focus Mode',
      connecting: 'Connecting...',
      disconnected: 'Disconnected',
      compacting: 'Compacting context...',
      compactComplete: 'Context compacted',
      attachmentAlt: 'Attachment preview',
      removeAttachment: 'Remove attachment',
      pasteImages: 'Paste images',
      addMessage: 'Add a message or paste more images...',
      shiftEnter: 'Message (↓ to send, Shift+↓ for line breaks, paste images)',
    },
    channels: {
      title: 'Channels',
      subtitle: 'Manage your communication channels',
      health: 'Channel Health',
      healthSub: 'Channel status snapshots from the gateway.',
      noSnapshot: 'No snapshot yet.',
      whatsapp: {
        title: 'WhatsApp',
        subtitle: 'Link WhatsApp Web and monitor connection health.',
        showQr: 'Show QR',
        relink: 'Relink',
        waitScan: 'Wait for scan',
        logout: 'Logout',
      },
      telegram: {
        title: 'Telegram',
        subtitle: 'Bot status and channel configuration.',
        probe: 'Probe',
      },
      common: {
        configured: 'Configured',
        running: 'Running',
        connected: 'Connected',
        linked: 'Linked',
        lastConnect: 'Last connect',
        lastMessage: 'Last message',
        lastInbound: 'Last inbound',
        authAge: 'Auth age',
        mode: 'Mode',
        lastStart: 'Last start',
        lastProbe: 'Last probe',
      },
      analysis: {
        title: 'Channel Analysis',
        name: 'Name',
        status: 'Status',
        uptime: 'Uptime',
        strengths: 'Strengths',
        metrics: 'Metrics',
      },
    },
    status: {
      ready: 'Ready',
      busy: 'Busy',
      error: 'Error',
      active: 'Active',
      inactive: 'Inactive',
      enabled: 'Enabled',
      disabled: 'Disabled',
      online: 'Online',
      offline: 'Offline',
      connected: 'Connected',
      disconnected: 'Disconnected',
      standby: 'Standby',
    },
    sidebar: {
      terminalTitle: '>_ AEONSAGE v2026',
      battleMode: 'BATTLE MODE',
      battleUnit: 'BATTLE UNIT',
      power: 'POWER',
      shield: 'SHIELD',
      statusLabel: 'STATUS',
      userPrefix: '[USER]',
      sysPrefix: '[SYS]',
      netPrefix: '[NET]',
    },
    usage: {
      title: 'Usage Stats',
      totalTokens: 'Total Tokens',
      totalCost: 'Total Cost',
      input: 'Input',
      output: 'Output',
      cost: 'Cost',
      model: 'Model',
      provider: 'Provider',
      days7: 'Last 7 Days',
      days30: 'Last 30 Days',
      costEstimate: 'Cost Estimate',
      noData: 'No usage data yet',
    },
    tts: {
      title: 'Text-to-Speech (TTS)',
      enable: 'Enable TTS',
      disable: 'Disable TTS',
      provider: 'Provider',
      voice: 'Voice',
      test: 'Test',
      convert: 'Convert',
      play: 'Play',
      stop: 'Stop',
      playing: 'Playing...',
      error: 'TTS Error',
      autoMode: 'Auto Mode',
      configureKeys: 'Configure API Keys in Config',
    },
    wizard: {
      title: 'Neural Calibration',
      step1Title: 'Atmos Diagnostics',
      step1Desc: 'Environment detection & health check.',
      step2Title: 'Gateway Calibration',
      step2Desc: 'Configure your authentication token.',
      step3Title: 'Neural Identity',
      step3Desc: 'Define your assistant’s identity.',
      step4Title: 'Observation Mode',
      step4Desc: 'Select UI visual density.',
      detecting: 'Detecting environment...',
      osDetected: 'OS Detected: ',
      envCheck: 'Kernel Status: STABLE',
      gatewayToken: 'Gateway Token',
      tokenPlaceholder: 'Enter your auth token...',
      tokenHint: 'Run `aeonsage doctor --generate-gateway-token` to get one.',
      assistantName: 'Assistant Name',
      assistantPlaceholder: 'e.g. AeonQuest',
      avatarSelection: 'Core Image Selection',
      densitySelection: 'Visual Density',
      minimalTech: 'Minimal Tech (IDE Style)',
      fullCosmic: 'Full Cosmic (Immersive)',
      completeTitle: 'Sync Complete',
      completeDesc: 'Welcome to AeonSage. All core systems are ready.',
      calibrationOnline: 'Intelligence Core: ONLINE',
      back: 'Back',
      next: 'Next',
      finish: 'Launch System',
    },
    openrouter: {
      title: 'OpenRouter',
      apiConfiguration: 'API Configuration',
      apiKey: 'OpenRouter API Key',
      apiKeyPlaceholder: 'sk-or-v1-...',
      apiKeyHint: 'Get your API key from openrouter.ai/keys',
      saveKey: 'Save Key',
      testConnection: 'Test Connection',
      connected: 'Connected',
      usageStatistics: 'Usage Statistics',
      totalCost: 'Total Cost',
      requests: 'Requests',
      periodStart: 'Period Start',
      connectToView: 'Connect to view usage statistics',
      modelBrowser: 'Model Browser',
      searchModels: 'Search models...',
      loadingModels: 'Loading models...',
      noModelsMatch: 'No models match your search',
      connectToLoad: 'Connect to load models',
      setDefault: 'Set Default',
      context: 'context',
    },
    security: {
      title: 'System Security',
      killSwitchTitle: 'Emergency Kill Switch',
      refresh: 'Refresh',
      systemHalted: 'SYSTEM HALTED',
      activatedAt: 'Activated',
      reason: 'Reason',
      systemOperational: 'System Operational',
      operationalDesc: 'All operations are permitted',
      activateButton: 'ACTIVATE KILL SWITCH',
      activateWarning: '⚠️ This will halt ALL AI operations. Resume via CLI only.',
      resumeHint: 'To resume operations, use CLI command: aeonsage resume',
      vdidTitle: 'VDID Identity',
    },
    config: {
      sections: {
        environment: 'Environment',
        updates: 'Updates',
        agents: 'Agents',
        authentication: 'Authentication',
        channels: 'Channels',
        messages: 'Messages',
        commands: 'Commands',
        hooks: 'Hooks',
        skills: 'Skills',
        tools: 'Tools',
        gateway: 'Gateway',
        wallet: 'Wallet',
        setupWizard: 'Setup Wizard',
        meta: 'Meta',
        diagnostics: 'Diagnostics',
        logging: 'Logging',
        browser: 'Browser',
      },
      reload: 'Reload',
      save: 'Save',
      apply: 'Apply',
      update: 'Update',
      noChanges: 'No changes',
      unsavedChanges: 'unsaved changes',
      loadingSchema: 'Loading schema...',
      formMode: 'Form',
      rawMode: 'Raw',
      viewPendingChanges: 'View pending changes',
      all: 'All',
    },
    nodes: {
      execApprovals: 'Exec approvals',
      execApprovalsSub: 'Allowlist and approval policy for exec: host+gateway/node',
      target: 'Target',
      targetSub: 'Gateway edits local approvals; node edits the selected node',
      loadApprovals: 'Load approvals',
      execNodeBinding: 'Exec node binding',
      execNodeBindingSub: 'Pin agents to a specific node when using exec: host+node',
      defaultBinding: 'Default binding',
      defaultBindingSub: 'Used when agents do not override a node binding',
      anyNode: 'Any node',
      useDefault: 'Use default',
      devices: 'Devices',
      devicesSub: 'Pairing requests + role tokens',
      paired: 'Paired',
      tokens: 'Tokens',
      rotate: 'Rotate',
      revoke: 'Revoke',
      noNodesWithSync: 'No nodes with sync',
    },
    workflowCanvas: {
      title: 'Workflow Canvas',
      refresh: 'Refresh',
      liveActivity: 'Live Activity',
      noActiveAgents: 'No active agents',
      nodes: 'nodes',
      statsOverview: 'Statistics',
      tokenUsage: 'TOKEN Usage',
      input: 'Input',
      output: 'Output',
      sessions: 'Sessions',
      completed: 'Completed',
      runtime: 'Runtime',
      waitingForWorkflow: 'Waiting for workflow',
      startFromChat: 'Start a task in Chat to see nodes here',
      botDiary: 'Bot Diary',
      statusGood: 'All Good',
      activeToday: 'Active today',
      weekDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    },
    marketplace: {
      title: 'Skill Marketplace',
      subtitle: 'Connect your agents to the global intelligence network. Discover, install, and manage capabilities verified by the community.',
      skillCount: 'Skills',
      installed: 'Installed',
      online: 'Online',
      offline: 'Offline',
      searchPlaceholder: 'Search skills by name, tag, or description...',
      featuredSkills: 'Featured Skills',
      categories: {
        all: 'All',
        coding: 'Coding',
        ai: 'AI',
        video: 'Video',
        marketing: 'Marketing',
        finance: 'Finance',
        media: 'Media',
        productivity: 'Productivity',
        research: 'Research',
      },
      safe: 'SAFE',
    },
    safetyGates: {
      title: 'Safety Gates',
      defaultPolicies: 'System default security policies active. No manual overrides available.',
    },
    sessions: {
      title: 'Sessions',
      subtitle: 'Active session keys and per-session overrides',
      activeWithin: 'Active within (minutes)',
      limit: 'Limit',
      includeGlobal: 'Include global',
      includeUnknown: 'Include unknown',
      key: 'Key',
      label: 'Label',
      kind: 'Kind',
      updated: 'Updated',
      noSessions: 'No sessions found',
    },
    logs: {
      title: 'Logs',
      subtitle: 'Gateway file logs (JSONL)',
      filter: 'Filter',
      searchLogs: 'Search logs',
      autoFollow: 'Auto-follow',
      refresh: 'Refresh',
      exportVisible: 'Export visible',
      file: 'File',
      truncated: 'Log output truncated; showing latest chunk',
    },
    debug: {
      snapshots: 'Snapshots',
      snapshotsSub: 'Status, health, and heartbeat data',
      refresh: 'Refresh',
      manualRpc: 'Manual RPC',
      manualRpcSub: 'Send a raw gateway method with JSON params',
      method: 'Method',
      params: 'Params (JSON)',
      call: 'Call',
      status: 'Status',
      health: 'Health',
    },
    personas: {
      skillsIncluded: 'skills included',
      clearActivePersona: 'Clear Active Persona',
      selected: 'Selected',
      applyAndConfigure: 'Apply & Configure Bot',
      active: 'ACTIVE',
    },
    navExtra: {
      workflow: 'Workflow',
      skillMarket: 'Skill Market',
      sessions: 'Sessions',
    },
    emptyStates: {
      upToDate: '✓ You are on the latest version',
      checkingUpdate: 'Checking for updates...',
      updateAvailable: 'New version available',
      noSkills: 'No skill packs available, please try again later',
      noChannels: 'No channels configured yet',
      noSessions: 'No active sessions',
      noLogs: 'No log entries',
      noData: 'No data available',
      noCron: 'No scheduled tasks',
      noInstances: 'No connected instances',
    },
  },
};

// Default language
export const DEFAULT_LANGUAGE: Language = 'en-US';

// Language storage key
export const LANGUAGE_STORAGE_KEY = 'aeonsage-language';

// Get current active language
export function getCurrentLanguage(): Language {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === 'zh-CN' || stored === 'en-US') {
    return stored;
  }

  // Auto-detect browser language
  const browserLang = navigator.language || navigator.languages?.[0];
  if (browserLang?.startsWith('zh')) {
    return 'zh-CN';
  }
  return 'en-US';
}

// Set active language
export function setCurrentLanguage(lang: Language): void {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

// Get translated texts
export function t(lang: Language): I18nTexts {
  return translations[lang];
}
