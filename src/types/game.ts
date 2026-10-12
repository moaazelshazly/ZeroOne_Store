export type Genre =
  | 'All Games'
  | 'Action'
  | 'Adventure'
  | 'RPG'
  | 'Sports'
  | 'Racing'
  | 'Shooter'
  | 'Fighting'
  | 'Horror'
  | 'Strategy';

export interface Game {
  id: string;
  title: string;
  genre: Exclude<Genre, 'All Games'>;
  platforms: ('PS5' | 'PS4')[];
  releaseYear: number;
  coverImage: string;
  price?: string;
  rating?: number;
  featured?: boolean;
  shortDescription?: string;
  description?: string;
  features?: string[];
  developer?: string;
  publisher?: string;
  apiSource?: 'local' | 'external';
  externalUrl?: string;
}
