import { countryNames, demoCountryState } from '../../data/demoCountryState';
import { getFactionConfig } from '../../data/factions';

type LeftPanelsProps = {
  selectedCountry: string;
};

const countryDisplay: Record<string, { name: string; type: string; flag: string }> = {
  GBR: { name: '大不列颠联盟', type: '主要国家', flag: '🇬🇧' },
  USA: { name: '美利坚合众国', type: '主要国家', flag: '🇺🇸' },
  CHN: { name: '中华联盟', type: '主要国家', flag: '🇨🇳' },
  RUS: { name: '俄罗斯联邦', type: '主要国家', flag: '🇷🇺' },
  FRA: { name: '法兰西共和国', type: '主要国家', flag: '🇫🇷' },
};

const countryMetrics = [
  { label: '经济', value: '1,890', tone: 'gold' },
  { label: '科技', value: '1,234', tone: 'blue' },
  { label: '军事', value: '2,345', tone: 'green' },
  { label: '文化', value: '987', tone: 'purple' },
  { label: '影响力', value: '2,309', tone: 'orange' },
];

const relations = [
  { flag: '🇺🇸', country: '美利坚合众国', status: '友好', delta: '+150', tone: 'friendly' },
  { flag: '🇩🇪', country: '德意志联邦', status: '中立', delta: '+21', tone: 'neutral' },
  { flag: '🇨🇳', country: '中华联盟', status: '竞争', delta: '-45', tone: 'rival' },
  { flag: '🇷🇺', country: '俄罗斯联邦', status: '敌对', delta: '-120', tone: 'hostile' },
  { flag: '🇫🇷', country: '法兰西共和国', status: '友好', delta: '+89', tone: 'friendly' },
];

const intelFeed = [
  { icon: '协', text: '我国与美利坚合众国关系提升', time: '14:32', tone: 'blue' },
  { icon: '科', text: '德意志联邦完成科技合作协议', time: '14:28', tone: 'green' },
  { icon: '舰', text: '中华联盟在南海部署新舰队', time: '14:25', tone: 'red' },
  { icon: '制', text: '俄罗斯联邦对我国发起贸易制裁', time: '14:20', tone: 'purple' },
  { icon: '会', text: '法兰西共和国邀请我国参加峰会', time: '14:15', tone: 'gold' },
];

export default function LeftPanels({ selectedCountry }: LeftPanelsProps) {
  const faction = getFactionConfig(demoCountryState[selectedCountry] ?? 'neutral');
  const display = countryDisplay[selectedCountry] ?? {
    name: countryNames[selectedCountry] ?? '大不列颠联盟',
    type: faction.name,
    flag: '◌',
  };

  return (
    <aside className="left-panels hud-column" aria-label="Country command panels">
      <section className="hud-panel country-panel">
        <div className="country-identity">
          <span className="country-flag" aria-hidden="true">
            {display.flag}
          </span>
          <div>
            <h2>{display.name}</h2>
            <p>{display.type}</p>
          </div>
          <button type="button" className="country-menu" aria-label="切换国家">
            ˅
          </button>
        </div>

        <div className="power-grid">
          <div>
            <span>综合国力</span>
            <strong>8,765</strong>
          </div>
          <div>
            <span>全球排名</span>
            <strong>3</strong>
          </div>
        </div>

        <div className="metric-list">
          {countryMetrics.map((metric) => (
            <div key={metric.label} className="metric-row">
              <span className={`metric-icon metric-icon--${metric.tone}`}>{metric.label.slice(0, 1)}</span>
              <span>{metric.label}</span>
              <strong>{metric.value}<small>/h</small></strong>
            </div>
          ))}
        </div>
      </section>

      <section className="hud-panel">
        <div className="panel-heading">
          <span>外交关系</span>
          <strong>{selectedCountry}</strong>
        </div>
        <div className="relation-list">
          {relations.map((relation) => (
            <div key={relation.country} className="relation-row">
              <span className="relation-flag">{relation.flag}</span>
              <span className="relation-country">{relation.country}</span>
              <span className={`relation-status relation-status--${relation.tone}`}>{relation.status}</span>
              <strong className={`relation-delta relation-delta--${relation.tone}`}>{relation.delta}</strong>
            </div>
          ))}
        </div>
        <button type="button" className="panel-primary-action">
          查看详细关系
        </button>
      </section>

      <section className="hud-panel">
        <div className="panel-heading">
          <span>实时动态</span>
          <button type="button" className="panel-link">更多 &gt;</button>
        </div>
        <ul className="intel-feed">
          {intelFeed.map((item) => (
            <li key={item.text}>
              <span className={`feed-icon feed-icon--${item.tone}`}>{item.icon}</span>
              <span>{item.text}</span>
              <time>{item.time}</time>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
