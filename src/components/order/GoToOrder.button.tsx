import { useTelegram } from "@/hooks/UseTelegram"
import { ProductInCart } from "@/types/Product"
import { PropsWithChildren, useCallback, useEffect, useState } from "react"

type Props = {
    products: ProductInCart[]
}

const GoToOrderButton = ({ products }: PropsWithChildren<Props>) => {

    const { enabled: tgEnabeld = false, tgApi } = useTelegram()
    const [totalAmount, setTotalAmount] = useState<string | null>(null)

    const onGoToOrder = useCallback(() => {
        //todo переходим на экран с оплатой
    }, [])

    useEffect(() => {
        if (products.length) {
            let total = 0;
            for (let product of products) {
                total += product.count * product.volume.price
            }
            setTotalAmount(`Оплатить ${total} ₽`)
        } else {
            setTotalAmount(null)
        }
    }, [products])

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

    if (!tgEnabeld) {
        return <>
            <table className="top-bar" style={{ border: 0, width: '100%' }}>
                <tr>
                    <th>Name</th>
                    <th>Volume</th>
                    <th>Count</th>
                    <th style={{textAlign: 'right'}}>Amount</th>
                </tr>

                {products.map(s => <tr key={s.id + s.volume.volume}>
                    <td className="text-center">{s.name}</td>
                    <td className="text-center">{s.volume.volume}</td>
                    <td className="text-center">{s.count}</td>
                    <td style={{textAlign: 'right'}} className="text-center">{s.volume.price * s.count}  ₽</td>
                </tr>)}
                <tr>
                    <td style={{textAlign: 'right'}} colSpan={4} >{totalAmount}</td>
                </tr>
            </table>
            
        </>
    }

    return (
        <>
            <button onClick={onGoToOrder} type='button' className='button-add-to-cart'>{totalAmount}</button>
        </>
    )
}

export default GoToOrderButton