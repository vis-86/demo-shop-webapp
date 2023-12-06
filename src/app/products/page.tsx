import { GoToOrderButton } from "@/components/cart";
import { asyncCategoryList } from "@/fetcher/categories/server";
import { asyncProductList } from "@/fetcher/products/server";
import ProductList from "@/views/products/ProductList";

export default async function Products() {
  const { data: categories } = await asyncCategoryList({ pageNumber: 0, size: 100 });
  return (
    <main>
      <div>
        <ProductList list={[]} categories={categories} />
        <GoToOrderButton />
      </div>
    </main>
  )
}