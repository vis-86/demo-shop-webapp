import { CartContext } from '@/contexts/cart'
import React, { useContext, useEffect } from 'react'

const BackButton = (
    { callback }: { callback: () => void }
) => {
    const cart = useContext(CartContext)

    useEffect(() => {
        const onCliclk = () => {
            cart.tg?.BackButton.hide()
            callback()
        }
        cart.tg?.BackButton.show()
        cart.tg?.BackButton.onClick(onCliclk)
        return () => {
            cart.tg?.BackButton.offClick(onCliclk)
        }

    }, [callback, cart])

    if (cart.tgEnabled) {
        return null
    }

    return !cart.tgEnabled && <div className='top-bar'>
        <a href='#' onClick={callback}>Назад</a>
    </div>
}

export { BackButton }