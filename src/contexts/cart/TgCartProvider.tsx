import Script from "next/script";
import { useTelegram } from "@/hooks/UseTelegram";
import { ProductInCart } from "@/types/Product";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

export const TgCartProvider = ({ children }: { children?: ReactNode | undefined }): ReactNode => {
    const { tgApp } = useTelegram()

    const [tg, setTg] = useState<WebApp | null>(null)
    const [tgEnabled, setTgEnabled] = useState<boolean>(false)
    const [tgScriptReady, setTgScriptReady] = useState(false)
    const [products, setProducts] = useState<ProductInCart[]>([])

    useEffect(() => {
        if (tgScriptReady) {
            const tg = tgApp()
            setTg(tg)
            setTgEnabled(tg && tg.initDataUnsafe && tg.initDataUnsafe.query_id ? true : false)
        }
    }, [tgApp, tgScriptReady, tgEnabled])

    const cartIsEmpty = () => {
        return products.length === 0
    }
    const addProduct = useCallback((product: ProductInCart) => {
        setProducts(state => [...state, product])
    }, [])

    const updateProduct = (product: ProductInCart) => {
        setProducts(products => products.map(
            item => item.uniqId === product.uniqId
                ? { ...item, ...product }
                : item
        ))
    }

    const removeProduct = (product: ProductInCart) => {
        setProducts(products => products.filter(item => item.uniqId !== product.uniqId))
    }

    const totalAmount = (): number => {
        let total = 0
        for (const item of products) {
            total += item.count * item.volume.price
        }
        return total
    }

    return (
        <CartContext.Provider value={{
            products,
            tgEnabled,
            tg,
            totalAmount,
            cartIsEmpty: cartIsEmpty,
            addProduct: addProduct,
            updateProduct: updateProduct,
            removeProduct: removeProduct,
        }}>
            <Script
                src="https://telegram.org/js/telegram-web-app.js"
                onLoad={() => {
                    setTgScriptReady(true)
                }} />
            {children}
        </CartContext.Provider>
    )
}

export default CartContext