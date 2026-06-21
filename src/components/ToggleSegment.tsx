import React from 'react';

interface ToggleSegmentProps {
  activeSegment: 'pemantik' | 'latihan';
  onChange: (segment: 'pemantik' | 'latihan') => void;
}

export function ToggleSegment({ activeSegment, onChange }: ToggleSegmentProps) {
  return (
    <div className="flex bg-white neo-border p-1 rounded-full mb-6 w-full max-w-md mx-auto relative z-20">
      <button
        onClick={() => onChange('pemantik')}
        className={`flex-1 py-2 px-4 rounded-full font-bold text-sm md:text-base transition-colors ${
          activeSegment === 'pemantik' ? 'bg-theme-green text-black border-[3px] border-black neo-shadow' : 'text-gray-500 hover:text-black border-[3px] border-transparent'
        }`}
      >
        Pemantik Obrolan
      </button>
      <button
        onClick={() => onChange('latihan')}
        className={`flex-1 py-2 px-4 rounded-full font-bold text-sm md:text-base transition-colors ${
          activeSegment === 'latihan' ? 'bg-[#f49cb0] text-black border-[3px] border-black neo-shadow' : 'text-gray-500 hover:text-black border-[3px] border-transparent'
        }`}
      >
        Latihan Ngobrol
      </button>
    </div>
  );
}
