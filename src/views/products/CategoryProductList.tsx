import { Category, Product } from "@/fetcher/interfaces"
import { ProductItem } from "./ProductItem"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "@/contexts/cart"

interface Props {
  products: Product[]
  categories: Category[]
}

interface GroupedProduct extends Category {
  products: Product[]
}

export default function CategoryProductList({ products, categories }: Props) {

  const cart = useContext(CartContext)

  const getProductCountInCart = (id?: number): number | undefined => {
    if (!cart || !cart.products || cart.products.length === 0) {
      return
    }
    const countList = cart.products
      .filter(s => id && s.id === id)
      .map(({ count }) => count)

    if (countList.length === 0) {
      return
    }
    return countList.reduce((prev, next) => prev + next)
  }

  const [data, setData] = useState<GroupedProduct[]>([])

  useEffect(() => {
    setData(group(products, categories))
  }, [products, categories])

  return (<>
    {
      data.map(item => (
        <div key={item.id}>
          <h2 className="category-h2" id={'category-' + item.id}>{item.displayName}</h2>
          <div className='product-container'>
            {item.products.map(item => (
              <ProductItem
                key={item.id}
                item={item}
                cartCount={getProductCountInCart(item.id)}
              />
            ))}
          </div>
        </div>
      ))
    }
  </>)
}

const group = (products: Product[], categories: Category[]): GroupedProduct[] => {
  return categories
    .map(category => (
      {
        ...category,
        products: products.filter((product) => hasCategory(product, category))
      })
    ).filter(s=>s.products.length > 0)
}

const hasCategory = (product: Product, category: Category) => {
  return product.categoryList && product.categoryList.filter(s=>s.id === category.id).length > 0
}