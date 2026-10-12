import { useEffect, useState } from 'react';
import type { Game } from '../types/game';
import { redirectToWhatsApp } from '../utils/whatsapp';
import { 
  X, 
  Star, 
  Calendar, 
  Gamepad2, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Share2, 
  Check, 
  Layers,
  Sparkles,
  Globe,
  ExternalLink
} from 'lucide-react';

interface GameDetailsModalProps {
  game: Game | null;
  onClose: () => void;
}

export const GameDetailsModal = ({ game, onClose }: GameDetailsModalProps) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (game) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [game, onClose]);

  if (!game) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const defaultFeatures = [
    'Ultra-High Speed SSD Loading',
    'DualSense™ Haptic Feedback',
    'Adaptive Triggers Support',
    'Tempest 3D AudioTech',
    'Target 60 FPS / 4K Dynamic Resolution',
    'Ray Tracing Graphics Mode',
  ];

  const featuresToDisplay = game.features || defaultFeatures;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-game-title"
    >
      {/* Dark Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0B10]/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Surface */}
      <div className="relative w-full max-w-4xl bg-[#15151D] border border-[#262638] rounded-3xl shadow-2xl shadow-black/80 overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Modal Header Bar with Close & Share Buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262638] bg-[#0E0E14]/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
            <Gamepad2 className="w-4 h-4 text-[#38BDF8]" />
            <span>PlayStation Title Details</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-[#1C1C27] text-[#A1A1AA] hover:text-[#22D3EE] hover:bg-[#262638] transition-colors border border-[#262638] flex items-center gap-1.5 text-xs"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1C1C27] text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#262638] transition-colors border border-[#262638]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Game Cover Poster (5 Cols) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border border-[#262638] shadow-2xl bg-[#0B0B10] group">
                {imageError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#15151D]">
                    <Gamepad2 className="w-16 h-16 text-[#38BDF8] mb-3" />
                    <h4 className="text-base font-bold text-[#F4F4F5]">{game.title}</h4>
                    <span className="text-xs text-[#A1A1AA] mt-1">{game.genre}</span>
                  </div>
                ) : (
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-center"
                  />
                )}

                {/* Floating platform badges */}
                <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                  {game.platforms.map((plat) => (
                    <span
                      key={plat}
                      className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-black/85 text-[#22D3EE] border border-[#22D3EE]/40 shadow-lg"
                    >
                      {plat}
                    </span>
                  ))}
                </div>

                {/* Rating badge */}
                {game.rating && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-black/85 text-amber-300 border border-amber-500/40 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{game.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Verified Badge below image */}
              <div className="mt-4 flex items-center gap-2 text-xs text-[#A1A1AA] bg-[#1C1C27] px-4 py-2 rounded-xl border border-[#262638] w-full justify-center">
                <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
                <span>PlayStation Official Verified Product</span>
              </div>
            </div>

            {/* Right Column: Game Info & WhatsApp Buy Action (7 Cols) */}
            <div className="md:col-span-7 flex flex-col space-y-6">
              
              {/* Genre & Year Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">
                  {game.genre}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium text-[#A1A1AA] bg-[#1C1C27] border border-[#262638]">
                  <Calendar className="w-3.5 h-3.5 text-[#71717A]" />
                  <span>Released {game.releaseYear}</span>
                </span>
                {game.featured && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Featured Hit</span>
                  </span>
                )}
                {game.apiSource === 'external' && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/30">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live External API</span>
                  </span>
                )}
                {game.externalUrl && (
                  <a
                    href={game.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-[#A1A1AA] hover:text-[#38BDF8] bg-[#1C1C27] hover:bg-[#262638] border border-[#262638] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Source Web</span>
                  </a>
                )}
              </div>

              {/* Game Title */}
              <div>
                <h2
                  id="modal-game-title"
                  className="text-2xl sm:text-3xl font-extrabold text-[#F4F4F5] leading-tight"
                >
                  {game.title}
                </h2>
                <p className="text-xs text-[#71717A] mt-1">
                  Edition: <span className="text-[#A1A1AA] font-semibold">Standard PlayStation Edition</span>
                </p>
              </div>

              {/* Price & Primary WhatsApp Buy Action Box */}
              <div className="p-5 rounded-2xl bg-[#1C1C27] border border-[#262638] space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#A1A1AA] font-semibold">
                      Store Price
                    </span>
                    <div className="text-3xl font-extrabold text-[#F4F4F5] tracking-tight">
                      {game.price || 'Contact for price'}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      In Stock for WhatsApp Order
                    </span>
                  </div>
                </div>

                {/* The WhatsApp Buy Button */}
                <button
                  type="button"
                  onClick={() => redirectToWhatsApp(game)}
                  className="w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>Buy Game via WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-[#71717A]">
                  Clicking will open WhatsApp with your pre-filled game order details for instant assistance.
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">
                  About The Game
                </h4>
                <p className="text-sm text-[#D4D4D8] leading-relaxed">
                  {game.description || game.shortDescription || 'Experience this incredible PlayStation masterpiece with cutting-edge visual fidelity and gripping gameplay.'}
                </p>
              </div>

              {/* PS5 Technology & Features Highlights */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">
                  <Layers className="w-4 h-4 text-[#22D3EE]" />
                  <span>PlayStation Hardware Features</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {featuresToDisplay.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0B0B10] border border-[#262638] text-xs text-[#F4F4F5]"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0E0E14] border-t border-[#262638] flex items-center justify-between text-xs text-[#71717A]">
          <span>ZEROONE — PlayStation Games Store</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1C1C27] hover:bg-[#262638] text-[#F4F4F5] font-semibold transition-colors border border-[#262638]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
