import type { Genre } from '../types/game';
import { GENRES } from '../data/games';
import { SlidersHorizontal } from 'lucide-react';

interface GenreFiltersProps {
  selectedGenre: Genre;
  onSelectGenre: (genre: Genre) => void;
  genreCounts?: Record<string, number>;
}

export const GenreFilters = ({
  selectedGenre,
  onSelectGenre,
  genreCounts,
}: GenreFiltersProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal className="w-4 h-4 text-[#38BDF8]" />
        <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
          Filter by Genre
        </span>
      </div>

      {/* Horizontally scrollable pills on mobile, wrapped on larger screens */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap hide-scrollbar scroll-smooth min-h-[44px]">
        {GENRES.map((genre) => {
          const isSelected = selectedGenre === genre;
          const count = genreCounts ? genreCounts[genre] : undefined;

          return (
            <button
              key={genre}
              type="button"
              onClick={() => onSelectGenre(genre)}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white border-[#38BDF8] shadow-md shadow-[#38BDF8]/30 scale-[1.02]'
                  : 'bg-[#15151D] text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#1E1E2A] border-[#262638] hover:border-[#3B3B52]'
              }`}
            >
              <span>{genre}</span>
              {typeof count === 'number' && (
                <span
                  className={`text-[10px] min-w-[1.25rem] text-center inline-block tabular-nums font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                    isSelected
                      ? 'bg-black/30 text-white'
                      : 'bg-[#262638] text-[#A1A1AA]'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
