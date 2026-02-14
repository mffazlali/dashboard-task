'use client';

import Image from 'next/image';
import {
  SimpleGrid,
  Box,
  HStack,
  VStack,
  Text,
  Badge,
} from '@chakra-ui/react';
import type { Product } from '@/shared/types';

interface ProductsGridProps {
  products: Product[];
}

export const ProductsGrid = ({ products }: ProductsGridProps) => {
  if (!products || products.length === 0) {
    return (
      <Box bg="white" borderRadius="lg" shadow="md" p="8" textAlign="center">
        <Text color="gray.500">No products found</Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
      {products.map((product) => (
        <Box
          key={product.id}
          bg="white"
          borderRadius="lg"
          shadow="md"
          overflow="hidden"
          _hover={{ shadow: 'lg' }}
          transition="all 0.2s"
        >
          <Box position="relative" h="48" w="full">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Box p="4">
            <HStack justify="space-between" align="start" mb="2">
              <Text
                fontSize="lg"
                fontWeight="semibold"
                lineClamp={2}
                flex="1"
              >
                {product.title}
              </Text>
              <Badge colorPalette="blue" size="sm" ml="2">
                {product.category}
              </Badge>
            </HStack>
            <Text color="gray.600" fontSize="sm" lineClamp={2} mb="4">
              {product.description}
            </Text>
            <HStack justify="space-between">
              <VStack align="start" gap="0">
                <Text fontSize="2xl" fontWeight="bold">
                  ${product.price}
                </Text>
                {product.discountPercentage > 0 && (
                  <Text fontSize="sm" color="green.600">
                    -{product.discountPercentage}%
                  </Text>
                )}
              </VStack>
              <HStack>
                <Text color="yellow.400">★</Text>
                <Text fontSize="sm" fontWeight="medium">
                  {product.rating.toFixed(1)}
                </Text>
              </HStack>
            </HStack>
            <Box mt="3" pt="3" borderTopWidth="1px" borderColor="gray.200">
              <HStack justify="space-between" fontSize="sm">
                <Text color="gray.500">Stock:</Text>
                <Text
                  fontWeight="medium"
                  color={product.stock > 50 ? 'green.600' : 'orange.600'}
                >
                  {product.stock} units
                </Text>
              </HStack>
            </Box>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};
