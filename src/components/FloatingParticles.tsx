import React, { useMemo } from 'react';
import { Heart, Star } from 'lucide-react';

interface FloatingParticlesProps {
  phase: string | null;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ phase }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const isHeart = Math.random() > 0.3; // 70% hearts
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${Math.random() * 6 + 6}s`;
      const animationDelay = `${Math.random() * 5}s`;
      const size = Math.random() * 12 + 10; // 10px to 22px
      return { id: i, isHeart, left, animationDuration, animationDelay, size };
    });
  }, []);

  let opacityClass = "opacity-30";
  let colorClass = "text-white";

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

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute bottom-0 ${opacityClass} ${colorClass}`}
          style={{
            left: p.left,
            animation: `floatUp ${p.animationDuration} linear ${p.animationDelay} infinite`,
          }}
        >
          {p.isHeart ? <Heart size={p.size} fill="currentColor" /> : <Star size={p.size} fill="currentColor" />}
        </div>
      ))}
    </div>
  );
};
