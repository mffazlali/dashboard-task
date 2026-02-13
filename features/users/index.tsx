import { Suspense } from 'react';
import { userService } from '@/shared/services';
import { UsersContent, UsersSkeleton } from './components';

interface UsersProps {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

/**
 * Users Data Fetcher
 */
async function UsersDataFetcher({ searchParams }: UsersProps) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const skip = (page - 1) * limit;

  let usersData = null;
  
  try {
    usersData = await userService.getUsers({ limit, skip });
  } catch (error) {
    console.error('Error fetching users:', error);
  }

  return (
    <UsersContent
      users={usersData?.users || []}
      total={usersData?.total || 0}
      currentPage={page}
      limit={limit}
    />
  );
}

/**
 * Users Page Server Component
 */
const Users = ({ searchParams }: UsersProps) => {
  return (
    <Suspense fallback={<UsersSkeleton />}>
      <UsersDataFetcher searchParams={searchParams} />
    </Suspense>
  );
};

export default Users;
