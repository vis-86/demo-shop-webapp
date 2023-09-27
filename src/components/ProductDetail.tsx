'use client'

import { PropsWithChildren, useContext, useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import PlusIcon from './icons/plus'
import MinusIcon from './icons/minus'
import CartContext from '@/contexts/cart/TgCartProvider'
import { AddToCartButton, BackButton } from './cart'
import { impactOccurredMedium } from '@/TgUtils'
import { BoxIcon } from 'lucide-react'
import { Price, ProductDetail } from '@/fetcher/interfaces'

const ProductDetail = ({ product }: PropsWithChildren<{ product: ProductDetail | undefined, }>) => {
    const cart = useContext(CartContext)
    const router = useRouter()

    const [volume, setVolume] = useState<Price>()
    const [count, setCount] = useState<number>(1)

    useEffect(() => {
        if (!volume && product && product.priceList) {
            setVolume(product.priceList[0])
        }
    }, [product, volume])


    const onAddCount = () => {
        impactOccurredMedium(cart.tg)
        setCount((prev) => prev + 1)
    }

    const onSubtractCount = () => {
        impactOccurredMedium(cart.tg)
        setCount((prev) => {
            if (prev > 1) {
                return prev - 1
            }
            return prev
        })
    }

    if (!product) {
        return <>Не найден</>
    }

    return (
        <div className='product-detail'>
            <BackButton callback={router.back} />
            <div className='product-detail-card'>
                <div className='product-detail-image'>
                    {product && product.imgPath ? <Image
                        src={`/api/media/${encodeURI(product.imgPath)}`}
                        alt={product.name}
                        width={140}
                        height={140}
                        style={{ objectFit: 'cover', maxWidth: '100%', minWidth: '100%', borderRadius: 16 }} /> : null}
                </div>
                <div className='product-detail-card-content'>
                    <div>{product?.name}</div>
                    <div className='product-detail-price'>{volume?.price} ₽</div>
                </div>
            </div>
            <div className='product-detail-volumes'>
                {product && product.priceList && product.priceList.map(s => {
                    return <div
                        className={'product-volume-item ' + (s.volume === volume?.volume ? 'product-volume-item--active' : '')}
                        onClick={() => {
                            cart.tg?.HapticFeedback.impactOccurred('medium')
                            setVolume(s)
                        }} key={s.volume}
                    >
                        {product.metric === 'мл' ?
                            <div className={'volume-circle ' + 'volume-circle-' + s.volume} ></div>
                            : <BoxIcon fontSize="large" />}
                        <div className='product-detail-volume-price-content'>
                            <div>{s.volume} {product.metric}</div>
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
                    router.back()
                }}
            />}
        </div>

    )
}

export { ProductDetail }