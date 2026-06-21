import React, { useMemo } from 'react';
import { Heart, Star } from 'lucide-react';

interface FloatingParticlesProps {
  phase: string | null;
  activeSegment?: 'pemantik' | 'latihan';
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ phase, activeSegment = 'pemantik' }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const isHeart = activeSegment === 'latihan' ? true : Math.random() > 0.3; // 100% hearts if Latihan
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${Math.random() * 6 + 6}s`;
      const animationDelay = `${Math.random() * 5}s`;
      const size = activeSegment === 'latihan'
        ? Math.random() * 10 + 12 // 12px to 22px (sedikit lebih besar)
        : Math.random() * 12 + 10; // 10px to 22px
      return { id: i, isHeart, left, animationDuration, animationDelay, size };
    });
  }, [activeSegment]);

  let opacityClass = "opacity-30";
  let colorClass = "text-white";

  if (activeSegment === 'latihan') {
    opacityClass = "opacity-40";
    colorClass = "text-[#f49cb0]"; // Merah muda (pink)
  } else {
    if (phase === 'PDKT') {
      opacityClass = "opacity-30";
      colorClass = "text-white";
    } else if (phase === 'Pacaran') {
      opacityClass = "opacity-10";
      colorClass = "text-black";
    } else if (phase === 'Menikah') {
      opacityClass = "opacity-10";
      colorClass = "text-white";
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes floatUpHalf {
          0% { transform: translateY(10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-50vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute bottom-0 ${opacityClass} ${colorClass}`}
          style={{
            left: p.left,
            animation: `${activeSegment === 'latihan' ? 'floatUpHalf' : 'floatUp'} ${p.animationDuration} linear ${p.animationDelay} infinite`,
          }}
        >
          {p.isHeart ? <Heart size={p.size} fill="currentColor" /> : <Star size={p.size} fill="currentColor" />}
        </div>
      ))}
    </div>
  );
};
