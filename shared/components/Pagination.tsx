'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HStack, Button, Text } from '@chakra-ui/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  itemName?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  total,
  limit,
  itemName = 'items',
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (page: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
    });
  };

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  return (
    <HStack justify="space-between" mt="6" flexWrap="wrap" gap="4">
      <Text fontSize="sm" color="gray.600">
        Showing {startItem} to {endItem} of {total} {itemName}
      </Text>
      
      <HStack gap="2">
        <Button
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isPending}
          variant="outline"
          loading={isPending}
        >
          Previous
        </Button>
        
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum: number;
          
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              size="sm"
              onClick={() => handlePageChange(pageNum)}
              colorPalette={currentPage === pageNum ? 'blue' : 'gray'}
              variant={currentPage === pageNum ? 'solid' : 'outline'}
              disabled={isPending}
            >
              {pageNum}
            </Button>
          );
        })}
        
        <Button
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isPending}
          variant="outline"
          loading={isPending}
        >
          Next
        </Button>
      </HStack>
    </HStack>
  );
};
