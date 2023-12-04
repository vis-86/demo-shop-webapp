'use client'

import { useState } from 'react'
import { Category, Product } from '@/fetcher/interfaces'
import SearchBar from '../../components/search/SearchBar'
import CategoryProductList from './CategoryProductList'

interface Props {
  list?: Product[];
  categories?: Category[]
}

export default function ProductList({ list, categories }: Props) {
  const [products, setProducts] = useState(list || [])

  return (
    <div>
      <div className='fixed-top'>
        <SearchBar
          categories={categories || []}
          onCategoryClick={(category) => {

          }}
          onSearch={(search) => {
            if (!list || search.length === 0) {
              setProducts(list || [])
            } else {
              setProducts(list.filter(s => s.name.toLowerCase().indexOf(search.toLowerCase()) > -1))
            }
          }}
        />
      </div>
      <div className='offset-top-container'>
        <CategoryProductList products={products} categories={categories || []} />
      </div>
    </div>
  );
}

export { ProductList }