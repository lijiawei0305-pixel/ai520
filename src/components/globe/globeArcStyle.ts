import type { DiplomacyArc, DiplomacyArcType } from '../../data/demoDiplomacyArcs';

export type RenderArc = DiplomacyArc & {
  visualRole: 'base' | 'pulse';
};

export function createRenderArcs(diplomacyArcs: DiplomacyArc[]): RenderArc[] {
  return diplomacyArcs.flatMap((arc) => [
    { ...arc, id: `${arc.id}-base`, visualRole: 'base' as const },
    { ...arc, id: `${arc.id}-pulse`, visualRole: 'pulse' as const },
  ]);
}

export function seededRandom(seed: string): number {
  let hash = 2166136261;

  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return ((hash >>> 0) % 1000) / 1000;
}

export function getArcColor(arc: RenderArc): string[] {
  const alphaBase = arc.visualRole === 'base' ? 0.14 : 0.78;
  const alphaEnd = arc.visualRole === 'base' ? 0.28 : 0.95;

  switch (arc.type) {
    case 'alliance':
      return [`rgba(36,216,255,${alphaBase})`, `rgba(36,216,255,${alphaEnd})`];
    case 'trade':
      return [`rgba(68,224,138,${alphaBase})`, `rgba(68,224,138,${alphaEnd})`];
    case 'rivalry':
      return [`rgba(255,176,46,${alphaBase})`, `rgba(255,176,46,${alphaEnd})`];
    case 'sanction':
      return [`rgba(255,110,50,${alphaBase})`, `rgba(255,77,94,${alphaEnd})`];
    case 'military':
      return [`rgba(255,60,60,${alphaBase})`, `rgba(255,60,60,${alphaEnd})`];
    case 'intel':
      return [`rgba(120,110,255,${alphaBase})`, `rgba(45,216,255,${alphaEnd})`];
    default:
      return [`rgba(120,220,255,${alphaBase})`, `rgba(120,220,255,${alphaEnd})`];
  }
}

export function getArcAltitude(arc: RenderArc): number {
  const baseByType: Record<DiplomacyArcType, number> = {
    alliance: 0.24,
    trade: 0.2,
    rivalry: 0.34,
    sanction: 0.38,
    military: 0.46,
    intel: 0.3,
  };

  return baseByType[arc.type] + arc.strength / 1000;
}

export function getArcStroke(arc: RenderArc): number {
  let stroke = arc.visualRole === 'base' ? 0.18 + arc.strength / 500 : 0.28 + arc.strength / 260;

  if (arc.type === 'military') {
    stroke += 0.15;
  }

  if (arc.type === 'sanction') {
    stroke += 0.1;
  }

  return stroke;
}

export function getArcAnimateTime(arc: RenderArc): number {
  if (arc.visualRole === 'base') {
    return 0;
  }

  if (arc.type === 'military' || arc.status === 'critical') {
    return 1600;
  }

  if (arc.type === 'intel') {
    return 2400;
  }

  return 3200;
}

export function createArcLabel(arc: RenderArc): string {
  return `
    <div class="country-tooltip">
      <div class="country-tooltip__name">${arc.from} -> ${arc.to}</div>
      <div>Type: ${arc.type}</div>
      <div>Strength: ${arc.strength}</div>
      <div>Status: ${arc.status}</div>
    </div>
  `;
}
