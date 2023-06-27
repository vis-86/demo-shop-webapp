'use client'

import CartContext from '@/contexts/cart/TgCartProvider'
import { Product, ProductVolume } from '@/types/Product'
import { PropsWithChildren, useContext, useEffect } from 'react'

type Props = {
    callback: () => void,
    product: Product,
    volume: ProductVolume,
    count: number,
    tgEnabeld: boolean
}

const createCartProduct = (
    product: Product,
    volume: ProductVolume,
    count: number
) => {
    return {
        uniqId: Date.now(),
        id: product.id,
        imgThumbUrl: product.imgThumbUrl,
        name: product.name,
        volume,
        count
    }
}

const AddToCartButton = ({ callback, product, volume, count }: PropsWithChildren<Props>) => {

    const cart = useContext(CartContext)

    useEffect(() => {
        if (cart === null || cart.tg === null || !cart.tgEnabled) {
            return
        }

        cart.tg.MainButton?.setParams({
            is_visible: true,
            text: `Добавить (${count * volume.price} ₽)`
        })
        const onClick = () => {
            cart.tg?.BackButton.isVisible && cart.tg?.BackButton.hide()

            cart && cart.addProduct(
                createCartProduct(product, volume, count)
            )

            callback()
        }
        cart.tg.MainButton?.onClick(onClick)
        return () => {
            cart && cart.tg && cart.tg.MainButton?.offClick(onClick)
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