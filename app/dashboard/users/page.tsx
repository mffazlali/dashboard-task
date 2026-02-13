import Users from '@/features/users';

interface UsersPageProps {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

export default function UsersPage({ searchParams }: UsersPageProps) {
  return <Users searchParams={searchParams} />;
}

export const metadata = {
  title: 'Users Management',
  description: 'Manage users',
};
