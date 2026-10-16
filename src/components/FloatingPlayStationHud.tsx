import { useState, useEffect } from 'react';
import { ArrowUp, Gamepad2 } from 'lucide-react';

export const FloatingPlayStationHud = () => {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top of PlayStation Catalog"
        className="group relative flex items-center justify-center p-3.5 rounded-2xl bg-[#15151D]/90 backdrop-blur-xl border border-[#38BDF8]/40 hover:border-[#22D3EE] shadow-2xl shadow-black/80 hover:shadow-[#38BDF8]/30 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
      >
        {/* Pulsing Sonar Ring */}
        <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#38BDF8]/30 to-[#22D3EE]/30 blur-sm group-hover:opacity-100 opacity-50 animate-pulse pointer-events-none" />

        {/* Ambient PlayStation Shapes on Hover */}
        <div className="relative flex flex-col items-center gap-1 z-10">
          <div className="flex items-center gap-1 text-[9px] font-black tracking-widest text-[#A1A1AA] group-hover:text-white transition-colors">
            <span className="text-[#22D3EE]">△</span>
            <span className="text-[#F43F5E]">○</span>
            <span className="text-[#38BDF8]">✕</span>
            <span className="text-[#E879F9]">□</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#F4F4F5] group-hover:text-[#38BDF8] transition-colors">
            {isHovered ? (
              <ArrowUp className="w-4 h-4 text-[#22D3EE] animate-bounce" />
            ) : (
              <Gamepad2 className="w-4 h-4 text-[#38BDF8]" />
            )}
          </div>
        </div>

        {/* Floating Tooltip */}
        <div
          className={`absolute bottom-full right-0 mb-3 px-3 py-1.5 rounded-xl bg-[#0B0B10]/95 border border-[#262638] text-[11px] font-semibold text-[#F4F4F5] whitespace-nowrap shadow-xl pointer-events-none transition-all duration-200 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping" />
            <span>Back to top</span>
          </div>
        </div>
      </button>
    </div>
  );
};
