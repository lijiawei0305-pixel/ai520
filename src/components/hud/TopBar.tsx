const phases = ['外交阶段', '行动阶段', '结算阶段'];

export default function TopBar() {
  return (
    <header className="top-bar">
      <div className="brand-block">
        <div className="brand-mark">AI</div>
        <div>
          <span className="eyebrow">GLOBAL STRATEGY COMMAND</span>
          <h1>WORLD AI DIPLOMACY</h1>
        </div>
      </div>

      <nav className="phase-track" aria-label="Game phases">
        {phases.map((phase, index) => (
          <div key={phase} className={`phase-step ${index === 0 ? 'phase-step--active' : ''}`}>
            {phase}
          </div>
        ))}
      </nav>

      <div className="top-actions">
        <div className="countdown">
          <span>阶段剩余</span>
          <strong>08:42</strong>
        </div>
        <button type="button">帮助</button>
        <button type="button">设置</button>
        <button type="button">通知</button>
        <button type="button" className="strategist-button">
          战略家
        </button>
      </div>
    </header>
  );
}
