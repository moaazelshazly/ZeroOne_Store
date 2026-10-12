import { useMemo, useEffect, useState, useCallback } from 'react';
import { HashRouter, Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GenreFilters } from './components/GenreFilters';
import { GameGrid, type SortOption, type PlatformFilter } from './components/GameGrid';
import { GameDetailsModal } from './components/GameDetailsModal';
import { ApiStatusBar, type CatalogSourceFilter } from './components/ApiStatusBar';
import { Footer } from './components/Footer';
import { GAMES, GENRES } from './data/games';
import { fetchExternalGames, getCachedExternalGames, type ApiProvider } from './services/gameApi';
import type { Genre, Game } from './types/game';

function StorePage({ scrollToCatalogOnMount = false }: { scrollToCatalogOnMount?: boolean }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // External API state initialized with cached data if available (eliminates CLS)
  const [externalGames, setExternalGames] = useState<Game[]>(() => getCachedExternalGames());
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiProvider, setApiProvider] = useState<ApiProvider>('freetogame');
  const [sourceFilter, setSourceFilter] = useState<CatalogSourceFilter>('all');
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('zerone_rawg_api_key') || '';
  });

  // Fetch external games from API
  const loadExternalGames = useCallback(async (forceRefresh = false) => {
    setApiLoading(true);
    try {
      const result = await fetchExternalGames({
        apiKey: apiKey.trim() || undefined,
        forceRefresh,
      });
      setExternalGames(result.games);
      setApiProvider(result.provider);
    } catch (err) {
      console.error('Failed to load games from external API:', err);
    } finally {
      setApiLoading(false);
    }
  }, [apiKey]);

  // Initial fetch on mount
  useEffect(() => {
    loadExternalGames(false);
  }, [loadExternalGames]);

  // Combine curated local games and external API games, avoiding duplicate titles
  const combinedGames = useMemo<Game[]>(() => {
    const existingTitles = new Set(GAMES.map((g) => g.title.toLowerCase()));
    const uniqueExternal = externalGames.filter(
      (g) => !existingTitles.has(g.title.toLowerCase())
    );
    return [...GAMES, ...uniqueExternal];
  }, [externalGames]);

  // Active catalog based on the selected catalog source filter
  const activeCatalog = useMemo<Game[]>(() => {
    if (sourceFilter === 'ps-curated') {
      return GAMES;
    }
    if (sourceFilter === 'external-api') {
      return externalGames.length > 0 ? externalGames : GAMES;
    }
    return combinedGames;
  }, [sourceFilter, externalGames, combinedGames]);

  // Read genre from query params or default to 'All Games'
  const rawGenre = searchParams.get('genre') || 'All Games';
  const selectedGenre: Genre = (GENRES.includes(rawGenre as Genre) ? rawGenre : 'All Games') as Genre;
  
  // Read search query from query params
  const searchQuery = searchParams.get('search') || '';

  // Read active game for details modal from query params (searched across all combined games)
  const activeGameId = searchParams.get('game');
  const activeGame = useMemo(() => {
    if (!activeGameId) return null;
    return combinedGames.find((g) => g.id === activeGameId) || null;
  }, [activeGameId, combinedGames]);

  // Handle auto-scroll if requested
  useEffect(() => {
    if (scrollToCatalogOnMount) {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [scrollToCatalogOnMount]);

  // Update URL params helper
  const updateParams = (newGenre: Genre, newSearch: string, newGameId?: string | null) => {
    const params = new URLSearchParams();
    if (newGenre !== 'All Games') {
      params.set('genre', newGenre);
    }
    if (newSearch.trim()) {
      params.set('search', newSearch.trim());
    }
    
    // Manage modal game parameter
    const targetGameId = newGameId !== undefined ? newGameId : activeGameId;
    if (targetGameId) {
      params.set('game', targetGameId);
    }

    setSearchParams(params, { replace: true });
  };

  const handleSelectGenre = (genre: Genre) => {
    updateParams(genre, searchQuery);
  };

  const handleSearchChange = (query: string) => {
    updateParams(selectedGenre, query);
  };

  const handleSearchClear = () => {
    updateParams(selectedGenre, '');
  };

  // Sorting and Platform filter state
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all');

  const handleResetFilters = () => {
    updateParams('All Games', '');
    setPlatformFilter('all');
    setSortBy('featured');
  };

  const handleSelectGame = (game: Game) => {
    updateParams(selectedGenre, searchQuery, game.id);
  };

  const handleCloseModal = () => {
    updateParams(selectedGenre, searchQuery, null);
  };

  const handleNavigateHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateGames = () => {
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/games');
    }
  };

  // Derive genre counts dynamically from active catalog
  const genreCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Games': activeCatalog.length,
    };
    for (const game of activeCatalog) {
      counts[game.genre] = (counts[game.genre] || 0) + 1;
    }
    return counts;
  }, [activeCatalog]);

  // Derive filtered games list with genre, search, and platform filtering
  const filteredGames = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return activeCatalog.filter((game) => {
      const matchesGenre =
        selectedGenre === 'All Games' || game.genre === selectedGenre;
      const matchesSearch =
        !query || game.title.toLowerCase().includes(query);
      const matchesPlatform =
        platformFilter === 'all' || game.platforms.includes(platformFilter);
      return matchesGenre && matchesSearch && matchesPlatform;
    });
  }, [activeCatalog, selectedGenre, searchQuery, platformFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B10] text-[#F4F4F5]">
      {/* Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchClear={handleSearchClear}
        onNavigateHome={handleNavigateHome}
        onNavigateGames={handleNavigateGames}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={handleNavigateGames}
          totalGamesCount={combinedGames.length}
          onTrendingClick={(trend) => {
            handleSearchChange(trend);
            handleNavigateGames();
          }}
        />

        {/* Catalog Section */}
        <section
          id="catalog"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 scroll-mt-24"
        >
          {/* External API Status & Catalog Source Filter Bar */}
          <ApiStatusBar
            sourceFilter={sourceFilter}
            onSourceFilterChange={setSourceFilter}
            isLoading={apiLoading}
            onRefresh={() => loadExternalGames(true)}
            apiProvider={apiProvider}
            externalGamesCount={externalGames.length}
            curatedGamesCount={GAMES.length}
            totalGamesCount={combinedGames.length}
            currentApiKey={apiKey}
            onSaveApiKey={(newKey) => {
              setApiKey(newKey);
              if (newKey) {
                localStorage.setItem('zerone_rawg_api_key', newKey);
              } else {
                localStorage.removeItem('zerone_rawg_api_key');
              }
              setTimeout(() => loadExternalGames(true), 50);
            }}
          />

          {/* Genre Filters Bar */}
          <div className="mb-8">
            <GenreFilters
              selectedGenre={selectedGenre}
              onSelectGenre={handleSelectGenre}
              genreCounts={genreCounts}
            />
          </div>

          {/* Games Grid and Status Bar */}
          <GameGrid
            games={filteredGames}
            totalGamesCount={activeCatalog.length}
            selectedGenre={selectedGenre}
            searchQuery={searchQuery}
            onResetFilters={handleResetFilters}
            onSelectGame={handleSelectGame}
            isLoading={apiLoading}
            sortBy={sortBy}
            onSortChange={setSortBy}
            platformFilter={platformFilter}
            onPlatformFilterChange={setPlatformFilter}
            onClearGenre={() => handleSelectGenre('All Games')}
            onClearSearch={handleSearchClear}
          />
        </section>
      </main>

      {/* Game Details Modal with WhatsApp Buy */}
      <GameDetailsModal
        game={activeGame}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <Footer
        onSelectGenre={handleSelectGenre}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/games" element={<StorePage scrollToCatalogOnMount={true} />} />
        <Route path="*" element={<StorePage />} />
      </Routes>
    </HashRouter>
  );
}
