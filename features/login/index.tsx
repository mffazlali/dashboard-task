'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { loginSchema, type LoginFormData } from './schema';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');

    try {
      const result = await loginAction(data);
      
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
              <Heading size="2xl">Welcome</Heading>
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap="4">
                <Field.Root invalid={!!errors.username}>
                  <Field.Label>Username</Field.Label>
                  <Input
                    type="text"
                    {...register('username')}
                    placeholder="Enter your username"
                    size="lg"
                  />
                  {errors.username && (
                    <Field.ErrorText>{errors.username.message}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                  <Field.Label>Password</Field.Label>
                  <Input
                    type="password"
                    {...register('password')}
                    placeholder="Enter your password"
                    size="lg"
                  />
                  {errors.password && (
                    <Field.ErrorText>{errors.password.message}</Field.ErrorText>
                  )}
                </Field.Root>

                <Button
                  type="submit"
                  colorPalette="blue"
                  size="lg"
                  w="full"
                  loading={isSubmitting}
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
