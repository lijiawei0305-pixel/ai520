import { capitals } from './capitals';
import type { FactionId } from './factions';

export type MarkerType = 'capital' | 'base' | 'event' | 'trade' | 'tech' | 'conflict';

export type DiplomacyMarker = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: MarkerType;
  faction: FactionId;
  important?: boolean;
};

const importantIds = new Set(['london', 'washington', 'beijing', 'moscow', 'cairo', 'lagos', 'nairobi']);

function getMarkerType(id: string): MarkerType {
  if (id === 'moscow' || id === 'tehran') return 'conflict';
  if (id === 'beijing' || id === 'seoul') return 'base';
  if (id === 'tokyo') return 'tech';
  if (id === 'cairo' || id === 'lagos' || id === 'nairobi') return 'trade';
  return 'capital';
}

export const demoMarkers: DiplomacyMarker[] = capitals.map((capital) => ({
  id: capital.id,
  name: capital.name,
  lat: capital.lat,
  lng: capital.lng,
  type: getMarkerType(capital.id),
  faction: capital.faction,
  important: importantIds.has(capital.id),
}));
