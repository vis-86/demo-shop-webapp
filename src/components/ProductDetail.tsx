'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import useSWR from 'swr'
import { getProductById } from "@/services/GetProductList"
import Image from 'next/image'
import { ProductVolume } from '@/types/Product'
import { useTelegram } from '@/hooks/UseTelegram'
import { useRouter } from 'next/navigation'
import PlusIcon from './icons/plus'
import MinusIcon from './icons/minus'

const ProductDetail = (props: PropsWithChildren<{ id: number }>) => {
    const router = useRouter()
    const { id } = props
    const { data: product, isLoading } = useSWR(id + '', getProductById);

    const [volume, setVolume] = useState<ProductVolume>()
    const [count, setCount] = useState<number>(1)

    const { enabled: tgEnabeld, tgApi } = useTelegram()

    useEffect(() => {
        if (!volume && product && product.volumes) {
            setVolume(product.volumes[0])
        }
        
        const onBack = ()=> {
            setTimeout(()=> tgApi.hideMainButton, 110)
            setTimeout(()=> router.back, 130)
        }

        tgApi.showBackButton(onBack)
    }, [router, product, volume, tgApi])


    useEffect(() => {
        if (!volume) return

        tgApi.setMainButtonParams({
            is_visible: true,
            text: `Добавить (${count * volume.price} ₽)`
        }, () => {
            tgApi.hideBackButton()
            tgApi.setMainButtonParams({
                is_visible: true,
                text: `Оплатить ${count * volume.price} ₽`
            })
            router.back()
        })

    }, [router, volume, tgApi, count])

    const onVolumeClick = (newVolume: ProductVolume) => {
        setVolume(newVolume)
    }
    const onAddCount = () => {
        tgApi.hapticFeedback()
        setCount((prev) => prev + 1)
    }
    const onSubtractCount = () => {
        tgApi.hapticFeedback()
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
            {!tgEnabeld && <div className='top-bar'>
                <a href='#' onClick={() => {
                    router.back()
                }}>Назад</a>
            </div>}
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
                            tgApi.hapticFeedback()
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
            <div className='product-detail-counts-container'>
                <button className='circle-btn' onClick={onSubtractCount}><MinusIcon /></button>
                <div className='product-detail-counts'>{count}</div>
                <button className='circle-btn' onClick={onAddCount}><PlusIcon /></button>
            </div>
        </div>

    )
}

export { ProductDetail }