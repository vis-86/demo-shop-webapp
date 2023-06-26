import CartContext from '@/contexts/CartContext'
import { useTelegram } from '@/hooks/UseTelegram'
import { Product, ProductVolume } from '@/types/Product'
import { PropsWithChildren, useContext, useEffect } from 'react'

type Props = {
    callback: () => void,
    product: Product,
    volume: ProductVolume,
    count: number
}

const AddToCartButton = ({ callback, product, volume, count }: PropsWithChildren<Props>) => {

    const cart = useContext(CartContext)
    const { enabled: tgEnabeld, tgApi } = useTelegram()


    useEffect(() => {
        if (!volume || !tgApi) return

        tgApi.MainButton?.setParams({
            is_visible: true,
            text: `Добавить (${count * volume.price} ₽)`
        })
        tgApi.MainButton?.onClick(() => {
            tgApi.hideBackButton()
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

    }, [callback, volume, tgApi, count, product, cart])

    if (tgEnabeld) {
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