'use client'

import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { getProductById } from "@/services/GetProductList"
import Image from 'next/image'
import { ProductVolume } from '@/types/Product'
import { useRouter } from 'next/navigation'
import PlusIcon from './icons/plus'
import MinusIcon from './icons/minus'
import CartContext from '@/contexts/cart/TgCartProvider'
import { AddToCartButton, BackButton } from './cart'

const ProductDetail = (props: PropsWithChildren<{ id: number, }>) => {
    const cart = useContext(CartContext)
    const router = useRouter()
    const { id } = props
    const { data: product, isLoading } = useSWR(id + '', getProductById);

    const [volume, setVolume] = useState<ProductVolume>()
    const [count, setCount] = useState<number>(1)

    useEffect(() => {
        if (!volume && product && product.volumes) {
            setVolume(product.volumes[0])
        }
    }, [product, volume])

    
    const onAddCount = () => setCount((prev) => prev + 1)

    const onSubtractCount = () => {
        cart.tg?.HapticFeedback.impactOccurred('medium')
        setCount((prev) => {
            if (prev > 1) {
                return prev - 1
            }
            return prev
        })
    }

    if (isLoading) {
        return <h3 className='text-center loader'>Loading... </h3>
    }

    return (
        <div className='product-detail'>
            <BackButton callback={router.back} />
            <div className='product-detail-card'>
                <div className='product-detail-image'>
                    {product ? <Image src={product.imgThumbUrl} alt={product.name} width={140} height={140} priority={true}></Image> : null}
                </div>
                <div className='product-detail-card-content'>
                    <div>{product?.name}</div>
                    <div className='product-detail-price'>{volume?.price} ₽</div>
                </div>
            </div>
            <div className='product-detail-volumes'>
                {product && product.volumes.map(s => {
                    return <div
                        className={'product-volume-item ' + (s.volume === volume?.volume ? 'product-volume-item--active' : '')}
                        onClick={() => {
                            cart.tg?.HapticFeedback.impactOccurred('medium')
                            setVolume(s)
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
            <div className='product-detail-counts-container'>
                <button className='circle-btn' onClick={onSubtractCount}><MinusIcon /></button>
                <div className='product-detail-counts'>{count}</div>
                <button className='circle-btn' onClick={onAddCount}><PlusIcon /></button>
            </div>
            {product && volume && <AddToCartButton
                product={product}
                volume={volume}
                count={count}
                tgEnabeld={cart.tgEnabled}
                callback={() => {
                    cart.tg?.BackButton.hide()
                    router.back()
                }}
            />}
        </div>

    )
}

export { ProductDetail }