import { ProductList } from '@/views/products/ProductList'
import { GoToOrderButton } from '@/components/cart'
import { asyncCategoryList } from '@/fetcher/categories/server';
import { asyncProductList } from '@/fetcher/products/server';

export default async function Home() {
  const { data } = await asyncProductList({ pageNumber: 0, size: 100 });
  const { data: categories } = await asyncCategoryList({ pageNumber: 0, size: 100 });
  return (
    <main>
      <div>
        <ProductList list={data} categories={categories} />
        <GoToOrderButton />
      </div>
    </main>
  )
}
