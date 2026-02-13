/**
 * API Configuration
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dummyjson.com',
} as const;

/**
 * Generate full API URL for an endpoint
 * @param endpoint - API endpoint path
 * @returns Full API URL
 */
export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}/${endpoint}`;
};
