'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import useSWR from 'swr'
import { getProductById } from "@/services/GetProductList"
import Image from 'next/image'
import { ProductVolume } from '@/types/Product'
import { useTelegram } from '@/hooks/UseTelegram'
import { useRouter } from 'next/navigation'

const ProductDetail = (props: PropsWithChildren<{ id: number }>) => {
    const { id } = props
    const { data: product, isLoading } = useSWR(id + '', getProductById);
    const [volume, setVolume] = useState<ProductVolume>()
    const router = useRouter()

    const { tg, enabled: tgEnabeld, tgApi } = useTelegram()

    useEffect(() => {
        if (!volume && product && product.volumes) {
            setVolume(product.volumes[0])
        }
        tgApi.showBackButton(router.back)
        tgApi.expand()
    }, [router, product, volume, tgApi])


    useEffect(() => {
        tg?.MainButton.showProgress()
        if (!volume || !tgEnabeld) {
            return
        }
        if (tg?.MainButton) {
            tg?.MainButton
                .setParams({
                    is_visible: true,
                    text: 'PAY ' + volume.price,
                    color: '#31b545'
                })
                .hideProgress()
                .show()
        }

    }, [volume, tgEnabeld, tg])

    const onVolumeClick = (newVolume: ProductVolume) => {
        setVolume(newVolume)
    }
    if (isLoading) {
        return <h3 className='text-center loader'>Loading... </h3>
    }

    return (
        <div className='product-item-detail'>
            {!tgEnabeld && <div className='top-bar'>
                <a href='#' onClick={() => {
                    router.back()
                }}>Назад</a>
            </div>}
            <div className='product-item-detail-card'>
                <div className='product-item-detail-image'>
                    {product ? <Image src={product.imgThumbUrl} alt={product.name} width={140} height={140} priority={true}></Image> : null}
                </div>
                <div className='product-item-detail-card-content'>
                    <div>{product?.name}</div>
                    <div className='product-item-detail-price'>{volume?.price} ₽</div>
                </div>
            </div>
            <div className='product-item-detail-volumes'>
                {product && product.volumes.map(s => {
                    return <div
                        className={'product-volume-item ' + (s.volume === volume?.volume ? 'product-volume-item--active' : '')}
                        onClick={() => {
                            onVolumeClick(s)
                            tgApi.hapticFeedback()
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