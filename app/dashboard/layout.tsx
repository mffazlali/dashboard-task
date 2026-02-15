import { Flex, Box, VStack } from '@chakra-ui/react';
import { Sidebar, Header } from '@/shared/layout';
import { AuthGuard } from '@/shared/components';
import { QueryProvider } from '@/shared/providers/QueryProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <QueryProvider>
        <Flex minH="100vh" maxH="100vh" bg="gray.100" overflow="hidden">
          <Sidebar />
          <VStack flex="1" gap="0" align="stretch" overflow="hidden">
            <Header />
            <Box as="main" flex="1" overflowY="auto">
              {children}
            </Box>
          </VStack>
        </Flex>
      </QueryProvider>
    </AuthGuard>
  );
}
