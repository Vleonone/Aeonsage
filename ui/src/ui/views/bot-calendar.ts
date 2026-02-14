/**
 * Bot Calendar - iOS Style Diary View
 * 
 * 日历式日记展示组件
 * 设计: iOS 极简风格 - 单色/毛玻璃/无多余颜色
 */

import { html, css, LitElement, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";

interface DiaryEntry {
    date: string;
    activities: number;
    emotion: string;
    emoji: string;
    uptime: number;
    highlights: string[];
}

@customElement("bot-calendar")
export class BotCalendar extends LitElement {
    @state() private currentMonth = new Date();
    @state() private selectedDate: string | null = null;
    @state() private showPopup = false;
    @state() private popupTab: "diary" | "mood" | "stats" = "diary";
    @state() private diaryData: Map<string, DiaryEntry> = new Map();
    @state() private currentEmotion = { emoji: "😐", type: "neutral", intensity: 50 };

    connectedCallback(): void {
        super.connectedCallback();
        this.loadMonthData();
        this.loadCurrentEmotion();
    }

    private async loadMonthData(): Promise<void> {
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        const start = new Date(year, month, 1).toISOString().split("T")[0];
        const end = new Date(year, month + 1, 0).toISOString().split("T")[0];

        try {
            const res = await fetch(`/api/diary/range?start=${start}&end=${end}`);
            const json = await res.json();
            if (json.success && json.data) {
                Object.entries(json.data).forEach(([date, summary]: [string, unknown]) => {
                    const s = summary as { totalActivities: number; uptime: number; highlights: string[] };
                    this.diaryData.set(date, {
                        date,
                        activities: s.totalActivities || 0,
                        emotion: "neutral",
                        emoji: "😐",
                        uptime: s.uptime || 0,
                        highlights: s.highlights || [],
                    });
                });
                this.requestUpdate();
            }
        } catch {
            // Silently fail - data will show as empty
        }
    }

    private async loadCurrentEmotion(): Promise<void> {
        try {
            const res = await fetch("/api/emotion/current");
            const json = await res.json();
            if (json.success && json.data) {
                this.currentEmotion = {
                    emoji: json.data.emoji || "😐",
                    type: json.data.current || "neutral",
                    intensity: json.data.intensity || 50,
                };
            }
        } catch {
            // Use defaults
        }
    }

    static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
      --cal-bg: var(--glass-bg, rgba(18, 20, 26, 0.7));
      --cal-text: var(--text, rgba(255, 255, 255, 0.9));
      --cal-muted: var(--muted, rgba(255, 255, 255, 0.5));
      --cal-border: var(--glass-border, var(--border));
      --cal-today: var(--text-strong, #fff);
    }

    .calendar-container {
      background: var(--cal-bg);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border-radius: 20px;
      border: 1px solid var(--cal-border);
      padding: 20px;
      max-width: 340px;
    }

    /* Header */
    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .month-title {
      font-size: 17px;
      font-weight: 600;
      color: var(--cal-text);
      letter-spacing: -0.02em;
    }

    .nav-btn {
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      color: var(--cal-muted);
      cursor: pointer;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .nav-btn:hover {
      background: var(--bg-hover);
      color: var(--cal-text);
    }

    /* Weekday Labels */
    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      margin-bottom: 8px;
    }

    .weekday {
      font-size: 11px;
      font-weight: 500;
      color: var(--cal-muted);
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Days Grid */
    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .day-cell {
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-weight: 400;
      color: var(--cal-text);
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.15s ease;
      position: relative;
    }

    .day-cell:hover {
      background: var(--border-subtle);
    }

    .day-cell.other-month {
      color: var(--cal-muted);
      opacity: 0.4;
    }

    .day-cell.today {
      background: var(--cal-text);
      color: var(--primary-foreground);
      font-weight: 600;
    }

    .day-cell.selected {
      background: var(--accent-subtle);
      border: 1px solid var(--cal-border);
    }

    .day-cell.has-data::after {
      content: '';
      position: absolute;
      bottom: 4px;
      width: 4px;
      height: 4px;
      background: var(--cal-muted);
      border-radius: 50%;
    }

    .day-cell.today.has-data::after {
      background: var(--panel-strong);
    }

    /* Emotion Status Bar */
    .emotion-bar {
      margin-top: 16px;
      padding: 12px 16px;
      background: var(--card-transparent);
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .emotion-emoji {
      font-size: 24px;
    }

    .emotion-info {
      flex: 1;
    }

    .emotion-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--cal-text);
    }

    .emotion-sublabel {
      font-size: 11px;
      color: var(--cal-muted);
      margin-top: 2px;
    }

    /* Popup Overlay */
    .popup-overlay {
      position: fixed;
      inset: 0;
      background: var(--panel-strong);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Popup */
    .popup {
      background: var(--cal-bg);
      backdrop-filter: blur(40px) saturate(180%);
      -webkit-backdrop-filter: blur(40px) saturate(180%);
      border-radius: 20px;
      border: 1px solid var(--cal-border);
      width: 320px;
      max-height: 80vh;
      overflow: hidden;
      animation: slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    }

    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to { 
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .popup-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--cal-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .popup-date {
      font-size: 17px;
      font-weight: 600;
      color: var(--cal-text);
    }

    .popup-close {
      width: 28px;
      height: 28px;
      border: none;
      background: var(--bg-hover);
      color: var(--cal-muted);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }

    .popup-close:hover {
      background: var(--accent-subtle);
      color: var(--cal-text);
    }

    /* Tabs */
    .popup-tabs {
      display: flex;
      padding: 12px 20px;
      gap: 8px;
      border-bottom: 1px solid var(--cal-border);
    }

    .popup-tab {
      padding: 8px 16px;
      border: none;
      background: transparent;
      color: var(--cal-muted);
      font-size: 13px;
      font-weight: 500;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .popup-tab:hover {
      background: var(--border-subtle);
    }

    .popup-tab.active {
      background: var(--border);
      color: var(--cal-text);
    }

    /* Popup Content */
    .popup-content {
      padding: 20px;
      max-height: 300px;
      overflow-y: auto;
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid var(--border-subtle);
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-time {
      font-size: 11px;
      color: var(--cal-muted);
      font-variant-numeric: tabular-nums;
      min-width: 48px;
    }

    .activity-text {
      font-size: 13px;
      color: var(--cal-text);
      line-height: 1.4;
    }

    .mood-display {
      text-align: center;
      padding: 24px 0;
    }

    .mood-emoji-large {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .mood-label-large {
      font-size: 20px;
      font-weight: 600;
      color: var(--cal-text);
      margin-bottom: 4px;
    }

    .mood-intensity {
      font-size: 13px;
      color: var(--cal-muted);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .stat-card {
      background: var(--card-transparent);
      border-radius: 12px;
      padding: 16px;
      text-align: center;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 600;
      color: var(--cal-text);
    }

    .stat-label {
      font-size: 11px;
      color: var(--cal-muted);
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .empty-state {
      text-align: center;
      padding: 32px 0;
      color: var(--cal-muted);
      font-size: 13px;
    }
  `;

    private get daysInMonth(): Array<{ date: Date; isCurrentMonth: boolean }> {
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

        // Previous month padding
        const startPadding = firstDay.getDay();
        for (let i = startPadding - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month, -i),
                isCurrentMonth: false,
            });
        }

        // Current month
        for (let d = 1; d <= lastDay.getDate(); d++) {
            days.push({
                date: new Date(year, month, d),
                isCurrentMonth: true,
            });
        }

        // Next month padding
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false,
            });
        }

        return days;
    }

    private formatDate(date: Date): string {
        return date.toISOString().split("T")[0];
    }

    private isToday(date: Date): boolean {
        const today = new Date();
        return this.formatDate(date) === this.formatDate(today);
    }

    private prevMonth(): void {
        this.currentMonth = new Date(
            this.currentMonth.getFullYear(),
            this.currentMonth.getMonth() - 1,
            1
        );
    }

    private nextMonth(): void {
        this.currentMonth = new Date(
            this.currentMonth.getFullYear(),
            this.currentMonth.getMonth() + 1,
            1
        );
    }

    private selectDate(dateStr: string): void {
        this.selectedDate = dateStr;
        this.showPopup = true;
        this.popupTab = "diary";
    }

    private closePopup(): void {
        this.showPopup = false;
        this.selectedDate = null;
    }

    private formatPopupDate(dateStr: string): string {
        const date = new Date(dateStr);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        return `${month}月${day}日 ${weekdays[date.getDay()]}`;
    }

    private renderDiaryTab(): unknown {
        const entry = this.selectedDate ? this.diaryData.get(this.selectedDate) : null;
        if (!entry || entry.activities === 0) {
            return html`<div class="empty-state">暂无活动记录</div>`;
        }
        return html`
      ${entry.highlights.map(
            (h: string) => html`
          <div class="activity-item">
            <span class="activity-time">--:--</span>
            <span class="activity-text">${h}</span>
          </div>
        `
        )}
    `;
    }

    private renderMoodTab(): unknown {
        const entry = this.selectedDate ? this.diaryData.get(this.selectedDate) : null;
        const emoji = entry?.emoji || "😐";
        const emotion = entry?.emotion || "neutral";

        const labels: Record<string, string> = {
            happy: "开心",
            focused: "专注",
            neutral: "平静",
            frustrated: "烦躁",
            tired: "疲惫",
            sleeping: "休眠",
        };

        return html`
      <div class="mood-display">
        <div class="mood-emoji-large">${emoji}</div>
        <div class="mood-label-large">${labels[emotion] || emotion}</div>
        <div class="mood-intensity">情绪强度 ${entry?.activities || 50}%</div>
      </div>
    `;
    }

    private renderStatsTab(): unknown {
        const entry = this.selectedDate ? this.diaryData.get(this.selectedDate) : null;
        return html`
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${entry?.activities || 0}</div>
          <div class="stat-label">活动</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${entry?.uptime || 0}</div>
          <div class="stat-label">分钟</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${entry?.highlights.length || 0}</div>
          <div class="stat-label">高亮</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${entry?.emoji || "😐"}</div>
          <div class="stat-label">心情</div>
        </div>
      </div>
    `;
    }

    render() {
        const monthLabel = this.currentMonth.toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
        });

        return html`
      <div class="calendar-container">
        <!-- Header -->
        <div class="calendar-header">
          <button class="nav-btn" @click=${this.prevMonth}>◀</button>
          <span class="month-title">${monthLabel}</span>
          <button class="nav-btn" @click=${this.nextMonth}>▶</button>
        </div>

        <!-- Weekdays -->
        <div class="weekdays">
          ${["日", "一", "二", "三", "四", "五", "六"].map(
            (d) => html`<span class="weekday">${d}</span>`
        )}
        </div>

        <!-- Days -->
        <div class="days-grid">
          ${this.daysInMonth.map(({ date, isCurrentMonth }) => {
            const dateStr = this.formatDate(date);
            const hasData = this.diaryData.has(dateStr);
            return html`
              <div
                class="day-cell 
                  ${!isCurrentMonth ? "other-month" : ""}
                  ${this.isToday(date) ? "today" : ""}
                  ${this.selectedDate === dateStr ? "selected" : ""}
                  ${hasData ? "has-data" : ""}"
                @click=${() => isCurrentMonth && this.selectDate(dateStr)}
              >
                ${date.getDate()}
              </div>
            `;
        })}
        </div>

        <!-- Emotion Bar -->
        <div class="emotion-bar">
          <span class="emotion-emoji">${this.currentEmotion.emoji}</span>
          <div class="emotion-info">
            <div class="emotion-label">当前状态</div>
            <div class="emotion-sublabel">
              ${this.currentEmotion.type} · ${this.currentEmotion.intensity}%
            </div>
          </div>
        </div>
      </div>

      <!-- Popup -->
      ${this.showPopup && this.selectedDate
                ? html`
            <div class="popup-overlay" @click=${this.closePopup}>
              <div class="popup" @click=${(e: Event) => e.stopPropagation()}>
                <div class="popup-header">
                  <span class="popup-date">${this.formatPopupDate(this.selectedDate)}</span>
                  <button class="popup-close" @click=${this.closePopup}>×</button>
                </div>

                <div class="popup-tabs">
                  <button
                    class="popup-tab ${this.popupTab === "diary" ? "active" : ""}"
                    @click=${() => (this.popupTab = "diary")}
                  >
                    📔 日记
                  </button>
                  <button
                    class="popup-tab ${this.popupTab === "mood" ? "active" : ""}"
                    @click=${() => (this.popupTab = "mood")}
                  >
                    😊 心情
                  </button>
                  <button
                    class="popup-tab ${this.popupTab === "stats" ? "active" : ""}"
                    @click=${() => (this.popupTab = "stats")}
                  >
                    📊 统计
                  </button>
                </div>

                <div class="popup-content">
                  ${this.popupTab === "diary"
                        ? this.renderDiaryTab()
                        : this.popupTab === "mood"
                            ? this.renderMoodTab()
                            : this.renderStatsTab()}
                </div>
              </div>
            </div>
          `
                : null}
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "bot-calendar": BotCalendar;
    }
}
