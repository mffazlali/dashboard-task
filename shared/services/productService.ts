/**
 * Product Service
 * 
 * @endpoint GET /products
 */

import { apiClient } from '@/shared/lib/apiClient';
import type { ProductsResponse } from '@/shared/types';

export const productService = {
  /**
   * Get all products
   * @endpoint GET /products
   */
  async getProducts(limit: number = 30): Promise<ProductsResponse> {
    try {
      const response = await apiClient.get<ProductsResponse>('products', {
        limit: limit.toString(),
      });
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
};
