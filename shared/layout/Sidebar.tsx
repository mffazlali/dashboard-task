'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, VStack, Heading, HStack, Text } from '@chakra-ui/react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/users', label: 'Users', icon: '👥' },
  { href: '/dashboard/products', label: 'Products', icon: '📦' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Box
      as="aside"
      w="64"
      bg="gray.900"
      color="white"
      minH="100vh"
      p="4"
    >
      <Box mb="8">
        <Heading size="xl">Dashboard</Heading>
      </Box>
      <VStack as="nav" gap="2" align="stretch">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Box
              key={item.href}
              asChild
              display="flex"
              alignItems="center"
              gap="3"
              px="4"
              py="3"
              borderRadius="lg"
              bg={isActive ? 'blue.600' : 'transparent'}
              color={isActive ? 'white' : 'gray.300'}
              _hover={{ bg: isActive ? 'blue.600' : 'gray.800' }}
              transition="all 0.2s"
            >
              <Link href={item.href}>
                <Text fontSize="xl">{item.icon}</Text>
                <Text>{item.label}</Text>
              </Link>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};
