const phases = ['外交阶段', '行动阶段', '结算阶段'];

export default function TopBar() {
  return (
    <header className="top-bar">
      <div className="brand-block">
        <div className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 42 42" role="img">
            <circle cx="21" cy="21" r="16" />
            <path d="M5 21h32M21 5v32M10 11c5 4 17 4 22 0M10 31c5-4 17-4 22 0" />
            <path d="M21 5c-8 8-8 24 0 32M21 5c8 8 8 24 0 32" />
          </svg>
        </div>
        <div>
          <h1>全球外交风云</h1>
          <span className="brand-subtitle">WORLD AI DIPLOMACY</span>
        </div>
      </div>

      <div className="round-meta">
        <strong>回合 23</strong>
        <span>2025年5月12日</span>
      </div>

      <nav className="phase-track" aria-label="Game phases">
        {phases.map((phase, index) => (
          <div key={phase} className={`phase-step ${index === 0 ? 'phase-step--active' : ''}`}>
            <i />
            <span>{phase}</span>
          </div>
        ))}
      </nav>

      <div className="top-actions">
        <div className="countdown" aria-label="Stage remaining time">
          <span>阶段剩余时间</span>
          <strong>23:58:47</strong>
        </div>
        <button type="button" className="top-icon-button" aria-label="帮助">
          <span>?</span>
          帮助
        </button>
        <button type="button" className="top-icon-button" aria-label="设置">
          <span>◎</span>
          设置
        </button>
        <button type="button" className="top-icon-button notification-button" aria-label="通知">
          <span>◉</span>
          通知
          <i>3</i>
        </button>
        <button type="button" className="strategist-button" aria-label="战略家在线">
          <span className="strategist-avatar">策</span>
          <span className="strategist-copy">
            <strong>战略家</strong>
            <small>在线</small>
          </span>
        </button>
      </div>
    </header>
  );
}
