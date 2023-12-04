'use client'

import { BotClient, apiWelcome } from "@/fetcher/user/client";
import Link from "next/link";
import CartContext from '@/contexts/cart/TgCartProvider'
import { useContext, useEffect, useState } from "react";
import { DisplayName } from "@/fetcher/interfaces";
import DeliveryType from "@/components/delivery-type";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/fetcher/order/client";
import PreLoader from "@/components/loader/PreLoader";

interface Props {
  deliveryTypes: DisplayName[]
  paymentTypes: DisplayName[]
}

export default function Welcome({ deliveryTypes }: Props) {
  const { sessionInit, order, setOrder, addProduct, clearProducts } = useContext(CartContext)
  const router = useRouter()

  const { mutate: createOrder, loading: createOrderLoading } = useCreateOrder()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>()
  const [showDeliverySection, setShowDeliverySection] = useState(false)

  useEffect(() => {
    if (!sessionInit) return;

    apiWelcome()
      .then((response) => {
        if (response.data && response.data.currentOrder) {
          const currentOrder = response.data.currentOrder
          setOrder({
            orderId: currentOrder.orderId,
            payMethodId: currentOrder.payMethodId,
            deliveryTypeId: currentOrder.deliveryTypeId,
            comment: currentOrder.clientComment,
            address: currentOrder.address,
            status: currentOrder.status,
          })
          setShowDeliverySection(!currentOrder.orderId)

          currentOrder.productList.forEach(s=>{
            addProduct({
              productId: s.productId,
              imgThumbUrl: s.imgPath,
              name: s.name,
              optionId: s.optionId,
              option: {
                id: s.optionId,
                volume: s.volume,
                price: s.price
              },
              count: s.count,
              metric: s.metricName
            })
          })
        }

        if (response.error) {
          console.log(response.error)
        }

      })
      .finally(() => setLoading(false));
  }, [sessionInit, setOrder, addProduct])

  if (loading || createOrderLoading) {
    return <PreLoader />
  }

  return (
    <div>
      {showDeliverySection && <DeliveryType
        deliveryTypes={deliveryTypes}
        onClick={(deliveryType) => {
          if (createOrderLoading) return;

          createOrder({
            status: 'NEW',
            deliveryTypeId: deliveryType.id
          })
            .then(res => {
              if (res.error || !res.data) {
                setError('');
              } else {
                setOrder({ 
                  orderId: res.data, status: 'NEW', 
                  deliveryTypeId: deliveryType.id 
                })
                router.push('/products')
              }
            })
        }}
      />}
      {!showDeliverySection && <div className="mt-2">
        Продолжить заказ?
        <Link className="btn btn-block mt-1" href={'/products'}>Да</Link>
        <Link className="btn btn-block mt-1" href={'#'} onClick={()=> {
          clearProducts()
          setShowDeliverySection(true)
        }}>Нет</Link>
      </div>}
    </div>
  );
}

export { Welcome }