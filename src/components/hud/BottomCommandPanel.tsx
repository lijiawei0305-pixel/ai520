import { type KeyboardEvent, useMemo, useState } from 'react';

const alliances = [
  { id: 'western', name: '北美·西方联盟', status: '友好', value: '+150', tone: 'blue', emblem: '●' },
  { id: 'china', name: '中华联盟', status: '竞争', value: '-45', tone: 'red', emblem: '米' },
  { id: 'russia', name: '俄罗斯联邦', status: '敌对', value: '-120', tone: 'gray', emblem: '×' },
  { id: 'middle-east', name: '中东·和平联盟', status: '友好', value: '+89', tone: 'green', emblem: '◎' },
  { id: 'africa', name: '非洲团结联盟', status: '中立', value: '+10', tone: 'purple', emblem: '✦' },
];

export default function BottomCommandPanel() {
  const [command, setCommand] = useState('');
  const [activeIndex, setActiveIndex] = useState(1);

  const showAllianceMenu = useMemo(() => {
    const atIndex = command.lastIndexOf('@');
    if (atIndex === -1) return false;
    return !/\s/.test(command.slice(atIndex + 1));
  }, [command]);

  const selectAlliance = (name: string) => {
    setCommand((current) => {
      const atIndex = current.lastIndexOf('@');
      if (atIndex === -1) return `@${name} `;
      return `${current.slice(0, atIndex)}@${name} `;
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showAllianceMenu) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % alliances.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + alliances.length) % alliances.length);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      selectAlliance(alliances[activeIndex].name);
    }
  };

  return (
    <form className="bottom-command bottom-command--console" aria-label="AI strategy command">
      {showAllianceMenu ? (
        <div className="command-alliance-menu" role="listbox" aria-label="@ 联盟快捷选择列表">
          {alliances.map((alliance, index) => (
            <button
              key={alliance.id}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              className={`command-alliance-option command-alliance-option--${alliance.tone}`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(event) => {
                event.preventDefault();
                selectAlliance(alliance.name);
              }}
            >
              <span className="command-alliance-avatar">{alliance.emblem}</span>
              <strong>{alliance.name}</strong>
              <span className={`command-alliance-relation command-alliance-relation--${alliance.tone}`}>
                <span>{alliance.status}</span>
                <span>{alliance.value}</span>
              </span>
            </button>
          ))}
          <div className="command-menu-hint">
            <span>↑↓ 选择</span>
            <span>Enter 确认</span>
          </div>
        </div>
      ) : null}

      <div className="command-console-head">
        <span className="command-console-icon">⌘</span>
        <span className="eyebrow">AI 战略指令</span>
        <strong>COMMAND CONSOLE</strong>
      </div>

      <div className="command-input-row">
        <input
          value={command}
          placeholder="输入战略指令，例如：@中华联盟 提出贸易合作提案"
          onChange={(event) => setCommand(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button">
          <span>发送指令</span>
          <i>➤</i>
        </button>
      </div>
    </form>
  );
}
