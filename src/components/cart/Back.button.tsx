'use client'

import { CartContext } from '@/contexts/cart'
import React, { useContext, useEffect } from 'react'

const BackButton = (
    { callback }: { callback: () => void }
) => {
    const cart = useContext(CartContext)

    useEffect(() => {
        if (!cart.tg || !cart.tgEnabled) {
            return
        }
        const theTg = cart.tg
        theTg.BackButton.show()
        const onCliclk = () => {
            callback()
        }
        theTg.BackButton.onClick(onCliclk)
        return () => {
            theTg.BackButton.hide()
            theTg.BackButton.offClick(onCliclk)
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