import { ProductInCart } from "@/types/Product";
import { ReactNode, createContext, useState } from "react";

type CartContextValue = {
    getTotal: () => CartTotal
    cartIsEmpty: () => boolean
    addProduct: (product: ProductInCart) => void
    updateProduct: (product: ProductInCart) => void
    removeProduct: (product: ProductInCart) => void
    products: ProductInCart[]
}

type CartTotal = {
    totalAmount: number,
    count: number
}

const CartContext = createContext<CartContextValue | null>({
    products: [],
    getTotal: () => {
        return {
            totalAmount: 0,
            count: 0
        }
    },
    cartIsEmpty: () => false,
    addProduct: () => { },
    updateProduct: () => { },
    removeProduct: () => { }
});

export const CartProvider = ({ children }: { children?: ReactNode | undefined }): ReactNode => {
    const [products, setProducts] = useState<ProductInCart[]>([])

    const getTotal = (): CartTotal => {
        return {
            totalAmount: products.length > 0 ? products.map(({count, volume}) => count * volume.price).reduce((prev, next) => prev + next) : 0,
            count: products.length > 0 ? products.map(item => item.count).reduce((prev, next) => prev + next) : 0
        }
    }

    const cartIsEmpty = () => {
        return products.length === 0
    }
    const addProduct = (product: ProductInCart) => {
        setProducts(products => [...products, product])
    }

    const updateProduct = (product: ProductInCart) => {
        setProducts(products => products.map(
            item => item.id === product.id
                ? { ...item, ...product }
                : item
        ))
    }

    const removeProduct = (product: ProductInCart) => {
        setProducts(products => products.filter(item => item.id !== product.id))
    }

    return (
        <CartContext.Provider value={{
            products,
            getTotal,
            cartIsEmpty,
            addProduct,
            updateProduct,
            removeProduct,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext