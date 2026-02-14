/**
 * Product Service
 * 
 * @endpoint GET /products
 */

import { apiClient } from '@/shared/lib/apiClient';
import type { ProductsResponse } from '@/shared/types';

export const productService = {
  /**
   * Get all products with pagination
   * @endpoint GET /products
   */
  async getProducts(params?: {
    limit?: number;
    skip?: number;
  }): Promise<ProductsResponse> {
    try {
      const queryParams: Record<string, string> = {};
      
      if (params?.limit) {
        queryParams.limit = params.limit.toString();
      }
      
      if (params?.skip) {
        queryParams.skip = params.skip.toString();
      }

      const response = await apiClient.get<ProductsResponse>('products', queryParams, {
        cache: 'no-store', // Force fresh data every time
      });
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
};
