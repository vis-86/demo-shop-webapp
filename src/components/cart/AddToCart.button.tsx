'use client'

import CartContext from '@/contexts/cart/TgCartProvider'
import { Price, ProductDetail, ProductInCart } from '@/fetcher/interfaces'
import { PropsWithChildren, useContext, useEffect } from 'react'

type Props = {
    callback: () => void,
    product: ProductDetail,
    volume: Price,
    count: number,
    tgEnabeld: boolean
}

const createCartProduct = (
    product: ProductDetail,
    volume: Price,
    count: number
): ProductInCart => {
    return {
        uniqId: Date.now(),
        id: product.id,
        imgThumbUrl: product.imgPath,
        name: product.name,
        volume,
        count,
        metric: product.metric
    }
}

const AddToCartButton = ({ callback, product, volume, count }: PropsWithChildren<Props>) => {

    const cart = useContext(CartContext)

    useEffect(() => {
        if (cart === null || cart.tg === null || !cart.tgEnabled) {
            return
        }
        const theTg = cart.tg

        const onClick = () => {
            theTg.BackButton.isVisible && theTg.BackButton.hide()
            cart.addProduct(
                createCartProduct(product, volume, count)
            )
            callback()
        }
        theTg.MainButton?.setParams({
            is_visible: true,
            text: `Добавить (${count * volume.price} ₽)`
        })

        theTg.MainButton?.onClick(onClick)

        return () => {
            
            theTg.MainButton?.offClick(onClick)
        }


    }, [callback, volume, count, product, cart])

    if (cart.tgEnabled) {
        return null
    }

    return (
        <>
            {<button onClick={() => {
                cart && cart.addProduct(createCartProduct(product, volume, count))
                callback()
            }} type='button' className='button-add-to-cart'>{`Добавить ${count * volume.price} ₽`}</button>}
        </>
    )
}

export { AddToCartButton }