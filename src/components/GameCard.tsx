import { useState } from 'react';
import type { Game } from '../types/game';
import { redirectToWhatsApp } from '../utils/whatsapp';
import { Star, Calendar, Gamepad, MessageSquare, ArrowRight } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onSelectGame: (game: Game) => void;
}

export const GameCard = ({ game, onSelectGame }: GameCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      onClick={() => onSelectGame(game)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectGame(game);
        }
      }}
      tabIndex={0}
      role="button"
      className="group relative flex flex-col bg-[#15151D] rounded-2xl overflow-hidden border border-[#262638] hover:border-[#38BDF8]/70 transition-all duration-300 hover:-translate-y-1.5 glow-card shadow-lg shadow-black/40 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
      aria-label={`${game.title} - ${game.genre} for ${game.platforms.join(', ')}. Click to view details or buy.`}
    >
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
              <span>△</span>
              <span className="text-[#22D3EE]">○</span>
              <span className="text-pink-400">✕</span>
              <span className="text-sky-300">□</span>
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
            className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
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
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md tracking-wider shadow-md backdrop-blur-md ${
                  platform === 'PS5'
                    ? 'bg-black/80 text-[#22D3EE] border border-[#22D3EE]/40'
                    : 'bg-black/80 text-[#38BDF8] border border-[#38BDF8]/40'
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
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-[#38BDF8]/40 text-[#38BDF8] text-[10px] font-extrabold shadow-md tracking-wider">
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

        {/* Hover quick overlay with View Details hint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
          <div className="flex items-center gap-1 text-xs font-semibold text-[#22D3EE]">
            <span>Click to view details</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
            {/* Direct WhatsApp Order Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                redirectToWhatsApp(game);
              }}
              title="Buy now via WhatsApp"
              className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition-all duration-200 flex items-center gap-1 text-xs font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Buy</span>
            </button>

            {/* View Details Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectGame(game);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-[#1F1F2B] hover:bg-[#2A2A3B] text-[#22D3EE] hover:text-white text-xs font-semibold border border-[#262638] transition-colors flex items-center gap-1"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
