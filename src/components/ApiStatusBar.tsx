import { useState, useEffect } from 'react';
import { 
  Globe, 
  RefreshCw, 
  Sparkles, 
  Layers, 
  Key, 
  Check, 
  X, 
  CheckCircle2, 
  Zap, 
  HelpCircle 
} from 'lucide-react';

export type CatalogSourceFilter = 'all' | 'ps-curated' | 'external-api';

interface ApiStatusBarProps {
  sourceFilter: CatalogSourceFilter;
  onSourceFilterChange: (filter: CatalogSourceFilter) => void;
  isLoading: boolean;
  onRefresh: () => void;
  apiProvider: string;
  externalGamesCount: number;
  curatedGamesCount: number;
  totalGamesCount: number;
  onSaveApiKey?: (key: string) => void;
  currentApiKey?: string;
}

export const ApiStatusBar = ({
  sourceFilter,
  onSourceFilterChange,
  isLoading,
  onRefresh,
  apiProvider,
  externalGamesCount,
  curatedGamesCount,
  totalGamesCount,
  onSaveApiKey,
  currentApiKey = '',
}: ApiStatusBarProps) => {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(currentApiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state if currentApiKey prop updates
  useEffect(() => {
    setApiKeyInput(currentApiKey);
  }, [currentApiKey]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showKeyModal) {
        setShowKeyModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showKeyModal]);

  const handleSave = () => {
    if (onSaveApiKey) {
      onSaveApiKey(apiKeyInput.trim());
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        setShowKeyModal(false);
      }, 1000);
    }
  };

  const handleClearKey = () => {
    setApiKeyInput('');
    if (onSaveApiKey) {
      onSaveApiKey('');
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        setShowKeyModal(false);
      }, 1000);
    }
  };

  // Helper description text based on current filter
  const getFilterDescription = () => {
    switch (sourceFilter) {
      case 'ps-curated':
        return `Showing ${curatedGamesCount} curated PlayStation exclusives & flagship blockbusters`;
      case 'external-api':
        return `Showing ${externalGamesCount} live synchronized titles from ${apiProvider.toUpperCase()} feed`;
      case 'all':
      default:
        return `Showing all ${totalGamesCount} PlayStation catalog titles (Curated + Live API)`;
    }
  };

  return (
    <div className="w-full relative bg-gradient-to-b from-[#161622] via-[#12121A] to-[#0E0E15] border border-[#262638] hover:border-[#38BDF8]/30 transition-colors rounded-2xl p-3.5 sm:p-4.5 mb-6 shadow-xl shadow-black/40 backdrop-blur-md">
      {/* Top subtle cyan accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent" />

      {/* Main Responsive Layout */}
      <div className="flex flex-col gap-3.5">
        
        {/* Row 1 on mobile / Left + Right on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Catalog Source Label & Filter Segmented Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5">
            {/* Header label */}
            <div className="flex items-center justify-between sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#38BDF8]" />
                <span className="text-white">Catalog Source</span>
              </div>

              {/* Mobile-only compact status badge */}
              <div className="sm:hidden flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0B0B10] border border-[#262638] text-[11px]">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLoading ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isLoading ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                </span>
                <span className="text-[#38BDF8] font-semibold capitalize">{apiProvider}</span>
              </div>
            </div>

            {/* Segmented Filter Pills */}
            <div 
              role="tablist" 
              aria-label="Filter catalog source"
              className="grid grid-cols-3 sm:flex sm:items-center gap-1 sm:gap-1.5 p-1 bg-[#09090E] rounded-xl border border-[#262638] shadow-inner"
            >
              {/* Button 1: All Titles */}
              <button
                type="button"
                role="tab"
                aria-selected={sourceFilter === 'all'}
                onClick={() => onSourceFilterChange('all')}
                className={`flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  sourceFilter === 'all'
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-md shadow-[#38BDF8]/30 font-bold'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#151520]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 shrink-0 hidden xs:inline" />
                <span className="truncate">
                  <span className="sm:inline hidden">All Titles</span>
                  <span className="sm:hidden">All</span>
                </span>
                <span className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                  sourceFilter === 'all' 
                    ? 'bg-black/35 text-white' 
                    : 'bg-[#1A1A26] text-[#71717A]'
                }`}>
                  {totalGamesCount}
                </span>
              </button>

              {/* Button 2: PS Exclusives */}
              <button
                type="button"
                role="tab"
                aria-selected={sourceFilter === 'ps-curated'}
                onClick={() => onSourceFilterChange('ps-curated')}
                className={`flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  sourceFilter === 'ps-curated'
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-md shadow-[#38BDF8]/30 font-bold'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#151520]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0 hidden xs:inline text-[#22D3EE]" />
                <span className="truncate">
                  <span className="sm:inline hidden">PS Exclusives</span>
                  <span className="sm:hidden">Exclusives</span>
                </span>
                <span className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                  sourceFilter === 'ps-curated' 
                    ? 'bg-black/35 text-white' 
                    : 'bg-[#1A1A26] text-[#71717A]'
                }`}>
                  {curatedGamesCount}
                </span>
              </button>

              {/* Button 3: Live API */}
              <button
                type="button"
                role="tab"
                aria-selected={sourceFilter === 'external-api'}
                onClick={() => onSourceFilterChange('external-api')}
                className={`flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  sourceFilter === 'external-api'
                    ? 'bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-md shadow-[#38BDF8]/30 font-bold'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#151520]'
                }`}
              >
                <Globe className="w-3.5 h-3.5 shrink-0 hidden xs:inline text-[#38BDF8]" />
                <span className="truncate">
                  <span className="sm:inline hidden">Live API</span>
                  <span className="sm:hidden">Live API</span>
                </span>
                <span className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                  sourceFilter === 'external-api' 
                    ? 'bg-black/35 text-white' 
                    : 'bg-[#1A1A26] text-[#71717A]'
                }`}>
                  {externalGamesCount}
                </span>
              </button>
            </div>
          </div>

          {/* Right: Status Pill & Action Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-1.5 lg:pt-0 border-t lg:border-t-0 border-[#262638]/70">
            {/* Desktop Status Pill */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B0B10] border border-[#262638] text-xs">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLoading ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLoading ? 'bg-amber-500' : 'bg-emerald-500'}`} />
              </span>
              <span className="text-[#94A3B8]">
                Feed: <strong className="text-[#38BDF8] capitalize">{apiProvider}</strong>
              </span>
              <span className="text-[#71717A]">•</span>
              <span className={isLoading ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                {isLoading ? 'Syncing...' : 'Live & Synced'}
              </span>
            </div>

            {/* Quick Actions (Refresh + Config) */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onRefresh}
                disabled={isLoading}
                title="Refresh games from external live API"
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0B10] hover:bg-[#1C1C29] text-[#94A3B8] hover:text-[#38BDF8] border border-[#262638] hover:border-[#38BDF8]/40 text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#38BDF8]' : ''}`} />
                <span className="text-xs">Sync</span>
              </button>

              <button
                type="button"
                onClick={() => setShowKeyModal(true)}
                title="Configure external API provider or RAWG Key"
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0B10] hover:bg-[#1C1C29] text-[#94A3B8] hover:text-[#F1F5F9] border border-[#262638] hover:border-[#38BDF8]/40 text-xs font-semibold transition-all duration-200 cursor-pointer"
              >
                <Key className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="text-xs">API Config</span>
              </button>
            </div>

          </div>

        </div>

        {/* Row 2: Subtitle Context Bar */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#94A3B8] pt-2 border-t border-[#262638]/50">
          <div className="flex items-center gap-1.5 truncate">
            <Zap className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span className="truncate">{getFilterDescription()}</span>
          </div>
          <span className="hidden md:inline text-[#64748B] shrink-0">
            DualSense™ & 4K Ready
          </span>
        </div>

      </div>

      {/* Modern Accessible API Configuration Modal */}
      {showKeyModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowKeyModal(false)}
        >
          <div 
            className="w-full max-w-lg bg-gradient-to-b from-[#181824] to-[#12121A] border border-[#2E2E44] rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#262638]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    External API Settings
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    Configure live PlayStation catalog sources
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#262638] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="space-y-4 mb-6">
              <div className="p-3 rounded-xl bg-[#0B0B10] border border-[#262638] text-xs text-[#94A3B8] leading-relaxed">
                <div className="flex items-center gap-1.5 text-white font-semibold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Default Free API Active</span>
                </div>
                Zerone automatically connects to the <strong className="text-white">FreeToGame API</strong> (no key needed, 100% free with cross-platform PlayStation titles).
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="rawg-key-input" className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] flex items-center gap-1">
                    <span>Optional RAWG.io API Key</span>
                    <HelpCircle className="w-3 h-3 text-[#71717A]" />
                  </label>
                  {apiKeyInput && (
                    <button
                      type="button"
                      onClick={handleClearKey}
                      className="text-[11px] text-[#38BDF8] hover:underline cursor-pointer"
                    >
                      Clear Key
                    </button>
                  )}
                </div>

                <input
                  id="rawg-key-input"
                  type="text"
                  placeholder="Paste RAWG API key or leave blank for FreeToGame"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090E] border border-[#262638] text-sm text-[#F4F4F5] placeholder-[#64748B] focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] outline-none transition-all"
                />
                <p className="text-[11px] text-[#64748B] mt-1.5">
                  Get a free key at <a href="https://rawg.io/apidocs" target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">rawg.io/apidocs</a> to query the official RAWG database directly.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#262638]">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl bg-[#0B0B10] hover:bg-[#1C1C29] border border-[#262638] text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0EA5E9] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#38BDF8]/25 transition-all cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Apply & Refresh</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
