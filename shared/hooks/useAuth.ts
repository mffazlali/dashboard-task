'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserAction, logoutAction } from '@/features/login/actions';
import type { LoginResponse } from '@/shared/types';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from server
    getUserAction().then((userData) => {
      setUser(userData);
      setLoading(false);
    });
  }, []);

  const logout = async () => {
    try {
      await logoutAction();
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: redirect manually
      router.push('/login');
      router.refresh();
    }
  };

  return { user, loading, logout };
}
