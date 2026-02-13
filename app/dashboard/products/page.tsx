import Products from '@/features/products';

interface ProductsPageProps {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return <Products searchParams={searchParams} />;
}

export const metadata = {
  title: 'Products Management',
  description: 'Manage products',
};
