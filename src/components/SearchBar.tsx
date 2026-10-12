import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search PlayStation games by title...',
  className = '',
  id = 'game-search-input',
}: SearchBarProps) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      {/* Search Icon */}
      <div className="absolute left-3.5 text-[#A1A1AA] pointer-events-none transition-colors group-focus-within:text-[#22D3EE]">
        <Search className="w-4 h-4" />
      </div>

      {/* Input Field */}
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search games"
        className="w-full pl-10 pr-10 py-2.5 bg-[#15151D] text-[#F4F4F5] placeholder-[#71717A] text-sm rounded-xl border border-[#262638] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 outline-none transition-all duration-200 shadow-inner"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClear();
          }
        }}
      />

      {/* Clear Button */}
      {value.trim().length > 0 && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search input"
          className="absolute right-3 p-1 rounded-lg text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#262638] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
