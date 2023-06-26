'use client'

import { useContext, useEffect } from 'react'
import { ProductItem } from './ProductItem'
import { Product } from '@/types/Product'
import { getProductList } from '@/services/GetProductList'
import useSWR from 'swr'
import CartContext from '@/contexts/CartContext'

const ProductList = () => {
    const { data: productList, isLoading } = useSWR("productList", getProductList);
    const cart = useContext(CartContext)

    const getProductCountInCart = (id: number): number | undefined => {
        if (!cart || !cart.products || cart.products.length === 0) {
            return
        }
        const countList = cart.products.filter(s => s.id === id).map(({ count }) => count)
        if (countList.length === 0) {
            return
        }
        return countList.reduce((prev, next) => prev + next)
    }

    return isLoading ? (
        <h3 className='text-center loader'>Loading... </h3>
    ) : (
        <div className='product-container'>
            {productList && productList.map((item: Product) => (
                <ProductItem item={item} key={item.id} cartCount={getProductCountInCart(item.id)}></ProductItem>
            ))}
            
        </div>
    );
}

export { ProductList }