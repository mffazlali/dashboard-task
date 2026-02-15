'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  Image,
  Text,
  Badge,
  Spinner,
  Input,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useGames } from '@/shared/hooks/useGames';

export default function Games() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  
  const filters = {
    search: searchParams.get('search') || undefined,
    genres: searchParams.get('genres') || undefined,
    platforms: searchParams.get('platforms') || undefined,
    ordering: searchParams.get('ordering') || '-rating',
    page: Number(searchParams.get('page')) || 1,
    page_size: 20,
  };

  const { data, isLoading, error } = useGames(filters);

  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/dashboard/games?${params.toString()}`);
  };

  const handleSearch = () => {
    updateFilters({ search: searchInput });
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ genres: e.target.value });
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ platforms: e.target.value });
  };

  const handleOrderingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ ordering: e.target.value });
  };

  if (error) {
    return (
      <Box bg="white" borderRadius="lg" shadow="md" p="8" textAlign="center">
        <Text color="red.500">خطا: {error.message}</Text>
        <Text fontSize="sm" color="gray.600" mt={2}>
          لطفاً API Key خود را در فایل .env.local قرار دهید
        </Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Box maxW="1400px" mx="auto">
        <Heading mb={8} size="2xl">
          🎮 Games Library
        </Heading>

        {/* Filters */}
        <Box bg="white" borderRadius="lg" shadow="md" p={6} mb={8}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
            <Box>
              <Text mb={2} fontSize="sm" color="gray.700">Search</Text>
              <HStack>
                <Input
                  placeholder="Game name..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  bg="white"
                  borderColor="gray.200"
                />
                <Button onClick={handleSearch} colorPalette="blue">
                  Search
                </Button>
              </HStack>
            </Box>

            <Box>
              <Text mb={2} fontSize="sm" color="gray.700">Genre</Text>
              <select
                value={filters.genres || ''}
                onChange={handleGenreChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid #E2E8F0',
                }}
              >
                <option value="">All Genres</option>
                <option value="4">Action</option>
                <option value="51">Indie</option>
                <option value="3">Adventure</option>
                <option value="5">RPG</option>
                <option value="10">Strategy</option>
                <option value="2">Shooter</option>
              </select>
            </Box>

            <Box>
              <Text mb={2} fontSize="sm" color="gray.700">Platform</Text>
              <select
                value={filters.platforms || ''}
                onChange={handlePlatformChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid #E2E8F0',
                }}
              >
                <option value="">All Platforms</option>
                <option value="4">PC</option>
                <option value="187">PlayStation 5</option>
                <option value="1">Xbox One</option>
                <option value="7">Nintendo Switch</option>
                <option value="3">iOS</option>
              </select>
            </Box>

            <Box>
              <Text mb={2} fontSize="sm" color="gray.700">Sort By</Text>
              <select
                value={filters.ordering}
                onChange={handleOrderingChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid #E2E8F0',
                }}
              >
                <option value="-rating">Highest Rated</option>
                <option value="-released">Newest</option>
                <option value="-metacritic">Metacritic</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Loading */}
        {isLoading && (
          <Box display="flex" justifyContent="center" py={20}>
            <Spinner size="xl" colorPalette="blue" />
          </Box>
        )}

        {/* Games Grid */}
        {!isLoading && data && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
            {data.results.map((game) => (
              <Card.Root
                key={game.id}
                overflow="hidden"
                bg="white"
                borderRadius="lg"
                shadow="md"
                cursor="pointer"
                onClick={() => router.push(`/dashboard/games/${game.id}`)}
                _hover={{ shadow: 'lg' }}
                transition="all 0.2s"
              >
                <Image
                  src={game.background_image || '/placeholder-game.jpg'}
                  alt={game.name}
                  h="200px"
                  w="full"
                  objectFit="cover"
                />
                <Card.Body p={4}>
                  <Heading size="md" mb={2} lineClamp={1}>
                    {game.name}
                  </Heading>

                  <HStack mb={3} flexWrap="wrap" gap={2}>
                    {game.genres?.slice(0, 2).map((genre) => (
                      <Badge key={genre.id} colorPalette="purple" fontSize="xs">
                        {genre.name}
                      </Badge>
                    ))}
                  </HStack>

                  <HStack justifyContent="space-between">
                    <HStack>
                      <Text color="yellow.400">★</Text>
                      <Text fontSize="sm" fontWeight="medium">
                        {game.rating.toFixed(1)}
                      </Text>
                      {game.metacritic && (
                        <Badge colorPalette="green">{game.metacritic}</Badge>
                      )}
                    </HStack>
                    <Text fontSize="sm" color="gray.500">
                      {game.released}
                    </Text>
                  </HStack>

                  <Box mt={3}>
                    {game.platforms?.slice(0, 3).map((p) => (
                      <Badge key={p.platform.id} mr={1} fontSize="xs" colorPalette="blue">
                        {p.platform.name}
                      </Badge>
                    ))}
                  </Box>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}

