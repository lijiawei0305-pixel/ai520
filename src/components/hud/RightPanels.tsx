import { factionConfigs } from '../../data/factions';

const events = [
  { label: '北约宣布新军事演习计划', tone: 'alliance' },
  { label: '中东地区局势紧张升级', tone: 'trade' },
  { label: '全球经济峰会即将召开', tone: 'intel' },
  { label: '新科技突破：量子计算', tone: 'rivalry' },
  { label: '非洲联盟启动联合基础设施计划', tone: 'africa' },
];

const factionLegend = Object.values(factionConfigs);

export default function RightPanels() {
  return (
    <aside className="right-panels hud-column" aria-label="Global situation panels">
      <section className="hud-panel">
        <div className="panel-heading">
          <span>全球事件</span>
          <strong>05</strong>
        </div>
        <div className="event-list">
          {events.map((event) => (
            <div key={event.label} className={`event-chip event-chip--${event.tone}`}>
              {event.label}
            </div>
          ))}
        </div>
      </section>

      <section className="hud-panel minimap-panel">
        <div className="panel-heading">
          <span>战略态势</span>
          <strong>6 FACTIONS</strong>
        </div>
        <div className="minimap-grid">
          <span className="minimap-pulse minimap-pulse--one" />
          <span className="minimap-pulse minimap-pulse--two" />
          <span className="minimap-pulse minimap-pulse--three" />
          <span className="minimap-pulse minimap-pulse--africa" />
        </div>
        <div className="faction-legend">
          {factionLegend.map((faction) => (
            <div key={faction.id} className="faction-legend-item">
              <i style={{ background: faction.color, boxShadow: `0 0 10px ${faction.color}` }} />
              <span>{faction.shortName}</span>
              <strong>{faction.name}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="hud-panel quick-panel">
        <div className="panel-heading">
          <span>快捷操作</span>
          <strong>OPS</strong>
        </div>
        <div className="quick-actions">
          <button type="button">外交谈判</button>
          <button type="button">经济制裁</button>
          <button type="button">军事部署</button>
          <button type="button">科技合作</button>
          <button type="button">文化交流</button>
          <button type="button">情报收集</button>
        </div>
      </section>
    </aside>
  );
}
