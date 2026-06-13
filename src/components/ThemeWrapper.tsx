import React, { useEffect } from 'react';
import { FloatingParticles } from './FloatingParticles';

interface ThemeWrapperProps {
  children: React.ReactNode;
  phase: string | null;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children, phase }) => {
  useEffect(() => {
    const root = document.documentElement;
    let bgColor = '#06D6A0'; // Default Mint Green
    let textColor = '#1A1A1A'; // Default Black
    
    if (phase === 'PDKT') {
      bgColor = '#FF8A9A'; // Bright Pink
      textColor = '#2C0E13'; // Dark Red
    } else if (phase === 'Pacaran') {
      bgColor = '#FF3366'; // Pink
      textColor = '#FFF0F3'; // Pale Pink
    } else if (phase === 'Menikah') {
      bgColor = '#800020'; // Maroon
      textColor = '#FFE5EC'; // Soft Pink
    }

    root.style.setProperty('--bg-color', bgColor);
    root.style.setProperty('--text-color', textColor);
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
  }, [phase]);

  return (
    <div className="relative min-h-screen overflow-hidden transition-colors duration-500">
      <FloatingParticles phase={phase} />
      <div className="relative z-10 container mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
};
