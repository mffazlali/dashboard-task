'use client';

import { useTransition } from 'react';
import { Box, Heading, VStack, Skeleton } from '@chakra-ui/react';
import { UsersTable } from './UsersTable';
import { Pagination } from '@/shared/components';
import type { User } from '@/shared/types';

interface UsersContentProps {
  users: User[];
  total: number;
  currentPage: number;
  limit: number;
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
 * Users Table Skeleton Component
 */
const UsersTableSkeleton = () => {
  return (
    <Box bg="white" borderRadius="lg" shadow="md">
      <VStack p="4" gap="4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <Skeleton key={i} h="16" w="full" borderRadius="md" />
        ))}
      </VStack>
    </Box>
  );
};

/**
 * Main Users Content Client Component
 */
export const UsersContent = ({
  users,
  total,
  currentPage,
  limit,
}: UsersContentProps) => {
  const totalPages = Math.ceil(total / limit);
  const [isPending] = useTransition();

  return (
    <Box p="6" display="flex" flexDirection="column" h="full">
      <Heading size="2xl" mb="6">
        Users Management
      </Heading>
      <Box flex="1" overflowY="auto" mb="6">
        {isPending ? <UsersTableSkeleton /> : <UsersTable users={users} />}
      </Box>
      {total > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          total={total}
          limit={limit}
          itemName="users"
        />
      )}
    </Box>
  );
};
