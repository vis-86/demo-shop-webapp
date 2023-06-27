import { ProductList } from '@/components/ProductList'
import { GoToOrderButton } from '@/components/cart'

export default function Home() {
  return (
    <main>
      <div>
        <ProductList />
        <GoToOrderButton />
      </div>
    </main>
  )
}
