'use client'

import { useContext, useState } from 'react'
import { Category, DisplayName, Product } from '@/fetcher/interfaces'
import SearchBar from '../../components/search/SearchBar'
import CategoryProductList from './CategoryProductList'
import { CartContext } from '@/contexts/cart'
import { useProductList } from '@/fetcher/products/client'
import PreLoader from '@/components/loader/PreLoader'

interface Props {
  list?: Product[];
  categories?: Category[]
}

export default function ProductList({ categories }: Props) {
  const cart = useContext(CartContext)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category | undefined>()
  const [products, , loading] = useProductList({
    size: 100,
    pageNumber: 0,
    search: search.length > 0 ? search : undefined,
    deliveryTypeId: cart.order?.deliveryTypeId,
    categoryId: category ? category.id : undefined
  })
  return (
    <div>
      <div className='fixed-top'>
        <SearchBar
          category={category}
          categories={categories || []}
          onCategoryClick={setCategory}
          onSearch={setSearch}
        />
      </div>
      <div className='offset-top-container'>
        {search}
        {loading ? <PreLoader /> : <CategoryProductList products={products || []} categories={categories || []} />}
      </div>
    </div>
  );
}

export { ProductList }