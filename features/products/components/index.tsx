'use client';

import { useTransition } from 'react';
import { Box, Heading, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { ProductsGrid } from './ProductsGrid';
import { Pagination } from '@/shared/components';
import type { Product } from '@/shared/types';

interface ProductsContentProps {
  products: Product[];
  total: number;
  currentPage: number;
  limit: number;
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
 * Products Grid Skeleton Component
 */
const ProductsGridSkeleton = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <Skeleton key={i} h="96" borderRadius="lg" />
      ))}
    </SimpleGrid>
  );
};

/**
 * Main Products Content Client Component
 */
export const ProductsContent = ({
  products,
  total,
  currentPage,
  limit,
}: ProductsContentProps) => {
  const totalPages = Math.ceil(total / limit);
  const [isPending] = useTransition();

  return (
    <Box p="6" display="flex" flexDirection="column" h="full">
      <Heading size="2xl" mb="6">
        Products Management
      </Heading>
      <Box flex="1" overflowY="auto" mb="6">
        {isPending ? <ProductsGridSkeleton /> : <ProductsGrid products={products} />}
      </Box>
      {total > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          total={total}
          limit={limit}
          itemName="products"
        />
      )}
    </Box>
  );
};
