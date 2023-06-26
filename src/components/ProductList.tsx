'use client'

import { useContext, useEffect } from 'react'
import { ProductItem } from './ProductItem'
import { Product } from '@/types/Product'
import { getProductList } from '@/services/GetProductList'
import useSWR from 'swr'
import CartContext from '@/contexts/CartContext'
import GoToOrderButton from './order/GoToOrder.button'

const ProductList = () => {
    const { data: productList, isLoading } = useSWR("productList", getProductList);
    const cart = useContext(CartContext)

    const getProductCountInCart = (id: number): number | undefined => {
        const count = cart ? cart.products.filter(s => s.id === id).length : 0
        return count > 0 ? count : undefined
    }

    return isLoading ? (
        <h3 className='text-center loader'>Loading... </h3>
    ) : (
        <div className='product-container'>
            {productList && productList.map((item: Product) => (
                <ProductItem item={item} key={item.id} cartCount={getProductCountInCart(item.id)}></ProductItem>
            ))}
            <GoToOrderButton />
        </div>
    );
}

export { ProductList }