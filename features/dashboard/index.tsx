import { Suspense } from 'react';
import { userService, productService } from '@/shared/services';
import { DashboardContent, DashboardSkeleton } from './components';

/**
 * Dashboard Data Fetcher
 */
async function DashboardDataFetcher() {
  let stats = {
    totalUsers: 0,
    totalProducts: 0,
  };

  try {
    const [usersData, productsData] = await Promise.all([
      userService.getUsers({ limit: 0 }),
      productService.getProducts({ limit: 0 }),
    ]);

    stats = {
      totalUsers: usersData.total,
      totalProducts: productsData.total,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }

  return <DashboardContent stats={stats} />;
}

/**
 * Dashboard Page Server Component
 */
const Dashboard = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardDataFetcher />
    </Suspense>
  );
};

export default Dashboard;
