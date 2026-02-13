'use client';

import { SimpleGrid, Box, HStack, VStack, Text } from '@chakra-ui/react';

export const StatsCards = () => {
  const stats = [
    { title: 'Total Users', value: '30', icon: '👥' },
    { title: 'Total Products', value: '30', icon: '📦' },
    { title: 'Active Sessions', value: '12', icon: '🔥' },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
      {stats.map((stat) => (
        <Box
          key={stat.title}
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
                {stat.title}
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                {stat.value}
              </Text>
            </VStack>
            <Text fontSize="4xl">{stat.icon}</Text>
          </HStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};
