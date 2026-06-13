import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

interface SlotMachineProps {
  isSpinning: boolean;
  result: string | null;
  dummyTexts: string[];
}

export const SlotMachine: React.FC<SlotMachineProps> = ({ isSpinning, result, dummyTexts }) => {
  const [items, setItems] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSpinning) {
      // Create a list of items to scroll through
      const newItems = [...dummyTexts, ...dummyTexts, result || "Mencari topik obrolan seru..."];
      setItems(newItems);
    } else if (result && items.length > 0) {
      // Ensure the final item is the result
      const newItems = [...items];
      newItems[newItems.length - 1] = result;
      setItems(newItems);
    } else if (!result) {
      setItems(["Siap untuk mulai?"]);
    }
  }, [isSpinning, result, dummyTexts]);

  const itemHeight = 200; // Match this with the inner div height

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[2rem] p-6 md:p-10 my-8 overflow-hidden relative min-h-[200px] flex items-center justify-center">
      <div 
        ref={containerRef}
        className={clsx(
          "w-full text-center transition-transform",
          isSpinning ? "duration-[3500ms] ease-[cubic-bezier(0.15,0.85,0.35,1)]" : "duration-0"
        )}
        style={{
          transform: isSpinning ? `translateY(-${(items.length - 1) * itemHeight}px)` : 'translateY(0px)',
          filter: isSpinning ? 'blur(2px)' : 'blur(0px)',
          willChange: 'transform'
        }}
      >
        <div className="flex flex-col items-center">
          {items.map((text, idx) => (
            <div 
              key={idx} 
              className="h-[200px] w-full flex items-center justify-center text-2xl md:text-4xl font-bold text-black p-4"
            >
              <p className="line-clamp-4">{text}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Absolute positioning to fix the visible window */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_10px_20px_rgba(0,0,0,0.1)] rounded-[2rem]"></div>
    </div>
  );
};
