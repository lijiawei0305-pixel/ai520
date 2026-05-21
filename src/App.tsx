import { useCallback, useState } from 'react';
import DiplomacyGlobe from './components/globe/DiplomacyGlobe';
import BottomCommandPanel from './components/hud/BottomCommandPanel';
import LeftPanels from './components/hud/LeftPanels';
import RightPanels from './components/hud/RightPanels';
import TopBar from './components/hud/TopBar';
import './styles/app.css';
import './styles/globe.css';
import './styles/hud.css';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState('GBR');
  const handleCountrySelect = useCallback((code: string) => {
    setSelectedCountry(code);
  }, []);

  return (
    <main className="game-shell">
      <div className="space-bg" />
      <DiplomacyGlobe selectedCountry={selectedCountry} onCountrySelect={handleCountrySelect} />

      <section className="hud-layer" aria-label="Game interface">
        <TopBar />
        <LeftPanels selectedCountry={selectedCountry} />
        <RightPanels />
        <BottomCommandPanel />
      </section>
    </main>
  );
}
