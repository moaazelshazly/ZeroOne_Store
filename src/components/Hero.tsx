import { ArrowDown, Sparkles, Disc3, ShieldCheck, Zap, Gamepad2 } from 'lucide-react';
import { PlayStationFloatingSymbols } from './PlayStationFloatingSymbols';

interface HeroProps {
  onExploreClick: () => void;
  totalGamesCount: number;
  onTrendingClick?: (query: string) => void;
}

export const Hero = ({ onExploreClick, totalGamesCount, onTrendingClick }: HeroProps) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-24 border-b border-[#262638]">
      {/* Background Hero Banner Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}TRY.jpg`}
          alt="ZEROONE PlayStation Gaming World"
          width={1024}
          height={1024}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-35 filter brightness-75 scale-105 transition-transform duration-1000"
        />
        {/* Layered dark gradients for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10] via-[#0B0B10]/80 to-[#0B0B10]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B10] via-transparent to-[#0B0B10]" />
        <div className="absolute inset-0 hero-glow-bg pointer-events-none" />

        {/* Dynamic Drifting Aurora Light Orbs */}
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-[#0284C7]/20 blur-3xl pointer-events-none animate-aura-1" />
        <div className="absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full bg-[#7C3AED]/15 blur-3xl pointer-events-none animate-aura-2" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-[#22D3EE]/15 blur-3xl pointer-events-none animate-aura-1" />

        {/* Ambient Subtle Background Bokeh Symbols */}
        <PlayStationFloatingSymbols density="light" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          
          {/* Eyebrow Badge with Radar Pulse */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#15151D]/90 border border-[#38BDF8]/40 text-xs font-semibold text-[#38BDF8] mb-6 shadow-xl backdrop-blur-md hover:border-[#22D3EE] transition-all group">
            <Sparkles className="w-4 h-4 text-[#38BDF8] group-hover:rotate-12 transition-transform duration-300" />
            <span className="tracking-wide">ZEROONE — PlayStation Official Catalog</span>
            <div className="relative flex items-center justify-center w-2.5 h-2.5 ml-1">
              <span className="absolute w-full h-full rounded-full bg-[#22D3EE] animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-[#22D3EE]" />
            </div>
          </div>

          {/* Main Bold Heading with Animated Flowing Gradient */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F4F4F5] leading-tight sm:leading-none mb-6">
            Find Your Next{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#22D3EE] animate-text-flow font-black inline-block drop-shadow-sm">
              Adventure.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed mb-8 max-w-2xl font-normal">
            Explore the latest PlayStation games across every genre. From heart-pounding action to sprawling RPG worlds, discover epic titles engineered for PS5 & PS4.
          </p>

          {/* Call-To-Action & Quick Highlights */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            {/* High Voltage Specular CTA Button */}
            <button
              onClick={onExploreClick}
              className="shine-sweep-container px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] shadow-xl shadow-[#38BDF8]/30 hover:shadow-[#38BDF8]/60 transition-all duration-300 flex items-center gap-2.5 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer border border-[#38BDF8]/40"
            >
              <span>Explore Games</span>
              <ArrowDown className="w-4 h-4 text-white animate-bounce" />
            </button>

            <div className="flex items-center gap-2.5 text-xs text-[#A1A1AA] bg-[#15151D]/90 backdrop-blur-md px-4 py-3 rounded-xl border border-[#262638] hover:border-[#38BDF8]/40 transition-colors shadow-lg">
              <Disc3 className="w-4 h-4 text-[#22D3EE] animate-spin-slow" />
              <span>
                <strong className="text-[#F4F4F5] font-semibold inline-block min-w-[2.5rem] text-center tabular-nums">{totalGamesCount}+</strong> Titles Curated
              </span>
            </div>

            {/* PlayStation DualSense Tech Indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#A1A1AA] bg-[#15151D]/80 backdrop-blur-md px-3.5 py-3 rounded-xl border border-[#262638]">
              <Gamepad2 className="w-4 h-4 text-[#818CF8]" />
              <span className="text-[11px] font-medium">DualSense™ & 4K Ready</span>
            </div>
          </div>

          {/* Quick Trending Searches */}
          {onTrendingClick && (
            <div className="flex items-center gap-2 flex-wrap mb-6 text-xs">
              <span className="text-[#71717A] font-medium">Trending:</span>
              {['Black Myth', 'Spider-Man', 'Baldur', 'Elden Ring', 'Helldivers'].map((trend) => (
                <button
                  key={trend}
                  type="button"
                  onClick={() => onTrendingClick(trend)}
                  className="px-2.5 py-1 rounded-lg bg-[#15151D]/90 hover:bg-[#1C1C27] border border-[#262638] hover:border-[#38BDF8]/50 text-[#A1A1AA] hover:text-[#38BDF8] text-[11px] font-medium transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                >
                  {trend}
                </button>
              ))}
            </div>
          )}

          {/* PlayStation Ecosystem Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-[#262638]/70 max-w-xl">
            <div className="flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors">
              <Zap className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>PS5 & PS4 Enhanced</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Verified Editions</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors col-span-2 sm:col-span-1">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span>Instant Catalog Filter</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
