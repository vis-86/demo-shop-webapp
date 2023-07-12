'use client'

import { impactOccurredMedium } from "@/TgUtils"
import { CartContext } from "@/contexts/cart"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

const GoToOrderButton = () => {

    const cart = useContext(CartContext)
    const router = useRouter()

    useEffect(() => {
        if (cart === null || cart.tg === null || !cart.tgEnabled) {
            return
        }
        const theTg = cart.tg

        theTg.BackButton.isVisible && theTg.BackButton.hide()

        if (cart.cartIsEmpty()) {
            theTg.MainButton.hide()
        } else {
            const onClick = () => {
                impactOccurredMedium(theTg)
                router.push('/order')
            }
            theTg.MainButton.setParams({
                is_visible: true,
                text: `Посмотреть заказ`
            })
            theTg.MainButton.onClick(onClick)

            return () => {
                theTg.MainButton.offClick(onClick)
            }
        }
    }, [cart, router])

    return (
        <>
            <button
                onClick={() => {
                    //todo переходим на экран с оплатой
                    router.push('/order')
                }}
                type='button'
                className='button-add-to-cart'
            >
                {cart.totalAmount()} ₽
            </button>
        </>
    )
}

export { GoToOrderButton }