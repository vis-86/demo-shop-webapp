'use client'

import { useContext, useState } from 'react'
import { ProductItem } from './ProductItem'
import { CartContext } from '@/contexts/cart'
import { Category, Product } from '@/fetcher/interfaces'
import SearchBar from './search/SearchBar'

interface Props {
  list?: Product[];
  categories?: Category[]
}

export default function ProductList({ list, categories }: Props) {
  const [products, setProducts] = useState(list || [])

  const cart = useContext(CartContext)

  const getProductCountInCart = (id?: number): number | undefined => {
    if (!cart || !cart.products || cart.products.length === 0) {
      return
    }
    const countList = cart.products.filter(s => id && s.id === id).map(({ count }) => count)

    if (countList.length === 0) {
      return
    }
    return countList.reduce((prev, next) => prev + next)
  }

  return (
    <div>
      <SearchBar
        categories={categories || []}
        onCategoryClick={(category) => {

        }}
        onSearch={(search) => {
          setProducts((prev) => {
            if (search.length === 0) {
              return list || []
            }
            return search.length > 0 && prev
              ? prev.filter(s => s.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
              : prev
          })
        }}
      />
      <div className='product-container container-space'>
        {products
          .map(item => (
            <ProductItem
              item={item}
              key={item.id}
              cartCount={getProductCountInCart(item.id)}
            ></ProductItem>
          )
          )}
      </div>
    </div>
  );
}

export { ProductList }