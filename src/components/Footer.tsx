import type { Genre } from '../types/game';
import { GENRES } from '../data/games';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectGenre: (genre: Genre) => void;
  onScrollToTop: () => void;
}

export const Footer = ({ onSelectGenre, onScrollToTop }: FooterProps) => {
  return (
    <footer className="w-full bg-[#0D0D14] border-t border-[#262638] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#15151D] border border-[#262638] flex items-center justify-center p-0.5 shadow-md">
                <img
                  src="/TRY.jpg"
                  alt="ZEROONE Emblem"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F4F4F5] via-[#38BDF8] to-[#22D3EE]">
                ZEROONE
              </span>
            </div>
            
            <p className="text-sm text-[#A1A1AA] max-w-md leading-relaxed">
              ZEROONE’s dedicated PlayStation games catalog. Discover high-caliber PS5 and PS4 adventures, filtered by genre with precision and style.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#71717A]">
              <span>PS5 Pro Ready</span>
              <span>•</span>
              <span>DualSense Wireless</span>
              <span>•</span>
              <span>4K 60FPS</span>
            </div>
          </div>

          {/* Popular Genres Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F5] mb-4">
              Explore Genres
            </h4>
            <ul className="space-y-2 text-sm">
              {GENRES.slice(1, 6).map((genre) => (
                <li key={genre}>
                  <button
                    onClick={() => {
                      onSelectGenre(genre);
                      const catalogEl = document.getElementById('catalog');
                      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[#A1A1AA] hover:text-[#22D3EE] transition-colors"
                  >
                    {genre}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Genres Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4F4F5] mb-4">
              More Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {GENRES.slice(6).map((genre) => (
                <li key={genre}>
                  <button
                    onClick={() => {
                      onSelectGenre(genre);
                      const catalogEl = document.getElementById('catalog');
                      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[#A1A1AA] hover:text-[#38BDF8] transition-colors"
                  >
                    {genre}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-[#262638] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>
            © {new Date().getFullYear()} ZEROONE — PlayStation Games Store. All rights reserved.
          </p>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#15151D] hover:bg-[#262638] text-[#A1A1AA] hover:text-[#F4F4F5] border border-[#262638] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
