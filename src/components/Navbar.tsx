import { useState } from 'react';
import { Menu, X, Gamepad2, Compass } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchClear: () => void;
  onNavigateHome: () => void;
  onNavigateGames: () => void;
}

export const Navbar = ({
  searchQuery,
  onSearchChange,
  onSearchClear,
  onNavigateHome,
  onNavigateGames,
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
              aria-label="Level Up Store Home"
            >
              {/* Logo Emblem with Animated Neon Halo */}
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[#15151D] border border-[#262638] flex items-center justify-center p-0.5 group-hover:border-[#38BDF8] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300 shadow-md">
                <img
                  src={`${import.meta.env.BASE_URL}TRY.jpg`}
                  alt="ZEROONE Emblem"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to icon if logo image fails
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#38BDF8]/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#22D3EE]/60 transition-colors" />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F4F4F5] via-[#38BDF8] to-[#22D3EE] group-hover:from-[#38BDF8] group-hover:to-[#22D3EE] transition-all">
                    ZEROONE
                  </span>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest px-1.5 py-0.5 rounded bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30 group-hover:border-[#22D3EE] transition-colors">
                    PS
                  </span>
                </div>
                <span className="text-[11px] font-medium tracking-wider text-[#A1A1AA] uppercase">
                  PlayStation Games Store
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              onClear={onSearchClear}
              placeholder="Search games by title..."
              id="navbar-desktop-search"
            />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Main Navigation">
            <button
              onClick={onNavigateHome}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-[#F4F4F5] hover:text-white hover:bg-[#15151D] transition-all flex items-center gap-2 border border-transparent hover:border-[#262638] group cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#22D3EE] group-hover:rotate-45 transition-transform duration-300" />
              <span>Home</span>
            </button>
            <button
              onClick={onNavigateGames}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-[#F4F4F5] hover:text-white hover:bg-[#15151D] transition-all flex items-center gap-2 border border-transparent hover:border-[#262638] group cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4 text-[#38BDF8] group-hover:scale-125 transition-transform duration-300" />
              <span>Games</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#15151D] border border-[#262638] text-[#F4F4F5] hover:border-[#38BDF8] focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#22D3EE]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#262638] space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Mobile Search */}
            <div className="px-1">
              <SearchBar
                value={searchQuery}
                onChange={onSearchChange}
                onClear={onSearchClear}
                placeholder="Search games..."
                id="navbar-mobile-search"
              />
            </div>

            {/* Mobile Links */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  onNavigateHome();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#15151D] border border-[#262638] text-sm font-semibold text-[#F4F4F5] hover:border-[#22D3EE] transition-colors"
              >
                <Compass className="w-4 h-4 text-[#22D3EE]" />
                Home
              </button>
              <button
                onClick={() => {
                  onNavigateGames();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#15151D] border border-[#262638] text-sm font-semibold text-[#F4F4F5] hover:border-[#38BDF8] transition-colors"
              >
                <Gamepad2 className="w-4 h-4 text-[#38BDF8]" />
                Games
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
