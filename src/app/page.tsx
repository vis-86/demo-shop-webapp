import { ProductList } from '@/components/ProductList'
import { GoToOrderButton } from '@/components/cart'
import { asyncProductList } from '@/fetcher/products/server';

export default async function Home() {
  const { data } = await asyncProductList({ pageNumber: 0, size: 10 });
  return (
    <main>
      <div>
        <ProductList list={data} />
        <GoToOrderButton />
      </div>
    </main>
  )
}
