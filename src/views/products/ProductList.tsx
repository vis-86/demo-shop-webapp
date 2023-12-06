'use client'

import { useContext, useEffect, useState } from 'react'
import { Category, Product } from '@/fetcher/interfaces'
import SearchBar from '../../components/search/SearchBar'
import CategoryProductList from './CategoryProductList'
import { CartContext } from '@/contexts/cart'
import { useProductList } from '@/fetcher/products/client'

interface Props {
  list?: Product[];
  categories?: Category[]
}

export default function ProductList({ categories }: Props) {
  const cart = useContext(CartContext)
  const [products, setProducts, loading] = useProductList({
    size: 100,
    pageNumber: 0,
    deliveryTypeId: cart.order?.deliveryTypeId
    
  })
  return (
    <div>
      <div className='fixed-top'>
        <SearchBar
          categories={categories || []}
          onCategoryClick={(category) => {

          }}
          onSearch={(search) => {
            if (!products || search.length === 0) {
              setProducts(products || [])
            } else {
              setProducts(products.filter(s => s.name.toLowerCase().indexOf(search.toLowerCase()) > -1))
            }
          }}
        />
      </div>
      <div className='offset-top-container'>
        <CategoryProductList products={products || []} categories={categories || []} />
      </div>
    </div>
  );
}

export { ProductList }