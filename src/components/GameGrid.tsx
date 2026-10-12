import { useMemo } from 'react';
import type { Game } from '../types/game';
import { GameCard } from './GameCard';
import { 
  Gamepad2, 
  RotateCcw, 
  SearchX, 
  ArrowUpDown, 
  X, 
  Filter
} from 'lucide-react';

export type SortOption =
  | 'featured'
  | 'rating-desc'
  | 'year-desc'
  | 'price-asc'
  | 'price-desc'
  | 'title-asc';

export type PlatformFilter = 'all' | 'PS5' | 'PS4';

interface GameGridProps {
  games: Game[];
  totalGamesCount: number;
  selectedGenre: string;
  searchQuery: string;
  onResetFilters: () => void;
  onSelectGame: (game: Game) => void;
  isLoading?: boolean;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  platformFilter: PlatformFilter;
  onPlatformFilterChange: (platform: PlatformFilter) => void;
  onClearGenre?: () => void;
  onClearSearch?: () => void;
}

function parsePrice(priceStr?: string): number {
  if (!priceStr) return 0;
  if (priceStr.toLowerCase().includes('free')) return 0;
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : num;
}

// Shimmering Skeleton loader component
const SkeletonCard = () => (
  <div className="flex flex-col bg-[#15151D] rounded-2xl overflow-hidden border border-[#262638] animate-pulse">
    <div className="relative w-full aspect-[3/4] bg-[#1A1A24]">
      <div className="absolute top-3 left-3 w-16 h-5 rounded-md bg-[#262638]" />
      <div className="absolute top-3 right-3 w-10 h-5 rounded-md bg-[#262638]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
    </div>
    <div className="p-4 flex flex-col gap-3">
      <div className="w-20 h-3 rounded bg-[#262638]" />
      <div className="w-3/4 h-5 rounded bg-[#262638]" />
      <div className="w-full h-3 rounded bg-[#262638]/60" />
      <div className="pt-3 border-t border-[#262638] flex items-center justify-between">
        <div className="w-14 h-5 rounded bg-[#262638]" />
        <div className="w-16 h-8 rounded-xl bg-[#262638]" />
      </div>
    </div>
  </div>
);

export const GameGrid = ({
  games,
  totalGamesCount,
  selectedGenre,
  searchQuery,
  onResetFilters,
  onSelectGame,
  isLoading = false,
  sortBy,
  onSortChange,
  platformFilter,
  onPlatformFilterChange,
  onClearGenre,
  onClearSearch,
}: GameGridProps) => {
  const isFiltered =
    selectedGenre !== 'All Games' ||
    searchQuery.trim().length > 0 ||
    platformFilter !== 'all';

  // Apply sorting
  const sortedGames = useMemo(() => {
    return [...games].sort((a, b) => {
      switch (sortBy) {
        case 'rating-desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'year-desc':
          return b.releaseYear - a.releaseYear;
        case 'price-asc':
          return parsePrice(a.price) - parsePrice(b.price);
        case 'price-desc':
          return parsePrice(b.price) - parsePrice(a.price);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'featured':
        default:
          if (Boolean(b.featured) !== Boolean(a.featured)) {
            return b.featured ? 1 : -1;
          }
          return (b.rating || 0) - (a.rating || 0);
      }
    });
  }, [games, sortBy]);

  return (
    <div className="w-full">
      {/* Header Results & Controls Bar */}
      <div className="flex flex-col gap-4 mb-6 pb-4 border-b border-[#262638]">
        
        {/* Top Row: Title, Count, Platform selector and Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#15151D] border border-[#262638] text-[#22D3EE] shadow-sm">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#F4F4F5] tracking-tight flex items-center gap-2">
                <span>
                  {selectedGenre === 'All Games' ? 'All PlayStation Games' : `${selectedGenre} Games`}
                </span>
                {platformFilter !== 'all' && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 font-bold">
                    {platformFilter}
                  </span>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA]">
                Showing <span className="font-bold text-[#F4F4F5]">{sortedGames.length}</span> of {totalGamesCount} available games
                {searchQuery.trim() && (
                  <span> matching <strong className="text-[#22D3EE]">"{searchQuery}"</strong></span>
                )}
              </p>
            </div>
          </div>

          {/* Right Controls: Platform Filters & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Platform Quick Filter Pills */}
            <div className="flex items-center p-1 rounded-xl bg-[#15151D] border border-[#262638]">
              {(['all', 'PS5', 'PS4'] as const).map((plat) => (
                <button
                  key={plat}
                  type="button"
                  onClick={() => onPlatformFilterChange(plat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    platformFilter === plat
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-sm'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                  }`}
                >
                  {plat === 'all' ? 'All Platforms' : plat}
                </button>
              ))}
            </div>

            {/* Sorting Dropdown */}
            <div className="relative flex items-center">
              <div className="absolute left-3 text-[#A1A1AA] pointer-events-none">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#38BDF8]" />
              </div>
              <select
                aria-label="Sort games"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="pl-8 pr-8 py-2 rounded-xl bg-[#15151D] hover:bg-[#1C1C27] border border-[#262638] text-xs font-semibold text-[#F4F4F5] focus:border-[#38BDF8] outline-none transition-all cursor-pointer appearance-none shadow-sm"
              >
                <option value="featured">Featured / Popular</option>
                <option value="rating-desc">Highest Rated (★)</option>
                <option value="year-desc">Newest Released</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title-asc">Title: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Row: Active Filter Chips */}
        {isFiltered && (
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <span className="text-xs text-[#71717A] flex items-center gap-1 font-medium">
              <Filter className="w-3 h-3 text-[#38BDF8]" />
              Active Filters:
            </span>

            {selectedGenre !== 'All Games' && onClearGenre && (
              <button
                type="button"
                onClick={onClearGenre}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1C1C27] border border-[#262638] text-xs text-[#F4F4F5] hover:border-[#38BDF8] transition-colors"
              >
                <span>Genre: {selectedGenre}</span>
                <X className="w-3 h-3 text-[#A1A1AA]" />
              </button>
            )}

            {platformFilter !== 'all' && (
              <button
                type="button"
                onClick={() => onPlatformFilterChange('all')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1C1C27] border border-[#262638] text-xs text-[#F4F4F5] hover:border-[#38BDF8] transition-colors"
              >
                <span>Platform: {platformFilter}</span>
                <X className="w-3 h-3 text-[#A1A1AA]" />
              </button>
            )}

            {searchQuery.trim() && onClearSearch && (
              <button
                type="button"
                onClick={onClearSearch}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1C1C27] border border-[#262638] text-xs text-[#F4F4F5] hover:border-[#38BDF8] transition-colors"
              >
                <span>Search: "{searchQuery}"</span>
                <X className="w-3 h-3 text-[#A1A1AA]" />
              </button>
            )}

            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-[#38BDF8] hover:underline font-semibold ml-2 cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>

      {/* Loading Skeleton State: Only shown if no games are available yet */}
      {isLoading && sortedGames.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : sortedGames.length === 0 ? (
        /* Empty State when no games match */
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-[#15151D] border border-[#262638] rounded-3xl my-6">
          <div className="w-16 h-16 rounded-2xl bg-[#262638]/50 flex items-center justify-center text-[#38BDF8] mb-4 border border-[#38BDF8]/30 shadow-md">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#F4F4F5] mb-2">
            No games found
          </h3>
          <p className="text-sm text-[#A1A1AA] max-w-md mb-6 leading-relaxed">
            {searchQuery.trim() ? (
              <>
                No titles in <strong className="text-[#F4F4F5]">{selectedGenre}</strong> match{' '}
                <strong className="text-[#22D3EE]">"{searchQuery}"</strong>. Try checking your spelling or adjusting your filters.
              </>
            ) : (
              <>No titles found matching the current filters. Try selecting another genre or platform.</>
            )}
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white font-bold text-sm hover:from-[#0369A1] hover:to-[#0EA5E9] shadow-lg shadow-[#38BDF8]/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        /* Game Grid: Responsive 1 col mobile, 2 col sm, 3 col md, 4 col lg */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedGames.map((game) => (
            <GameCard key={game.id} game={game} onSelectGame={onSelectGame} />
          ))}
        </div>
      )}
    </div>
  );
};
