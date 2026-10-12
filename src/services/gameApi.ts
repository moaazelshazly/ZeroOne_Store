import type { Game, Genre } from '../types/game';
import { GAMES as CURATED_GAMES } from '../data/games';

export type ApiProvider = 'freetogame' | 'rawg';

interface FreeToGameItem {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
}

interface RawgItem {
  id: number;
  name: string;
  background_image: string | null;
  rating: number;
  released: string;
  genres: Array<{ name: string }>;
  platforms?: Array<{ platform: { id: number; name: string } }>;
}

// Map various API genres into our curated store genres
function normalizeGenre(rawGenre: string): Exclude<Genre, 'All Games'> {
  const normalized = rawGenre.trim().toLowerCase();

  if (normalized.includes('shoot') || normalized.includes('battle royale')) {
    return 'Shooter';
  }
  if (normalized.includes('fight')) {
    return 'Fighting';
  }
  if (
    normalized.includes('rpg') ||
    normalized.includes('role') ||
    normalized.includes('dungeon') ||
    normalized.includes('fantasy')
  ) {
    return 'RPG';
  }
  if (normalized.includes('race') || normalized.includes('racing')) {
    return 'Racing';
  }
  if (normalized.includes('sport')) {
    return 'Sports';
  }
  if (
    normalized.includes('strategy') ||
    normalized.includes('tact') ||
    normalized.includes('card')
  ) {
    return 'Strategy';
  }
  if (normalized.includes('horror') || normalized.includes('survival')) {
    return 'Horror';
  }
  if (normalized.includes('advent') || normalized.includes('puzzle')) {
    return 'Adventure';
  }

  return 'Action';
}

// Generate realistic PlayStation pricing and ratings for external games
function generatePriceAndRating(id: number): { price: string; rating: number } {
  // Deterministic pseudo-random generation based on id
  const prices = ['$59.99', '$69.99', '$49.99', '$39.99', '$29.99', 'Free-to-Play'];
  const priceIndex = id % prices.length;
  const rating = +(4.2 + ((id % 8) * 0.1)).toFixed(1);
  return { price: prices[priceIndex], rating: Math.min(rating, 5.0) };
}

// In-memory and session cache to prevent repeated external network hits & eliminate CLS
let cachedExternalGames: Game[] | null = null;

export function getCachedExternalGames(): Game[] {
  if (cachedExternalGames) return cachedExternalGames;
  try {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem('zerone_cached_ext_games') : null;
    if (saved) {
      cachedExternalGames = JSON.parse(saved);
      return cachedExternalGames || [];
    }
  } catch {
    // Ignore storage parse issues
  }
  return [];
}

/**
 * Fetch games from FreeToGame API (No API Key required)
 */
async function fetchFromFreeToGame(): Promise<Game[]> {
  // Try proxy first (avoids CORS during dev), then fallback to direct URL
  const endpoints = ['/api/freetogame/games', 'https://www.freetogame.com/api/games'];

  let data: FreeToGameItem[] | null = null;

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        data = await response.json();
        break;
      }
    } catch {
      // Try next endpoint
    }
  }

  if (!data || !Array.isArray(data)) {
    throw new Error('Unable to retrieve games from FreeToGame API');
  }

  // Transform and map to PlayStation Store Game format
  return data.slice(0, 60).map((item) => {
    const { price, rating } = generatePriceAndRating(item.id);
    const releaseYear = item.release_date
      ? new Date(item.release_date).getFullYear() || 2023
      : 2023;

    // Distribute platform tags across PS5 & PS4
    const platforms: ('PS5' | 'PS4')[] =
      item.id % 3 === 0 ? ['PS5'] : ['PS5', 'PS4'];

    return {
      id: `ext-ftg-${item.id}`,
      title: item.title,
      genre: normalizeGenre(item.genre),
      platforms,
      releaseYear,
      coverImage: item.thumbnail,
      price,
      rating,
      featured: item.id % 7 === 0,
      shortDescription: item.short_description,
      description: `${item.short_description} Developed by ${item.developer} and published by ${item.publisher}.`,
      developer: item.developer,
      publisher: item.publisher,
      apiSource: 'external' as const,
      externalUrl: item.game_url,
      features: [
        'DualSense™ Adaptive Triggers Support',
        'Tempest 3D AudioTech',
        'Enhanced 60 FPS Performance Mode',
        'High-Speed PlayStation SSD Optimization',
      ],
    };
  });
}

/**
 * Fetch games from RAWG API (Uses RAWG API key if provided)
 */
async function fetchFromRawg(apiKey: string): Promise<Game[]> {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&platforms=187,18&page_size=40`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`RAWG API returned status ${response.status}`);
  }

  const json = await response.json();
  const results: RawgItem[] = json.results || [];

  return results.map((item) => {
    const rawGenre = item.genres?.[0]?.name || 'Action';
    const releaseYear = item.released
      ? new Date(item.released).getFullYear() || 2023
      : 2023;

    return {
      id: `ext-rawg-${item.id}`,
      title: item.name,
      genre: normalizeGenre(rawGenre),
      platforms: ['PS5', 'PS4'],
      releaseYear,
      coverImage: item.background_image || `${import.meta.env.BASE_URL}TRY.jpg`,
      price: '$69.99',
      rating: +(item.rating || 4.7).toFixed(1),
      featured: (item.rating || 0) >= 4.5,
      shortDescription: `Top-rated PlayStation adventure featured on RAWG Video Games Database.`,
      description: `Experience ${item.name} on PlayStation 5 and PlayStation 4 with stunning visual fidelity and immersive controls.`,
      apiSource: 'external' as const,
      features: [
        '4K Dynamic Resolution Mode',
        'Haptic Feedback on DualSense™',
        'Tempest 3D Spatial Audio',
      ],
    };
  });
}

/**
 * Main external games fetcher:
 * Automatically uses RAWG if apiKey is provided, otherwise connects to FreeToGame.
 * Falls back gracefully to curated local games if external network is unavailable.
 */
export async function fetchExternalGames(options?: {
  apiKey?: string;
  forceRefresh?: boolean;
}): Promise<{
  games: Game[];
  source: 'external' | 'curated_fallback';
  provider: ApiProvider;
  totalCount: number;
}> {
  if (cachedExternalGames && !options?.forceRefresh) {
    return {
      games: cachedExternalGames,
      source: 'external',
      provider: options?.apiKey ? 'rawg' : 'freetogame',
      totalCount: cachedExternalGames.length,
    };
  }

  try {
    let externalGames: Game[];
    let provider: ApiProvider = 'freetogame';

    if (options?.apiKey) {
      provider = 'rawg';
      externalGames = await fetchFromRawg(options.apiKey);
    } else {
      externalGames = await fetchFromFreeToGame();
    }

    if (externalGames.length > 0) {
      cachedExternalGames = externalGames;
      try {
        sessionStorage.setItem('zerone_cached_ext_games', JSON.stringify(externalGames));
      } catch {
        // Storage quota or privacy mode
      }
      return {
        games: externalGames,
        source: 'external',
        provider,
        totalCount: externalGames.length,
      };
    }

    throw new Error('No games returned from external API');
  } catch (error) {
    console.warn('External API failed, falling back to curated local dataset:', error);
    return {
      games: CURATED_GAMES,
      source: 'curated_fallback',
      provider: 'freetogame',
      totalCount: CURATED_GAMES.length,
    };
  }
}
