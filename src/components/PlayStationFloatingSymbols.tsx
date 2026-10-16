import React from 'react';

interface FloatingSymbolProps {
  type: 'triangle' | 'circle' | 'cross' | 'square';
  className?: string;
  size?: number;
  glowColor?: string;
}

const SymbolSVG = ({ type, size = 24, glowColor = '#38BDF8' }: FloatingSymbolProps) => {
  const strokeWidth = 2.5;

  switch (type) {
    case 'triangle':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
          className="text-[#22D3EE] opacity-75"
        >
          <polygon points="12 3 22 20 2 20" />
        </svg>
      );
    case 'circle':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
          className="text-[#F43F5E] opacity-75"
        >
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case 'cross':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
          className="text-[#38BDF8] opacity-75"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    case 'square':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
          className="text-[#E879F9] opacity-75"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      );
  }
};

interface ParticleItem {
  id: number;
  type: 'triangle' | 'circle' | 'cross' | 'square';
  size: number;
  top: string;
  left: string;
  glowColor: string;
  animationClass: string;
  delay: string;
  duration: string;
  blur?: string;
  opacity: number;
}

const PARTICLES: ParticleItem[] = [
  // Triangle - Cyan
  { id: 1, type: 'triangle', size: 36, top: '12%', left: '8%', glowColor: 'rgba(34, 211, 238, 0.6)', animationClass: 'animate-ps-float-1', delay: '0s', duration: '9s', opacity: 0.8 },
  { id: 2, type: 'triangle', size: 20, top: '68%', left: '88%', glowColor: 'rgba(34, 211, 238, 0.4)', animationClass: 'animate-ps-float-2', delay: '2s', duration: '11s', opacity: 0.5 },
  // Circle - Neon Red/Pink
  { id: 3, type: 'circle', size: 32, top: '22%', left: '82%', glowColor: 'rgba(244, 63, 94, 0.6)', animationClass: 'animate-ps-float-2', delay: '1s', duration: '10s', opacity: 0.75 },
  { id: 4, type: 'circle', size: 18, top: '80%', left: '15%', glowColor: 'rgba(244, 63, 94, 0.4)', animationClass: 'animate-ps-float-3', delay: '3.5s', duration: '8s', opacity: 0.45 },
  // Cross - Electric Blue
  { id: 5, type: 'cross', size: 40, top: '48%', left: '92%', glowColor: 'rgba(56, 189, 248, 0.6)', animationClass: 'animate-ps-float-3', delay: '1.5s', duration: '12s', opacity: 0.8 },
  { id: 6, type: 'cross', size: 22, top: '15%', left: '45%', glowColor: 'rgba(56, 189, 248, 0.4)', animationClass: 'animate-ps-float-1', delay: '4s', duration: '13s', opacity: 0.5 },
  // Square - Neon Violet/Pink
  { id: 7, type: 'square', size: 28, top: '78%', left: '72%', glowColor: 'rgba(232, 121, 249, 0.6)', animationClass: 'animate-ps-float-1', delay: '2.5s', duration: '10.5s', opacity: 0.75 },
  { id: 8, type: 'square', size: 24, top: '35%', left: '4%', glowColor: 'rgba(232, 121, 249, 0.4)', animationClass: 'animate-ps-float-2', delay: '0.5s', duration: '11.5s', opacity: 0.6 },
  // Deep Background blurred bokeh symbols for depth
  { id: 9, type: 'triangle', size: 54, top: '30%', left: '60%', glowColor: 'rgba(34, 211, 238, 0.3)', animationClass: 'animate-ps-float-slow', delay: '3s', duration: '16s', blur: 'blur(3px)', opacity: 0.25 },
  { id: 10, type: 'square', size: 60, top: '60%', left: '30%', glowColor: 'rgba(232, 121, 249, 0.25)', animationClass: 'animate-ps-float-slow', delay: '1.2s', duration: '18s', blur: 'blur(4px)', opacity: 0.2 },
];

export const PlayStationFloatingSymbols: React.FC<{ density?: 'normal' | 'light' }> = ({ density = 'normal' }) => {
  const items = density === 'light' ? PARTICLES.slice(0, 6) : PARTICLES;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
      {items.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.animationClass} transition-transform will-change-transform`}
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            filter: p.blur,
            opacity: p.opacity,
          }}
        >
          <SymbolSVG type={p.type} size={p.size} glowColor={p.glowColor} />
        </div>
      ))}
    </div>
  );
};
