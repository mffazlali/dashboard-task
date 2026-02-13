'use client';

import { useAuth } from '@/shared/hooks';
import { Box, Spinner, Center } from '@chakra-ui/react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" colorPalette="blue" />
      </Center>
    );
  }

  // Middleware handles redirect, just show content if we're here
  return <>{children}</>;
}
