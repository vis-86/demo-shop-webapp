import Script from "next/script";
import { ProductInCart } from "@/fetcher/interfaces";
import { useTelegram } from "@/hooks/useTelegramWebApp";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { CartContext, OrderDetail } from "./CartContext";
import { clientPost } from "@/fetcher/ClientFetcher";


export const TgCartProvider = ({ botId, merchantId, children }: { botId: string, merchantId: string, children?: ReactNode | undefined }): ReactNode => {
  const { tgApp } = useTelegram()

  const [tg, setTg] = useState<WebApp | null>(null)
  const [tgEnabled, setTgEnabled] = useState<boolean>(false)
  const [tgScriptReady, setTgScriptReady] = useState(false)
  const [products, setProducts] = useState<ProductInCart[]>([])
  const [order, setOrderDetail] = useState<OrderDetail | null>(null)

  const [initWebApp, setInitWebApp] = useState(false)
  const [sessionInit, setSessionInit] = useState(false)

  useEffect(() => {
    if (!tgScriptReady) return

    if (!initWebApp) {
      try {
        const body = new URLSearchParams({
          userId: (tg?.initDataUnsafe?.user?.id || 15123).toString(),
          username: tg?.initDataUnsafe?.user?.username || 'vis-86-123123',
          chatId: (tg?.initDataUnsafe?.chat?.id || 123).toString(),
          merchantId,
          botId
        })

        clientPost('/api/init-bot', body.toString(), {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(() => setSessionInit(true))
          .catch(console.error)
      } catch (e) {
        console.error(e)
      } finally {
        setInitWebApp(true)
      }
    }
  }, [botId, merchantId, tg, tgScriptReady, initWebApp])

  useEffect(() => {
    if (tgScriptReady) {
      const tg = tgApp()
      setTg(tg)
      setTgEnabled(tg && tg.initDataUnsafe && tg.initDataUnsafe.query_id ? true : false)

      //Первоначальные настройки
      tg?.expand()
      tg?.enableClosingConfirmation()
      // tg?.requestContact((result) => {
      //   console.log('get contact:', result)
      // })
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
      item => item.productId === product.productId
        ? { ...item, ...product }
        : item
    ))
  }

  const removeProduct = (product: ProductInCart) => {
    setProducts(products => products.filter(item => item.productId !== product.productId))
  }

  const clearProducts = () => setProducts([])

  const totalAmount = (): number => {
    let total = 0
    for (const item of products) {
      if (!item || !item.option) {
        continue
      }
      total += item.count * item.option.price
    }
    return total
  }

  return (
    <CartContext.Provider value={{
      sessionInit,
      products,
      tgEnabled,
      tg,
      order,
      totalAmount,
      cartIsEmpty,
      setOrder: setOrderDetail,
      addProduct,
      updateProduct,
      removeProduct,
      clearProducts,
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