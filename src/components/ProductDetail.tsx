'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getProductById } from "@/services/GetProductList"
import Image from 'next/image'
import { ProductVolume } from '@/types/Product'

const ProductDetail = (props: React.PropsWithChildren<{ id: number }>) => {
    const { id } = props
    const { data: product } = useSWR(id + '', getProductById);

    const [volume, setVolume] = useState<ProductVolume>()

    useEffect(() => {
        if (!volume && product && product.volumes) {
            setVolume(product.volumes[0])
        }
    }, [product])

    const onVolumeClick = (newVolume: ProductVolume) => {
        setVolume(newVolume)
    }

    return (
        <div className='product-item-detail'>
            <div className='product-item-detail-image'>
                {product ? <Image src={product.imgThumbUrl} alt={product.name} width={140} height={140} ></Image> : null}
            </div>
            <div className='product-item-detail-head'>
                <div>{product?.name}</div>
                <div className='product-item-detail-price'>{volume?.price} ₽</div>
            </div>
            <div className='product-item-detail-volumes'>
                {product && product.volumes.map(s => {
                    return <div
                        className={'product-volume-item ' + (s.volume === volume?.volume ? 'product-volume-item--active' : '')}
                        onClick={() => {
                            onVolumeClick(s)
                        }} key={s.volume}
                    >
                        <div className={'volume-circle ' + 'volume-circle-' + s.volume} ></div>
                        <div className='product-detail-volume-price-content'>
                            <div>{s.volume} мл</div>
                            <div className='product-detail-volume-price'>{s.price} ₽</div>
                        </div>
                    </div>
                })}
            </div>
        </div>

    )
}

export { ProductDetail }