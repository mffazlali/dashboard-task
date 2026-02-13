'use client';

import { Box, Heading, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { ProductsGrid } from './ProductsGrid';
import type { Product } from '@/shared/types';

interface ProductsContentProps {
  products: Product[];
}

/**
 * ProductsSkeleton Component
 */
export const ProductsSkeleton = () => {
  return (
    <Box p="6">
      <Skeleton h="8" w="48" mb="6" />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} h="96" borderRadius="lg" />
        ))}
      </SimpleGrid>
    </Box>
  );
};

/**
 * Main Products Content Client Component
 */
export const ProductsContent = ({ products }: ProductsContentProps) => {
  return (
    <Box p="6">
      <Heading size="2xl" mb="6">
        Products Management
      </Heading>
      <ProductsGrid products={products} />
    </Box>
  );
};
