/**
 * Auth Service
 * 
 * @endpoint POST /auth/login
 */

import { apiClient } from '@/shared/lib/apiClient';
import type { LoginRequest, LoginResponse } from '@/shared/types';
import type { ApiResponseWithHeaders } from '@/shared/lib/apiClient';

export const authService = {
  /**
   * Login user and return response with headers
   * @endpoint POST /auth/login
   */
  async login(credentials: LoginRequest): Promise<ApiResponseWithHeaders<LoginResponse>> {
    try {
      const response = await apiClient.postWithHeaders<LoginResponse>('auth/login', credentials, {
        cache: 'no-store',
      });
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
};
