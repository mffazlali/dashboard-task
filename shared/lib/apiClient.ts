import { ApiError } from '../types/api';
import { getApiUrl } from './apiConfig';

/**
 * Next.js fetch options interface
 */
export interface NextFetchOptions {
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

/**
 * Extended RequestInit with Next.js options
 */
export interface ApiRequestOptions extends RequestInit {
  next?: NextFetchOptions['next'];
}

/**
 * API Response with headers
 */
export interface ApiResponseWithHeaders<T> {
  data: T;
  headers: Headers;
}

export class ApiClient {
  private async request<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<T> {
    const url = getApiUrl(endpoint);
    
    if (!url || url.includes('undefined')) {
      throw new ApiError({
        message: 'API configuration error: Invalid URL',
        status: 0,
      });
    }
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new ApiError({
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
        });
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new ApiError({
        message: `fetch failed: ${errorMessage}`,
        status: 0,
      });
    }
  }

  private async requestWithHeaders<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponseWithHeaders<T>> {
    const url = getApiUrl(endpoint);
    
    if (!url || url.includes('undefined')) {
      throw new ApiError({
        message: 'API configuration error: Invalid URL',
        status: 0,
      });
    }
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new ApiError({
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
        });
      }

      const data = await response.json();
      return {
        data,
        headers: response.headers,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new ApiError({
        message: `fetch failed: ${errorMessage}`,
        status: 0,
      });
    }
  }

  async get<T>(
    endpoint: string, 
    params?: Record<string, string>,
    options?: NextFetchOptions
  ): Promise<T> {
    let finalEndpoint = endpoint;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, value);
      });
      finalEndpoint = `${endpoint}?${searchParams.toString()}`;
    }

    return this.request<T>(finalEndpoint, {
      method: 'GET',
      cache: options?.cache,
      next: options?.next,
    });
  }

  async post<T>(
    endpoint: string,
    body?: any,
    options?: NextFetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      cache: options?.cache,
      next: options?.next,
    });
  }

  async postWithHeaders<T>(
    endpoint: string,
    body?: any,
    options?: NextFetchOptions
  ): Promise<ApiResponseWithHeaders<T>> {
    return this.requestWithHeaders<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      cache: options?.cache,
      next: options?.next,
    });
  }
}

export const apiClient = new ApiClient();
