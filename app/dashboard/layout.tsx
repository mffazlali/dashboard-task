import { Flex, Box, VStack } from '@chakra-ui/react';
import { Sidebar, Header } from '@/shared/layout';
import { AuthGuard } from '@/shared/components';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Flex minH="100vh" maxH="100vh" bg="gray.100" overflow="hidden">
        <Sidebar />
        <VStack flex="1" gap="0" align="stretch" overflow="hidden">
          <Header />
          <Box as="main" flex="1" overflowY="auto">
            {children}
          </Box>
        </VStack>
      </Flex>
    </AuthGuard>
  );
}
