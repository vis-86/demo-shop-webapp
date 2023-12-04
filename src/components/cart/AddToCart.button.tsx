'use client'

import CartContext from '@/contexts/cart/TgCartProvider'
import { ProductOption, ProductDetail, ProductInCart } from '@/fetcher/interfaces'
import { useSaveOrder } from '@/fetcher/order/client'
import { PropsWithChildren, useContext, useEffect } from 'react'

type Props = {
  callback: () => void,
  product: ProductDetail,
  volume: ProductOption,
  count: number,
  tgEnabeld: boolean
}

const createCartProduct = (
  product: ProductDetail,
  option: ProductOption,
  count: number
): ProductInCart => {
  return {
    productId: product.id,
    imgThumbUrl: product.imgPath,
    name: product.name,
    option,
    optionId: option.id,
    count,
    metric: product.metric
  }
}

const AddToCartButton = ({ callback, product, volume, count }: PropsWithChildren<Props>) => {

  const cart = useContext(CartContext)

  const { mutate, loading } = useSaveOrder()

  useEffect(() => {
    if (cart === null || cart.tg === null || !cart.tgEnabled) {
      return
    }
    const theTg = cart.tg
    const onClick = () => {
      const newProduct = createCartProduct(product, volume, count)
      
      theTg.MainButton.isProgressVisible = true
      
      mutate({
        orderId: cart.order?.orderId,
        products: cart.products,
        status: cart.order?.status,
        deliveryTypeId: cart.order?.deliveryTypeId
      }).then(() => {
        theTg.MainButton.isProgressVisible = false
        cart.addProduct(newProduct)
        callback()
      })

      theTg.BackButton.isVisible && theTg.BackButton.hide()

    }
    theTg.MainButton?.setParams({
      is_visible: true,
      text: `Добавить (${count * volume.price} ₽)`
    })

    theTg.MainButton?.onClick(onClick)


    return () => {
      theTg.MainButton?.offClick(onClick)
    }


  }, [callback, volume, count, cart, product, mutate])

  if (cart.tgEnabled || !cart) {
    return null
  }

  return (
    <>
      {<button onClick={() => {
        const newProduct = createCartProduct(product, volume, count)
        
        mutate({
          orderId: cart.order?.orderId,
          products: [...cart.products, newProduct],
          status: cart.order?.status,
          deliveryTypeId: cart.order?.deliveryTypeId
        }).then(()=>{
          cart.addProduct(newProduct)
          callback()
        })
      }} type='button' className='button-add-to-cart'>{`Добавить ${count * volume.price} ₽`}</button>}
    </>
  )
}

export { AddToCartButton }