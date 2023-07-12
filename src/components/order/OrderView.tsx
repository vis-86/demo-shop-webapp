'use client'

import { impactOccurredMedium } from "@/TgUtils"
import { CartContext } from "@/contexts/cart"
import Link from "next/link"
import { useContext, useEffect } from "react"
import { BackButton } from "../cart"
import { useRouter } from "next/navigation"
import OrderItem from "./OrderItem"

const OrderView = () => {
    const cart = useContext(CartContext)
    const router = useRouter()

    useEffect(() => {
        if (cart === null || cart.tg === null || !cart.tgEnabled) {
            return
        }
        const theTg = cart.tg

        if (cart.cartIsEmpty()) {
            theTg.MainButton.hide()
        } else {
            const onClick = () => {
                impactOccurredMedium(theTg)
                alert('Скоро будет экран с оплатой')
            }
            theTg.MainButton.setParams({
                is_visible: true,
                text: `Оплатить ${cart.totalAmount()} ₽`
            })
            theTg.MainButton.onClick(onClick)

            return () => {
                theTg.MainButton.offClick(onClick)
            }
        }
    }, [cart])

    if (cart.cartIsEmpty()) {
        return <div className="container-space text-center">
            <div className="order-header-wrap">
                <h1>Карзина пуста</h1>
            </div>
            <div className="order-view-empty">
                <Link className="btn" href={'/'}>Сделать заказ</Link>
            </div>
        </div>
    }

    return (
        <>
            <BackButton callback={router.back} />
            <div className="order-overview container-space">
                <div className="order-header-wrap">
                    <h2 className="cafe-order-header">Ваш заказ</h2>
                </div>
                <div className="order-items">
                    {cart.products && cart.products.map(s =>
                        <OrderItem
                            key={s.id + s.volume.volume}
                            product={s}
                            onRemoveClick={() => {
                                impactOccurredMedium(cart.tg)
                                cart.removeProduct(s)
                            }}
                        />
                    )}
                </div>
                <div className="order-items-total">
                    Итого: {cart.totalAmount()}  ₽
                </div>
            </div>
        </>

    )
}

export { OrderView }