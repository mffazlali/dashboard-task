'use client';

import { useRouter } from 'next/navigation';
import { Box, Heading, SimpleGrid, Skeleton, HStack, Button } from '@chakra-ui/react';
import { StatsCards } from './StatsCards';
import { useDashboardPolling } from '../hooks/useDashboardPolling';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
}

interface DashboardContentProps {
  stats: DashboardStats;
}

/**
 * DashboardSkeleton Component
 */
export const DashboardSkeleton = () => {
  return (
    <Box p="6">
      <Skeleton h="8" w="48" mb="6" />
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} h="32" borderRadius="lg" />
        ))}
      </SimpleGrid>
    </Box>
  );
};

/**
 * Main Dashboard Content Client Component
 */
export const DashboardContent = ({ stats }: DashboardContentProps) => {
  const router = useRouter();
  
  // Auto-refresh every 30 seconds
  // useDashboardPolling(30);

  const handleRefresh = () => {
    console.log('[Dashboard] Manual refresh triggered');
    router.refresh();
  };

  return (
    <Box p="6">
      <HStack justify="space-between" mb="6">
        <Heading size="2xl">Dashboard</Heading>
        <Button onClick={handleRefresh} size="sm" variant="outline">
          🔄 Refresh
        </Button>
      </HStack>
      <StatsCards stats={stats} />
    </Box>
  );
};
