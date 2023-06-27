import CartContext from '@/contexts/CartContext'
import { Product, ProductVolume } from '@/types/Product'
import { PropsWithChildren, useContext, useEffect } from 'react'

type Props = {
    callback: () => void,
    product: Product,
    volume: ProductVolume,
    count: number,
    tgEnabeld: boolean
}

const AddToCartButton = ({ callback, product, volume, count }: PropsWithChildren<Props>) => {

    const cart = useContext(CartContext)

    useEffect(() => {
        if (cart.tg) {
            cart.tg.MainButton?.setParams({
                is_visible: true,
                text: `Добавить (${count * volume.price} ₽)`
            })
            cart.tg.MainButton?.onClick(() => {
                cart.tg?.BackButton.isVisible && cart.tg?.BackButton.hide()

                cart && cart.addProduct({
                    uniqId: product.id + "_" + volume.volume,
                    id: product.id,
                    imgThumbUrl: product.imgThumbUrl,
                    name: product.name,
                    volume,
                    count
                })

                callback()
            })
        }

    }, [callback, volume, count, product, cart])

    if (cart.tgEnabled) {
        return null
    }

    return (
        <>
            {<button onClick={() => {
                cart && cart.addProduct({
                    uniqId: product.id + "_" + volume.volume,
                    id: product.id,
                    imgThumbUrl: product.imgThumbUrl,
                    name: product.name,
                    volume,
                    count
                })
                callback()
            }} type='button' className='button-add-to-cart'>{`Добавить (${count * volume.price} ₽)`}</button>}
        </>
    )
}

export default AddToCartButton