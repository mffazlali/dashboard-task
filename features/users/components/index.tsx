'use client';

import { Box, Heading, VStack, Skeleton } from '@chakra-ui/react';
import { UsersTable } from './UsersTable';
import type { User } from '@/shared/types';

interface UsersContentProps {
  users: User[];
}

/**
 * UsersSkeleton Component
 */
export const UsersSkeleton = () => {
  return (
    <Box p="6">
      <Skeleton h="8" w="48" mb="6" />
      <Box bg="white" borderRadius="lg" shadow="md">
        <VStack p="4" gap="4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} h="16" w="full" borderRadius="md" />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

/**
 * Main Users Content Client Component
 */
export const UsersContent = ({ users }: UsersContentProps) => {
  return (
    <Box p="6">
      <Heading size="2xl" mb="6">
        Users Management
      </Heading>
      <UsersTable users={users} />
    </Box>
  );
};
