import { capitals } from '../../data/capitals';
import { countryNames, demoCountryState } from '../../data/demoCountryState';
import { demoDiplomacyArcs } from '../../data/demoDiplomacyArcs';
import { getFactionConfig } from '../../data/factions';

type LeftPanelsProps = {
  selectedCountry: string;
};

function getThreatLevel(factionId: string) {
  if (factionId === 'russian_alliance') return 'Critical';
  if (factionId === 'zhonghua_alliance') return 'High';
  if (factionId === 'african_union') return 'Regional';
  return 'Medium';
}

export default function LeftPanels({ selectedCountry }: LeftPanelsProps) {
  const faction = getFactionConfig(demoCountryState[selectedCountry] ?? 'neutral');
  const selectedCapital = capitals.find((capital) => capital.isoA3 === selectedCountry);
  const displayName = selectedCapital?.country ?? countryNames[selectedCountry] ?? 'Selected Nation';
  const relatedArcs = demoDiplomacyArcs.filter(
    (arc) => arc.from === selectedCapital?.name || arc.to === selectedCapital?.name || arc.from === 'London' || arc.to === 'London',
  );

  return (
    <aside className="left-panels hud-column" aria-label="Country command panels">
      <section className="hud-panel country-panel">
        <div className="panel-heading">
          <span>国家信息</span>
          <strong>{selectedCountry}</strong>
        </div>
        <div className="country-name">{displayName}</div>
        <dl className="stats-grid">
          <div className="stat-card stat-card--wide">
            <dt>阵营名称</dt>
            <dd className="faction-name" style={{ color: faction.color }}>
              {faction.name}
            </dd>
          </div>
          <div>
            <dt>ISO_A3</dt>
            <dd>{selectedCountry}</dd>
          </div>
          <div>
            <dt>影响力</dt>
            <dd>{faction.id === 'neutral' ? 42 : 78}</dd>
          </div>
          <div>
            <dt>稳定度</dt>
            <dd>{faction.id === 'russian_alliance' ? '58%' : '64%'}</dd>
          </div>
          <div>
            <dt>威胁等级</dt>
            <dd>{getThreatLevel(faction.id)}</dd>
          </div>
        </dl>
      </section>

      <section className="hud-panel">
        <div className="panel-heading">
          <span>外交关系</span>
          <strong>{relatedArcs.length}</strong>
        </div>
        <div className="relation-list">
          {relatedArcs.slice(0, 7).map((arc) => (
            <div key={arc.id} className="relation-row">
              <span>{arc.from}</span>
              <i className={`relation-dot relation-dot--${arc.type}`} />
              <span>{arc.to}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="hud-panel">
        <div className="panel-heading">
          <span>实时动态</span>
          <strong>LIVE</strong>
        </div>
        <ul className="intel-feed">
          <li>非洲联盟节点进入紫色战略覆盖层。</li>
          <li>首都网络数据流已切换为 base + pulse 双层。</li>
          <li>欧亚与中华阵营边界活动增强。</li>
        </ul>
      </section>
    </aside>
  );
}
