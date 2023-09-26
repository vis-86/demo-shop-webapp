'use client'

import { TgCartProvider } from "@/contexts/cart/"
import { ErrorProvider } from "./error/error-context"

const EcommerceComponent = (props: React.PropsWithChildren) => {
    return (
        <TgCartProvider>
            <ErrorProvider>
                {props.children}
            </ErrorProvider>
        </TgCartProvider>
    )
}

export default EcommerceComponent