import { Suspense } from 'react';
import { productService } from '@/shared/services';
import { ProductsContent, ProductsSkeleton } from './components';

interface ProductsProps {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

/**
 * Products Data Fetcher
 */
async function ProductsDataFetcher({ searchParams }: ProductsProps) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 12;
  const skip = (page - 1) * limit;

  let productsData = null;
  
  try {
    productsData = await productService.getProducts({ limit, skip });
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <ProductsContent
      products={productsData?.products || []}
      total={productsData?.total || 0}
      currentPage={page}
      limit={limit}
    />
  );
}

/**
 * Products Page Server Component
 */
const Products = ({ searchParams }: ProductsProps) => {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsDataFetcher searchParams={searchParams} />
    </Suspense>
  );
};

export default Products;
