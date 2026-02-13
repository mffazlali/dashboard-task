'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Card,
  Field,
} from '@chakra-ui/react';
import { loginAction } from './actions';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginAction({ username, password });
      
      if (result.success) {
        console.log('Login successful, redirecting...');
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      p="4"
    >
      <Card.Root maxW="md" w="full" shadow="lg">
        <Card.Body p="8">
          <VStack gap="6" align="stretch">
            <VStack gap="2" textAlign="center">
              <Heading size="2xl">Welcome Back</Heading>
              <Text color="gray.600">Sign in to your account</Text>
            </VStack>

            {error && (
              <Box
                bg="red.50"
                color="red.600"
                p="3"
                borderRadius="md"
                fontSize="sm"
              >
                {error}
              </Box>
            )}

            <Box
              bg="blue.50"
              p="4"
              borderRadius="md"
              borderWidth="1px"
              borderColor="blue.200"
            >
              <Text fontSize="sm" fontWeight="medium" mb="2">
                Test Credentials:
              </Text>
              <Text fontSize="sm" color="gray.700">
                Username: <strong>emilys</strong>
              </Text>
              <Text fontSize="sm" color="gray.700">
                Password: <strong>emilyspass</strong>
              </Text>
            </Box>

            <form onSubmit={handleSubmit}>
              <VStack gap="4">
                <Field.Root>
                  <Field.Label>Username</Field.Label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    size="lg"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Password</Field.Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    size="lg"
                  />
                </Field.Root>

                <Button
                  type="submit"
                  colorPalette="blue"
                  size="lg"
                  w="full"
                  loading={loading}
                  mt="2"
                >
                  Sign In
                </Button>
              </VStack>
            </form>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
