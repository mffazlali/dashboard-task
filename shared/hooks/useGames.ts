/**
 * React Query hooks for Games
 */

import { useQuery } from '@tanstack/react-query';
import { gameService } from '@/shared';
import type { GameFilters } from '@/shared/types';

export function useGames(filters?: GameFilters) {
  return useQuery({
    queryKey: ['games', filters],
    queryFn: () => gameService.fetchGames(filters),
  });
}

export function useGameDetail(id: number) {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => gameService.fetchGameById(id),
    enabled: !!id,
  });
}

export function useGameScreenshots(id: number) {
  return useQuery({
    queryKey: ['game-screenshots', id],
    queryFn: () => gameService.fetchGameScreenshots(id),
    enabled: !!id,
  });
}
