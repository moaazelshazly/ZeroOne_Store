import { useState } from 'react';
import { Globe, RefreshCw, Sparkles, Layers, Key, Check } from 'lucide-react';

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

  const handleSave = () => {
    if (onSaveApiKey) {
      onSaveApiKey(apiKeyInput.trim());
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        setShowKeyModal(false);
      }, 1200);
    }
  };

  return (
    <div className="w-full bg-[#15151D] border border-[#262638] rounded-2xl p-4 mb-6 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Left: Source Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">
            <Layers className="w-4 h-4 text-[#38BDF8]" />
            <span>Catalog Source:</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0B0B10] p-1 rounded-xl border border-[#262638] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onSourceFilterChange('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                sourceFilter === 'all'
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-md shadow-[#38BDF8]/20'
                  : 'text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#1C1C27]'
              }`}
            >
              <span>All Titles</span>
              <span className="text-[10px] min-w-[1.25rem] text-center inline-block tabular-nums px-1.5 py-0.5 rounded-full bg-black/40 text-white font-bold">
                {totalGamesCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onSourceFilterChange('ps-curated')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                sourceFilter === 'ps-curated'
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-md shadow-[#38BDF8]/20'
                  : 'text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#1C1C27]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#22D3EE]" />
              <span>PS Exclusives</span>
              <span className="text-[10px] min-w-[1.25rem] text-center inline-block tabular-nums px-1.5 py-0.5 rounded-full bg-black/40 text-white font-bold">
                {curatedGamesCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onSourceFilterChange('external-api')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                sourceFilter === 'external-api'
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-md shadow-[#38BDF8]/20'
                  : 'text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#1C1C27]'
              }`}
            >
              <Globe className="w-3 h-3 text-[#38BDF8]" />
              <span>Live API</span>
              <span className="text-[10px] min-w-[1.25rem] text-center inline-block tabular-nums px-1.5 py-0.5 rounded-full bg-black/40 text-white font-bold">
                {externalGamesCount}
              </span>
            </button>
          </div>
        </div>

        {/* Right: Live Connection Status & Refresh Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#262638]">
          {/* Live Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B0B10] border border-[#262638] text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[#A1A1AA]">
              API: <strong className="text-[#38BDF8] capitalize">{apiProvider}</strong>
            </span>
            <span className="text-[#71717A]">•</span>
            <span className="text-emerald-400 font-semibold">Live & Synced</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Sync / Refresh Button */}
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh game data from external API"
              className="p-2 rounded-xl bg-[#0B0B10] hover:bg-[#1C1C27] text-[#A1A1AA] hover:text-[#38BDF8] border border-[#262638] hover:border-[#38BDF8]/40 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#38BDF8]' : ''}`} />
            </button>

            {/* Optional Custom API Key Button */}
            <button
              type="button"
              onClick={() => setShowKeyModal(true)}
              title="Configure external API provider or RAWG Key"
              className="px-2.5 py-1.5 rounded-xl bg-[#0B0B10] hover:bg-[#1C1C27] text-[#A1A1AA] hover:text-[#F4F4F5] border border-[#262638] hover:border-[#38BDF8]/40 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="hidden sm:inline">API Config</span>
            </button>
          </div>
        </div>

      </div>

      {/* Modal for Custom RAWG Key / API Info */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#15151D] border border-[#262638] rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#F4F4F5] mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#38BDF8]" />
              External Games API Settings
            </h3>
            
            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
              By default, Zerone connects to the <strong className="text-white">FreeToGame Public API</strong> (no key needed, 100% free with 400+ games).
              <br /><br />
              Optionally enter a free <strong className="text-[#38BDF8]">RAWG API Key</strong> to fetch PlayStation catalog directly from RAWG.io database.
            </p>

            <div className="space-y-3 mb-6">
              <label htmlFor="rawg-key-input" className="block text-xs font-bold uppercase text-[#A1A1AA]">
                RAWG API Key (Optional)
              </label>
              <input
                id="rawg-key-input"
                type="text"
                placeholder="Leave blank for default FreeToGame API"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B10] border border-[#262638] text-sm text-[#F4F4F5] placeholder-[#71717A] focus:border-[#38BDF8] outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl bg-[#0B0B10] hover:bg-[#1C1C27] border border-[#262638] text-xs font-semibold text-[#A1A1AA] hover:text-white"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#38BDF8]/20"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Apply & Sync</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
