/**
 * Game Types for RAWG API
 */

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  reviews_count: number;
  metacritic: number | null;
  playtime: number;
  platforms: Platform[];
  genres: Genre[];
  short_screenshots?: Array<{
    id: number;
    image: string;
  }>;
}

export interface GameDetails extends Game {
  description_raw: string;
  description: string;
  website: string;
  developers: Developer[];
  publishers: Publisher[];
  esrb_rating: EsrbRating | null;
}

export interface GamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface ScreenshotsResponse {
  count: number;
  results: Screenshot[];
}

export interface GameFilters {
  search?: string;
  genres?: string;
  platforms?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}
