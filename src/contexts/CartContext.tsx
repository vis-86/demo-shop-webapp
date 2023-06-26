import { ProductInCart } from "@/types/Product";
import { ReactNode, createContext, useCallback, useState } from "react";

type CartContextValue = {
    cartIsEmpty: () => boolean
    addProduct: (product: ProductInCart) => void
    updateProduct: (product: ProductInCart) => void
    removeProduct: (product: ProductInCart) => void
    products: ProductInCart[]
}

const CartContext = createContext<CartContextValue>({
    products: [],
    cartIsEmpty: () => false,
    addProduct: () => { },
    updateProduct: () => { },
    removeProduct: () => { }
});

export const CartProvider = ({ children }: { children?: ReactNode | undefined }): ReactNode => {
    const [products, setProducts] = useState<ProductInCart[]>([])

    const cartIsEmpty = () => {
        return products.length === 0
    }
    const addProduct = useCallback((product: ProductInCart) => {
        setProducts(products => [...products, product])
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