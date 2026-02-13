'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiClient } from '@/shared/lib/apiClient';
import type { LoginRequest, LoginResponse } from '@/shared/types';

export async function loginAction(credentials: LoginRequest) {
  try {
    const { data: response } = await apiClient.postWithHeaders<LoginResponse>(
      'auth/login',
      credentials,
      { cache: 'no-store' }
    );

    // Get accessToken from response body
    const accessToken = response.accessToken || response.token;

    if (!accessToken) {
      return {
        success: false,
        error: 'No access token received from server',
      };
    }

    // Set cookies on server side
    const cookieStore = await cookies();
    
    // Store token
    cookieStore.set('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    // Store user data
    cookieStore.set('user', JSON.stringify(response), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error('Login action error:', error);
    return {
      success: false,
      error: 'Invalid username or password',
    };
  }
}

export async function getUserAction(): Promise<LoginResponse | null> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');
    
    if (!userCookie) {
      return null;
    }
    
    const userData = JSON.parse(userCookie.value);
    return userData;
  } catch (error) {
    console.error('Get user action error:', error);
    return null;
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  
  // Remove cookies
  cookieStore.delete('token');
  cookieStore.delete('user');
  
  redirect('/login');
}
