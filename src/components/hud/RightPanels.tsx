import { type ReactNode, useMemo, useState } from 'react';

type EventTone = 'gold' | 'orange' | 'green' | 'blue' | 'purple';
type AllianceTone = 'western' | 'china' | 'russia' | 'middleEast' | 'africa';

type AllianceMessage = {
  id: string;
  name: string;
  subtitle: string;
  time: string;
  tone: AllianceTone;
  emblem: string;
  unread?: boolean;
  messages: ChatMessage[];
};

type ChatMessage = {
  id: string;
  from: 'alliance' | 'self';
  time: string;
  text: string;
};

const events: { label: string; time: string; tone: EventTone }[] = [
  { label: '北约宣布新军事演习计划', time: '2分钟前', tone: 'gold' },
  { label: '中东地区局势紧张升级', time: '15分钟前', tone: 'orange' },
  { label: '全球经济峰会即将召开', time: '1小时前', tone: 'green' },
  { label: '新科技突破：量子计算', time: '2小时前', tone: 'blue' },
  { label: '联合国投票通过新决议', time: '3小时前', tone: 'purple' },
];

const allianceMessages: AllianceMessage[] = [
  {
    id: 'western',
    name: '北美·西方联盟',
    subtitle: '我们建议就北极治理议题展开磋商...',
    time: '14:26',
    tone: 'western',
    emblem: '✺',
    unread: true,
    messages: [
      { id: 'w1', from: 'alliance', time: '14:16', text: '我们建议就北极治理议题展开磋商，避免军事误判。' },
      { id: 'w2', from: 'self', time: '14:18', text: '我们同意建立沟通渠道，并希望优先讨论航道安全。' },
      { id: 'w3', from: 'alliance', time: '14:24', text: '收到。代表团将在一小时内提交议程草案。' },
    ],
  },
  {
    id: 'china',
    name: '中华联盟',
    subtitle: '收到。我们将审视贵方提案。',
    time: '14:18',
    tone: 'china',
    emblem: '米',
    unread: true,
    messages: [
      { id: 'c1', from: 'alliance', time: '14:18', text: '收到。我们将审视贵方提案。' },
      { id: 'c2', from: 'self', time: '14:20', text: '感谢配合，我们期待共同推进合作框架的进一步落实。' },
      { id: 'c3', from: 'alliance', time: '14:23', text: '建议下周召开线上磋商会议，讨论具体执行细节。' },
      { id: 'c4', from: 'self', time: '14:25', text: '同意，我们将准备相关资料，届时与会。' },
      { id: 'c5', from: 'alliance', time: '14:27', text: '好的，会议时间另行确认。' },
    ],
  },
  {
    id: 'russia',
    name: '俄罗斯联盟',
    subtitle: '边境演习不针对各方，请勿误判。',
    time: '14:07',
    tone: 'russia',
    emblem: '⚔',
    messages: [
      { id: 'r1', from: 'alliance', time: '14:07', text: '边境演习不针对各方，请勿误判。' },
      { id: 'r2', from: 'self', time: '14:10', text: '请提供演习范围与持续时间，以便降低区域风险。' },
      { id: 'r3', from: 'alliance', time: '14:13', text: '相关通报将通过军事热线同步。' },
    ],
  },
  {
    id: 'middle-east',
    name: '中东·和平联盟',
    subtitle: '建议召开紧急多边安全会议。',
    time: '13:55',
    tone: 'middleEast',
    emblem: '◎',
    unread: true,
    messages: [
      { id: 'm1', from: 'alliance', time: '13:55', text: '建议召开紧急多边安全会议，控制地区紧张态势。' },
      { id: 'm2', from: 'self', time: '13:58', text: '我们支持会议倡议，并愿提供中立会场。' },
      { id: 'm3', from: 'alliance', time: '14:02', text: '感谢支持，我们将邀请各方安全顾问参与。' },
    ],
  },
  {
    id: 'africa',
    name: '非洲团结联盟',
    subtitle: '希望获得更多发展合作支持。',
    time: '13:41',
    tone: 'africa',
    emblem: '♕',
    messages: [
      { id: 'a1', from: 'alliance', time: '13:41', text: '希望获得更多发展合作支持，重点覆盖能源与粮食安全。' },
      { id: 'a2', from: 'self', time: '13:48', text: '我们将评估可调配资源，并准备一份合作清单。' },
      { id: 'a3', from: 'alliance', time: '13:52', text: '期待贵方方案，区域伙伴已准备进入磋商。' },
    ],
  },
];

const quickActions = ['外交谈判', '经济制裁', '军事部署', '科技合作', '文化交流', '情报收集'];

function HudPanel({ className = '', children }: { className?: string; children: ReactNode }) {
  return <section className={`hud-panel ${className}`}>{children}</section>;
}

function AllianceAvatar({ alliance, small = false }: { alliance: Pick<AllianceMessage, 'tone' | 'emblem'>; small?: boolean }) {
  return (
    <span className={`alliance-avatar alliance-avatar--${alliance.tone}${small ? ' alliance-avatar--small' : ''}`}>
      <span>{alliance.emblem}</span>
    </span>
  );
}

function GlobalEventsCard() {
  return (
    <HudPanel className="global-events-panel right-module right-module--events">
      <div className="panel-heading panel-heading--hud">
        <span>全球事件</span>
        <button type="button" className="panel-link">更多 &gt;</button>
      </div>
      <div className="event-list event-list--dense">
        {events.map((event) => (
          <button key={event.label} type="button" className="event-row event-row--interactive">
            <span className={`event-badge event-badge--${event.tone}`}>✦</span>
            <strong>{event.label}</strong>
            <time>{event.time}</time>
          </button>
        ))}
      </div>
    </HudPanel>
  );
}

function AllianceMessagesCard({
  selectedAllianceId,
  readIds,
  onSelect,
}: {
  selectedAllianceId?: string;
  readIds: Set<string>;
  onSelect: (alliance: AllianceMessage) => void;
}) {
  const unreadCount = allianceMessages.filter((message) => message.unread && !readIds.has(message.id)).length;

  return (
    <HudPanel className="alliance-panel right-module right-module--messages">
      <div className="panel-heading panel-heading--hud alliance-heading">
        <div>
          <span>联盟会话</span>
          <small>ALLIANCE MESSAGES</small>
        </div>
        <strong className="unread-badge">{String(unreadCount).padStart(2, '0')}</strong>
      </div>

      <div className="alliance-list">
        {allianceMessages.map((alliance) => {
          const isSelected = alliance.id === selectedAllianceId;
          const isUnread = Boolean(alliance.unread && !readIds.has(alliance.id));

          return (
            <button
              key={alliance.id}
              type="button"
              className={`alliance-row${isSelected ? ' alliance-row--selected' : ''}`}
              onClick={() => onSelect(alliance)}
            >
              <AllianceAvatar alliance={alliance} />
              <span className="alliance-copy">
                <strong>{alliance.name}</strong>
                <small>{alliance.subtitle}</small>
              </span>
              <span className="alliance-meta">
                <time>{alliance.time}</time>
                {isUnread ? <i aria-label="未读消息" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </HudPanel>
  );
}

function QuickActionsCard() {
  return (
    <HudPanel className="quick-panel right-module right-module--quick">
      <div className="panel-heading panel-heading--hud">
        <span>快捷操作</span>
        <strong>OPS</strong>
      </div>
      <div className="quick-actions quick-actions--hud">
        {quickActions.map((action) => (
          <button key={action} type="button">
            {action}
          </button>
        ))}
      </div>
    </HudPanel>
  );
}

function AllianceChatModal({ alliance, onClose }: { alliance: AllianceMessage; onClose: () => void }) {
  return (
    <div className="alliance-chat-modal" role="dialog" aria-label={`${alliance.name} 聊天窗口`}>
      <header className="chat-titlebar">
        <AllianceAvatar alliance={alliance} />
        <div className="chat-title-copy">
          <strong>{alliance.name}</strong>
          <span><i /> 在线</span>
        </div>
        <button type="button" className="chat-close" aria-label="关闭聊天框" onClick={onClose}>×</button>
      </header>

      <div className="chat-messages">
        {alliance.messages.map((message) => (
          <div key={message.id} className={`chat-message chat-message--${message.from}`}>
            {message.from === 'alliance' ? <AllianceAvatar alliance={alliance} small /> : null}
            <div className="chat-bubble">
              <time>{message.time}</time>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form className="chat-composer">
        <input placeholder="输入消息..." aria-label="输入消息" />
        <button type="button" aria-label="发送消息">
          <span>➤</span>
        </button>
      </form>
    </div>
  );
}

export default function RightPanels() {
  const [selectedAllianceId, setSelectedAllianceId] = useState<string>();
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());

  const selectedAlliance = useMemo(
    () => allianceMessages.find((alliance) => alliance.id === selectedAllianceId),
    [selectedAllianceId],
  );

  const handleSelectAlliance = (alliance: AllianceMessage) => {
    setSelectedAllianceId(alliance.id);
    setReadIds((current) => {
      if (current.has(alliance.id)) return current;
      const next = new Set(current);
      next.add(alliance.id);
      return next;
    });
  };

  return (
    <>
      <aside className="right-panels hud-column" aria-label="Global situation panels">
        <GlobalEventsCard />
        <AllianceMessagesCard selectedAllianceId={selectedAllianceId} readIds={readIds} onSelect={handleSelectAlliance} />
        <QuickActionsCard />
      </aside>
      {selectedAlliance ? <AllianceChatModal alliance={selectedAlliance} onClose={() => setSelectedAllianceId(undefined)} /> : null}
    </>
  );
}
