import React, { useState, useRef, useCallback } from 'react';
import type { Game } from '../types/game';
import { redirectToWhatsApp } from '../utils/whatsapp';
import { Star, Calendar, Gamepad, MessageSquare, ArrowRight } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onSelectGame: (game: Game) => void;
  index?: number;
}

export const GameCard = ({ game, onSelectGame, index = 0 }: GameCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 3D Tilt State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    // Subtly tilt card (max 7 degrees)
    setTilt({
      x: -normY * 7,
      y: normX * 7,
    });

    // Holographic glare position (percent)
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  // Delay for staggered entrance animation based on index
  const animationDelay = `${Math.min(index * 45, 450)}ms`;

  return (
    <div
      className="card-tilt-container animate-card-entrance"
      style={{ animationDelay }}
    >
      <article
        ref={cardRef}
        onClick={() => onSelectGame(game)}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelectGame(game);
          }
        }}
        tabIndex={0}
        role="button"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
        }}
        className="group relative flex flex-col bg-[#15151D] rounded-2xl overflow-hidden border border-[#262638] hover:border-[#38BDF8]/80 transition-all duration-200 glow-card shadow-lg shadow-black/50 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#38BDF8] will-change-transform"
        aria-label={`${game.title} - ${game.genre} for ${game.platforms.join(', ')}. Click to view details or buy.`}
      >
        {/* Holographic specular glare overlay that follows mouse */}
        <div
          className="holo-glare-overlay pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.28) 0%, rgba(56, 189, 248, 0.18) 35%, transparent 70%)`,
            opacity: glare.opacity,
          }}
        />

        {/* Top Media Container with 3:4 Aspect Ratio */}
        <div className="relative w-full aspect-[3/4] bg-[#0E0E14] overflow-hidden">
          
          {/* Shimmer Placeholder while image is loading */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#15151D] via-[#1F1F2B] to-[#15151D] animate-pulse" />
          )}

          {/* Fallback Display if image fails to load */}
          {imageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#15151D] to-[#0B0B10]">
              <div className="w-16 h-16 rounded-2xl bg-[#262638]/50 flex items-center justify-center mb-3 border border-[#38BDF8]/20 group-hover:border-[#22D3EE]/40 transition-colors">
                <Gamepad className="w-8 h-8 text-[#38BDF8] group-hover:text-[#22D3EE] transition-colors" />
              </div>
              <div className="flex gap-2 text-xs font-bold text-[#38BDF8] mb-2 tracking-widest">
                <span className="text-[#22D3EE]">△</span>
                <span className="text-[#F43F5E]">○</span>
                <span className="text-[#38BDF8]">✕</span>
                <span className="text-[#E879F9]">□</span>
              </div>
              <h4 className="text-sm font-bold text-[#F4F4F5] line-clamp-2 mb-1">
                {game.title}
              </h4>
              <span className="text-[11px] text-[#A1A1AA] uppercase tracking-wider">
                {game.genre}
              </span>
            </div>
          ) : (
            <img
              src={game.coverImage}
              alt={`${game.title} cover art`}
              width={600}
              height={800}
              decoding="async"
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
            {/* Platforms Badges */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {game.platforms.map((platform) => (
                <span
                  key={platform}
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md tracking-wider shadow-md backdrop-blur-md transition-all duration-200 group-hover:border-opacity-100 ${
                    platform === 'PS5'
                      ? 'bg-black/80 text-[#22D3EE] border border-[#22D3EE]/50 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.4)]'
                      : 'bg-black/80 text-[#38BDF8] border border-[#38BDF8]/50 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                  }`}
                >
                  {platform}
                </span>
              ))}
              {game.apiSource === 'external' && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md tracking-wider bg-black/85 text-[#38BDF8] border border-[#38BDF8]/40 shadow-md backdrop-blur-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                  Live API
                </span>
              )}
            </div>

            {/* Top Right: Featured HIT & Rating Badges */}
            <div className="flex items-center gap-1.5">
              {game.featured && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-[#38BDF8]/50 text-[#38BDF8] text-[10px] font-black shadow-md tracking-wider animate-pulse">
                  <span>HIT</span>
                </div>
              )}
              {game.rating && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[11px] font-bold shadow-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{game.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Hover quick overlay with View Details hint & subtle PS shapes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 pointer-events-none z-10">
            <div className="flex items-center gap-1 text-xs font-semibold text-[#22D3EE] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span>View details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <div className="flex gap-1.5 text-[10px] font-bold tracking-widest text-[#A1A1AA]/70">
              <span>△</span>
              <span>○</span>
              <span>✕</span>
              <span>□</span>
            </div>
          </div>

          {/* Subtle Dark Bottom Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#15151D] to-transparent pointer-events-none" />
        </div>

        {/* Card Content & Metadata */}
        <div className="flex flex-col flex-1 p-4 justify-between gap-3">
          <div>
            {/* Genre & Release Year Row */}
            <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
              <span className="font-semibold text-[#38BDF8] tracking-wide uppercase text-[11px]">
                {game.genre}
              </span>
              <div className="flex items-center gap-1 text-[#A1A1AA] text-[11px]">
                <Calendar className="w-3 h-3 text-[#71717A]" />
                <span>{game.releaseYear}</span>
              </div>
            </div>

            {/* Game Title */}
            <h3 className="text-base font-bold text-[#F4F4F5] group-hover:text-white transition-colors line-clamp-1 leading-snug">
              {game.title}
            </h3>

            {/* Short description with stable height container */}
            <p className="text-xs text-[#A1A1AA] line-clamp-2 mt-1 leading-relaxed min-h-[2rem]">
              {game.shortDescription || 'PlayStation edition with high-speed SSD loading and DualSense support.'}
            </p>
          </div>

          {/* Footer Row: Price & Actions */}
          <div className="pt-3 border-t border-[#262638] flex items-center justify-between gap-2 mt-auto">
            {/* Price */}
            <div>
              {game.price ? (
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-medium">
                    Standard
                  </span>
                  <span className="text-base font-extrabold text-[#F4F4F5] tracking-tight">
                    {game.price}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-[#A1A1AA] italic">Price TBD</span>
              )}
            </div>

            {/* Action Buttons: WhatsApp Buy & View Details */}
            <div className="flex items-center gap-1.5">
              {/* Direct WhatsApp Order Button with Shimmer Sweep */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  redirectToWhatsApp(game);
                }}
                title="Buy now via WhatsApp"
                className="shine-sweep-container p-2 px-2.5 rounded-xl bg-emerald-600/25 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 hover:border-emerald-400 transition-all duration-200 flex items-center gap-1 text-xs font-bold shadow-sm hover:shadow-emerald-500/30"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Buy</span>
              </button>

              {/* View Details Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectGame(game);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-[#1F1F2B] hover:bg-[#2A2A3B] text-[#22D3EE] hover:text-white text-xs font-semibold border border-[#262638] hover:border-[#38BDF8]/40 transition-colors flex items-center gap-1"
              >
                <span>Details</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
};
