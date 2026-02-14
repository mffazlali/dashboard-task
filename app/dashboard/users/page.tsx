import Users from '@/features/users';

interface UsersPageProps {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  return <Users searchParams={params} />;
}

export const metadata = {
  title: 'Users Management',
  description: 'Manage users',
};
