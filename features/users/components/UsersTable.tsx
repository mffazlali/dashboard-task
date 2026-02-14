'use client';

import Image from 'next/image';
import {
  Box,
  Table,
  HStack,
  VStack,
  Text,
  Badge,
} from '@chakra-ui/react';
import type { User } from '@/shared/types';

interface UsersTableProps {
  users: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
  if (!users || users.length === 0) {
    return (
      <Box bg="white" borderRadius="lg" shadow="md" p="8" textAlign="center">
        <Text color="gray.500">No users found</Text>
      </Box>
    );
  }

  return (
    <Box bg="white" borderRadius="lg" shadow="md" overflow="hidden">
      <Box overflowX="auto">
        <Table.Root variant="line">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>User</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Phone</Table.ColumnHeader>
              <Table.ColumnHeader>Age</Table.ColumnHeader>
              <Table.ColumnHeader>Gender</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id} _hover={{ bg: 'gray.50' }}>
                <Table.Cell>
                  <HStack gap="4">
                    <Box position="relative" w="10" h="10" flexShrink="0">
                      <Image
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        fill
                        style={{ borderRadius: '9999px', objectFit: 'cover' }}
                      />
                    </Box>
                    <VStack align="start" gap="0">
                      <Text fontSize="sm" fontWeight="medium">
                        {user.firstName} {user.lastName}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        @{user.username}
                      </Text>
                    </VStack>
                  </HStack>
                </Table.Cell>
                <Table.Cell>
                  <Text fontSize="sm">{user.email}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text fontSize="sm">{user.phone}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text fontSize="sm">{user.age}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge colorPalette="blue" size="sm">
                    {user.gender}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};
