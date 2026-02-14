import Products from '@/features/products';

interface ProductsPageProps {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  return <Products searchParams={params} />;
}

export const metadata = {
  title: 'Products Management',
  description: 'Manage products',
};
