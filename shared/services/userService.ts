/**
 * User Service
 * 
 * @endpoint GET /users
 */

import { apiClient } from '@/shared/lib/apiClient';
import type { UsersResponse } from '@/shared/types';

export const userService = {
  /**
   * Get all users
   * @endpoint GET /users
   */
  async getUsers(limit: number = 30): Promise<UsersResponse> {
    try {
      const response = await apiClient.get<UsersResponse>('users', {
        limit: limit.toString(),
      });
      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
};
