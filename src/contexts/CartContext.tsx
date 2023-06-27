import { useTelegram } from "@/hooks/UseTelegram";
import { ProductInCart } from "@/types/Product";
import { ReactNode, createContext, useCallback, useEffect, useState } from "react";

type CartContextValue = {
    cartIsEmpty: () => boolean
    addProduct: (product: ProductInCart) => void
    updateProduct: (product: ProductInCart) => void
    removeProduct: (product: ProductInCart) => void
    products: ProductInCart[]
    tgEnabled: boolean
    tg: WebApp | null
}

const CartContext = createContext<CartContextValue>({
    cartIsEmpty: () => false,
    addProduct: () => { },
    updateProduct: () => { },
    removeProduct: () => { },
    products: [],
    tgEnabled: false,
    tg: null
});

export const CartProvider = ({ children }: { children?: ReactNode | undefined }): ReactNode => {
    const [products, setProducts] = useState<ProductInCart[]>([])
    const { tg, enabled: tgEnabled = false } = useTelegram()

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

    return (
        <CartContext.Provider value={{
            products,
            tgEnabled,
            tg,
            cartIsEmpty: cartIsEmpty,
            addProduct: addProduct,
            updateProduct: updateProduct,
            removeProduct: removeProduct,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext