/**
 * Games API Client (Using fetch)
 * For client-side data fetching with React Query
 */

import type { GamesResponse, GameDetails, ScreenshotsResponse, GameFilters } from '@/shared/types';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY || '';
const BASE_URL = 'https://api.rawg.io/api';

export const gameService = {
  /**
   * Fetch games with filters
   */
  async fetchGames(filters?: GameFilters): Promise<GamesResponse> {
    const params = new URLSearchParams({
      key: API_KEY,
      page: filters?.page?.toString() || '1',
      page_size: filters?.page_size?.toString() || '20',
    });

    if (filters?.search) params.append('search', filters.search);
    if (filters?.genres) params.append('genres', filters.genres);
    if (filters?.platforms) params.append('platforms', filters.platforms);
    if (filters?.ordering) params.append('ordering', filters.ordering);

    const response = await fetch(`${BASE_URL}/games?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Fetch game details by ID
   */
  async fetchGameById(id: number): Promise<GameDetails> {
    const params = new URLSearchParams({ key: API_KEY });
    const response = await fetch(`${BASE_URL}/games/${id}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch game: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Fetch game screenshots
   */
  async fetchGameScreenshots(id: number): Promise<ScreenshotsResponse> {
    const params = new URLSearchParams({ key: API_KEY });
    const response = await fetch(`${BASE_URL}/games/${id}/screenshots?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch screenshots: ${response.statusText}`);
    }

    return response.json();
  },
};
