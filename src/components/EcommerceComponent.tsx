'use client'

import { CartProvider } from "@/contexts/CartContext"

const EcommerceComponent = (props: React.PropsWithChildren) => {
    return (
        <CartProvider>
            {props.children}
        </CartProvider>
    )
}

export default EcommerceComponent