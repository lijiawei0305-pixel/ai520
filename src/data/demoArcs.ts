export type DiplomaticArcType = 'ally' | 'trade' | 'rival' | 'enemy';

export type DiplomaticArc = {
  id: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  type: DiplomaticArcType;
};

export const demoArcs: DiplomaticArc[] = [
  {
    id: 'london-washington',
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 38.9072,
    endLng: -77.0369,
    type: 'ally',
  },
  {
    id: 'london-paris',
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 48.8566,
    endLng: 2.3522,
    type: 'ally',
  },
  {
    id: 'london-beijing',
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 39.9042,
    endLng: 116.4074,
    type: 'rival',
  },
  {
    id: 'london-moscow',
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 55.7558,
    endLng: 37.6173,
    type: 'enemy',
  },
  {
    id: 'london-cairo',
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 30.0444,
    endLng: 31.2357,
    type: 'trade',
  },
];
