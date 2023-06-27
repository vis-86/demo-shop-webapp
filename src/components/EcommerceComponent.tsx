'use client'

import { TgCartProvider } from "@/contexts/cart/"

const EcommerceComponent = (props: React.PropsWithChildren) => {
    return (
        <TgCartProvider>
            {props.children}
        </TgCartProvider>
    )
}

export default EcommerceComponent