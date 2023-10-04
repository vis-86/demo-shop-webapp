'use client'

import { impactOccurredMedium } from "@/TgUtils"
import { CartContext } from "@/contexts/cart"
import { useSavePreOrder } from "@/fetcher/order/client"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

const GoToOrderButton = () => {

    const cart = useContext(CartContext)
    const router = useRouter()
    const { mutate, loading } = useSavePreOrder()

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
                theTg.MainButton.showProgress()
                impactOccurredMedium(theTg)
                mutate({
                  products: cart.products
                }).then(()=> {
                  theTg.MainButton.hideProgress()
                  router.push('/order')
                })
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
    }, [cart, router, mutate])

    if (cart.tgEnabled) {
        return <></>
    }

    return (
        <>
            <button
                onClick={() => {
                    //todo переходим на экран с оплатой
                    mutate({
                      products: cart.products
                    }).then(()=> {
                      router.push('/order')
                    })
                }}
                type='button'
                className='btn button-add-to-cart'
            >
                Посмореть заказ {loading ? '...' : cart.totalAmount() + '₽'} 
            </button>
        </>
    )
}

export { GoToOrderButton }