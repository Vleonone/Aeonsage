import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getCurrentLanguage, t } from '../i18n';
import { icons } from '../icons';

@customElement('aeonsage-setup-wizard')
export class AeonSageSetupWizard extends LitElement {
  @state() private step = 2; // 跳过环境探测，从Gateway Token开始
  @state() private os = '';
  @state() private detecting = false; // 直接完成探测
  @state() private token = '';
  @state() private assistantName = 'AeonQuest';
  @state() private density: 'minimal' | 'cosmic' = 'cosmic';
  @state() private avatar = 'neural-core';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: var(--text, #ffffff);
      font-family: var(--font-display, 'Space Grotesk', sans-serif);
      overflow: hidden;
      background: radial-gradient(circle at center, var(--border-strong, #222222) 0%, var(--bg, #000000) 100%);
    }

    .wizard-container {
      width: 90%;
      max-width: 600px;
      padding: 40px;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      box-shadow: 
        0 20px 50px rgba(0, 0, 0, 0.5),
        0 0 40px rgba(96, 165, 250, 0.1);
      position: relative;
    }

    .wizard-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .wizard-title {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 8px;
      background: linear-gradient(90deg, var(--secondary, #93E2FF), var(--muted-strong, #666666));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .wizard-subtitle {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
    }

    .step-indicator {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 40px;
    }

    .indicator-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }

    .indicator-dot.active {
      background: var(--accent, #D4FF00);
      box-shadow: 0 0 10px var(--accent-glow, rgba(212, 255, 0, 0.4));
      transform: scale(1.2);
    }

    /* Step 1: Diagnostics */
    .diagnostics {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: var(--secondary, #93E2FF);
      line-height: 1.6;
    }

    .log-line {
      display: block;
      margin-bottom: 4px;
      opacity: 0;
      animation: fadeIn 0.3s forwards;
    }

    @keyframes fadeIn {
      to { opacity: 1; }
    }

    /* Step 2: Gateway Calibration */
    .calibration-input {
      width: 100%;
      padding: 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: var(--text, #ffffff);
      font-family: inherit;
      font-size: 16px;
      margin-bottom: 12px;
    }

    .calibration-input:focus {
      outline: none;
      border-color: var(--accent, #D4FF00);
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
    }

    .hint-box {
      background: rgba(96, 165, 250, 0.1);
      border-left: 3px solid var(--accent, #D4FF00);
      padding: 12px 16px;
      font-size: 13px;
      color: rgba(96, 165, 250, 0.8);
      margin-top: 16px;
    }

    /* Step 3: Neural Identity */
    .identity-grid {
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 24px;
      align-items: center;
    }

    .avatar-preview {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--border-strong, #222222), var(--bg, #000000));
      border: 2px solid var(--accent, #D4FF00);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
    }

    /* Step 4: Observation Mode */
    .density-toggle {
      display: flex;
      gap: 16px;
      margin-top: 24px;
    }

    .density-option {
      flex: 1;
      padding: 24px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      cursor: pointer;
      text-align: center;
      transition: all 0.3s ease;
    }

    .density-option.active {
      background: rgba(96, 165, 250, 0.1);
      border-color: var(--accent, #D4FF00);
      box-shadow: inset 0 0 20px rgba(96, 165, 250, 0.1);
    }

    .density-option h3 {
      font-size: 16px;
      margin-bottom: 8px;
    }

    /* Actions */
    .wizard-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
    }

    .btn {
      padding: 12px 32px;
      font-weight: 600;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
      border: none;
    }

    .btn-primary {
      background: var(--accent, #D4FF00);
      color: var(--bg, #000000);
    }

    .btn-primary:hover {
      background: var(--accent-hover, #E5FF4D);
      transform: translateY(-2px);
    }

    .btn-outline {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--text, #ffffff);
    }

    .btn-outline:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    /* Complete Screen */
    .complete-screen {
      text-align: center;
    }

    .online-badge {
      display: inline-block;
      padding: 6px 16px;
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid var(--ok, #00FF88);
      color: var(--ok, #00FF88);
      border-radius: 50px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      margin-bottom: 24px;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
      100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    this.detectOs();
  }

  private detectOs() {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('win')) this.os = 'Windows';
    else if (platform.includes('mac')) this.os = 'macOS';
    else if (platform.includes('linux')) this.os = 'Linux';
    else this.os = 'Unknown';

    setTimeout(() => {
      this.detecting = false;
    }, 2500);
  }

  private next() {
    if (this.step < 5) this.step++;
  }

  private back() {
    if (this.step > 1) this.step--;
  }

  private renderStep1() {
    const texts = t(getCurrentLanguage()).wizard;
    return html`
      <div class="diagnostics">
        <span class="log-line">> ${texts.detecting}</span>
        ${!this.detecting ? html`
          <span class="log-line">> ${texts.osDetected}${this.os}</span>
          <span class="log-line">> [SYSTEM] Hardware Acceleration: ENABLED</span>
          <span class="log-line">> [NETWORK] Handshake latency: 12ms</span>
          <span class="log-line">> [KERNEL] ${texts.envCheck}</span>
          <span class="log-line" style="color:var(--ok); margin-top:12px;">> INITIALIZATION_VECTOR: 0xAEON_READY</span>
        ` : nothing}
      </div>
    `;
  }

  private renderStep2() {
    const texts = t(getCurrentLanguage()).wizard;
    return html`
      <div class="step-content">
        <label class="wizard-subtitle" style="display:block; margin-bottom:12px;">${texts.gatewayToken}</label>
        <input 
          type="password" 
          class="calibration-input" 
          placeholder="${texts.tokenPlaceholder}"
          .value=${this.token}
          @input=${(e: any) => this.token = e.target.value}
        >
        <div class="hint-box">
          ${texts.tokenHint}
        </div>
      </div>
    `;
  }

  private renderStep3() {
    const texts = t(getCurrentLanguage()).wizard;
    return html`
      <div class="identity-grid">
        <div class="avatar-preview">
          <div style="font-size: 48px;">◉</div>
        </div>
        <div>
          <label class="wizard-subtitle" style="display:block; margin-bottom:12px;">${texts.assistantName}</label>
          <input 
            type="text" 
            class="calibration-input" 
            placeholder="${texts.assistantPlaceholder}"
            .value=${this.assistantName}
            @input=${(e: any) => this.assistantName = e.target.value}
          >
        </div>
      </div>
    `;
  }

  private renderStep4() {
    const texts = t(getCurrentLanguage()).wizard;
    return html`
      <div class="density-toggle">
        <div 
          class="density-option ${this.density === 'minimal' ? 'active' : ''}"
          @click=${() => this.density = 'minimal'}
        >
          <h3>${texts.minimalTech}</h3>
          <p class="wizard-subtitle">Clean, IDE-like focus.</p>
        </div>
        <div 
          class="density-option ${this.density === 'cosmic' ? 'active' : ''}"
          @click=${() => this.density = 'cosmic'}
        >
          <h3>${texts.fullCosmic}</h3>
          <p class="wizard-subtitle">Full nebula immersion.</p>
        </div>
      </div>
    `;
  }

  private renderComplete() {
    const texts = t(getCurrentLanguage()).wizard;
    return html`
      <div class="complete-screen">
        <div class="online-badge">${texts.calibrationOnline}</div>
        <h2 style="font-size:24px; margin-bottom:12px;">${texts.completeTitle}</h2>
        <p class="wizard-subtitle">${texts.completeDesc}</p>
      </div>
    `;
  }

  render() {
    const texts = t(getCurrentLanguage()).wizard;
    return html`
      <div class="wizard-container">
        <div class="wizard-header">
          <h1 class="wizard-title">AeonQuest Neural Calibration</h1>
          <p class="wizard-subtitle">${this.getStepSubtitle()}</p>
        </div>

        <div class="step-indicator">
          ${[1, 2, 3, 4, 5].map(i => html`
            <div class="indicator-dot ${this.step === i ? 'active' : ''}"></div>
          `)}
        </div>

        <div class="step-body">
          ${this.step === 1 ? this.renderStep1() : nothing}
          ${this.step === 2 ? this.renderStep2() : nothing}
          ${this.step === 3 ? this.renderStep3() : nothing}
          ${this.step === 4 ? this.renderStep4() : nothing}
          ${this.step === 5 ? this.renderComplete() : nothing}
        </div>

        <div class="wizard-actions">
          ${this.step > 1 && this.step < 5 ? html`
            <button class="btn btn-outline" @click=${this.back}>${texts.back}</button>
          ` : html`<div></div>`}

          ${this.step < 5 ? html`
            <button class="btn btn-primary" ?disabled=${this.detecting} @click=${this.next}>${texts.next}</button>
          ` : html`
            <button class="btn btn-primary" @click=${() => this.dispatchEvent(new CustomEvent('finish'))}>${texts.finish}</button>
          `}
        </div>
      </div>
    `;
  }

  private getStepSubtitle() {
    const texts = t(getCurrentLanguage()).wizard;
    switch (this.step) {
      case 1: return texts.step1Desc;
      case 2: return texts.step2Desc;
      case 3: return texts.step3Desc;
      case 4: return texts.step4Desc;
      case 5: return 'Neural core synchronized.';
      default: return '';
    }
  }
}
