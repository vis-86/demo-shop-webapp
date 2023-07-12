'use client'

import { useContext } from 'react'
import useSWR from 'swr'
import { ProductItem } from './ProductItem'
import { Product } from '@/types/Product'
import { getProductList } from '@/services/GetProductList'
import { CartContext } from '@/contexts/cart'

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
        <div className='product-container container-space'>
            {productList && productList.map(
                item => (
                    <ProductItem
                        item={item}
                        key={item.id}
                        cartCount={getProductCountInCart(item.id)}
                    ></ProductItem>
                )
            )}
        </div>
    );
}

export { ProductList }