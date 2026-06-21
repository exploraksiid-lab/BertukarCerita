import { useState } from 'react';
import { ThemeWrapper } from './components/ThemeWrapper';
import { ToggleSegment } from './components/ToggleSegment';
import { PemantikObrolan } from './components/PemantikObrolan';
import { LatihanNgobrol } from './components/LatihanNgobrol';

function App() {
  const [activeSegment, setActiveSegment] = useState<'pemantik' | 'latihan'>('pemantik');
  const [phase, setPhase] = useState<string | null>(null);

  return (
    <ThemeWrapper phase={phase} activeSegment={activeSegment}>
      <div className="w-full relative z-20 mt-4 mb-4">
        <ToggleSegment activeSegment={activeSegment} onChange={setActiveSegment} />
      </div>

      {activeSegment === 'pemantik' ? (
        <PemantikObrolan phase={phase} setPhase={setPhase} />
      ) : (
        <LatihanNgobrol />
      )}
    </ThemeWrapper>
  );
}

export default App;
