import CartContext from "@/contexts/CartContext"
import { useTelegram } from "@/hooks/UseTelegram"
import { useCallback, useContext, useEffect } from "react"

const GoToOrderButton = () => {
    const cart = useContext(CartContext)
    const { enabled: tgEnabeld, tgApi } = useTelegram()

    const onGoToOrder = useCallback(()=> {
        //todo переходим на экран с оплатой
        
    }, [])

    useEffect(() => {
        if (!tgEnabeld || !cart) return
        if (!cart.cartIsEmpty()) {
            tgApi.setMainButtonParams({
                is_visible: true,
                text: `Оплатить (${cart.getTotal()} ₽)`
            }, onGoToOrder)
        } else {
            tgApi.setMainButtonParams({
                is_visible: false,
                text: ''
            })
        }
    }, [tgEnabeld, tgApi, cart, onGoToOrder])

    return (
        <>
            {!tgEnabeld && cart && <button onClick={onGoToOrder} type='button' className='button-add-to-cart'>{`Оплатить (${cart.getTotal().totalAmount} ₽)`}</button>}
        </>
    )
}

export default GoToOrderButton