'use client';

import { Box, HStack, VStack, Text, Button, Avatar } from '@chakra-ui/react';
import { useAuth } from '@/shared/hooks';

export const Header = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Box
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.200"
      px="6"
      py="4"
      shadow="sm"
    >
      <HStack justify="space-between">
        <Text fontSize="lg" fontWeight="medium">
          Welcome back, {user.firstName}!
        </Text>
        <HStack gap="4">
          <HStack gap="3">
            <Avatar.Root
              size="sm"
              name={`${user.firstName} ${user.lastName}`}
            >
              <Avatar.Image src={user.image} />
            </Avatar.Root>
            <VStack align="start" gap="0">
              <Text fontSize="sm" fontWeight="medium">
                {user.firstName} {user.lastName}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {user.email}
              </Text>
            </VStack>
          </HStack>
          <Button
            size="sm"
            colorPalette="red"
            variant="outline"
            onClick={logout}
          >
            Logout
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};
