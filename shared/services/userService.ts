/**
 * User Service
 * 
 * @endpoint GET /users
 */

import { apiClient } from '@/shared/lib/apiClient';
import type { UsersResponse } from '@/shared/types';

export const userService = {
  /**
   * Get all users with pagination
   * @endpoint GET /users
   */
  async getUsers(params?: {
    limit?: number;
    skip?: number;
  }): Promise<UsersResponse> {
    try {
      const queryParams: Record<string, string> = {};
      
      if (params?.limit) {
        queryParams.limit = params.limit.toString();
      }
      
      if (params?.skip) {
        queryParams.skip = params.skip.toString();
      }

      const response = await apiClient.get<UsersResponse>('users', queryParams, {
        cache: 'no-store', // Force fresh data every time
      });
      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
};
