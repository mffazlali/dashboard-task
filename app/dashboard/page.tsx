import Dashboard from '@/features/dashboard';

export const revalidate = 30; // Revalidate every 30 seconds

export default function DashboardPage() {
  return <Dashboard />;
}

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard overview',
};
