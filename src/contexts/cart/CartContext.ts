import { ProductInCart } from "@/fetcher/interfaces"
import { createContext } from "react"

export type CartContextValue = {
    cartIsEmpty: () => boolean
    totalAmount: () => number
    addProduct: (product: ProductInCart) => void
    updateProduct: (product: ProductInCart) => void
    removeProduct: (product: ProductInCart) => void
    products: ProductInCart[]
    tgEnabled: boolean
    tg: WebApp | null
}

export const CartContext = createContext<CartContextValue>({
    cartIsEmpty: () => false,
    totalAmount: () => 0,
    addProduct: () => { },
    updateProduct: () => { },
    removeProduct: () => { },
    products: [],
    tgEnabled: false,
    tg: null
});