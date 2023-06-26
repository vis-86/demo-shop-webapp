import CartContext from "@/contexts/CartContext"
import { useTelegram } from "@/hooks/UseTelegram"
import { useCallback, useContext, useEffect, useState } from "react"

const GoToOrderButton = () => {
    const cart = useContext(CartContext)
    const { enabled: tgEnabeld = false, tgApi } = useTelegram()
    const [totalAmount, setTotalAmount] = useState<string | null>(null)

    const onGoToOrder = useCallback(() => {
        //todo переходим на экран с оплатой
    }, [])

    useEffect(() => {
        if (cart && !cart.cartIsEmpty()) {
            let total = 0;
            for (let product of cart.products) {
                total += product.count * product.volume.price
            }
            setTotalAmount(`Оплатить (${total} ₽)`)
        } else {
            setTotalAmount(null)
        }
    }, [cart])

    useEffect(() => {
        if (!tgEnabeld) return

        if (totalAmount) {
            tgApi.setMainButtonParams({
                is_visible: true,
                text: totalAmount
            }, () => {
                onGoToOrder()
            })
        } else {
            tgApi.setMainButtonParams({
                is_visible: false,
                text: ''
            })
        }
    }, [tgEnabeld, tgApi, totalAmount, onGoToOrder])

    if (tgEnabeld || !totalAmount) {
        return null
    }

    return (
        <>
            <button onClick={onGoToOrder} type='button' className='button-add-to-cart'>{totalAmount}</button>
        </>
    )
}

export default GoToOrderButton