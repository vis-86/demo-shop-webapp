import CartContext from '@/contexts/CartContext'
import { useTelegram } from '@/hooks/UseTelegram'
import { Product, ProductVolume } from '@/types/Product'
import { PropsWithChildren, useCallback, useContext, useEffect } from 'react'

type Props = {
    callback: () => void,
    product: Product,
    volume: ProductVolume,
    count: number
}

const AddToCartButton = ({ callback, product, volume, count }: PropsWithChildren<Props>) => {

    const cart = useContext(CartContext)
    const { enabled: tgEnabeld, tgApi } = useTelegram()

    const onAdd = useCallback(() => {
        if (cart && product) {
            cart.addProduct({
                id: product.id,
                imgThumbUrl: product.imgThumbUrl,
                name: product.name,
                volume,
                count
            })
        }
        callback()
    }, [cart, product, volume, count, callback])

    useEffect(() => {
        if (!volume) return

        tgApi.setMainButtonParams({
            is_visible: true,
            text: `Добавить (${count * volume.price} ₽)`
        }, () => {
            tgApi.hideBackButton()
            onAdd()
        })

    }, [callback, onAdd, volume, tgApi, count, product, cart])

    return (
        <>
            {!tgEnabeld && <button onClick={onAdd} type='button' className='button-add-to-cart'>{`Добавить (${count * volume.price} ₽)`}</button>}
        </>
    )
}

export default AddToCartButton