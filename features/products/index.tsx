import { Suspense } from 'react';
import { productService } from '@/shared/services';
import { ProductsContent, ProductsSkeleton } from './components';

/**
 * Products Data Fetcher
 */
async function ProductsDataFetcher() {
  let productsData = null;
  
  try {
    productsData = await productService.getProducts(30);
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return <ProductsContent products={productsData?.products || []} />;
}

/**
 * Products Page Server Component
 */
const Products = () => {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsDataFetcher />
    </Suspense>
  );
};

export default Products;
