'use client'

import React from 'react'
import useSWR from 'swr'
import { ProductItem } from './ProductItem'
import { Product } from '@/types/Product'
import { getProductList } from '@/services/GetProductList'

const ProductList = () => {
    const { data: productList, isLoading } = useSWR("productList", getProductList);
    
    return isLoading ? (
        <h3 className='text-center'>Loading... </h3>
    ) : (
        <div className='product-container'>
            {productList && productList.map((item: Product) => (
                <ProductItem item={item} key={item.name}></ProductItem>
            ))}
        </div>
    );
}

export { ProductList }