'use client'

import React from 'react'
import useSWR from 'swr'
import { ProductItem } from './ProductItem'
import { Product } from '@/services/types/Product.type'
import { getProductList } from '@/services/GetProductList'

const ProductList = () => {
    const { data: menuePrices, isLoading } = useSWR("menuePrices", getProductList);
    
    return isLoading ? (
        <h3>Loading... </h3>
    ) : (
        <div className='product-container'>
            {menuePrices && menuePrices.map((item: Product) => (
                <ProductItem item={item} key={item.name}></ProductItem>
            ))}
        </div>
    );
}

export { ProductList }