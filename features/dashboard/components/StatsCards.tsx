'use client';

import { SimpleGrid, Box, HStack, VStack, Text } from '@chakra-ui/react';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
}

interface StatsCardsProps {
  stats: DashboardStats;
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    { title: 'Total Users', value: stats.totalUsers.toString(), icon: '👥' },
    { title: 'Total Products', value: stats.totalProducts.toString(), icon: '📦' },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
      {cards.map((card) => (
        <Box
          key={card.title}
          bg="white"
          borderRadius="lg"
          shadow="md"
          p="6"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <HStack justify="space-between">
            <VStack align="start" gap="2">
              <Text color="gray.500" fontSize="sm">
                {card.title}
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                {card.value}
              </Text>
            </VStack>
            <Text fontSize="4xl">{card.icon}</Text>
          </HStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};
