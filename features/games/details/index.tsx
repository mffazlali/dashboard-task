'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Heading,
  Text,
  Badge,
  Spinner,
  Button,
  SimpleGrid,
  Image,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useGameDetail, useGameScreenshots } from '@/shared/hooks/useGames';

export default function GameDetails() {
  const params = useParams();
  const router = useRouter();
  const gameId = Number(params.id);

  const { data: game, isLoading: gameLoading, error: gameError } = useGameDetail(gameId);
  const { data: screenshots } = useGameScreenshots(gameId);

  if (gameLoading) {
    return (
      <Box p={8} display="flex" justifyContent="center" alignItems="center" minH="400px">
        <Spinner size="xl" colorPalette="blue" />
      </Box>
    );
  }

  if (gameError || !game) {
    return (
      <Box bg="white" borderRadius="lg" shadow="md" p={8} textAlign="center">
        <Text color="red.500">Error loading game details</Text>
        <Button mt={4} onClick={() => router.push('/dashboard/games')} colorPalette="blue">
          Back to List
        </Button>
      </Box>
    );
  }

  return (
    <Box p={8}>
      {/* Hero Section */}
      <Box
        h="400px"
        backgroundImage={`url(${game.background_image})`}
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
        borderRadius="lg"
        overflow="hidden"
        mb={8}
      >
        <Box
          position="absolute"
          inset={0}
          bgGradient="to-b"
          gradientFrom="transparent"
          gradientTo="blackAlpha.800"
        />
        <Box position="relative" h="full" display="flex" alignItems="flex-end" p={8}>
          <Box w="full">
            <Button mb={4} onClick={() => router.push('/dashboard/games')} variant="outline" colorPalette="white">
              ← Back
            </Button>
            <Heading size="3xl" mb={4} color="white">
              {game.name}
            </Heading>
            <HStack gap={4} flexWrap="wrap">
              <HStack>
                <Text color="yellow.400">★</Text>
                <Text fontSize="xl" fontWeight="bold" color="white">
                  {game.rating.toFixed(1)}
                </Text>
                {game.metacritic && (
                  <Badge colorPalette="green" fontSize="md" p={2}>
                    Metacritic: {game.metacritic}
                  </Badge>
                )}
              </HStack>
              <Text fontSize="md" color="gray.200">
                Released: {game.released}
              </Text>
            </HStack>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box maxW="1400px" mx="auto">
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>
          {/* Main Content */}
          <Box gridColumn={{ base: 1, lg: 'span 2' }}>
            <Box bg="white" borderRadius="lg" shadow="md" p={6} mb={8}>
              <Heading size="lg" mb={4}>
                About
              </Heading>
              <Text color="gray.700" lineHeight="tall">
                {game.description_raw}
              </Text>
            </Box>

            {/* Screenshots */}
            {screenshots && screenshots.results.length > 0 && (
              <Box bg="white" borderRadius="lg" shadow="md" p={6}>
                <Heading size="lg" mb={4}>
                  Screenshots
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  {screenshots.results.map((screenshot) => (
                    <Image
                      key={screenshot.id}
                      src={screenshot.image}
                      alt="Screenshot"
                      borderRadius="lg"
                      w="full"
                      h="250px"
                      objectFit="cover"
                    />
                  ))}
                </SimpleGrid>
              </Box>
            )}
          </Box>

          {/* Sidebar */}
          <VStack align="stretch" gap={6}>
            {/* Genres */}
            <Box bg="white" borderRadius="lg" shadow="md" p={6}>
              <Heading size="md" mb={4}>
                Genres
              </Heading>
              <HStack flexWrap="wrap" gap={2}>
                {game.genres.map((genre) => (
                  <Badge key={genre.id} colorPalette="purple" fontSize="sm" p={2}>
                    {genre.name}
                  </Badge>
                ))}
              </HStack>
            </Box>

            {/* Platforms */}
            <Box bg="white" borderRadius="lg" shadow="md" p={6}>
              <Heading size="md" mb={4}>
                Platforms
              </Heading>
              <VStack align="stretch" gap={2}>
                {game.platforms.map((p) => (
                  <Badge key={p.platform.id} colorPalette="blue" fontSize="sm" p={2}>
                    {p.platform.name}
                  </Badge>
                ))}
              </VStack>
            </Box>

            {/* Developers */}
            {game.developers && game.developers.length > 0 && (
              <Box bg="white" borderRadius="lg" shadow="md" p={6}>
                <Heading size="md" mb={4}>
                  Developers
                </Heading>
                <VStack align="stretch" gap={2}>
                  {game.developers.map((dev) => (
                    <Text key={dev.id} color="gray.700" fontSize="sm">
                      {dev.name}
                    </Text>
                  ))}
                </VStack>
              </Box>
            )}

            {/* Publishers */}
            {game.publishers && game.publishers.length > 0 && (
              <Box bg="white" borderRadius="lg" shadow="md" p={6}>
                <Heading size="md" mb={4}>
                  Publishers
                </Heading>
                <VStack align="stretch" gap={2}>
                  {game.publishers.map((pub) => (
                    <Text key={pub.id} color="gray.700" fontSize="sm">
                      {pub.name}
                    </Text>
                  ))}
                </VStack>
              </Box>
            )}

            {/* ESRB Rating */}
            {game.esrb_rating && (
              <Box bg="white" borderRadius="lg" shadow="md" p={6}>
                <Heading size="md" mb={4}>
                  ESRB Rating
                </Heading>
                <Badge colorPalette="orange" fontSize="md" p={2}>
                  {game.esrb_rating.name}
                </Badge>
              </Box>
            )}

            {/* Website */}
            {game.website && (
              <Button
                asChild
                colorPalette="blue"
                size="lg"
                w="full"
              >
                <a href={game.website} target="_blank" rel="noopener noreferrer">
                  Official Website
                </a>
              </Button>
            )}
          </VStack>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

