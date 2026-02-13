import { Suspense } from 'react';
import { DashboardContent, DashboardSkeleton } from './components';

/**
 * Dashboard Page Server Component
 */
const Dashboard = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
};

export default Dashboard;
