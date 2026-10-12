import { ArrowDown, Sparkles, Disc3, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  totalGamesCount: number;
  onTrendingClick?: (query: string) => void;
}

export const Hero = ({ onExploreClick, totalGamesCount, onTrendingClick }: HeroProps) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-12 md:pb-20 border-b border-[#262638]">
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
          className="w-full h-full object-cover object-center opacity-35 filter brightness-75 scale-105"
        />
        {/* Layered dark gradients for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10] via-[#0B0B10]/80 to-[#0B0B10]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B10] via-transparent to-[#0B0B10]" />
        <div className="absolute inset-0 hero-glow-bg pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15151D]/90 border border-[#38BDF8]/30 text-xs font-semibold text-[#38BDF8] mb-5 shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>ZEROONE — PlayStation Official Catalog</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
          </div>

          {/* Main Bold Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F4F4F5] leading-tight sm:leading-none mb-5">
            Find Your Next{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#22D3EE]">
              Adventure.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed mb-8 max-w-2xl font-normal">
            Explore the latest PlayStation games across every genre. From heart-pounding action to sprawling RPG worlds, discover epic titles engineered for PS5 & PS4.
          </p>

          {/* Call-To-Action & Quick Highlights */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0EA5E9] shadow-lg shadow-[#38BDF8]/30 hover:shadow-[#38BDF8]/50 transition-all duration-300 flex items-center gap-2.5 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Explore Games</span>
              <ArrowDown className="w-4 h-4 text-white animate-bounce" />
            </button>

            <div className="flex items-center gap-2 text-xs text-[#A1A1AA] bg-[#15151D]/80 backdrop-blur-md px-4 py-3 rounded-xl border border-[#262638]">
              <Disc3 className="w-4 h-4 text-[#22D3EE]" />
              <span>
                <strong className="text-[#F4F4F5] font-semibold inline-block min-w-[2.5rem] text-center tabular-nums">{totalGamesCount}+</strong> Titles Curated
              </span>
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
                  className="px-2.5 py-1 rounded-lg bg-[#15151D]/90 hover:bg-[#1C1C27] border border-[#262638] hover:border-[#38BDF8]/40 text-[#A1A1AA] hover:text-[#38BDF8] text-[11px] font-medium transition-colors cursor-pointer"
                >
                  {trend}
                </button>
              ))}
            </div>
          )}

          {/* PlayStation Ecosystem Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#262638]/60 max-w-xl">
            <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
              <Zap className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>PS5 & PS4 Enhanced</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Verified Editions</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A1A1AA] col-span-2 sm:col-span-1">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              <span>Genre Instant Filter</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
