'use client'

import { useContext } from 'react'
import { ProductItem } from './ProductItem'
import { CartContext } from '@/contexts/cart'
import { useProductList } from '@/fetcher/products/client'
import { Product } from '@/fetcher/interfaces'

interface Props {
    list?: Product[];
}

export default function ProductList(props: Props) {

    const [productList, , isLoading] = useProductList({ pageNumber: 0, size: 100_000 }, props.list);

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