'use client'

import { TgCartProvider } from "@/contexts/cart/"
import { ErrorProvider } from "./error/error-context"

const EcommerceComponent = (props: React.PropsWithChildren<{
  botId: string | number
  merchantId: string | number
}>) => {
    return (
        <TgCartProvider botId={props.botId.toString()} merchantId={props.merchantId.toString()}>
            <ErrorProvider>
                {props.children}
            </ErrorProvider>
        </TgCartProvider>
    )
}

export default EcommerceComponent