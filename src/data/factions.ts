export type FactionId =
  | 'zhonghua_alliance'
  | 'north_american_western_alliance'
  | 'russian_alliance'
  | 'india_south_asia_alliance'
  | 'latin_american_south_american_alliance'
  | 'middle_east_islamic_alliance'
  | 'african_union';

export type FactionDisplayId = FactionId | 'neutral';

export type FactionConfig = {
  id: FactionDisplayId;
  name: string;
  shortName: string;
  color: string;
  fill: string;
  stroke: string;
  glow: string;
};

export const factionConfigs: Record<FactionId, FactionConfig> = {
  zhonghua_alliance: {
    id: 'zhonghua_alliance',
    name: '中华联盟',
    shortName: 'ZHN',
    color: '#9B1C2C',
    fill: 'rgba(155, 28, 44, 0.42)',
    stroke: 'rgba(246, 191, 89, 0.9)',
    glow: 'rgba(246, 191, 89, 0.42)',
  },
  north_american_western_alliance: {
    id: 'north_american_western_alliance',
    name: '北美-西方联盟',
    shortName: 'NAW',
    color: '#0A2540',
    fill: 'rgba(10, 37, 64, 0.48)',
    stroke: 'rgba(196, 214, 226, 0.86)',
    glow: 'rgba(184, 211, 230, 0.38)',
  },
  russian_alliance: {
    id: 'russian_alliance',
    name: '俄罗斯联盟',
    shortName: 'RUS',
    color: '#0A5C4A',
    fill: 'rgba(10, 92, 74, 0.44)',
    stroke: 'rgba(176, 221, 206, 0.86)',
    glow: 'rgba(206, 190, 128, 0.38)',
  },
  india_south_asia_alliance: {
    id: 'india_south_asia_alliance',
    name: '印度-南亚联盟',
    shortName: 'ISA',
    color: '#F97316',
    fill: 'rgba(249, 115, 22, 0.46)',
    stroke: 'rgba(255, 168, 70, 0.9)',
    glow: 'rgba(255, 117, 24, 0.46)',
  },
  latin_american_south_american_alliance: {
    id: 'latin_american_south_american_alliance',
    name: '拉美-南美联盟',
    shortName: 'LAT',
    color: '#166534',
    fill: 'rgba(22, 101, 52, 0.42)',
    stroke: 'rgba(236, 181, 79, 0.82)',
    glow: 'rgba(245, 186, 83, 0.40)',
  },
  middle_east_islamic_alliance: {
    id: 'middle_east_islamic_alliance',
    name: '中东-伊斯兰联盟',
    shortName: 'MEI',
    color: '#7C5A12',
    fill: 'rgba(124, 90, 18, 0.50)',
    stroke: 'rgba(222, 191, 110, 0.88)',
    glow: 'rgba(154, 122, 40, 0.44)',
  },
  african_union: {
    id: 'african_union',
    name: '非洲联盟',
    shortName: 'AFR',
    color: '#8B2E1A',
    fill: 'rgba(139, 46, 26, 0.45)',
    stroke: 'rgba(226, 129, 76, 0.88)',
    glow: 'rgba(226, 111, 58, 0.42)',
  },
};

export const neutralFaction: FactionConfig = {
  id: 'neutral',
  name: 'Neutral',
  shortName: 'NEU',
  color: '#9fb5c1',
  fill: 'rgba(120, 150, 160, 0.10)',
  stroke: 'rgba(130, 160, 180, 0.28)',
  glow: 'rgba(160, 190, 205, 0.18)',
};

export const allFactionConfigs = [...Object.values(factionConfigs), neutralFaction];

export function getFactionConfig(id?: FactionDisplayId): FactionConfig {
  if (!id || id === 'neutral') {
    return neutralFaction;
  }

  return factionConfigs[id];
}
