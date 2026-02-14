'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Hook for auto-refreshing dashboard data
 * @param intervalSeconds - Refresh interval in seconds
 */
export const useDashboardPolling = (intervalSeconds: number = 30) => {
  const router = useRouter();

  useEffect(() => {
    console.log(`[Dashboard Polling] Started with ${intervalSeconds}s interval`);
    
    const interval = setInterval(() => {
      console.log('[Dashboard Polling] Refreshing data...');
      router.refresh();
    }, intervalSeconds * 1000);

    return () => {
      console.log('[Dashboard Polling] Stopped');
      clearInterval(interval);
    };
  }, [intervalSeconds, router]);
};
