import { Suspense } from 'react';
import { userService } from '@/shared/services';
import { UsersContent, UsersSkeleton } from './components';

/**
 * Users Data Fetcher
 */
async function UsersDataFetcher() {
  let usersData = null;
  
  try {
    usersData = await userService.getUsers(30);
  } catch (error) {
    console.error('Error fetching users:', error);
  }

  return <UsersContent users={usersData?.users || []} />;
}

/**
 * Users Page Server Component
 */
const Users = () => {
  return (
    <Suspense fallback={<UsersSkeleton />}>
      <UsersDataFetcher />
    </Suspense>
  );
};

export default Users;
