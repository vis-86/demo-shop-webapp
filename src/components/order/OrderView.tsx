'use client'

import { impactOccurredMedium } from "@/TgUtils"
import { CartContext } from "@/contexts/cart"
import Link from "next/link"
import { useContext, useEffect } from "react"
import { BackButton } from "../cart"
import { useRouter } from "next/navigation"

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
        return <Link href={'/'}>Сделать заказ</Link>
    }

    return (
        <div>
            <BackButton callback={router.back} />
            <table className="top-bar" style={{ border: 0, width: '100%' }}>
                <tr>
                    <th style={{ textAlign: 'left' }}>Name</th>
                    <th>Volume</th>
                    <th>Count</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>

                {cart.products && cart.products.map(s => <tr key={s.id + s.volume.volume}>
                    <td style={{ textAlign: 'left' }} className="text-center">{s.name}</td>
                    <td className="text-center">{s.volume.volume}</td>
                    <td className="text-center">{s.count}</td>
                    <td style={{ textAlign: 'right' }} className="text-center">{s.volume.price * s.count} ₽</td>
                </tr>)}
                <tr>
                    <td style={{ textAlign: 'right' }} colSpan={4} >Итого: {cart.totalAmount()} ₽</td>
                </tr>
            </table>
        </div>
    )
}

export { OrderView }