'use client';

import { Box, Heading, VStack, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { StatsCards } from './StatsCards';

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
export const DashboardContent = () => {
  return (
    <Box p="6">
      <Heading size="2xl" mb="6">
        Dashboard
      </Heading>
      <StatsCards />
    </Box>
  );
};
